# 🏮 VietSoul — Nền tảng thương mại văn hoá thủ công Việt Nam

> Kết nối nghệ nhân làng nghề truyền thống với người yêu văn hoá Việt — mua sắm có câu chuyện, có ý nghĩa.

![VietSoul Banner](https://placehold.co/1200x400/8B0000/FFF8E1?text=VietSoul+—+Sàn+TMĐT+Thủ+Công+Mỹ+Nghệ+Việt+Nam)

---

## 📌 Giới thiệu

**VietSoul** là một nền tảng e-commerce thuần frontend, xây dựng nhằm tôn vinh và kết nối các sản phẩm thủ công mỹ nghệ truyền thống Việt Nam với người tiêu dùng hiện đại. Mỗi sản phẩm trên VietSoul đều đi kèm câu chuyện về nghệ nhân, vùng đất và kỹ thuật chế tác — không chỉ là mua hàng, mà là trải nghiệm văn hoá.

---

## ✨ Tính năng

### 🛍️ Trải nghiệm mua sắm
- **30 sản phẩm thủ công** từ 5 danh mục: Tranh dân gian, Lụa tơ tằm, Gốm sứ, Đồ tượng gỗ, Quà tặng
- **Marketplace** với bộ lọc đa chiều: danh mục, giá, vùng miền, Green Tag
- **Sidebar chi tiết sản phẩm** — ảnh, câu chuyện, cam kết xanh, chat AI
- **Giỏ hàng** + **Checkout** đầy đủ luồng đặt hàng
- **Best Seller** — xếp hạng tự động theo lượt bán

### 🗺️ Khám phá vùng miền
- **Bản đồ tương tác** (Leaflet.js) hiển thị làng nghề theo vùng
- Filter sản phẩm theo vùng địa lý: Bắc — Trung — Nam

### 🤖 VietSoul AI Chat
- Chatbot thông minh **không cần API** — chạy hoàn toàn offline
- **Intent detection** tự động phân tích câu hỏi: quy trình, nguyên liệu, bảo quản, ý nghĩa, quà tặng, Green Tag...
- **Knowledge base chuyên sâu** theo từng danh mục sản phẩm
- **Typing delay tự nhiên** + suggestion chips dẫn dắt cuộc trò chuyện
- Nội dung inject từ data thật của từng sản phẩm

### 🌿 Green Tag — Cam kết bền vững
- Hệ thống chứng nhận sản phẩm thân thiện môi trường
- Badge hiển thị rõ trên card và trang chi tiết sản phẩm
- Thông tin cam kết: nguyên liệu tự nhiên, bao bì tái chế, eco-delivery

### 👨‍🎨 Cổng thông tin Nghệ nhân
- Trang dashboard nghệ nhân (`artisan.html`)
- Analytics: doanh thu, đơn hàng, đánh giá, lượt xem
- Luồng tạo sản phẩm mới 4 bước

---

## 🗂️ Cấu trúc file

```
vietsoul/
├── draft.html                  # File chính — toàn bộ ứng dụng
├── vietsoul-enhancements.js    # Enhancements: bản đồ, cart, UI nâng cao
├── vietsoul-enhancements.css   # Styles bổ sung
├── artisan.html                # Dashboard nghệ nhân
└── README.md                   # File này
```

---

## 🛠️ Công nghệ sử dụng

| Công nghệ | Mục đích |
|---|---|
| **HTML5 / CSS3 / JavaScript** | Core — không dùng framework |
| **Tailwind CSS** (CDN) | Utility-first styling |
| **Leaflet.js** | Bản đồ tương tác làng nghề |
| **Google Fonts** | Playfair Display + Inter |
| **Vanilla JS** | Chat engine, cart, filter, routing |

> ⚡ Không cần build tool, không cần Node.js, không cần backend, không cần API key.

---

## 🚀 Chạy dự án

### Cách 1 — Mở trực tiếp
```bash
# Chỉ cần mở file trong browser
open draft.html
```

### Cách 2 — Local server (khuyến nghị)
```bash
# Python
python -m http.server 8000

# Hoặc Node.js
npx serve .
```
Truy cập: `http://localhost:8000/draft.html`

### Cách 3 — GitHub Pages
1. Push toàn bộ file lên GitHub repo
2. Vào **Settings → Pages → Branch: main → / (root)**
3. Truy cập: `https://[username].github.io/[repo-name]/draft.html`

---

## 📦 Danh mục sản phẩm

| Danh mục | Số lượng | Làng nghề tiêu biểu |
|---|---|---|
| 🎨 Tranh dân gian | 5 | Đông Hồ (Bắc Ninh), Làng Sình (Huế) |
| 🧵 Lụa tơ tằm | 9 | Vạn Phúc (Hà Nội), Hội An (Quảng Nam) |
| 🏺 Gốm sứ | 7 | Bát Tràng (Hà Nội), Bình Dương |
| 🪵 Đồ tượng gỗ | 3 | Đồng Kỵ (Bắc Ninh), Huế |
| 🎁 Quà tặng | 6 | Nhiều vùng miền |

---

## 🤖 Chat Engine — Cách hoạt động

VietSoul AI không gọi bất kỳ API nào. Toàn bộ logic xử lý trong browser:

```
Người dùng nhập câu hỏi
        ↓
_vsIntent() — Phân tích từ khoá
        ↓
_vsReply()  — Lấy reply từ knowledge base
        ↓
Inject data thật (tên, nghệ nhân, story, giá...)
        ↓
Hiển thị với typing delay tự nhiên
        ↓
Gợi ý follow-up chips liên quan
```

**9 intent được nhận diện:** `process` · `material` · `preserve` · `meaning` · `price` · `buy` · `gift` · `green` · `custom` · `compare`

---

## 🌿 Green Tag System

Sản phẩm đạt Green Tag khi đáp ứng ít nhất 2 trong 4 tiêu chí:
- ♻️ Bao bì tái chế / không nhựa
- 🌱 Nguyên liệu tự nhiên tái tạo được
- 🚚 Eco-Delivery (bù đắp carbon)
- 🏭 Không xả thải trong sản xuất

---

## 👥 Đội ngũ

Dự án được phát triển trong khuôn khổ **cuộc thi / học phần thiết kế web** nhằm:
- Tôn vinh văn hoá thủ công truyền thống Việt Nam
- Ứng dụng công nghệ web hiện đại vào bảo tồn di sản
- Tạo cầu nối kinh tế số cho nghệ nhân làng nghề

---

## 📄 Licence

Dự án phi thương mại, phục vụ mục đích học tập và trình diễn.  
Hình ảnh sản phẩm thuộc quyền sở hữu của các nghệ nhân và làng nghề tương ứng.

---

<p align="center">
  Làm với ❤️ để tôn vinh di sản thủ công Việt Nam
  <br>
  <b>VietSoul</b> — <i>Mỗi sản phẩm là một câu chuyện</i>
</p>
