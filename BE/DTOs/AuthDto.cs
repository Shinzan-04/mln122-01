namespace PhilosophyAPI.DTOs
{
    // ── Google OAuth ──────────────────────────────────────────
    public class AuthRequestDto
    {
        public string IdToken { get; set; } = string.Empty;
    }

    // ── Email / Password ──────────────────────────────────────
    public class RegisterRequestDto
    {
        /// <summary>Unique login handle (required).</summary>
        public string Username { get; set; } = string.Empty;
        public string Name     { get; set; } = string.Empty;
        /// <summary>Optional — used for notifications/recovery.</summary>
        public string? Email   { get; set; }
        public string Password { get; set; } = string.Empty;
    }

    public class LoginRequestDto
    {
        /// <summary>Username OR email — either is accepted.</summary>
        public string UsernameOrEmail { get; set; } = string.Empty;
        public string Password        { get; set; } = string.Empty;
    }

    // ── Shared response ───────────────────────────────────────
    public class AuthResponseDto
    {
        public string Token { get; set; } = string.Empty;
        public UserDto User { get; set; } = new();
    }

    public class UserDto
    {
        public int     Id         { get; set; }
        public string  Username   { get; set; } = string.Empty;
        public string? Email      { get; set; }
        public string  Name       { get; set; } = string.Empty;
        public string  AvatarUrl  { get; set; } = string.Empty;
        public int     TotalScore { get; set; }
        public string  Role       { get; set; } = "User";
    }

    public class RankingDto
    {
        public int    Rank       { get; set; }
        public int    UserId     { get; set; }
        public string Name       { get; set; } = string.Empty;
        public string AvatarUrl  { get; set; } = string.Empty;
        public int    TotalScore { get; set; }
    }
}
