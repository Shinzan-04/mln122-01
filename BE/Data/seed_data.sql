SET client_encoding = 'UTF8';

TRUNCATE TABLE "QuizQuestions" RESTART IDENTITY CASCADE;
TRUNCATE TABLE "ChatbotQAs"    RESTART IDENTITY CASCADE;
TRUNCATE TABLE "HomepageSections" RESTART IDENTITY CASCADE;
TRUNCATE TABLE "Topics"        RESTART IDENTITY CASCADE;

INSERT INTO "Topics" ("Title","Slug","Summary","Content","ThumbnailUrl","ImageSource","Category","Author","CreatedAt") VALUES

(
  'Bản chất và nguồn gốc của tích lũy tư bản',
  'ban-chat-nguon-goc-tich-luy-tu-ban',
  'Tích lũy tư bản là sự chuyển hóa một phần giá trị thặng dư thành tư bản phụ thêm. Nguồn gốc duy nhất của tích lũy tư bản là giá trị thặng dư.',
  $CT$## Tái sản xuất là gì?

Trong nền kinh tế thị trường tư bản chủ nghĩa, quá trình sản xuất liên tục được lặp đi lặp lại không ngừng, quá trình đó được gọi là **tái sản xuất**. Có hai hình thức:

- **Tái sản xuất giản đơn**: Lặp lại quá trình sản xuất với quy mô như cũ. Toàn bộ giá trị thặng dư được nhà tư bản tiêu dùng cho cá nhân.
- **Tái sản xuất mở rộng**: Nhà tư bản biến một bộ phận giá trị thặng dư thành tư bản phụ thêm để mở rộng sản xuất.

---

## Tích lũy tư bản là gì?

Sự chuyển hóa một phần giá trị thặng dư thành tư bản gọi là **tích lũy tư bản**.

---

## Bản chất của tích lũy tư bản

Là quá trình tái sản xuất mở rộng tư bản chủ nghĩa thông qua việc chuyển hóa giá trị thặng dư thành tư bản phụ thêm để tiếp tục mở rộng sản xuất kinh doanh: mua thêm hàng hóa sức lao động, mở mang nhà xưởng, mua thêm nguyên-vật liệu, trang bị thêm máy móc, thiết bị.

> **Nguồn gốc duy nhất của tích lũy tư bản là giá trị thặng dư.**

---

## Công thức quan trọng

Quy mô tích lũy = f(Tỷ lệ tích lũy/tiêu dùng × Khối lượng giá trị thặng dư)

Với khối lượng giá trị thặng dư nhất định, quy mô tích lũy tư bản phụ thuộc vào tỷ lệ phân chia giữa tích lũy và tiêu dùng.

---

## Tài liệu tham khảo

1. **Mác, C.** (1867). Tư bản luận, Quyển I, Chương 24. Marxists Internet Archive.
2. **Bộ Giáo dục và Đào tạo** (2021). Giáo trình Kinh tế Chính trị Mác–Lênin, Chương 3, Phần II. NXB Chính trị Quốc gia – Sự Thật.$CT$,
  'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&q=80',
  'https://unsplash.com',
  'Tích lũy tư bản',
  'Nhóm MLN',
  NOW()
),

(
  'Nhân tố 1: Trình độ khai thác sức lao động',
  'nhan-to-1-trinh-do-khai-thac-suc-lao-dong',
  'Tỷ suất giá trị thặng dư tăng sẽ tạo tiền đề để tăng quy mô giá trị thặng dư, từ đó tạo điều kiện để tăng quy mô tích lũy tư bản.',
  $CT$## Nội dung nhân tố 1

Tỷ suất giá trị thặng dư tăng sẽ tạo tiền đề để tăng quy mô giá trị thặng dư, từ đó tạo điều kiện để tăng quy mô tích lũy.

---

## Công thức tỷ suất giá trị thặng dư

**m' = m / v × 100%**

Trong đó: **m** = giá trị thặng dư, **v** = tư bản khả biến (tiền lương)

---

## Biện pháp nhà tư bản áp dụng

- **Sản xuất giá trị thặng dư tuyệt đối**: Kéo dài thời gian lao động trong ngày
- **Sản xuất giá trị thặng dư tương đối**: Tăng năng suất lao động (rút ngắn thời gian lao động tất yếu)
- Cắt giảm tiền công
- Tăng ca, tăng cường độ lao động

---

## Cơ chế tác động

Tỷ suất m' tăng → Quy mô giá trị thặng dư tăng → Tạo điều kiện tăng quy mô tích lũy.

---

## Tài liệu tham khảo

1. **Mác, C.** (1867). Tư bản luận, Quyển I. Marxists Internet Archive.
2. **Bộ Giáo dục và Đào tạo** (2021). Giáo trình Kinh tế Chính trị Mác–Lênin, Chương 3. NXB Chính trị Quốc gia – Sự Thật.$CT$,
  'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=800&q=80',
  'https://unsplash.com',
  'Tích lũy tư bản',
  'Nhóm MLN',
  NOW()
),

(
  'Nhân tố 2: Năng suất lao động xã hội',
  'nhan-to-2-nang-suat-lao-dong-xa-hoi',
  'Năng suất lao động tăng làm cho giá trị tư liệu sinh hoạt giảm xuống, giá trị sức lao động giảm, giúp nhà tư bản thu được nhiều giá trị thặng dư hơn, góp phần tăng quy mô tích lũy.',
  $CT$## Nội dung nhân tố 2

Năng suất lao động tăng làm cho giá trị tư liệu sinh hoạt giảm xuống, giá trị sức lao động giảm, giúp nhà tư bản thu được nhiều giá trị thặng dư hơn, góp phần tăng quy mô tích lũy.

---

## Chuỗi logic

**Năng suất lao động ↑**
→ Giá trị tư liệu sinh hoạt ↓ (hàng hóa sản xuất nhanh hơn, rẻ hơn)
→ Giá trị sức lao động ↓ (chi phí tái sản xuất sức lao động giảm)
→ Nhà tư bản thu được nhiều m hơn
→ Quy mô tích lũy tăng

---

## Liên hệ thực tiễn

Cách mạng công nghiệp 4.0 làm tăng đột phá năng suất lao động → giảm chi phí sản xuất → tạo điều kiện cho doanh nghiệp mở rộng đầu tư và tích lũy quy mô lớn.

| Lĩnh vực | Cách áp dụng |
|---|---|
| Sản xuất | Ứng dụng AI, robot, tự động hóa → giảm chi phí, tăng sản lượng |
| Dịch vụ | Phần mềm thay thế lao động văn phòng → tăng hiệu suất |
| Nông nghiệp | Máy móc nông nghiệp → giảm giá trị TLSH, tăng thặng dư |

---

## Tài liệu tham khảo

1. **Mác, C.** (1867). Tư bản luận, Quyển I. Marxists Internet Archive.
2. **Bộ Giáo dục và Đào tạo** (2021). Giáo trình Kinh tế Chính trị Mác–Lênin, Chương 3. NXB Chính trị Quốc gia – Sự Thật.$CT$,
  'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&q=80',
  'https://unsplash.com',
  'Tích lũy tư bản',
  'Nhóm MLN',
  NOW()
),

(
  'Nhân tố 3: Sử dụng hiệu quả máy móc',
  'nhan-to-3-su-dung-hieu-qua-may-moc',
  'C. Mác gọi là "chênh lệch giữa tư bản sử dụng và tư bản tiêu dùng": máy móc sử dụng toàn bộ tính năng nhưng giá trị chỉ khấu hao dần, tạo ra lực lượng phục vụ không công và quỹ khấu hao làm nguồn tái đầu tư.',
  $CT$## Nội dung nhân tố 3

Theo C. Mác, máy móc được sử dụng toàn bộ tính năng của nó, song giá trị chỉ được tính dần vào giá trị sản phẩm qua **khấu hao**.

Sau mỗi chu kỳ sản xuất, máy móc vẫn hoạt động toàn bộ nhưng giá trị của bản thân nó đã giảm dần do tính giá khấu hao để chuyển vào giá trị sản phẩm.

Hệ quả là: mặc dù giá trị đã bị khấu hao, song tính năng (giá trị sử dụng) vẫn nguyên như cũ, như **lực lượng phục vụ không công** trong sản xuất.

Đồng thời, sự lớn lên không ngừng của **quỹ khấu hao** trong khi chưa cần thiết phải đổi mới tư bản cố định cũng trở thành nguồn tài chính có thể sử dụng cho mở rộng sản xuất.

---

## Cơ chế 4 bước

1. **Mua máy móc** → Chi phí ban đầu (tư bản cố định)
2. **Sử dụng sản xuất** → Toàn bộ tính năng được khai thác
3. **Khấu hao** → Chỉ 1 phần nhỏ giá trị chuyển vào sản phẩm
4. **Tích lũy quỹ khấu hao** → Nguồn vốn tái đầu tư mở rộng

---

## Bảng so sánh

| Khái niệm | Nội dung | Ví dụ |
|---|---|---|
| **Tư bản sử dụng** | Toàn bộ tính năng máy móc phục vụ sản xuất | Máy CNC hoạt động 100% công suất |
| **Tư bản tiêu dùng** | Phần giá trị khấu hao chuyển vào sản phẩm/chu kỳ | 10% giá trị máy/năm |
| **Chênh lệch** | Nguồn lực phục vụ không công + quỹ khấu hao | 90% công suất còn lại chưa mất chi phí |

---

## Tài liệu tham khảo

1. **Mác, C.** (1867). Tư bản luận, Quyển I, Chương 24. Marxists Internet Archive.
2. **Bộ Giáo dục và Đào tạo** (2021). Giáo trình Kinh tế Chính trị Mác–Lênin, Chương 3. NXB Chính trị Quốc gia – Sự Thật.$CT$,
  'https://images.unsplash.com/photo-1565514020179-026b92b2d70b?w=800&q=80',
  'https://unsplash.com',
  'Tích lũy tư bản',
  'Nhóm MLN',
  NOW()
),

(
  'Nhân tố 4: Đại lượng tư bản ứng trước và hệ quả xã hội',
  'nhan-to-4-dai-luong-tu-ban-ung-truoc-he-qua-xa-hoi',
  'Thị trường thuận lợi, tư bản ứng trước càng lớn sẽ là tiền đề cho tăng quy mô tích lũy. Hệ quả xã hội là tăng cấu tạo hữu cơ, tích tụ & tập trung tư bản, bần cùng hóa.',
  $CT$## Nhân tố 4: Đại lượng tư bản ứng trước

Thị trường thuận lợi, hàng hóa luôn bán được, tư bản ứng trước càng lớn sẽ là tiền đề cho tăng quy mô tích lũy.

**Điều kiện**: Thị trường thuận lợi + hàng hóa bán được liên tục + vòng quay tư bản nhanh

**Cơ chế**:
- Tư bản ứng trước lớn → Quy mô sản xuất lớn → Tạo ra nhiều giá trị thặng dư hơn
- Nhiều m → Phần tích lũy tăng → Chu kỳ sản xuất tiếp theo lớn hơn

---

## Hệ quả 1: Tăng cấu tạo hữu cơ của tư bản

- Cấu tạo hữu cơ **(c/v)** = Tỷ lệ giữa tư bản bất biến (c) và tư bản khả biến (v)
- Quá trình tích lũy không ngừng làm tăng cấu tạo kỹ thuật → tăng cấu tạo hữu cơ

---

## Hệ quả 2: Tăng tích tụ và tập trung tư bản

| | Tích tụ tư bản | Tập trung tư bản |
|---|---|---|
| **Định nghĩa** | Tăng quy mô tư bản cá biệt bằng cách tư bản hóa giá trị thặng dư | Tăng quy mô tư bản cá biệt bằng cách hợp nhất nhiều tư bản cá biệt |
| **Ảnh hưởng đến TB xã hội** | Làm **tăng** tư bản xã hội | **Không** làm tăng tư bản xã hội |
| **Cơ chế** | Tư bản lớn lên từ bên trong | Tư bản lớn lên từ bên ngoài (thôn tính, sáp nhập) |

---

## Hệ quả 3: Tăng chênh lệch thu nhập

Quá trình tích lũy tư bản không ngừng làm tăng chênh lệch giữa thu nhập của nhà tư bản với thu nhập của người lao động làm thuê:

- **Bần cùng hóa tương đối**: Tiền lương tăng chậm hơn năng suất và lợi nhuận
- **Bần cùng hóa tuyệt đối**: Thu nhập thực tế giảm, mất việc làm do máy móc thay thế

---

## Liên hệ thực tiễn

| Nhân tố | Ứng dụng với doanh nghiệp hiện đại |
|---|---|
| 1. Trình độ khai thác SLĐ | Đầu tư phúc lợi, đào tạo → tăng năng suất bền vững |
| 2. Năng suất lao động | Ứng dụng AI, tự động hóa → tạo thặng dư lớn để tái đầu tư |
| 3. Sử dụng máy móc | Quản lý tài sản cố định hiệu quả: tối ưu khấu hao → nguồn vốn bổ sung |
| 4. Vốn ứng trước | Mở rộng quy mô vốn qua thu hút đầu tư, phát hành cổ phiếu |

---

## Tài liệu tham khảo

1. **Mác, C.** (1867). Tư bản luận, Quyển I, Chương 25. Marxists Internet Archive.
2. **Bộ Giáo dục và Đào tạo** (2021). Giáo trình Kinh tế Chính trị Mác–Lênin, Chương 3. NXB Chính trị Quốc gia – Sự Thật.$CT$,
  'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&q=80',
  'https://unsplash.com',
  'Tích lũy tư bản',
  'Nhóm MLN',
  NOW()
);

INSERT INTO "QuizQuestions" ("TopicId","Question","OptionA","OptionB","OptionC","OptionD","CorrectAnswer") VALUES
(1,'Tích lũy tư bản là gì?','Toàn bộ giá trị thặng dư được nhà tư bản tích trữ dưới dạng tiền','Sự chuyển hóa một phần giá trị thặng dư thành tư bản phụ thêm','Quá trình nhà tư bản vay thêm vốn từ ngân hàng để mở rộng sản xuất','Sự tăng lên của tư bản bất biến trong quá trình sản xuất','B'),
(1,'Nguồn gốc duy nhất của tích lũy tư bản là:','Lợi nhuận từ kinh doanh thương mại','Tiền lãi từ hệ thống ngân hàng','Giá trị thặng dư','Tư bản vay từ nước ngoài','C'),
(1,'Tái sản xuất giản đơn khác tái sản xuất mở rộng ở điểm nào?','Tái SX giản đơn sử dụng máy móc hiện đại hơn','Tái SX giản đơn lặp lại quy mô cũ, toàn bộ m dùng tiêu dùng cá nhân','Tái SX giản đơn chỉ xảy ra trong thời kỳ khủng hoảng','Tái SX giản đơn có quy mô tư bản xã hội lớn hơn','B'),
(1,'Trong tái sản xuất mở rộng, nhà tư bản làm gì với giá trị thặng dư?','Tiêu dùng toàn bộ cho cá nhân','Gửi vào ngân hàng để lấy lãi','Biến một bộ phận thành tư bản phụ thêm','Phân phối lại cho công nhân dưới dạng tiền thưởng','C'),
(1,'Quy mô tích lũy tư bản phụ thuộc trực tiếp vào yếu tố nào khi tỷ lệ tích lũy/tiêu dùng đã xác định?','Tốc độ lưu thông hàng hóa','Khối lượng giá trị thặng dư','Quy mô thị trường tiêu thụ','Số lượng tư bản cố định','B'),
(1,'Mục đích của tích lũy tư bản là:','Giảm bớt lượng tiền mặt nhà tư bản nắm giữ','Mở rộng sản xuất kinh doanh thông qua tư bản phụ thêm','Tăng tiền lương cho công nhân','Nộp thuế cho nhà nước','B'),
(1,'Nhờ tích lũy tư bản, quan hệ sản xuất tư bản chủ nghĩa:','Dần bị xóa bỏ theo thời gian','Trở nên thống trị và không ngừng mở rộng sự thống trị','Chuyển hóa thành quan hệ sản xuất XHCN','Trở nên bình đẳng hơn giữa chủ và thợ','B'),
(2,'Công thức tỷ suất giá trị thặng dư là:','m'' = c / v × 100%','m'' = v / m × 100%','m'' = m / v × 100%','m'' = m / (c+v) × 100%','C'),
(2,'Khi tỷ suất giá trị thặng dư tăng thì:','Quy mô tích lũy giảm vì tiêu dùng tăng','Quy mô giá trị thặng dư tăng, tạo điều kiện tăng quy mô tích lũy','Tư bản bất biến tăng nhanh hơn tư bản khả biến','Tiền lương thực tế của công nhân tăng lên','B'),
(2,'Sản xuất giá trị thặng dư tuyệt đối được thực hiện bằng cách:','Tăng năng suất lao động thông qua công nghệ mới','Kéo dài thời gian lao động trong ngày','Giảm thời gian lao động cần thiết','Tăng cường độ lao động bình thường','B'),
(2,'Sản xuất giá trị thặng dư tương đối được thực hiện bằng cách:','Kéo dài ngày lao động vượt quá mức bình thường','Rút ngắn thời gian lao động tất yếu bằng tăng năng suất','Cắt giảm tiền lương trực tiếp của công nhân','Tăng số ca làm việc trong ngày','B'),
(2,'Biện pháp nào KHÔNG phải cách nhà tư bản nâng cao tỷ suất giá trị thặng dư?','Cắt giảm tiền công','Tăng ca làm việc','Tăng lương tương xứng với năng suất','Tăng cường độ lao động','C'),
(2,'Tỷ suất giá trị thặng dư phản ánh điều gì?','Tỷ lệ giữa tư bản cố định và tư bản lưu động','Mức độ bóc lột của nhà tư bản đối với công nhân','Hiệu quả sử dụng máy móc trong sản xuất','Tỷ lệ lợi nhuận trên tổng tư bản ứng trước','B'),
(3,'Năng suất lao động tăng ảnh hưởng đến quy mô tích lũy như thế nào?','Làm giảm quy mô tích lũy vì phải đầu tư nhiều máy móc hơn','Giảm giá trị sức lao động → tăng m → tăng quy mô tích lũy','Không có ảnh hưởng đến quy mô tích lũy','Chỉ ảnh hưởng đến tích lũy trong ngắn hạn','B'),
(3,'Năng suất lao động tăng làm cho giá trị tư liệu sinh hoạt:','Tăng lên vì chất lượng sản phẩm cao hơn','Giảm xuống vì sản xuất nhanh hơn, rẻ hơn','Không thay đổi vì giá trị do lao động quyết định','Biến động không rõ ràng','B'),
(3,'Tại sao năng suất lao động tăng lại làm giảm giá trị sức lao động?','Vì công nhân làm việc ít giờ hơn','Vì chi phí tái sản xuất sức lao động (tư liệu sinh hoạt) giảm','Vì nhà tư bản cắt giảm tiền lương trực tiếp','Vì thị trường lao động có nhiều cung hơn cầu','B'),
(3,'Cách mạng công nghiệp 4.0 ảnh hưởng đến quy mô tích lũy tư bản như thế nào?','Làm giảm tích lũy vì máy móc thay thế công nhân','Tăng đột phá năng suất → giảm chi phí → tạo điều kiện tích lũy lớn hơn','Không ảnh hưởng vì đây là hiện tượng kỹ thuật, không phải kinh tế','Làm giảm giá trị thặng dư tuyệt đối','B'),
(3,'Nhân tố năng suất lao động xã hội tác động đến tích lũy thông qua cơ chế:','Tăng tiền lương → tăng tiêu dùng → tăng tích lũy','Tăng NSLĐ → giảm giá trị TLSH → giảm giá trị SLĐ → tăng m → tăng tích lũy','Tăng NSLĐ → giảm giờ làm → tăng giá trị thặng dư tương đối → tăng tích lũy','Tăng NSLĐ → tăng sản lượng → tăng doanh thu → tăng tích lũy','B'),
(4,'C. Mác gọi nhân tố thứ 3 ảnh hưởng quy mô tích lũy là:','Tư bản tuần hoàn và chu chuyển','Chênh lệch giữa tư bản sử dụng và tư bản tiêu dùng','Giá trị thặng dư siêu ngạch','Tư bản cố định và tư bản lưu động','B'),
(4,'Trong quá trình sản xuất, máy móc được sử dụng như thế nào?','Một phần tính năng được sử dụng, một phần để dự phòng','Toàn bộ tính năng được sử dụng nhưng giá trị chỉ tính dần qua khấu hao','Toàn bộ giá trị chuyển ngay vào sản phẩm trong 1 chu kỳ','Chỉ một phần giá trị được sử dụng, phần còn lại bảo toàn','B'),
(4,'"Lực lượng phục vụ không công" của máy móc theo C. Mác là:','Lao động của công nhân không được trả công','Tính năng máy móc vẫn hoạt động dù giá trị đã khấu hao hết','Năng lượng tự nhiên (gió, nước) không mất chi phí','Công việc quản lý mà nhà tư bản tự làm','B'),
(4,'Quỹ khấu hao tích lũy trong khi chưa cần đổi mới máy móc có tác dụng gì?','Phải nộp vào ngân sách nhà nước theo quy định','Trở thành nguồn tài chính cho mở rộng sản xuất','Được phân chia cho công nhân dưới dạng tiền thưởng','Phải dự trữ bắt buộc để bảo dưỡng máy móc','B'),
(4,'Tại sao sử dụng hiệu quả máy móc lại tăng quy mô tích lũy?','Vì máy móc tốt giúp công nhân làm việc ít hơn, tiết kiệm lương','Vì tính năng máy phục vụ không công + quỹ khấu hao tích lũy → nguồn bổ sung','Vì máy móc hiện đại sản xuất hàng hóa có giá trị cao hơn','Vì giảm được số lượng công nhân cần thuê','B'),
(4,'Khấu hao tài sản cố định có liên quan đến tích lũy tư bản vì:','Khấu hao làm giảm lợi nhuận, giảm tích lũy','Quỹ khấu hao tích dần thành nguồn vốn tái đầu tư mở rộng','Khấu hao là khoản thuế nhà nước thu từ nhà tư bản','Khấu hao giúp định giá chính xác sản phẩm đầu ra','B'),
(4,'Khấu hao tài sản cố định có liên quan đến tích lũy tư bản vì:','Khấu hao làm giảm lợi nhuận, giảm tích lũy','Quỹ khấu hao tích dần thành nguồn vốn tái đầu tư mở rộng','Khấu hao là khoản thuế nhà nước thu từ nhà tư bản','Khấu hao giúp định giá chính xác sản phẩm đầu ra','B'),
(5,'Đại lượng tư bản ứng trước ảnh hưởng đến tích lũy khi:','Tư bản ứng trước nhỏ, thị trường khó khăn','Tư bản ứng trước lớn, thị trường thuận lợi, hàng bán được','Nhà tư bản vay nhiều từ ngân hàng để đầu tư','Tư bản ứng trước tập trung vào tư bản cố định','B'),
(5,'Tích tụ tư bản khác tập trung tư bản ở điểm nào?','Tích tụ tư bản không làm tăng tư bản xã hội','Tập trung tư bản làm tăng tổng tư bản xã hội','Tích tụ tư bản làm tăng tư bản cá biệt lẫn tư bản xã hội','Tập trung tư bản chỉ xảy ra qua mua bán cổ phiếu','C'),
(5,'Tập trung tư bản được thực hiện thông qua:','Nhà tư bản tích lũy thêm từ giá trị thặng dư của mình','Hợp nhất, sáp nhập các tư bản cá biệt thành một tư bản lớn hơn','Nhà nước phân bổ vốn từ ngân sách','Phát hành thêm cổ phiếu trên thị trường chứng khoán','B'),
(5,'Cấu tạo hữu cơ của tư bản (c/v) có xu hướng như thế nào trong quá trình tích lũy?','Giảm xuống vì nhà tư bản cần thêm lao động','Không thay đổi vì tỷ lệ c và v cố định','Tăng lên do cấu tạo kỹ thuật tăng (nhiều máy móc hơn, ít lao động hơn)','Biến động ngẫu nhiên theo chu kỳ kinh tế','C'),
(5,'"Bần cùng hóa" giai cấp công nhân trong tích lũy tư bản biểu hiện dưới:','Chỉ bần cùng hóa tuyệt đối (thu nhập danh nghĩa giảm)','Bần cùng hóa tương đối và bần cùng hóa tuyệt đối','Chỉ bần cùng hóa tương đối (thu nhập tăng chậm hơn tư bản)','Không có bần cùng hóa vì tiền lương luôn tăng theo năng suất','B'),
(5,'Ý nghĩa thực tiễn của việc hiểu 4 nhân tố ảnh hưởng quy mô tích lũy là:','Giúp công nhân đòi tăng lương hiệu quả hơn','Giúp doanh nghiệp xây dựng chiến lược tái đầu tư và mở rộng sản xuất','Giúp nhà nước kiểm soát tốt hơn hoạt động của nhà tư bản','Chứng minh chủ nghĩa tư bản tất yếu sẽ bị thay thế','B');

INSERT INTO "ChatbotQAs" ("Keyword","Question","Answer") VALUES
('tich luy tu ban','Tích lũy tư bản là gì?','Tích lũy tư bản là sự chuyển hóa một phần giá trị thặng dư thành tư bản phụ thêm. Nguồn gốc duy nhất của tích lũy tư bản là giá trị thặng dư. Đây là quá trình tái sản xuất mở rộng tư bản chủ nghĩa: nhà tư bản dùng một phần m để mua thêm hàng hóa sức lao động, mở mang nhà xưởng, mua thêm nguyên vật liệu, trang bị thêm máy móc.'),
('gia tri thang du','Giá trị thặng dư là gì và công thức tỷ suất?','Giá trị thặng dư (m) là phần giá trị mới do lao động của công nhân tạo ra ngoài giá trị sức lao động, bị nhà tư bản chiếm đoạt. Tỷ suất giá trị thặng dư: m'' = m/v × 100% (m = giá trị thặng dư, v = tư bản khả biến/tiền lương). Đây là chỉ số đo lường mức độ bóc lột.'),
('trinh do khai thac suc lao dong,nhan to 1','Nhân tố 1 ảnh hưởng đến tích lũy như thế nào?','Nhân tố 1 là trình độ khai thác sức lao động. Tỷ suất giá trị thặng dư (m'') tăng → khối lượng giá trị thặng dư tăng → tạo điều kiện tăng quy mô tích lũy. Biện pháp: sản xuất GTTD tuyệt đối (kéo dài ngày lao động), sản xuất GTTD tương đối (tăng năng suất), cắt tiền công, tăng ca/cường độ.'),
('nang suat lao dong,nhan to 2','Nhân tố 2 năng suất lao động xã hội tác động thế nào?','Nhân tố 2 là năng suất lao động xã hội. Chuỗi logic: NSLĐ tăng → giá trị tư liệu sinh hoạt giảm → giá trị sức lao động giảm → nhà tư bản thu được nhiều m hơn → quy mô tích lũy tăng. Ví dụ: cách mạng công nghiệp 4.0 tăng đột phá NSLĐ → giảm chi phí sản xuất → tạo điều kiện tích lũy lớn hơn.'),
('may moc,khau hao,nhan to 3,luc luong phuc vu khong cong','Nhân tố 3 sử dụng máy móc là gì?','Nhân tố 3 là chênh lệch giữa tư bản sử dụng và tư bản tiêu dùng (C.Mác). Máy móc được sử dụng TOÀN BỘ tính năng nhưng giá trị chỉ khấu hao DẦN vào sản phẩm. Hệ quả: (1) Phần tính năng đã khấu hao nhưng vẫn hoạt động = lực lượng phục vụ không công; (2) Quỹ khấu hao tích lũy = nguồn tài chính mở rộng sản xuất. Cả hai làm tăng quy mô tích lũy.'),
('tu ban ung truoc,nhan to 4','Nhân tố 4 đại lượng tư bản ứng trước là gì?','Nhân tố 4: thị trường thuận lợi + tư bản ứng trước lớn → quy mô sản xuất lớn → nhiều giá trị thặng dư hơn → phần tích lũy tăng → chu kỳ sản xuất tiếp theo lớn hơn. Kết quả: quy mô tích lũy tăng theo quy mô tư bản, dẫn đến tích tụ và tập trung tư bản.'),
('tich tu,tap trung tu ban','Tích tụ tư bản và tập trung tư bản khác nhau như thế nào?','Tích tụ tư bản: tăng quy mô tư bản cá biệt bằng cách tư bản hóa giá trị thặng dư → LÀM TĂNG tư bản xã hội (lớn lên từ bên trong). Tập trung tư bản: tăng quy mô tư bản cá biệt bằng cách hợp nhất nhiều tư bản cá biệt → KHÔNG làm tăng tư bản xã hội (lớn lên từ bên ngoài qua sáp nhập, thôn tính). Cả hai đều là hệ quả của tích lũy.'),
('cau tao huu co','Cấu tạo hữu cơ của tư bản là gì?','Cấu tạo hữu cơ của tư bản = c/v (tỷ lệ tư bản bất biến / tư bản khả biến). Quá trình tích lũy không ngừng làm tăng cấu tạo kỹ thuật (nhiều máy móc hơn, ít lao động hơn) → tăng cấu tạo hữu cơ. Hệ quả: nhu cầu về lao động tăng chậm hơn vốn, dẫn đến thất nghiệp công nghệ.'),
('ban cung hoa,he qua xa hoi','Hệ quả xã hội của tích lũy tư bản là gì?','3 hệ quả chính: (1) Tăng cấu tạo hữu cơ c/v — máy móc thay thế lao động; (2) Tăng tích tụ và tập trung tư bản — của cải tập trung vào tay ít người; (3) Tăng chênh lệch thu nhập — bần cùng hóa tương đối (tiền lương tăng chậm hơn lợi nhuận) và bần cùng hóa tuyệt đối (thu nhập thực tế giảm). Đây là mâu thuẫn cơ bản của CNTB.'),
('tai san xuat gian don,tai san xuat mo rong','Sự khác nhau giữa tái sản xuất giản đơn và tái sản xuất mở rộng?','Tái sản xuất giản đơn: toàn bộ giá trị thặng dư được nhà tư bản tiêu dùng cá nhân; quy mô sản xuất KHÔNG thay đổi qua các chu kỳ. Tái sản xuất mở rộng: một phần giá trị thặng dư được tích lũy lại làm tư bản phụ thêm; quy mô sản xuất NGÀY CÀNG LỚN. CNTB điển hình là tái sản xuất mở rộng vì áp lực cạnh tranh buộc nhà tư bản phải liên tục tích lũy để tồn tại.');

INSERT INTO "HomepageSections" ("Title","Description","ImageUrl","ImageSource","DisplayOrder") VALUES
('Hero Section','Khám phá những nhân tố ảnh hưởng tới quy mô tích lũy tư bản - Chương 3, Phần II Kinh tế Chính trị Mác–Lênin (Bộ GD&ĐT, 2021)','https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&q=80','https://unsplash.com',1),
('Tại sao cần học Kinh tế Chính trị Mác–Lênin?','Kinh tế Chính trị Mác–Lênin giải thích bản chất bóc lột trong chủ nghĩa tư bản, quy luật giá trị thặng dư và tích lũy tư bản - nền tảng tư tưởng kinh tế của Đảng Cộng sản Việt Nam.','https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=400&q=80','https://unsplash.com',2),
('Các chuyên đề nổi bật','Khám phá hệ thống bài viết về 4 nhân tố ảnh hưởng quy mô tích lũy tư bản: trình độ khai thác sức lao động, năng suất lao động, sử dụng máy móc, đại lượng tư bản ứng trước.','https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&q=80','https://unsplash.com',3);