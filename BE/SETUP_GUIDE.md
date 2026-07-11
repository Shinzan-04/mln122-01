# 🛠 Hướng dẫn Setup Backend (Dành cho thành viên nhóm)

Tài liệu này hướng dẫn các thành viên trong team cách clone code về, cài đặt và chạy thử Backend API của dự án **"Giai cấp và Dân tộc theo Triết học Mác–Lênin"**.

---

## 1. Yêu cầu cài đặt (Prerequisites)
Trước khi bắt đầu, hãy đảm bảo máy tính của bạn đã cài đặt các phần mềm sau:
- **[.NET 8.0 SDK](https://dotnet.microsoft.com/en-us/download/dotnet/8.0)**: Bắt buộc để chạy được Backend C#.
- **VS Code** hoặc **Visual Studio 2022**.
- (Tùy chọn) **PostgreSQL**: Nếu bạn muốn chạy Database ở dưới máy tính cá nhân (Local). Hiện tại dự án đã được kết nối sẵn lên Cloud (NeonDB) nên bạn không nhất thiết phải cài cái này.

---

## 2. Các bước cài đặt và chạy (Quick Start)

### Bước 1: Clone code về máy
Mở Terminal / Git Bash và chạy lệnh sau:
```bash
git clone https://github.com/DucNDC1810/MLN.git
cd MLN/BE
```

### Bước 2: Cấu hình `appsettings.json`
Mở thư mục `BE` bằng VS Code. Bạn hãy mở file `appsettings.json` ra. File này chứa 3 thông tin cấu hình rất quan trọng:

1. **ConnectionStrings ("DefaultConnection")**: 
   - Mặc định hiện tại đang được cấu hình để trỏ thẳng lên **NeonDB (Cloud)**. Các bạn KHÔNG CẦN phải tạo database hay chạy migration gì cả, cứ thế dùng chung là có sẵn dữ liệu bài học, câu hỏi quiz!
   - *(Nếu bạn muốn chạy DB local thì sửa lại thành: `Host=localhost;Database=philosophy_db;Username=postgres;Password=mật_khẩu_của_bạn;`)*

2. **GeminiApiKey**: 
   - Dùng để chạy Chatbot AI. Bạn cần thay thế bằng API Key của riêng bạn lấy từ [Google AI Studio](https://aistudio.google.com/).

3. **GoogleClientId & GoogleClientSecret**:
   - Dùng để đăng nhập Google. Team Leader đã điền sẵn, các bạn có thể giữ nguyên để xài chung.

### Bước 3: Build và Chạy dự án
Mở Terminal trong VS Code (chắc chắn bạn đang đứng ở thư mục `BE`), gõ:

```bash
dotnet restore
dotnet run
```

### Bước 4: Kiểm tra kết quả
Nếu terminal hiện ra dòng chữ: `Now listening on: http://localhost:5076`, nghĩa là Backend đã chạy thành công!

Mở trình duyệt và truy cập vào link Swagger để xem danh sách toàn bộ API:
👉 **[http://localhost:5076/swagger](http://localhost:5076/swagger)**

---

## 3. Hướng dẫn Test API cần đăng nhập (Google OAuth)
Một số tính năng như Nộp bài Quiz lấy điểm, hoặc Thêm bài viết mới (chỉ Admin) yêu cầu bạn phải có Token.

1. Mở file `test-login.html` (có sẵn trong thư mục `BE`) bằng trình duyệt. (Khuyên dùng Extension **Live Server** trong VS Code để mở).
2. Click nút đăng nhập Google để lấy chuỗi `idToken`.
3. Lên Swagger, gọi API `POST /api/auth/google`, dán `idToken` vào để lấy về `token` (JWT của hệ thống).
4. Copy chuỗi `token` đó.
5. Trên Swagger, cuộn lên trên cùng bấm vào nút **Authorize** (hình ổ khóa), dán chuỗi token vào theo cú pháp: `Bearer dán_token_vào_đây` rồi bấm Save.
6. Lúc này bạn đã "đăng nhập" thành công vào Swagger và có thể test các API yêu cầu quyền.

---

## 4. (Nâng cao) Cách chạy Database Local
Nếu bạn không muốn xài chung DB trên Neon mà muốn tự chạy dưới máy mình:
1. Đảm bảo đã cài PostgreSQL và pgAdmin.
2. Sửa `DefaultConnection` trong `appsettings.json` thành localhost.
3. Chạy lệnh tạo bảng:
   ```bash
   dotnet ef database update
   ```
4. Mở pgAdmin hoặc dùng dòng lệnh để chạy file `Data/seed_data.sql` để import dữ liệu mẫu.
