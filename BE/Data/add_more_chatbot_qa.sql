SET client_encoding = 'UTF8';

-- Thêm các QA mới để chatbot trả lời được nhiều câu hỏi hơn
INSERT INTO "ChatbotQAs" ("Keyword","Question","Answer") VALUES

('tai san xuat,tai san xuat gian don mo rong',
 'Tái sản xuất giản đơn và mở rộng khác nhau như thế nào?',
 'Tái sản xuất giản đơn: Lặp lại quá trình sản xuất với QUY MÔ NHƯ CŨ. Toàn bộ giá trị thặng dư được nhà tư bản tiêu dùng cho cá nhân — không có tích lũy.

Tái sản xuất mở rộng: Nhà tư bản biến một bộ phận giá trị thặng dư thành tư bản phụ thêm để MỞ RỘNG sản xuất — đây là cơ sở của tích lũy tư bản.

Chủ nghĩa tư bản điển hình là tái sản xuất mở rộng vì áp lực cạnh tranh buộc nhà tư bản phải liên tục tích lũy để tồn tại và phát triển.'),

('ban chat,ban chat tich luy,nguon goc tich luy',
 'Bản chất của tích lũy tư bản là gì?',
 'Bản chất của tích lũy tư bản là quá trình tái sản xuất mở rộng tư bản chủ nghĩa thông qua việc chuyển hóa giá trị thặng dư thành tư bản phụ thêm để tiếp tục mở rộng sản xuất kinh doanh: mua thêm hàng hóa sức lao động, mở mang nhà xưởng, mua thêm nguyên-vật liệu, trang bị thêm máy móc, thiết bị.

Công thức: Quy mô tích lũy = f(Tỷ lệ tích lũy/tiêu dùng × Khối lượng giá trị thặng dư)

Nguồn gốc DUY NHẤT của tích lũy tư bản là giá trị thặng dư.'),

('gia tri thang du tuyet doi,thang du tuyet doi',
 'Giá trị thặng dư tuyệt đối là gì?',
 'Giá trị thặng dư tuyệt đối được tạo ra bằng cách KÉO DÀI thời gian lao động trong ngày trong khi thời gian lao động tất yếu (thời gian tái sản xuất giá trị sức lao động) không đổi.

Ví dụ: Ngày lao động 8h, thời gian tất yếu 4h → thặng dư 4h. Nhà tư bản kéo dài lên 10h → thặng dư tăng lên 6h.

Đây là phương pháp nguyên thủy nhất, gắn với giai đoạn đầu của CNTB, bị giới hạn bởi sức khỏe công nhân và luật lao động.'),

('gia tri thang du tuong doi,thang du tuong doi',
 'Giá trị thặng dư tương đối là gì?',
 'Giá trị thặng dư tương đối được tạo ra bằng cách RÚT NGẮN thời gian lao động tất yếu (nhờ tăng năng suất lao động) trong khi ngày lao động không đổi hoặc ngắn hơn.

Cơ chế: Tăng NSLĐ → giảm giá trị tư liệu sinh hoạt → giảm giá trị sức lao động → rút ngắn thời gian lao động tất yếu → phần thặng dư tăng lên.

Đây là phương pháp đặc trưng của CNTB hiện đại, gắn với cách mạng kỹ thuật và tự động hóa.'),

('tu ban bat bien,tu ban kha bien,c va v',
 'Tư bản bất biến và tư bản khả biến là gì?',
 'Tư bản bất biến (c): Bộ phận tư bản dùng để mua tư liệu sản xuất (máy móc, nguyên vật liệu). Giá trị của nó được bảo toàn và chuyển vào sản phẩm mà KHÔNG tạo ra giá trị mới.

Tư bản khả biến (v): Bộ phận tư bản dùng để mua sức lao động (trả lương công nhân). Nó không chỉ tái tạo lại giá trị của bản thân mà còn TẠO RA giá trị thặng dư (m).

Cấu tạo hữu cơ c/v: Tỷ lệ giữa c và v — tăng lên theo tiến trình tích lũy do ngày càng dùng nhiều máy móc hơn.'),

('luc luong phuc vu khong cong,phuc vu khong cong',
 'Lực lượng phục vụ không công của máy móc là gì? Cho ví dụ.',
 'Theo C. Mác, máy móc được sử dụng TOÀN BỘ tính năng trong sản xuất, nhưng giá trị của nó chỉ chuyển dần vào sản phẩm qua khấu hao.

Ví dụ: Mua máy CNC trị giá 100 triệu, khấu hao 10 năm → mỗi năm chỉ tính 10 triệu vào chi phí. Nhưng máy vẫn hoạt động 100% công suất trong suốt 10 năm.

Phần công suất máy đã được "trả tiền xong" (đã khấu hao hết) nhưng vẫn tiếp tục làm việc = "lực lượng phục vụ không công" — nhà tư bản được hưởng không tốn thêm chi phí, từ đó tăng quy mô tích lũy.'),

('khau hao,quy khau hao,tai san co dinh',
 'Quỹ khấu hao liên quan đến tích lũy tư bản như thế nào?',
 'Quỹ khấu hao được tích lũy dần từ từng chu kỳ sản xuất. Trong khi chưa cần thiết phải đổi mới tư bản cố định (chưa đến lúc mua máy mới), quỹ này trở thành nguồn tài chính sẵn có để mở rộng sản xuất.

Cơ chế 4 bước:
1. Mua máy móc → Chi phí ban đầu (tư bản cố định)
2. Sử dụng → Toàn bộ tính năng khai thác
3. Khấu hao mỗi kỳ → Chỉ một phần nhỏ giá trị tính vào chi phí
4. Quỹ khấu hao tích lũy → Nguồn vốn tái đầu tư mở rộng

Đây là một trong những lý do máy móc làm tăng quy mô tích lũy tư bản.'),

('tu ban ung truoc,von ung truoc,quy mo von',
 'Tại sao tư bản ứng trước lớn thì quy mô tích lũy tăng?',
 'Điều kiện: Thị trường thuận lợi + hàng hóa bán được liên tục + vòng quay tư bản nhanh.

Cơ chế:
- Tư bản ứng trước lớn → Quy mô sản xuất lớn → Tạo ra nhiều giá trị thặng dư hơn
- Nhiều m → Phần tích lũy tăng → Chu kỳ sản xuất tiếp theo lớn hơn

Kết quả: Quy mô tích lũy tăng theo quy mô tư bản theo cấp số nhân. Tư bản lớn ngày càng lớn hơn — đây là cơ sở của tích tụ và tập trung tư bản.'),

('tich tu,tap trung,tich tu va tap trung',
 'Phân biệt tích tụ tư bản và tập trung tư bản.',
 'TÍCH TỤ TƯ BẢN:
- Tăng quy mô tư bản cá biệt bằng cách tư bản hóa giá trị thặng dư
- LÀM TĂNG tư bản xã hội (tư bản lớn lên từ BÊN TRONG)
- Ví dụ: Công ty lấy lợi nhuận tái đầu tư mở rộng nhà máy

TẬP TRUNG TƯ BẢN:
- Tăng quy mô tư bản cá biệt bằng cách hợp nhất nhiều tư bản cá biệt
- KHÔNG làm tăng tư bản xã hội (tư bản lớn lên từ BÊN NGOÀI)
- Ví dụ: Công ty A mua lại/sáp nhập công ty B

Cả hai đều là hệ quả tất yếu của tích lũy tư bản, dẫn đến tập trung của cải vào tay ít người.'),

('ban cung hoa,ban cung hoa tuong doi,ban cung hoa tuyet doi',
 'Bần cùng hóa tương đối và tuyệt đối là gì?',
 'BẦN CÙNG HÓA TƯƠNG ĐỐI: Thu nhập của công nhân có thể tăng về số tuyệt đối, nhưng TĂNG CHẬM HƠN so với thu nhập của nhà tư bản và tăng trưởng năng suất. Tỷ phần trong tổng thu nhập xã hội của công nhân ngày càng giảm.

BẦN CÙNG HÓA TUYỆT ĐỐI: Thu nhập thực tế của công nhân GIẢM xuống — mất việc làm do máy móc thay thế, tiền lương thực tế giảm, điều kiện sống xấu đi.

Đây là hệ quả thứ ba của tích lũy tư bản, phản ánh mâu thuẫn cơ bản của CNTB: của cải xã hội do công nhân tạo ra nhưng ngày càng tập trung vào tay nhà tư bản.'),

('cau tao huu co,c tren v,cau tao ky thuat',
 'Cấu tạo hữu cơ tư bản là gì? Xu hướng thay đổi ra sao?',
 'Cấu tao hữu cơ tư bản = c/v (tư bản bất biến / tư bản khả biến).

Xu hướng: Trong quá trình tích lũy, cấu tạo hữu cơ NGÀY CÀNG TĂNG vì:
- Tích lũy → đầu tư thêm máy móc → cấu tạo kỹ thuật tăng (nhiều tư liệu sản xuất hơn/công nhân)
- Cấu tạo kỹ thuật tăng → cấu tạo hữu cơ tăng

Hệ quả: Nhu cầu lao động tăng chậm hơn tốc độ tích lũy tư bản → hình thành "đội quân thất nghiệp công nghiệp" → làm giảm sức mặc cả của công nhân → tiền lương bị kéo xuống.'),

('vi du thuc tien,lien he thuc te,doanh nghiep hien dai',
 'Liên hệ 4 nhân tố với doanh nghiệp hiện đại như thế nào?',
 'Liên hệ 4 nhân tố tích lũy tư bản với doanh nghiệp hiện đại:

1. TRÌNH ĐỘ KHAI THÁC SLĐ → Đầu tư đào tạo, phúc lợi để tăng năng suất bền vững thay vì chỉ cắt giảm lương. Ví dụ: Google, Apple trả lương cao nhưng thu được nhiều hơn từ năng suất.

2. NĂNG SUẤT LAO ĐỘNG → Ứng dụng AI, robot, tự động hóa → giảm chi phí, tăng sản lượng. Cách mạng công nghiệp 4.0 tạo ra tích lũy quy mô lớn chưa từng có.

3. SỬ DỤNG MÁY MÓC → Quản lý tài sản cố định hiệu quả: tối ưu công suất, lên kế hoạch khấu hao → quỹ khấu hao trở thành nguồn vốn tái đầu tư.

4. VỐN ỨNG TRƯỚC → Mở rộng quy mô qua IPO, phát hành cổ phiếu, thu hút FDI → nền tảng tích lũy dài hạn. Ví dụ: Tesla huy động vốn lớn → sản xuất quy mô lớn → tích lũy nhanh.'),

('cach mang cong nghiep 4.0,ai robot tu dong hoa',
 'Cách mạng công nghiệp 4.0 ảnh hưởng tích lũy tư bản thế nào?',
 'Cách mạng công nghiệp 4.0 (AI, robot, IoT, tự động hóa) tác động mạnh đến tích lũy tư bản qua 2 nhân tố:

Nhân tố 2 (Năng suất lao động):
- AI/robot tăng đột phá năng suất → giảm giá trị tư liệu sinh hoạt → giảm giá trị sức lao động
- Chi phí sản xuất giảm → tạo ra nhiều giá trị thặng dư hơn → quy mô tích lũy tăng

Nhân tố 3 (Sử dụng máy móc):
- Máy móc thông minh hoạt động 24/7 không nghỉ → tối đa hóa "lực lượng phục vụ không công"
- Chi phí khấu hao được tối ưu → quỹ khấu hao lớn hơn để tái đầu tư

Hệ quả: Tích lũy tư bản tăng nhanh chưa từng có nhưng bất bình đẳng thu nhập cũng tăng mạnh (bần cùng hóa tương đối).'),

('so sanh nhan to,4 nhan to so sanh',
 'Trong 4 nhân tố, nhân tố nào quan trọng nhất?',
 '4 nhân tố đều quan trọng và tác động qua lại nhau, nhưng có thể phân tích vai trò:

Nhân tố 1 (Trình độ khai thác SLĐ): Cơ bản nhất — trực tiếp quyết định khối lượng m tạo ra.

Nhân tố 2 (Năng suất lao động): Tác động gián tiếp nhưng mang tính hệ thống — tăng NSLĐ lan tỏa sang cả nhân tố 1 (tăng m tương đối).

Nhân tố 3 (Sử dụng máy móc): Tác động đặc biệt — tạo ra nguồn tích lũy "miễn phí" từ quỹ khấu hao.

Nhân tố 4 (Vốn ứng trước): Tạo tiền đề — vốn lớn mới có thể khai thác tối đa 3 nhân tố kia.

Theo C. Mác, tất cả 4 nhân tố đều cần được khai thác đồng thời để tối đa hóa quy mô tích lũy.');