import { Bot, ShieldCheck } from "lucide-react";

export function CredibilityFooter(): JSX.Element {
  return (
    <section className="mt-8 pt-6 border-t border-[#d8d3c5] text-[0.875rem] leading-relaxed text-gray-700 clear-both">
      <h3 className="font-bold text-[#3f6048] text-[1.1rem] mb-4 flex items-center gap-2">
        <ShieldCheck size={20} className="text-[#3f6048]" />
        Cam kết Chất lượng & Minh bạch
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Phụ lục AI Usage */}
        <div className="bg-[#f2efe9] rounded-xl p-5 border border-[#e8e4d8] shadow-sm">
          <h4 className="font-bold text-[#5c4a3d] mb-2 flex items-center gap-2">
            <Bot size={17} className="text-[#5c4a3d]" />
            Minh bạch AI (AI Usage)
          </h4>
          <p className="text-[#6c5a4d] text-[0.85rem] text-justify">
            Nội dung bài viết, cấu trúc mã nguồn và giao diện người dùng được hỗ trợ phân tích, tóm tắt và thiết kế bởi <strong>Trí tuệ Nhân tạo (AI)</strong> nhằm tối ưu hóa trải nghiệm tương tác học thuật. Dù vậy, toàn bộ lập luận, thuật ngữ chuyên ngành và khung lý thuyết cốt lõi đều được định hướng, rà soát và kiểm duyệt gắt gao bởi tác giả là con người.
          </p>
        </div>

        {/* Nguồn chính thống */}
        <div className="bg-[#f2efe9] rounded-xl p-5 border border-[#e8e4d8] shadow-sm">
          <h4 className="font-bold text-[#5c4a3d] mb-2 flex items-center gap-2">
            <ShieldCheck size={17} className="text-[#5c4a3d]" />
            Kiểm chứng thông tin (Fact-checked)
          </h4>
          <ul className="text-[#6c5a4d] text-[0.85rem] list-disc list-outside ml-4 space-y-1.5 text-justify">
            <li><strong>Giáo trình Kinh tế chính trị Mác - Lênin</strong> (Dành cho bậc đại học hệ không chuyên lý luận chính trị), Bộ GD&ĐT, NXB Chính trị quốc gia Sự thật, 2021.</li>
            <li><strong>Hệ thống pháp luật Việt Nam:</strong> Các Bộ luật, Nghị định (VD: NĐ 98), Quyết định (VD: QĐ 13) của Nhà nước CHXHCN Việt Nam về điều tiết và phân bổ lợi ích kinh tế.</li>
          </ul>
        </div>
        
      </div>
    </section>
  );
}
