using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace PhilosophyAPI.Migrations
{
    /// <inheritdoc />
    public partial class AddImageSource : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "ImageSource",
                table: "Topics",
                type: "text",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "ImageSource",
                table: "HomepageSections",
                type: "text",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ImageSource",
                table: "Topics");

            migrationBuilder.DropColumn(
                name: "ImageSource",
                table: "HomepageSections");
        }
    }
}
