using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace PhilosophyAPI.Migrations
{
    /// <inheritdoc />
    public partial class AddUsernameField : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            // 1. Make Email nullable first
            migrationBuilder.AlterColumn<string>(
                name: "Email",
                table: "Users",
                type: "text",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "text");

            // 2. Add Username as nullable initially so we can back-fill
            migrationBuilder.AddColumn<string>(
                name: "Username",
                table: "Users",
                type: "text",
                nullable: true);

            // 3. Back-fill: derive username from the email prefix (before '@')
            //    Replace non-alphanumeric/underscore chars with '_', then collapse runs.
            //    If two rows would collide, append '_<id>' to keep them unique.
            migrationBuilder.Sql(@"
                UPDATE ""Users""
                SET ""Username"" = LOWER(
                    REGEXP_REPLACE(
                        REGEXP_REPLACE(SPLIT_PART(""Email"", '@', 1), '[^a-zA-Z0-9_]', '_', 'g'),
                        '_+', '_', 'g'
                    )
                )
                WHERE ""Email"" IS NOT NULL;

                UPDATE ""Users""
                SET ""Username"" = CONCAT('user_', ""Id"")
                WHERE ""Username"" IS NULL OR ""Username"" = '';

                -- Disambiguate any collisions by appending the row ID
                UPDATE ""Users"" u
                SET ""Username"" = u.""Username"" || '_' || u.""Id""
                WHERE (
                    SELECT COUNT(*) FROM ""Users"" u2
                    WHERE LOWER(u2.""Username"") = LOWER(u.""Username"") AND u2.""Id"" != u.""Id""
                ) > 0;
            ");

            // 4. Now make Username NOT NULL
            migrationBuilder.AlterColumn<string>(
                name: "Username",
                table: "Users",
                type: "text",
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "text",
                oldNullable: true);

            // 5. Unique index on Username (case-insensitive via lower())
            migrationBuilder.Sql(@"
                CREATE UNIQUE INDEX ""IX_Users_Username""
                ON ""Users"" (LOWER(""Username""));
            ");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql(@"DROP INDEX IF EXISTS ""IX_Users_Username"";");

            migrationBuilder.DropColumn(
                name: "Username",
                table: "Users");

            migrationBuilder.AlterColumn<string>(
                name: "Email",
                table: "Users",
                type: "text",
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "text",
                oldNullable: true);
        }
    }
}
