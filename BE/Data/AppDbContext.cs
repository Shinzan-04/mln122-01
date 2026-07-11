using Microsoft.EntityFrameworkCore;
using PhilosophyAPI.Entities;

namespace PhilosophyAPI.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {
        }

        public DbSet<Topic> Topics { get; set; }
        public DbSet<QuizQuestion> QuizQuestions { get; set; }
        public DbSet<ChatbotQA> ChatbotQAs { get; set; }
        public DbSet<HomepageSection> HomepageSections { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<ChatSession> ChatSessions { get; set; }
        public DbSet<ChatMessage> ChatMessages { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // ChatSession -> User (nullable)
            modelBuilder.Entity<ChatSession>()
                .HasOne(cs => cs.User)
                .WithMany()
                .HasForeignKey(cs => cs.UserId)
                .OnDelete(DeleteBehavior.SetNull);

            // ChatMessage -> ChatSession (cascade delete)
            modelBuilder.Entity<ChatMessage>()
                .HasOne(cm => cm.Session)
                .WithMany(cs => cs.Messages)
                .HasForeignKey(cm => cm.SessionId)
                .OnDelete(DeleteBehavior.Cascade);

            base.OnModelCreating(modelBuilder);
        }
    }
}
