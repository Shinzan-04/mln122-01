using Google.Apis.Auth;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using PhilosophyAPI.Data;
using PhilosophyAPI.DTOs;
using PhilosophyAPI.Entities;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Text.RegularExpressions;

namespace PhilosophyAPI.Services
{
    public class AuthService : IAuthService
    {
        private readonly AppDbContext _context;
        private readonly IConfiguration _configuration;

        private static readonly string[] AdminEmails =
        {
            "nguyentan230804@gmail.com",
            "dntruongcoder@gmail.com",
            "thevann64@gmail.com",
            "damchanduc1810@gmail.com"
        };

        public AuthService(AppDbContext context, IConfiguration configuration)
        {
            _context = context;
            _configuration = configuration;
        }

        // ── Google OAuth ──────────────────────────────────────────────────────────

        public async Task<AuthResponseDto> GoogleLoginAsync(string idToken)
        {
            GoogleJsonWebSignature.Payload payload;
            try
            {
                var settings = new GoogleJsonWebSignature.ValidationSettings
                {
                    Audience = new List<string> { _configuration["GoogleClientId"]! }
                };
                payload = await GoogleJsonWebSignature.ValidateAsync(idToken, settings);
            }
            catch (Exception ex)
            {
                throw new Exception("Invalid Google token.", ex);
            }

            if (payload == null)
                throw new Exception("Invalid Google token payload.");

            var user = await _context.Users.FirstOrDefaultAsync(u => u.GoogleId == payload.Subject);
            bool isAdmin = AdminEmails.Contains(payload.Email.ToLower());

            if (user == null)
            {
                // Auto-generate unique username from Google email prefix
                string baseUsername = SlugifyUsername(payload.Email.Split('@')[0]);
                string username     = await UniqueUsernameAsync(baseUsername);

                user = new User
                {
                    Username   = username,
                    GoogleId   = payload.Subject,
                    Email      = payload.Email,
                    Name       = payload.Name,
                    AvatarUrl  = payload.Picture,
                    TotalScore = 0,
                    Role       = isAdmin ? "Admin" : "User",
                    CreatedAt  = DateTime.UtcNow
                };
                _context.Users.Add(user);
                await _context.SaveChangesAsync();
            }
            else if (isAdmin && user.Role != "Admin")
            {
                user.Role = "Admin";
                await _context.SaveChangesAsync();
            }

            return BuildResponse(user);
        }

        // ── Email / Password Registration ─────────────────────────────────────────

        public async Task<AuthResponseDto> RegisterAsync(RegisterRequestDto request)
        {
            // ── Validate username ──────────────────────────────
            if (string.IsNullOrWhiteSpace(request.Username))
                throw new ArgumentException("Tên đăng nhập không được để trống.");

            if (request.Username.Length < 3 || request.Username.Length > 30)
                throw new ArgumentException("Tên đăng nhập phải từ 3 đến 30 ký tự.");

            if (!Regex.IsMatch(request.Username, @"^[a-zA-Z0-9_]+$"))
                throw new ArgumentException("Tên đăng nhập chỉ được chứa chữ cái, chữ số và dấu gạch dưới (_).");

            bool usernameTaken = await _context.Users
                .AnyAsync(u => u.Username.ToLower() == request.Username.ToLower());
            if (usernameTaken)
                throw new InvalidOperationException("Tên đăng nhập này đã được sử dụng.");

            // ── Validate name ──────────────────────────────────
            if (string.IsNullOrWhiteSpace(request.Name))
                throw new ArgumentException("Họ tên không được để trống.");
            if (request.Name.Trim().Length < 2)
                throw new ArgumentException("Họ tên phải có ít nhất 2 ký tự.");

            // ── Validate email (optional) ──────────────────────
            string? email = null;
            if (!string.IsNullOrWhiteSpace(request.Email))
            {
                if (!Regex.IsMatch(request.Email, @"^[^@\s]+@[^@\s]+\.[^@\s]+$"))
                    throw new ArgumentException("Email không hợp lệ.");

                bool emailTaken = await _context.Users
                    .AnyAsync(u => u.Email != null && u.Email.ToLower() == request.Email.ToLower());
                if (emailTaken)
                    throw new InvalidOperationException("Email này đã được sử dụng.");

                email = request.Email.ToLower().Trim();
            }

            // ── Validate password ──────────────────────────────
            if (string.IsNullOrWhiteSpace(request.Password) || request.Password.Length < 6)
                throw new ArgumentException("Mật khẩu phải có ít nhất 6 ký tự.");

            bool isAdmin = email != null && AdminEmails.Contains(email);

            var user = new User
            {
                Username     = request.Username.Trim(),
                GoogleId     = null,
                Email        = email,
                Name         = request.Name.Trim(),
                AvatarUrl    = GenerateAvatarUrl(request.Name),
                PasswordHash = BCrypt.Net.BCrypt.HashPassword(request.Password),
                TotalScore   = 0,
                Role         = isAdmin ? "Admin" : "User",
                CreatedAt    = DateTime.UtcNow
            };

            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            return BuildResponse(user);
        }

        // ── Email / Password Login ────────────────────────────────────────────────

        public async Task<AuthResponseDto> LoginAsync(LoginRequestDto request)
        {
            if (string.IsNullOrWhiteSpace(request.UsernameOrEmail) ||
                string.IsNullOrWhiteSpace(request.Password))
                throw new ArgumentException("Vui lòng nhập tên đăng nhập/email và mật khẩu.");

            string input = request.UsernameOrEmail.Trim();

            // Look up by username OR by email
            var user = await _context.Users.FirstOrDefaultAsync(u =>
                u.Username.ToLower() == input.ToLower() ||
                (u.Email != null && u.Email.ToLower() == input.ToLower()));

            if (user == null || user.PasswordHash == null)
                throw new UnauthorizedAccessException("Tên đăng nhập, email hoặc mật khẩu không đúng.");

            bool valid = BCrypt.Net.BCrypt.Verify(request.Password, user.PasswordHash);
            if (!valid)
                throw new UnauthorizedAccessException("Tên đăng nhập, email hoặc mật khẩu không đúng.");

            return BuildResponse(user);
        }

        // ── Helpers ───────────────────────────────────────────────────────────────

        private AuthResponseDto BuildResponse(User user) => new()
        {
            Token = GenerateJwtToken(user),
            User  = new UserDto
            {
                Id         = user.Id,
                Username   = user.Username,
                Email      = user.Email,
                Name       = user.Name,
                AvatarUrl  = user.AvatarUrl,
                TotalScore = user.TotalScore,
                Role       = user.Role
            }
        };

        private string GenerateJwtToken(User user)
        {
            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:Key"]!));
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

            var claims = new[]
            {
                new Claim(JwtRegisteredClaimNames.Sub,   user.Id.ToString()),
                new Claim(JwtRegisteredClaimNames.Email, user.Email ?? string.Empty),
                new Claim(ClaimTypes.NameIdentifier,     user.Id.ToString()),
                new Claim("Username",                    user.Username),
                new Claim("GoogleId",                    user.GoogleId ?? string.Empty),
                new Claim(ClaimTypes.Role,               user.Role ?? "User")
            };

            var token = new JwtSecurityToken(
                issuer:            _configuration["Jwt:Issuer"],
                audience:          _configuration["Jwt:Audience"],
                claims:            claims,
                expires:           DateTime.Now.AddDays(7),
                signingCredentials: credentials);

            return new JwtSecurityTokenHandler().WriteToken(token);
        }

        /// <summary>Converts any string to a safe username slug (lowercase, underscores).</summary>
        private static string SlugifyUsername(string raw)
        {
            // Normalise: lowercase, keep only [a-z0-9_], collapse repeated underscores
            string slug = raw.ToLower();
            slug = Regex.Replace(slug, @"[^a-z0-9_]", "_");
            slug = Regex.Replace(slug, @"_+", "_").Trim('_');
            if (slug.Length < 3) slug = "user_" + slug;
            if (slug.Length > 20) slug = slug[..20];
            return slug;
        }

        /// <summary>Returns <paramref name="base"/> if free, otherwise appends _2, _3, … until unique.</summary>
        private async Task<string> UniqueUsernameAsync(string @base)
        {
            if (!await _context.Users.AnyAsync(u => u.Username.ToLower() == @base.ToLower()))
                return @base;

            for (int i = 2; i <= 9999; i++)
            {
                string candidate = $"{@base}_{i}";
                if (!await _context.Users.AnyAsync(u => u.Username.ToLower() == candidate.ToLower()))
                    return candidate;
            }
            return $"{@base}_{Guid.NewGuid():N}"[..30];
        }

        /// <summary>Deterministic avatar via UI Avatars service.</summary>
        private static string GenerateAvatarUrl(string name)
        {
            var encoded = Uri.EscapeDataString(name);
            return $"https://ui-avatars.com/api/?name={encoded}&background=random&color=fff&size=128";
        }
    }
}
