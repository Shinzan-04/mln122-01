namespace PhilosophyAPI.DTOs
{
    public class QuizQuestionDto
    {
        public int Id { get; set; }
        public int TopicId { get; set; }
        public string Question { get; set; } = string.Empty;
        public string OptionA { get; set; } = string.Empty;
        public string OptionB { get; set; } = string.Empty;
        public string OptionC { get; set; } = string.Empty;
        public string OptionD { get; set; } = string.Empty;
    }

    public class QuizSubmitRequest
    {
        public List<QuizAnswer> Answers { get; set; } = new();
    }

    public class QuizAnswer
    {
        public int QuestionId { get; set; }
        public string SelectedAnswer { get; set; } = string.Empty;
    }

    public class QuizResultDto
    {
        public int Score { get; set; }
        public int CorrectAnswers { get; set; }
        public int TotalQuestions { get; set; }
    }
}
