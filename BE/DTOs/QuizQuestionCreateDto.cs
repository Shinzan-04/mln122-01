using System.ComponentModel.DataAnnotations;

namespace PhilosophyAPI.DTOs
{
    public class QuizQuestionCreateDto
    {
        [Required]
        public int TopicId { get; set; }
        [Required]
        public string Question { get; set; } = string.Empty;
        [Required]
        public string OptionA { get; set; } = string.Empty;
        [Required]
        public string OptionB { get; set; } = string.Empty;
        [Required]
        public string OptionC { get; set; } = string.Empty;
        [Required]
        public string OptionD { get; set; } = string.Empty;
        [Required]
        [RegularExpression("^[A-D]$", ErrorMessage = "Correct answer must be A, B, C, or D")]
        public string CorrectAnswer { get; set; } = string.Empty;
    }
}
