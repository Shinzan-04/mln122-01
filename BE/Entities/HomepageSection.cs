using System.ComponentModel.DataAnnotations;

namespace PhilosophyAPI.Entities
{
    public class HomepageSection
    {
        public int Id { get; set; }
        [Required]
        public string Title { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public string ImageUrl { get; set; } = string.Empty;
        public string ImageSource { get; set; } = string.Empty; // Link nguồn ảnh
        public int DisplayOrder { get; set; }
    }
}
