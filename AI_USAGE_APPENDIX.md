# PHỤ LỤC: MINH BẠCH VÀ TRÁCH NHIỆM TRONG SỬ DỤNG AI (AI USAGE & TRANSPARENCY APPENDIX)

**Dự án:** Game tương tác "CENSOR-X: Thực Tiễn và Chân Lý"  
**Môn học:** Triết học Mác - Lênin  
**Nhóm thực hiện:** Nhóm 3 - Lớp MLN1  
**Tác giả:** isntbim (tridungit2005@gmail.com)  

---

## 1. CAM KẾT VỀ LIÊM CHÍNH HỌC THUẬT (ACADEMIC INTEGRITY COMMITMENT)
Chúng tôi, các thành viên Nhóm 3, cam kết bằng văn bản rằng:
* **Không để AI làm thay hoàn toàn:** Trí tuệ nhân tạo (AI) chỉ được sử dụng như một công cụ hỗ trợ tư duy, định hình cấu trúc dữ liệu thô và gợi ý giải pháp kỹ thuật cơ bản. Toàn bộ nội dung tri thức triết học, kịch bản cốt truyện (Act 1, 2, 3), các lựa chọn quyết định, triết lý thiết kế giao diện nghệ thuật (sơn mài và giấy dó) và logic lập trình cốt lõi của game đều do sinh viên tự nghiên cứu, biên soạn và triển khai thực tế.
* **Chịu trách nhiệm cuối cùng:** Nhóm chịu trách nhiệm hoàn toàn về tính chính xác, tính chính trị và tính khoa học của mọi nội dung hiển thị trong sản phẩm game CENSOR-X.

---

## 2. BẢNG KÊ KHAI CHI TIẾT SỬ DỤNG AI (AI USAGE INVENTORY)
Bảng dưới đây liệt kê chi tiết các công cụ AI đã được sử dụng trong quá trình phát triển game CENSOR-X, mục đích sử dụng, các mẫu prompt chính, kết quả thu được và các phần chỉnh sửa chi tiết của sinh viên:

| Công cụ AI | Mục đích sử dụng | Prompt chính (Yêu cầu cốt lõi) | Kết quả từ AI (AI Output) | Phần sinh viên chỉnh sửa/biên soạn lại |
| :--- | :--- | :--- | :--- | :--- |
| **Claude 3.5 Sonnet / Gemini** | Hỗ trợ cấu trúc định dạng JSON thô cho danh sách bình luận giả lập trên mạng xã hội ở Act 1 và Act 3. | *"Tạo cấu trúc JSON gồm các comment giả lập của người dùng mạng xã hội về các tin tức đời sống thường nhật (như giá thực phẩm, quy hoạch đô thị, giáo dục). Mỗi comment có trường username, handle, content."* | Khung dữ liệu JSON thô chứa các bình luận bằng tiếng Anh và tiếng Việt dịch máy sơ sài, thiếu tính liên kết với lý luận triết học. | - Việt hóa toàn bộ nội dung bình luận.<br>- Lồng ghép các quan điểm lý thuyết suông hoặc thực tiễn cuộc sống vào bình luận.<br>- Đưa thuật ngữ triết học Mác-Lênin vào nội dung để người chơi phân tích.<br>- Thiết lập cấu trúc điểm phạt/cộng đối với Tín nhiệm và Thực tiễn. |
| **ChatGPT** | Gợi ý các đoạn mã CSS cơ bản cho hiệu ứng chuyển động chuyển trang (transition) và bộ lọc sáng/tối (Theme Toggle). | *"Viết CSS cho hiệu ứng toggle theme dark/light mode sử dụng dataset attribute và chuyển đổi mượt mà các biến màu sắc cơ bản."* | Đoạn mã CSS mẫu sử dụng `:root` và các selector căn bản, thiết kế màu sắc mặc định dạng đen/trắng (high contrast) đơn điệu. | - Tích hợp hệ màu triết học & bản sắc Việt (Sơn mài, Chu sa đỏ, Vàng hoàng thổ, Giấy dó).<br>- Tối ưu hóa CSS để hỗ trợ hiển thị đáp ứng tốt trên các thiết bị di động hẹp (320px).<br>- Khắc phục lỗi nạp trạng thái giao diện khi tải lại trang bằng JavaScript tùy biến. |
| **AI Coding Assistant** | Hỗ trợ gỡ lỗi (debugging) cơ chế bất đồng bộ của SugarCube 2 khi cập nhật thanh trạng thái (HUD). | *"Tại sao hiệu ứng transition width trong SugarCube 2 bị giật/snap ngay lập tức khi chuyển tiếp passage?"* | Gợi ý sử dụng cơ chế lắng nghe sự kiện DOM hoặc trì hoãn cập nhật bằng hàm setTimeout căn bản. | - Thiết kế cơ chế lưu trữ giá trị HUD trước đó (`$prevPublicTrust`, `$prevPracticeMeter`) trong `StoryInit`.<br>- Viết hàm đồng bộ hóa trong `PassageHeader` kết hợp `setTimeout` 50ms để bắt buộc trình duyệt dựng hiệu ứng trượt mượt mà. |

---

## 3. TÍNH CÓ TRÁCH NHIỆM & ĐỐI CHIẾU NGUỒN HỌC THUẬT CHÍNH THỐNG
Mọi nội dung tri thức triết học xuất hiện trong game, đặc biệt là các phần phân tích của AI kiểm duyệt (CENSOR-X) và các trích dẫn lý luận, đều được đối chiếu nghiêm ngặt với các tài liệu chính thống để bảo đảm không xảy ra lỗi "ảo giác" (hallucination) của AI:

### Nguồn đối chiếu chính thống:
1. **Giáo trình Triết học Mác - Lênin** (Dành cho bậc đại học hệ không chuyên lý luận chính trị) – Bộ Giáo dục và Đào tạo.
2. **Tác phẩm kinh điển:** *"Luận đề về Feuerbach"* (K.Marx), đặc biệt là Luận đề II về tiêu chuẩn chân lý và Luận đề XI về vai trò cải tạo thế giới của triết học.
3. **Văn kiện Đại hội Đại biểu Toàn quốc** Đảng Cộng sản Việt Nam (về nguyên tắc "Nhìn thẳng vào sự thật, đánh giá đúng sự thật, nói rõ sự thật" và lấy thực tiễn làm thước đo hiệu quả chính sách).

### Ví dụ điển hình về hiệu chỉnh thuật ngữ AI:
* **Lỗi từ AI:** Khi yêu cầu giải thích về chân lý, AI thường đưa ra định nghĩa mang tính chủ quan hoặc thực dụng (ví dụ: *"Chân lý là cái gì có lợi cho đa số"* hoặc *"Chân lý là sự đồng thuận của đám đông"*).
* **Hiệu chỉnh của sinh viên:** Nhóm đã bác bỏ định nghĩa này và biên soạn lại dựa trên quan điểm duy vật biện chứng: *"Chân lý là những tri thức phù hợp với hiện thực khách quan và đã được thực tiễn kiểm nghiệm"*. Đồng thời đưa vào game các tình huống để người chơi thấy rõ: sự đồng thuận của số đông (Act 1 - Tín nhiệm cộng đồng) chưa chắc đã là chân lý nếu nó xa rời hiện thực khách quan và thực tiễn kiểm nghiệm (Act 2 & Act 3).

---

## 4. TÍNH SÁNG TẠO VÀ VAI TRÒ HỖ TRỢ CỦA AI (AI AS A SUPPORTING TOOL)
AI hoàn toàn không thay thế vai trò sáng tạo của nhóm mà chỉ đóng vai trò hỗ trợ tăng tốc quy trình làm việc:
* **Kịch bản game tương tác độc đáo:** Kịch bản phân nhánh của CENSOR-X là một sự sáng tạo độc lập của nhóm nhằm trực quan hóa chương *"Nhận thức luận"* của triết học Mác - Lênin. Trò chơi đặt người chơi vào vai trò người kiểm duyệt để tự trải nghiệm mâu thuẫn biện chứng giữa lý luận suông (Act 1) và thực tiễn sinh động (Act 2, 3), từ đó hiểu sâu sắc bài học về "tiêu chuẩn của chân lý".
* **Thiết kế Mỹ thuật Đậm chất Việt Nam:** Thay vì sử dụng giao diện dạng console hacker mặc định của các dự án AI thông thường, nhóm đã tự tay thiết kế và cấu hình mã nguồn CSS để tạo nên một giao diện "Philosophy & Vietnam" độc bản:
  * Nền tối lấy cảm hứng từ màu **Đen than của tranh sơn mài** (`#14110f`).
  * Chi tiết viền sử dụng sắc **Vàng hoàng thổ/Vàng nho sĩ** (`#d4a359`).
  * Các nút hành động chính sử dụng sắc **Đỏ sơn mài / Đỏ chu sa** (`#c24234`).
  * Font chữ **Lora** (Serif) cổ điển mang lại cảm giác học thuật sâu lắng của một cuốn sách triết học cổ.

---

## 5. PHÂN ĐỊNH RÕ RÀNG GIỮA AI OUTPUT VÀ PHẦN BIÊN SOẠN CỦA SINH VIÊN

Chúng tôi làm rõ ranh giới đóng góp trong sản phẩm thông qua bảng phân định dưới đây:

```
[MÃ NGUỒN & NỘI DUNG GAME CENSOR-X]
 ├── 📜 Kịch bản cốt truyện & Triết lý lựa chọn ───────── Sinh viên sáng tác 100%
 ├── 🖥️ Thiết kế Mỹ thuật, CSS & Responsive ──────────── Sinh viên biên soạn & tinh chỉnh 90% (AI gợi ý layout thô)
 ├── ⚙️ Logic Game (SugarCube Macros & JS State) ──────── Sinh viên thiết kế & sửa lỗi 95%
 └── 📊 Dữ liệu câu hỏi thô (JSON comments) ──────────── AI tạo cấu trúc thô 40% ──> Sinh viên biên soạn nội dung 60%
```

* **Phần mã CSS/HTML:** 
  * *AI cung cấp:* Các thuộc tính CSS chuyển đổi cơ bản, cấu trúc layout flexbox tiêu chuẩn.
  * *Sinh viên viết/chỉnh sửa:* Tự tay cấu hình toàn bộ hệ thống màu sắc theo tỷ lệ 60-30-10, viết các đoạn truy vấn truyền thông (Media Queries) để căn chỉnh giao diện co giãn hoàn hảo trên thiết bị di động (xuống đến 320px), thiết kế nút chuyển đổi theme hoạt động ổn định và gỡ lỗi hiển thị HUD.
* **Phần kịch bản chữ (Text & Dialogue):** 
  * *AI cung cấp:* Một số mẫu câu đối thoại giả lập của các bài báo mạng xã hội.
  * *Sinh viên viết/chỉnh sửa:* Sáng tác 100% nội dung dẫn chuyện, hệ thống câu hỏi tình huống triết học, lập luận phản biện của nhân vật Karl Marx ở Act 2, các dòng nhật ký debug ở Act 3 và các đoạn kết game (Ending).
