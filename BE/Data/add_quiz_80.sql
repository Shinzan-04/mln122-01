SET client_encoding = 'UTF8';

-- Xóa câu trùng (Id=25 giống Id=24)
DELETE FROM "QuizQuestions" WHERE "Id" = 25;

-- NHÓM 1 (TopicId=1): Câu 8-15 từ file (câu 1-7 đã có)
INSERT INTO "QuizQuestions" ("TopicId","Question","OptionA","OptionB","OptionC","OptionD","CorrectAnswer") VALUES
(1,'Phân biệt tư bản bất biến (c) và tư bản khả biến (v):',
 'Tư bản bất biến là tiền, tư bản khả biến là máy móc',
 'Tư bản bất biến không tạo ra giá trị mới, tư bản khả biến tạo ra giá trị thặng dư',
 'Tư bản bất biến gồm máy móc và lao động, tư bản khả biến gồm nguyên liệu',
 'Tư bản bất biến thay đổi giá trị, tư bản khả biến không thay đổi','B'),

(1,'Quá trình tích lũy tư bản phản ánh quan hệ xã hội gì?',
 'Quan hệ hợp tác bình đẳng giữa nhà tư bản và công nhân',
 'Quan hệ bóc lột: nhà tư bản dùng lao động không công của công nhân để tích lũy',
 'Quan hệ cạnh tranh giữa các nhà tư bản với nhau',
 'Quan hệ trao đổi ngang giá trên thị trường','B'),

(1,'Trong cấu thành giá trị hàng hóa (W = c + v + m), phần nào là nguồn của tích lũy?',
 'c (tư bản bất biến)','v (tư bản khả biến)','m (giá trị thặng dư)','c + v','C'),

(1,'Nhà tư bản phân chia giá trị thặng dư thành mấy phần?',
 'Ba phần: tích lũy, tiêu dùng, đầu tư tài chính',
 'Hai phần: tích lũy và tiêu dùng cá nhân',
 'Bốn phần: tích lũy, lương, thuế, tiêu dùng',
 'Không phân chia, toàn bộ để tái đầu tư','B'),

(1,'Quy mô tích lũy và quy mô tiêu dùng của nhà tư bản có mối quan hệ:',
 'Tỷ lệ thuận với nhau khi giá trị thặng dư tăng',
 'Không liên quan vì xuất phát từ hai nguồn khác nhau',
 'Nghịch chiều trong điều kiện khối lượng giá trị thặng dư cố định',
 'Luôn bằng nhau theo nguyên tắc phân phối công bằng','C'),

(1,'Điều kiện để tái sản xuất mở rộng xảy ra là:',
 'Nhà tư bản vay được vốn từ ngân hàng với lãi suất thấp',
 'Có giá trị thặng dư và nhà tư bản quyết định tích lũy một phần',
 'Công nghệ sản xuất phải được đổi mới hoàn toàn',
 'Thị trường tiêu thụ phải tăng trưởng ít nhất 10% mỗi năm','B'),

(1,'Vì sao nói "tư bản là quan hệ xã hội"?',
 'Vì tư bản bao gồm cả máy móc và con người',
 'Vì tư bản phản ánh quan hệ giữa nhà tư bản và công nhân làm thuê',
 'Vì tư bản cần thị trường xã hội để lưu thông',
 'Vì tư bản được tạo ra bởi toàn xã hội','B'),

(1,'Khi tỷ lệ tích lũy tăng từ 40% lên 60% (khối lượng m không đổi), quy mô tích lũy:',
 'Giảm xuống','Không thay đổi','Tăng lên','Biến động không rõ ràng','C'),

-- NHÓM 2 (TopicId=2): Câu 22-28 từ file (câu 16-21 tương đương 8-13 đã có)
(2,'Khi ngày lao động = 10 giờ, thời gian lao động cần thiết = 4 giờ, tỷ suất m'' bằng:',
 '40%','60%','150%','250%','C'),

(2,'"Thời gian lao động cần thiết" là thời gian:',
 'Công nhân cần để sản xuất toàn bộ giá trị sản phẩm',
 'Công nhân tái sản xuất được giá trị sức lao động của bản thân',
 'Nhà tư bản bắt buộc phải trả lương cho công nhân',
 'Máy móc cần để hoàn thành một đơn vị sản phẩm','B'),

(2,'"Thời gian lao động thặng dư" là thời gian:',
 'Công nhân làm việc ngoài giờ và được trả thêm',
 'Công nhân làm việc để tạo ra giá trị thặng dư cho nhà tư bản',
 'Máy móc hoạt động khi không có công nhân giám sát',
 'Nhà tư bản quản lý và giám sát sản xuất','B'),

(2,'Để tăng tỷ suất giá trị thặng dư mà không kéo dài ngày lao động, nhà tư bản phải:',
 'Tuyển thêm công nhân làm việc theo ca',
 'Rút ngắn thời gian lao động cần thiết trong ngày',
 'Tăng tiền lương để công nhân làm việc hăng hơn',
 'Đầu tư vào quảng cáo để bán hàng nhiều hơn','B'),

(2,'Sự bóc lột trong CNTB khác sự bóc lột thời phong kiến ở chỗ:',
 'CNTB bóc lột nhiều hơn phong kiến về tuyệt đối',
 'Bóc lột CNTB được che giấu bởi hình thức tiền lương',
 'CNTB không bóc lột vì công nhân tự do ký hợp đồng',
 'Bóc lột CNTB chỉ xảy ra trong giai đoạn tích lũy nguyên thủy','B'),

(2,'Tăng cường độ lao động khác tăng năng suất lao động ở điểm:',
 'Tăng CĐLĐ làm giảm chất lượng sản phẩm, tăng NSLĐ thì không',
 'Tăng CĐLĐ tiêu hao nhiều sức lực hơn trong cùng thời gian',
 'Tăng NSLĐ đòi hỏi đầu tư máy móc, còn CĐLĐ thì không',
 'Tăng CĐLĐ và tăng NSLĐ đều có tác dụng như nhau đến m''','B'),

(2,'Khi nhà tư bản cắt giảm tiền lương xuống dưới giá trị sức lao động, điều này:',
 'Là bình thường vì nhà tư bản có quyền định giá',
 'Vi phạm quy luật trao đổi ngang giá nhưng vẫn xảy ra trong thực tế',
 'Không thể xảy ra vì thị trường tự điều chỉnh',
 'Làm tăng giá trị thặng dư tương đối','B'),

-- NHÓM 3 (TopicId=3): Câu 34-40 từ file (câu 29-33 tương đương 14-18 đã có)
(3,'Tại sao trong CNTB, lợi ích từ tăng năng suất lao động chủ yếu thuộc về nhà tư bản?',
 'Vì luật pháp quy định như vậy',
 'Vì nhà tư bản sở hữu tư liệu sản xuất và chiếm đoạt giá trị thặng dư',
 'Vì công nhân không có kỹ năng sử dụng công nghệ mới',
 'Vì tăng NSLĐ chỉ ảnh hưởng đến lợi nhuận, không ảnh hưởng tiền lương','B'),

(3,'Tư liệu sinh hoạt bao gồm những gì?',
 'Chỉ thực phẩm và quần áo của công nhân',
 'Toàn bộ hàng hóa cần thiết để tái sản xuất sức lao động',
 'Máy móc và nguyên liệu sản xuất',
 'Bất kỳ hàng hóa nào có trên thị trường','B'),

(3,'Mối quan hệ giữa năng suất lao động và giá trị đơn vị hàng hóa:',
 'Năng suất tăng thì giá trị đơn vị hàng hóa tăng',
 'Năng suất tăng thì giá trị đơn vị hàng hóa giảm',
 'Không có mối quan hệ trực tiếp',
 'Năng suất tăng thì giá trị đơn vị hàng hóa không đổi','B'),

(3,'Ứng dụng AI trong sản xuất liên quan đến nhân tố nào của tích lũy tư bản?',
 'Chỉ nhân tố 3 (sử dụng máy móc)',
 'Chủ yếu nhân tố 2 (tăng NSLĐ) và nhân tố 3 (hiệu quả máy móc)',
 'Chỉ nhân tố 4 (tư bản ứng trước)',
 'Không liên quan đến lý luận tích lũy tư bản cổ điển','B'),

(3,'Năng suất lao động xã hội tăng do những nguyên nhân chủ yếu nào?',
 'Tăng số giờ làm việc của công nhân',
 'Tiến bộ kỹ thuật, cải tiến công nghệ, tổ chức lao động hợp lý',
 'Tăng lương để công nhân làm việc chăm chỉ hơn',
 'Mở rộng thị trường tiêu thụ trong và ngoài nước','B'),

(3,'Khi năng suất lao động trong ngành sản xuất tư liệu sinh hoạt tăng 2 lần, giá trị sức lao động sẽ:',
 'Tăng 2 lần','Không đổi','Giảm xuống','Tăng 1,5 lần','C'),

(3,'Điểm khác biệt giữa năng suất lao động cá biệt và năng suất lao động xã hội:',
 'Năng suất cá biệt ảnh hưởng giá trị xã hội của hàng hóa, NSLĐXH thì không',
 'Chỉ NSLĐXH ảnh hưởng đến giá trị sức lao động và quy mô tích lũy',
 'Hai khái niệm này giống nhau hoàn toàn',
 'NSLĐ cá biệt cao hơn luôn có lợi hơn cho tích lũy','B'),

-- NHÓM 4 (TopicId=4): Câu 46-55 từ file (câu 41-45 tương đương 19-23 đã có)
(4,'Tư bản cố định là:',
 'Toàn bộ vốn đầu tư của nhà tư bản vào sản xuất',
 'Bộ phận tư bản tồn tại dưới dạng máy móc, nhà xưởng, chuyển giá trị vào sản phẩm dần',
 'Tư bản không thể thay đổi trong quá trình sản xuất',
 'Vốn nhà tư bản gửi ngân hàng để dự phòng','B'),

(4,'Tư bản lưu động khác tư bản cố định ở điểm:',
 'Tư bản lưu động có giá trị nhỏ hơn',
 'Tư bản lưu động chuyển toàn bộ giá trị vào sản phẩm trong một chu kỳ sản xuất',
 'Tư bản lưu động bao gồm máy móc và thiết bị',
 'Tư bản lưu động không được khấu hao','B'),

(4,'Hao mòn vô hình của tài sản cố định xảy ra khi:',
 'Máy móc bị gỉ sét do ít sử dụng',
 'Xuất hiện máy móc mới hiện đại hơn hoặc rẻ hơn làm giảm giá trị máy cũ',
 'Công nhân sử dụng máy không đúng quy trình',
 'Thị trường hàng hóa đầu ra bị suy giảm','B'),

(4,'Doanh nghiệp nên có chiến lược gì với tài sản cố định để tối đa hóa tích lũy?',
 'Đổi mới máy móc càng thường xuyên càng tốt',
 'Tận dụng tối đa công suất trước khi lỗi thời, tích lũy quỹ khấu hao',
 'Bán thanh lý khi máy còn mới để thu hồi vốn nhanh',
 'Không đầu tư vào tài sản cố định, chỉ thuê mướn','B'),

(4,'Điều gì xảy ra khi máy móc đã khấu hao hết nhưng vẫn hoạt động tốt?',
 'Nhà tư bản phải nộp phần khấu hao còn lại cho nhà nước',
 'Mọi sản phẩm tạo ra từ máy đó không còn chi phí khấu hao → lợi nhuận tăng',
 'Máy phải được thanh lý theo quy định kế toán',
 'Không có ý nghĩa kinh tế đặc biệt','B'),

(4,'Sự "phục vụ không công" của máy móc có lợi cho ai?',
 'Công nhân vì họ làm việc ít hơn',
 'Nhà tư bản vì tăng thặng dư mà không tăng chi phí',
 'Người tiêu dùng vì giá hàng hóa giảm',
 'Nhà nước vì thu được thêm thuế','B'),

(4,'Trong kế toán doanh nghiệp hiện đại, khấu hao tài sản cố định được tính vào:',
 'Chi phí sản xuất → giá thành sản phẩm',
 'Lợi nhuận sau thuế của doanh nghiệp',
 'Tiền lương của người lao động',
 'Thu nhập của cổ đông','A'),

(4,'Lý luận của C. Mác về máy móc có ý nghĩa thực tiễn gì với doanh nghiệp?',
 'Nên đầu tư ít vào máy móc, nhiều vào lao động',
 'Quản lý tốt tài sản cố định và tận dụng tối đa công suất tạo ra lợi thế tích lũy',
 'Máy móc không quan trọng bằng nguyên liệu đầu vào',
 'Chỉ nên mua máy khi thị trường tốt','B'),

(4,'Theo C. Mác, tính năng máy móc phục vụ không công được "lao động sống nắm lấy" có nghĩa là:',
 'Công nhân tự sở hữu máy móc trong quá trình sản xuất',
 'Lao động sống kích hoạt và vận hành tính năng máy → giá trị thặng dư tăng cho nhà tư bản',
 'Công nhân được hưởng lợi từ năng suất máy móc qua tăng lương',
 'Máy móc và lao động là hai yếu tố độc lập nhau','B'),

-- NHÓM 5 (TopicId=5): Câu 57-65 từ file (câu 56, 66-70 tương đương đã có)
(5,'Vòng quay tư bản ảnh hưởng đến tích lũy như thế nào?',
 'Vòng quay nhanh → thu hồi vốn chậm → khó tích lũy',
 'Vòng quay nhanh → thu hồi vốn nhanh → tái đầu tư nhiều lần hơn trong năm',
 'Vòng quay tư bản không liên quan đến quy mô tích lũy',
 'Vòng quay chậm lại có lợi vì nhà tư bản giữ được hàng hóa khi giá tăng','B'),

(5,'Thị trường "thuận lợi" theo nghĩa của nhân tố 4 có nghĩa là:',
 'Giá nguyên liệu đầu vào rẻ',
 'Hàng hóa sản xuất ra bán được, dòng tiền lưu chuyển ổn định',
 'Chính phủ hỗ trợ doanh nghiệp bằng ưu đãi thuế',
 'Không có cạnh tranh từ doanh nghiệp nước ngoài','B'),

(5,'Tại sao nói "tư bản đẻ ra tư bản"?',
 'Tiền trong ngân hàng tự tăng qua lãi suất',
 'Tư bản ứng trước → sản xuất → m → tích lũy → tư bản lớn hơn → tích lũy nhiều hơn',
 'Nhà tư bản giàu có thể vay nhiều hơn từ ngân hàng',
 'Thị trường chứng khoán tự tăng giá trị theo thời gian','B'),

(5,'Doanh nghiệp có tư bản ứng trước 100 tỷ, trong đó v = 20 tỷ, tỷ suất m'' = 100%. Khối lượng giá trị thặng dư là:',
 '100 tỷ','20 tỷ','80 tỷ','50 tỷ','B'),

(5,'Một công ty khởi nghiệp muốn tăng quy mô tích lũy theo nhân tố 4 cần:',
 'Cắt giảm chi phí nhân sự ngay lập tức',
 'Huy động vốn lớn hơn + mở rộng thị trường tiêu thụ',
 'Tập trung vào một sản phẩm duy nhất',
 'Giảm đầu tư vào máy móc để tiết kiệm vốn','B'),

(5,'Khi thị trường bị thu hẹp (hàng bán chậm), nhân tố 4 tác động đến tích lũy như thế nào?',
 'Tích lũy vẫn tăng vì tư bản ứng trước không đổi',
 'Quy mô tích lũy bị hạn chế dù tư bản ứng trước lớn',
 'Tích lũy tăng vì nhà tư bản giảm giá để bán nhanh',
 'Không có tác động vì sản xuất và tiêu thụ độc lập nhau','B'),

(5,'Phát hành cổ phiếu trên thị trường chứng khoán giúp doanh nghiệp về mặt tích lũy:',
 'Giảm quy mô tư bản vì phải chia cổ tức',
 'Tăng tư bản ứng trước → cơ sở mở rộng quy mô sản xuất và tích lũy',
 'Không liên quan đến lý luận tích lũy tư bản',
 'Chỉ có lợi trong ngắn hạn, dài hạn lại bất lợi','B'),

(5,'Mối quan hệ giữa tích lũy tư bản và tư bản ứng trước qua các chu kỳ:',
 'Tư bản ứng trước giảm dần theo thời gian',
 'Tích lũy → tư bản ứng trước lớn hơn → tích lũy nhiều hơn → chu kỳ mở rộng không ngừng',
 'Tích lũy và tư bản ứng trước không liên quan đến nhau',
 'Tư bản ứng trước lớn hơn làm giảm tỷ suất lợi nhuận → giảm tích lũy','B'),

(5,'Ngân hàng và tín dụng liên quan đến nhân tố 4 vì:',
 'Ngân hàng là nhà tư bản duy nhất có thể tích lũy',
 'Tín dụng giúp nhà tư bản tăng quy mô tư bản ứng trước vượt khả năng tự có',
 'Ngân hàng kiểm soát toàn bộ quá trình tích lũy',
 'Tín dụng làm giảm tỷ suất giá trị thặng dư','B'),

-- NHÓM 6 (TopicId=5): Câu hỏi hệ quả và tổng hợp 66-80
(5,'Cấu tạo hữu cơ của tư bản (c/v) phản ánh điều gì?',
 'Tỷ lệ giữa máy móc và nguyên liệu',
 'Tỷ lệ giữa tư bản bất biến và tư bản khả biến',
 'Tỷ lệ giữa lợi nhuận và chi phí sản xuất',
 'Tỷ lệ giữa sản phẩm xuất khẩu và nội tiêu','B'),

(5,'Khi cấu tạo hữu cơ tăng, xu hướng nào xảy ra với lao động?',
 'Cầu lao động tăng theo tỷ lệ tăng của tư bản',
 'Cầu lao động tương đối giảm so với tổng tư bản',
 'Tiền lương tăng do lao động trở nên hiếm hơn',
 'Không có tác động đến thị trường lao động','B'),

(5,'Tích tụ tư bản xảy ra khi:',
 'Nhiều nhà tư bản nhỏ gộp thành một công ty lớn',
 'Nhà tư bản tích lũy giá trị thặng dư, tăng quy mô tư bản cá biệt của mình',
 'Nhà nước quốc hữu hóa các doanh nghiệp tư nhân',
 'Doanh nghiệp niêm yết cổ phiếu trên sàn chứng khoán','B'),

(5,'Tập trung tư bản xảy ra khi:',
 'Một nhà tư bản dùng m để mua thêm tư liệu sản xuất',
 'Nhiều tư bản cá biệt hợp nhất thành tư bản lớn hơn',
 'Nhà tư bản gửi tiền vào ngân hàng lấy lãi',
 'Doanh nghiệp tăng vốn điều lệ thông qua phát hành trái phiếu','B'),

(5,'Điểm khác biệt cốt lõi giữa tích tụ và tập trung tư bản:',
 'Tích tụ TB làm tăng cả TB xã hội; tập trung TB chỉ phân phối lại TB xã hội',
 'Tập trung TB làm tăng cả TB xã hội; tích tụ TB chỉ phân phối lại',
 'Cả hai đều làm tăng tư bản xã hội như nhau',
 'Tích tụ TB chỉ xảy ra trong ngành công nghiệp','A'),

(5,'Hình thức tập trung tư bản phổ biến nhất trong thời đại ngày nay:',
 'Tịch thu tài sản của các nhà tư bản nhỏ',
 'Sáp nhập và mua lại doanh nghiệp (M&A)',
 'Nhà nước cưỡng chế hợp nhất các doanh nghiệp',
 'Công nhân góp vốn mua lại doanh nghiệp','B'),

(5,'Bần cùng hóa tương đối của giai cấp công nhân có nghĩa là:',
 'Thu nhập tuyệt đối của công nhân giảm',
 'Phần thu nhập của công nhân trong tổng sản phẩm xã hội giảm tương đối so với nhà tư bản',
 'Công nhân không đủ ăn, không đủ mặc',
 'Công nhân phải làm nhiều giờ hơn với cùng mức lương','B'),

(5,'Bần cùng hóa tuyệt đối xảy ra khi:',
 'Tốc độ tăng lương chậm hơn tốc độ tăng năng suất',
 'Mức sống thực tế của công nhân giảm sút',
 'Tỷ lệ thất nghiệp tăng lên',
 'Giá hàng hóa tăng nhanh hơn lương danh nghĩa','B'),

(5,'Theo C. Mác, quy luật chung của tích lũy tư bản dẫn đến:',
 'Phân phối đều lại tài sản trong xã hội',
 'Một cực là tích lũy giàu có, cực kia là tích lũy bần cùng',
 'Xóa bỏ dần sự phân hóa giàu nghèo',
 'Tất cả các giai cấp đều được hưởng lợi từ tăng trưởng','B'),

(5,'Nhân tố nào liên quan trực tiếp nhất đến khái niệm "khấu hao tài sản"?',
 'Nhân tố 1 (trình độ khai thác SLĐ)',
 'Nhân tố 2 (NSLĐ xã hội)',
 'Nhân tố 3 (sử dụng hiệu quả máy móc)',
 'Nhân tố 4 (tư bản ứng trước)','C'),

(5,'Nhân tố nào liên quan trực tiếp nhất đến chiến lược huy động vốn của doanh nghiệp?',
 'Nhân tố 1','Nhân tố 2','Nhân tố 3','Nhân tố 4 (đại lượng tư bản ứng trước)','D'),

(5,'Khi cả 4 nhân tố cùng tác động theo chiều tích cực, điều gì xảy ra?',
 'Quy mô tích lũy tăng mạnh nhất',
 'Quy mô tích lũy giảm do cạnh tranh giữa các nhân tố',
 'Chỉ nhân tố mạnh nhất có tác dụng',
 'Quy mô tích lũy không đổi do cân bằng','A'),

(5,'Lý luận về 4 nhân tố ảnh hưởng quy mô tích lũy được C. Mác trình bày trong tác phẩm nào?',
 'Tuyên ngôn Đảng Cộng sản',
 'Bộ Tư bản (Das Kapital)',
 'Hệ tư tưởng Đức',
 'Phê phán Cương lĩnh Gotha','B'),

(5,'Ý nghĩa lý luận của học thuyết tích lũy tư bản là:',
 'Chứng minh CNTB là chế độ hoàn hảo nhất',
 'Vạch trần bản chất bóc lột và mâu thuẫn nội tại của CNTB',
 'Hướng dẫn nhà tư bản cách kiếm lợi nhuận tối đa',
 'Giải thích tại sao cần có chính sách tái phân phối thu nhập','B'),

(5,'Để tăng quy mô tích lũy, doanh nghiệp hiện đại có thể đồng thời tác động lên tất cả 4 nhân tố bằng cách:',
 'Chỉ cần tăng vốn đầu tư, các nhân tố còn lại tự điều chỉnh',
 'Cải thiện quy trình (NTố 1) + đầu tư công nghệ (NTố 2+3) + huy động vốn + mở rộng thị trường (NTố 4)',
 'Cắt giảm lương (NTố 1) là đủ, không cần can thiệp các nhân tố khác',
 'Chỉ cần tập trung vào nhân tố có tác động mạnh nhất','B');