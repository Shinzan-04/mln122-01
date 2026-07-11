using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace PhilosophyAPI.Entities
{
    public class QuizQuestion
    {
        public int Id { get; set; }
        public int TopicId { get; set; }
        
        [ForeignKey("TopicId")]
        public Topic? Topic { get; set; }

        [Required]
        public string Question { get; set; } = string.Empty;
        public string OptionA { get; set; } = string.Empty;
        public string OptionB { get; set; } = string.Empty;
        public string OptionC { get; set; } = string.Empty;
        public string OptionD { get; set; } = string.Empty;
        public string CorrectAnswer { get; set; } = string.Empty; // A, B, C, or D
    }
}
