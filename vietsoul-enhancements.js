/* ═══════════════════════════════════════════════════════════════
   VIETSOUL ENHANCEMENTS JS — v4
   ═══════════════════════════════════════════════════════════════ */
(function () {
  'use strict';

  /* ── util ── */
  function ready(fn) {
    if (document.readyState !== 'loading') fn();
    else document.addEventListener('DOMContentLoaded', fn);
  }

  /* ════════════════════════════════════════════════════════════
     2. STORY MODE
  ════════════════════════════════════════════════════════════ */
  const CRAFT_STEPS = {
    default: [
      { n:'Chọn nguyên liệu',      d:'Nghệ nhân tuyển chọn kỹ từng nguyên liệu tự nhiên theo mùa.' },
      { n:'Sơ chế & chuẩn bị',     d:'Nguyên liệu được xử lý thủ công, không dùng hóa chất công nghiệp.' },
      { n:'Tạo hình & chế tác',     d:'Đôi tay nghệ nhân định hình sản phẩm qua nhiều công đoạn tỉ mỉ.' },
      { n:'Hoàn thiện & kiểm tra',  d:'Từng chi tiết được kiểm tra trước khi đến tay khách hàng.' }
    ],
    tranh: [
      { n:'Khắc khuôn gỗ',         d:'Nghệ nhân khắc ngược hoa văn lên gỗ thị — mỗi khuôn mất 2–4 tuần.' },
      { n:'Pha màu từ thảo mộc',    d:'Màu từ lá chàm, cây sơn, vỏ hến — hoàn toàn tự nhiên.' },
      { n:'In thủ công',            d:'Đặt khuôn lên giấy dó, lăn màu đều tay rồi bóc nhẹ nhàng.' },
      { n:'Phơi & đóng gói',        d:'Phơi bóng mát 24 giờ để màu ngấm sâu vào thớ giấy.' }
    ],
    gom: [
      { n:'Lọc & nhào đất sét',     d:'Đất lấy từ bờ sông, lọc qua 3 lớp để loại bỏ tạp chất.' },
      { n:'Tạo hình trên bàn xoay', d:'Đôi tay điêu luyện định hình từng chiếc trong 5–15 phút.' },
      { n:'Tráng men & trang trí',  d:'Vẽ hoa văn rồi nhúng men — men tro tạo màu không lặp lại.' },
      { n:'Nung lò',                d:'Nung ở 1.200°C trong 12–18 giờ. Mỗi mẻ là một cuộc phiêu lưu.' }
    ],
    lua: [
      { n:'Nuôi tằm & ươm tơ',      d:'Từ trứng tằm đến nhộng mất 25 ngày chăm sóc liên tục.' },
      { n:'Xe sợi & mắc go',        d:'Sợi tơ mảnh như tóc được xe đôi rồi mắc vào khung cửi.' },
      { n:'Dệt tay',                d:'Một người thợ dệt được 3–4m vải mỗi ngày.' },
      { n:'Nhuộm & giặt tự nhiên',  d:'Nhuộm chàm, củ nâu hoặc vỏ cây — không thải hóa chất.' }
    ]
  };

  function buildStoryHTML(p) {
    const steps = CRAFT_STEPS[p.category] || CRAFT_STEPS.default;
    const stepsHTML = steps.map((s, i) => `
      <div class="timeline-step">
        <div class="timeline-dot">${i+1}</div>
        <div class="timeline-content"><strong>${s.n}</strong><span>${s.d}</span></div>
      </div>${i < steps.length-1 ? '<div class="timeline-line"></div>' : ''}`).join('');
    const tagsHTML = (p.tags||[]).map(t => `<span class="story-green-tag">🌿 ${t}</span>`).join('');
    return `
      <div class="story-hero-overlay">
        <img class="story-hero" src="${p.img}" onerror="this.src='${p.fallback}'" alt="${p.name}">
      </div>
      <div class="story-body">
        <div class="story-tag">VietSoul · Câu Chuyện Nghệ Nhân</div>
        <div class="story-title">${p.name}</div>
        <div class="story-artist">✦ ${p.artist} — ${p.location}</div>
        <p class="story-text">"${p.story||'Mỗi sản phẩm là tác phẩm của đôi tay và tâm huyết nghệ nhân.'}"</p>
        <div class="story-timeline">
          <div class="story-timeline-title">Quy trình chế tác</div>
          ${stepsHTML}
        </div>
        ${tagsHTML ? `<div class="story-timeline-title" style="margin-bottom:10px;">Cam kết xanh</div><div class="story-green-tags">${tagsHTML}</div>` : ''}
      </div>`;
  }

  function initStoryOverlay() {
    if (document.getElementById('story-overlay')) return;
    const ov = document.createElement('div');
    ov.id = 'story-overlay';
    ov.innerHTML = `<div id="story-panel"><button id="story-close">✕</button><div id="story-content"></div></div>`;
    document.body.appendChild(ov);
    document.getElementById('story-close').addEventListener('click', closeStory);
    ov.addEventListener('click', e => { if (e.target === ov) closeStory(); });
    document.addEventListener('keydown', e => { if (e.key === 'Escape') closeStory(); });
    window.openStoryMode = function(id) {
      const p = (window.allProductsRef||[]).find(x => x.id === id);
      if (!p) return;
      document.getElementById('story-content').innerHTML = buildStoryHTML(p);
      ov.classList.add('open');
      document.body.style.overflow = 'hidden';
    };
  }
  function closeStory() {
    const ov = document.getElementById('story-overlay');
    if (ov) ov.classList.remove('open');
    document.body.style.overflow = '';
  }

  /* ════════════════════════════════════════════════════════════
     REVIEWS DATA
  ════════════════════════════════════════════════════════════ */
  const REVIEW_POOL = {
    tranh: [
      { name:'Nguyễn Thị Mai',    loc:'Hà Nội',    stars:5, text:'Tranh rất đẹp, màu sắc tươi sáng hơn ảnh nhiều. Đóng gói cẩn thận, giao nhanh. Mình sẽ quay lại mua tiếp!', date:'12/03/2025' },
      { name:'Trần Văn Khoa',     loc:'TP.HCM',    stars:5, text:'Mua tặng bố, ông rất thích. Nét khắc tinh xảo, giấy dó thật sự mịn và bền. Xứng đáng 5 sao.', date:'28/02/2025' },
      { name:'Lê Phương Anh',     loc:'Đà Nẵng',   stars:4, text:'Sản phẩm đúng mô tả, chất lượng tốt. Chỉ cần đóng gói thêm một lớp bảo vệ nữa là hoàn hảo.', date:'05/01/2025' },
    ],
    lua: [
      { name:'Phạm Minh Châu',    loc:'Hà Nội',    stars:5, text:'Lụa mềm mại, màu sắc đẹp không bị loang. Mặc vào rất mát và thoáng. Cực kỳ hài lòng!', date:'18/04/2025' },
      { name:'Đỗ Thị Hương',      loc:'Cần Thơ',   stars:5, text:'Mua khăn lụa tặng mẹ nhân ngày 20/10, mẹ mình thích lắm. Chất vải thật sự khác hoàn toàn với hàng chợ.', date:'20/10/2024' },
      { name:'Vũ Thành Nam',      loc:'Huế',       stars:4, text:'Vải dệt tay rõ nét, hoa văn đẹp. Màu sắc bền, giặt 3 lần không phai. Đóng gói bằng giấy kraft rất sang.', date:'07/03/2025' },
    ],
    gom: [
      { name:'Hoàng Thị Lan',     loc:'Hải Phòng', stars:5, text:'Gốm đẹp hơn ảnh rất nhiều! Men bóng đều, không có bong tróc. Dùng pha trà rất thú vị, hương trà thơm hơn hẳn.', date:'15/05/2025' },
      { name:'Ngô Văn Tùng',      loc:'Hà Nội',    stars:5, text:'Mua bộ ấm chén cho văn phòng, đồng nghiệp ai cũng khen. Chất lượng xứng đáng với giá tiền.', date:'02/04/2025' },
      { name:'Bùi Thị Ngọc',      loc:'Quảng Nam', stars:4, text:'Sản phẩm đẹp, giao hàng đúng hẹn. Mình thích cái cách shop đóng gói bằng rơm tự nhiên, rất thân thiện môi trường.', date:'19/02/2025' },
    ],
    gift: [
      { name:'Trịnh Hải Yến',     loc:'TP.HCM',    stars:5, text:'Mua làm quà công ty, ban giám đốc rất ấn tượng. Quà tặng vừa ý nghĩa vừa độc đáo, không đâu có hàng như thế này.', date:'08/04/2025' },
      { name:'Đinh Quốc Bảo',     loc:'Hà Nội',    stars:5, text:'Mua tặng đối tác nước ngoài, họ thích lắm và hỏi mua thêm. Đây đúng là loại quà đại diện cho văn hóa Việt.', date:'14/03/2025' },
      { name:'Lý Thị Thu Thảo',   loc:'Đà Lạt',    stars:5, text:'Sản phẩm tinh tế, màu sắc đẹp. Giao hàng cẩn thận, hộp đựng sang trọng. Sẽ mua lại cho mùa Tết.', date:'29/01/2025' },
    ],
    dotuong: [
      { name:'Phùng Văn Đức',     loc:'Huế',       stars:5, text:'Tượng được chạm khắc rất tỉ mỉ, gỗ thơm và chắc chắn. Đặt trên bàn thờ rất uy nghiêm. Cảm ơn nghệ nhân!', date:'22/03/2025' },
      { name:'Nguyễn Mỹ Linh',    loc:'Hà Nội',    stars:5, text:'Mua làm quà tặng ông nội, ông rất xúc động. Sản phẩm có tâm, làm đúng theo truyền thống, không qua loa như nhiều nơi khác.', date:'10/02/2025' },
      { name:'Cao Thị Thanh Nga',  loc:'Bình Định', stars:4, text:'Đường nét chạm khắc sắc nét, bề mặt gỗ được xử lý kỹ. Màu sơn tự nhiên, không bị bay mùi. Rất hài lòng.', date:'05/05/2025' },
    ],
    default: [
      { name:'Lê Thị Bình',       loc:'Hà Nội',    stars:5, text:'Sản phẩm rất đẹp, chất lượng vượt mong đợi. Đóng gói cẩn thận, giao hàng đúng hẹn. Sẽ giới thiệu cho bạn bè!', date:'01/04/2025' },
      { name:'Nguyễn Thanh Tùng', loc:'TP.HCM',    stars:5, text:'Hàng thủ công thật sự khác biệt so với hàng công nghiệp. Cảm nhận được sự tâm huyết của nghệ nhân trong từng sản phẩm.', date:'15/03/2025' },
      { name:'Trần Ngọc Hà',      loc:'Đà Nẵng',   stars:4, text:'Sản phẩm tốt, nhìn thấy rõ nét thủ công qua từng chi tiết. Giá hợp lý so với chất lượng. Mình mua lần này là lần thứ 3 rồi.', date:'20/02/2025' },
    ]
  };

  const RATING_DIST = {
    tranh:   [68,22,7,2,1], lua:     [72,18,6,3,1],
    gom:     [75,16,6,2,1], gift:    [70,20,6,3,1],
    dotuong: [73,18,6,2,1], default: [69,20,7,3,1]
  };

  function buildReviewsHTML(p) {
    const reviews = REVIEW_POOL[p.category] || REVIEW_POOL.default;
    const dist    = RATING_DIST[p.category]  || RATING_DIST.default;
    const total   = parseInt(String(p.sold||'0').replace(/[K.]/g,'')) || 300;
    const reviewCount = Math.min(total, 480) + Math.floor(Math.random()*40);
    const avg     = (4.6 + Math.random()*0.3).toFixed(1);
    const barsHTML = [5,4,3,2,1].map((star,i) => {
      const pct = dist[i];
      return `<div class="vs-review-bar-row">
        <span class="vs-review-bar-label">${star}★</span>
        <div class="vs-review-bar-track"><div class="vs-review-bar-fill" style="width:${pct}%"></div></div>
        <span class="vs-review-bar-count">${pct}%</span>
      </div>`;
    }).join('');
    const starsStr = n => '★'.repeat(n) + '☆'.repeat(5-n);
    const cardsHTML = reviews.map(r => `
      <div class="vs-review-card">
        <div class="vs-review-header">
          <div>
            <span class="vs-review-name">${r.name}</span>
            <span class="vs-review-location">· ${r.loc}</span>
            <span class="vs-review-verified">✓ Đã mua</span>
          </div>
          <span class="vs-review-stars">${starsStr(r.stars)}</span>
        </div>
        <div class="vs-review-text">${r.text}</div>
        <div class="vs-review-date">${r.date}</div>
      </div>`).join('');
    return `
      <div id="vs-reviews">
        <div class="vs-reviews-title">Đánh giá từ khách hàng đã mua</div>
        <div class="vs-review-summary">
          <div>
            <div class="vs-review-avg">${avg}</div>
            <div style="color:#C8960C;font-size:13px;margin:2px 0;">★★★★★</div>
            <div class="vs-review-avg-label">${reviewCount.toLocaleString('vi')} đánh giá</div>
          </div>
          <div class="vs-review-bar">${barsHTML}</div>
        </div>
        ${cardsHTML}
      </div>`;
  }

  /* Patch openProductDetail — guarded, wraps ONCE only */
  /* ── Size & Color data theo category ── */
  const VS_VARIANTS = {
    lua: {
      sizes:  ['XS','S','M','L','XL','XXL'],
      colors: [
        { name:'Đỏ son',     hex:'#C0392B' },
        { name:'Xanh rêu',   hex:'#4A7C59' },
        { name:'Vàng nghệ',  hex:'#D4A017' },
        { name:'Tím hoa',    hex:'#7B4FA0' },
        { name:'Trắng ngà',  hex:'#F5F0E8' },
        { name:'Đen',        hex:'#1A1A1A' },
      ]
    },
    tranh: {
      sizes:  ['20×30 cm','30×40 cm','40×60 cm','50×70 cm','60×90 cm'],
      colors: [
        { name:'Nguyên bản',  hex:'#C8960C' },
        { name:'Nền đỏ son',  hex:'#8B0000' },
        { name:'Nền xanh lam',hex:'#1A4A7A' },
        { name:'Nền đen',     hex:'#1A1A1A' },
      ]
    },
    gom: {
      sizes:  ['Mini (100ml)','Nhỏ (250ml)','Vừa (500ml)','Lớn (1L)','Bộ 2 chiếc','Bộ 4 chiếc'],
      colors: [
        { name:'Men trắng',   hex:'#F0EDE8' },
        { name:'Men celadon', hex:'#ACB48A' },
        { name:'Men tro',     hex:'#6B6560' },
        { name:'Men nâu',     hex:'#6B3A2A' },
        { name:'Xanh cobalt', hex:'#1E3A6E' },
      ]
    },
    gift: {
      sizes:  ['Hộp S','Hộp M','Hộp L','Hộp Premium'],
      colors: [
        { name:'Đỏ truyền thống', hex:'#8B0000' },
        { name:'Vàng hoàng gia',  hex:'#C8960C' },
        { name:'Xanh ngọc',       hex:'#2A7A6A' },
        { name:'Nâu kraft',       hex:'#7A5230' },
      ]
    },
    dotuong: {
      sizes:  ['10 cm','15 cm','20 cm','30 cm','50 cm'],
      colors: [
        { name:'Gỗ tự nhiên',  hex:'#A0522D' },
        { name:'Sơn son đỏ',   hex:'#8B0000' },
        { name:'Sơn vàng son', hex:'#C8960C' },
        { name:'Sơn đen bóng', hex:'#1A1A1A' },
      ]
    },
    default: {
      sizes:  ['Nhỏ','Vừa','Lớn'],
      colors: [
        { name:'Tự nhiên',  hex:'#C8960C' },
        { name:'Truyền thống', hex:'#8B0000' },
        { name:'Hiện đại',  hex:'#2A5A8A' },
      ]
    }
  };

  function buildVariantHTML(p) {
    const v = VS_VARIANTS[p.category] || VS_VARIANTS.default;
    const sizeOpts = v.sizes.map((s, i) =>
      `<button class="vs-size-opt${i===0?' active':''}" data-size="${s}">${s}</button>`
    ).join('');
    const colorOpts = v.colors.map((c, i) =>
      `<button class="vs-color-opt${i===0?' active':''}" data-color="${c.name}"
        title="${c.name}"
        style="background:${c.hex};${c.hex==='#F5F0E8'||c.hex==='#F0EDE8'?'border:1.5px solid #ccc;':''}">
        <span class="vs-color-check">✓</span>
      </button>`
    ).join('');
    return `
      <div id="vs-variants" class="vs-variants-wrap">
        <div class="vs-variant-block">
          <div class="vs-variant-label">
            Kích cỡ: <strong id="vs-size-val">${v.sizes[0]}</strong>
          </div>
          <div class="vs-size-grid">${sizeOpts}</div>
        </div>
        <div class="vs-variant-block">
          <div class="vs-variant-label">
            Màu sắc: <strong id="vs-color-val">${v.colors[0].name}</strong>
          </div>
          <div class="vs-color-grid">${colorOpts}</div>
        </div>
      </div>`;
  }

  function attachVariantEvents() {
    // Size
    document.querySelectorAll('.vs-size-opt').forEach(btn => {
      btn.addEventListener('click', function() {
        document.querySelectorAll('.vs-size-opt').forEach(b => b.classList.remove('active'));
        this.classList.add('active');
        const label = document.getElementById('vs-size-val');
        if (label) label.textContent = this.dataset.size;
      });
    });
    // Color
    document.querySelectorAll('.vs-color-opt').forEach(btn => {
      btn.addEventListener('click', function() {
        document.querySelectorAll('.vs-color-opt').forEach(b => b.classList.remove('active'));
        this.classList.add('active');
        const label = document.getElementById('vs-color-val');
        if (label) label.textContent = this.dataset.color;
      });
    });
  }

  function getSelectedVariants() {
    const sizeBtn  = document.querySelector('.vs-size-opt.active');
    const colorBtn = document.querySelector('.vs-color-opt.active');
    return {
      size:  sizeBtn  ? sizeBtn.dataset.size   : '',
      color: colorBtn ? colorBtn.dataset.color : ''
    };
  }

  let _pdPatchDone = false;
  function patchProductDetail() {
    if (_pdPatchDone) return;
    if (typeof window.openProductDetail !== 'function') { setTimeout(patchProductDetail, 150); return; }
    _pdPatchDone = true;
    const orig = window.openProductDetail;

    /* Override addToCartFromDetail để kèm size/color */
    const origAddToCart = window.addToCartFromDetail;
    window.addToCartFromDetail = function() {
      const p = window.currentDetailProduct;
      if (!p) return;
      const { size, color } = getSelectedVariants();
      const suffix = [size, color].filter(Boolean).join(' · ');
      const displayName = suffix ? `${p.name} (${suffix})` : p.name;
      window.addToCartById(p.id, displayName, p.price, p.img, p.fallback);
    };

    window.openProductDetail = function(id) {
      orig(id);
      setTimeout(() => {
        const p = (window.allProductsRef||[]).find(x => x.id === id);

        // Remove stale injections
        document.querySelectorAll('.btn-story-mode, #vs-variants, #vs-personalize-btn').forEach(b => b.remove());

        const summary = document.getElementById('product-summary');
        if (!summary) return;

        // Inject variant selector right after summary
        if (p) {
          summary.insertAdjacentHTML('afterend', buildVariantHTML(p));
          attachVariantEvents();
        }

        // Personalize button (sau variants, trước story)
        const variantEl = document.getElementById('vs-variants');
        const insertAfter = variantEl || summary;

        const pzBtn = document.createElement('button');
        pzBtn.id = 'vs-personalize-btn';
        pzBtn.innerHTML = '✏️ Cá nhân hoá theo yêu cầu';
        pzBtn.onclick = () => openPersonalizeModal(p);
        insertAfter.parentNode.insertBefore(pzBtn, insertAfter.nextSibling);

        // Story button (sau personalize)
        const btn = document.createElement('button');
        btn.className = 'btn-story-mode';
        btn.innerHTML = '📖 Câu chuyện sản phẩm';
        btn.onclick = () => window.openStoryMode(id);
        pzBtn.parentNode.insertBefore(btn, pzBtn.nextSibling);

        // Reviews
        if (p) {
          const storyTab = document.getElementById('tab-story');
          if (storyTab) {
            const oldRev = storyTab.querySelector('#vs-reviews');
            if (oldRev) oldRev.remove();
            storyTab.insertAdjacentHTML('beforeend', buildReviewsHTML(p));
          }
        }
      }, 120);
    };
  }

  /* ════════════════════════════════════════════════════════════
     3. DIGITAL CERTIFICATE
  ════════════════════════════════════════════════════════════ */
  function initCertificate() {
    if (document.getElementById('cert-overlay')) return;
    const ov = document.createElement('div');
    ov.id = 'cert-overlay';
    ov.innerHTML = `
      <div id="cert-card">
        <div class="cert-bg">
          <div class="cert-frame">
            <div class="cert-header">
              <div class="cert-seal">🎋</div>
              <div class="cert-pre-title">VietSoul · Giấy Chứng Nhận</div>
              <div class="cert-main-title">Di sản Việt Nam</div>
              <div class="cert-divider"></div>
            </div>
            <div id="cert-body-content" class="cert-body"></div>
            <div class="cert-footer">
              <div class="cert-qr">⭐</div>
              <div class="cert-sign">
                <span class="cert-sign-name">VietSoul</span>
                <span class="cert-sign-role">Xác nhận chính thống</span>
              </div>
            </div>
          </div>
        </div>
        <div class="cert-actions">
          <button class="cert-btn cert-btn-secondary" id="cert-close-btn">Đóng</button>
          <button class="cert-btn cert-btn-primary" id="cert-share-btn">📸 Lưu ảnh</button>
          <button class="cert-btn cert-btn-primary" id="cert-home-btn">🏠 Trang chủ</button>
        </div>
      </div>`;
    document.body.appendChild(ov);
    document.getElementById('cert-close-btn').addEventListener('click', closeCert);
    ov.addEventListener('click', e => { if (e.target === ov) closeCert(); });
    document.getElementById('cert-share-btn').addEventListener('click', () => {
      alert('💡 Dùng tính năng chụp màn hình (Ctrl+Shift+S hoặc PrtScn) để lưu chứng chỉ!');
    });
    document.getElementById('cert-home-btn').addEventListener('click', () => {
      closeCert();
      if (typeof window.showPage === 'function') window.showPage('home');
    });
    window.showCertificate = function(data) {
      const { orderId, items, total, customerName } = data;
      const product = items && items[0] && window.allProductsRef
        ? window.allProductsRef.find(p => p.id === (items[0].id || items[0]))
        : null;
      const dateStr = new Date().toLocaleDateString('vi-VN', { day:'2-digit', month:'2-digit', year:'numeric' });
      document.getElementById('cert-body-content').innerHTML = `
        <div class="cert-row"><span class="cert-label">Mã đơn hàng</span><span class="cert-value highlight">#${orderId}</span></div>
        <div class="cert-row"><span class="cert-label">Khách hàng</span><span class="cert-value">${customerName||'Quý khách VietSoul'}</span></div>
        ${product ? `
          <div class="cert-row"><span class="cert-label">Sản phẩm</span><span class="cert-value">${product.name}</span></div>
          <div class="cert-row"><span class="cert-label">Nghệ nhân</span><span class="cert-value highlight">${product.artist}</span></div>
          <div class="cert-row"><span class="cert-label">Vùng sản xuất</span><span class="cert-value">${product.location}</span></div>
        ` : `<div class="cert-row"><span class="cert-label">Số sản phẩm</span><span class="cert-value">${items?items.length:0} sản phẩm</span></div>`}
        <div class="cert-row"><span class="cert-label">Tổng giá trị</span><span class="cert-value highlight">${total||'—'} ₫</span></div>
        <div class="cert-row"><span class="cert-label">Ngày xác nhận</span><span class="cert-value">${dateStr}</span></div>
        <div class="cert-row"><span class="cert-label">Cam kết</span><span class="cert-value" style="color:#2e7d32">🌿 Sản phẩm thủ công chính gốc</span></div>`;
      ov.classList.add('open');
    };
  }
  function closeCert() {
    const ov = document.getElementById('cert-overlay');
    if (ov) ov.classList.remove('open');
  }

  /* ════════════════════════════════════════════════════════════
     CHECKOUT MULTI-STEP FLOW
     
     Bước 1: Thông tin giao hàng  (panel-1 đã có)
     Bước 2: Phương thức thanh toán (panel-2 đã có) + panel chi tiết inject
     Bước 3: Xác nhận đơn hàng    (panel-3 inject mới)
     → Đặt hàng → Certificate
     
     Toàn bộ điều hướng qua JS, không đụng index.html
  ════════════════════════════════════════════════════════════ */
  let _checkoutFlowDone = false;

  function initCheckoutFlow() {
    if (_checkoutFlowDone) return;
    if (typeof window.placeOrder !== 'function' || !document.getElementById('ck-panel-1')) {
      setTimeout(initCheckoutFlow, 200); return;
    }
    _checkoutFlowDone = true;

    /* ── 1. Thêm nút "Tiếp tục" vào panel-1 ── */
    const panel1 = document.getElementById('ck-panel-1');
    const panel2 = document.getElementById('ck-panel-2');
    if (!panel1 || !panel2) return;

    // Nút Tiếp tục bước 1
    const btn1 = document.createElement('button');
    btn1.id = 'ck-btn-1';
    btn1.className = 'w-full py-4 rounded-2xl font-black text-sm uppercase tracking-widest transition-all duration-300 hover:-translate-y-1 mt-2';
    btn1.style.cssText = 'background:linear-gradient(135deg,#8B0000,#C8960C);color:#fff;box-shadow:0 8px 28px rgba(139,0,0,0.3);';
    btn1.textContent = 'Tiếp tục → Chọn thanh toán';
    btn1.addEventListener('click', () => goToStep(2));
    panel1.after(btn1);

    /* ── 2. Thêm chi tiết vào từng lựa chọn thanh toán ── */
    // COD detail
    const codDetail = document.createElement('div');
    codDetail.id = 'pay-cod-detail';
    codDetail.className = 'vs-pay-detail';
    codDetail.innerHTML = `
      <div class="vs-pay-detail-inner">
        <div class="vs-pay-detail-icon">🚚</div>
        <div>
          <div class="vs-pay-detail-title">Thanh toán khi nhận hàng (COD)</div>
          <div class="vs-pay-detail-desc">Bạn chỉ thanh toán khi shipper giao hàng tận tay. Áp dụng toàn quốc, không phụ phí.</div>
          <div class="vs-pay-detail-note">✓ Kiểm tra hàng trước khi nhận &nbsp;·&nbsp; ✓ Miễn phí COD</div>
        </div>
      </div>`;
    document.getElementById('pay-cod').after(codDetail);

    // Bank detail
    const bankDetail = document.createElement('div');
    bankDetail.id = 'pay-bank-detail';
    bankDetail.className = 'vs-pay-detail';
    bankDetail.style.display = 'none';
    bankDetail.innerHTML = `
      <div class="vs-pay-detail-inner">
        <div class="vs-pay-detail-icon">🏦</div>
        <div style="width:100%">
          <div class="vs-pay-detail-title">Thông tin chuyển khoản</div>
          <div class="vs-bank-info">
            <div class="vs-bank-row"><span>Ngân hàng</span><strong>Vietcombank (VCB)</strong></div>
            <div class="vs-bank-row"><span>Số tài khoản</span><strong class="vs-copy" onclick="vsCopyText('1234567890','Đã sao chép STK!')">1234 5678 90 &nbsp;<span class="vs-copy-icon">⧉</span></strong></div>
            <div class="vs-bank-row"><span>Chủ tài khoản</span><strong>CONG TY VIET SOUL</strong></div>
            <div class="vs-bank-row"><span>Nội dung CK</span><strong class="vs-copy" id="vs-bank-content" onclick="vsCopyText(document.getElementById('vs-bank-content').textContent,'Đã sao chép nội dung!')">VSSOUL <span id="vs-bank-order">######</span> &nbsp;<span class="vs-copy-icon">⧉</span></strong></div>
          </div>
          <div class="vs-pay-detail-note">✓ Xác nhận trong 15 phút sau chuyển khoản</div>
        </div>
      </div>`;
    document.getElementById('pay-bank').after(bankDetail);

    // Momo detail
    const momoDetail = document.createElement('div');
    momoDetail.id = 'pay-momo-detail';
    momoDetail.className = 'vs-pay-detail';
    momoDetail.style.display = 'none';
    momoDetail.innerHTML = `
      <div class="vs-pay-detail-inner">
        <div class="vs-pay-detail-icon">📱</div>
        <div style="width:100%">
          <div class="vs-pay-detail-title">Thanh toán qua ví điện tử</div>
          <div class="vs-bank-info">
            <div class="vs-bank-row"><span>MoMo</span><strong class="vs-copy" onclick="vsCopyText('0901234567','Đã sao chép!')">0901 234 567 &nbsp;<span class="vs-copy-icon">⧉</span></strong></div>
            <div class="vs-bank-row"><span>ZaloPay</span><strong class="vs-copy" onclick="vsCopyText('0901234567','Đã sao chép!')">0901 234 567 &nbsp;<span class="vs-copy-icon">⧉</span></strong></div>
            <div class="vs-bank-row"><span>VNPay QR</span><strong>Quét mã tại bước xác nhận</strong></div>
          </div>
          <div class="vs-pay-detail-note">✓ Xác nhận tức thì sau khi thanh toán</div>
        </div>
      </div>`;
    document.getElementById('pay-momo').after(momoDetail);

    /* ── 3. Nút Tiếp tục bước 2 ── */
    const btn2 = document.createElement('button');
    btn2.id = 'ck-btn-2';
    btn2.className = 'w-full py-4 rounded-2xl font-black text-sm uppercase tracking-widest transition-all duration-300 hover:-translate-y-1 mt-2';
    btn2.style.cssText = 'background:linear-gradient(135deg,#8B0000,#C8960C);color:#fff;box-shadow:0 8px 28px rgba(139,0,0,0.3);display:none;';
    btn2.textContent = 'Tiếp tục → Xác nhận đơn hàng';
    btn2.addEventListener('click', () => goToStep(3));
    panel2.after(btn2);

    // Nút quay lại bước 1
    const back1 = document.createElement('button');
    back1.id = 'ck-back-1';
    back1.className = 'w-full py-2 text-xs font-bold uppercase tracking-widest mt-1';
    back1.style.cssText = 'color:rgba(139,0,0,0.45);display:none;background:none;border:none;cursor:pointer;';
    back1.textContent = '← Quay lại thông tin';
    back1.addEventListener('click', () => goToStep(1));
    btn2.after(back1);

    /* ── 4. Panel 3 — Xác nhận đơn hàng ── */
    const panel3 = document.createElement('div');
    panel3.id = 'ck-panel-3';
    panel3.className = 'rounded-3xl p-8';
    panel3.style.cssText = 'background:white;border:1px solid rgba(139,0,0,0.08);box-shadow:0 4px 20px rgba(139,0,0,0.06);display:none;';
    panel3.innerHTML = `
      <h3 class="font-heading font-black text-base uppercase tracking-widest mb-6" style="color:#8B0000;">✅ Xác nhận đơn hàng</h3>
      <div id="ck-confirm-content" class="space-y-3"></div>`;
    back1.after(panel3);

    // Nút đặt hàng ngay (thay CTA gốc)
    const ctaOrig = document.querySelector('button[onclick="placeOrder()"]');
    if (ctaOrig) {
      ctaOrig.id = 'ck-btn-final';
      ctaOrig.style.display = 'none';
      ctaOrig.removeAttribute('onclick');
      ctaOrig.addEventListener('click', finalizeOrder);
    }

    // Nút đặt hàng mới (thêm sau panel3, ban đầu ẩn)
    const btnFinal = document.createElement('button');
    btnFinal.id = 'ck-btn-3';
    btnFinal.className = 'w-full py-5 rounded-2xl font-black text-sm uppercase tracking-widest transition-all duration-300 hover:-translate-y-1';
    btnFinal.style.cssText = 'background:linear-gradient(135deg,#C8960C,#FFD700);color:#1a0a00;box-shadow:0 8px 32px rgba(200,150,12,0.35);display:none;';
    btnFinal.innerHTML = '✨ Xác nhận đặt hàng ngay';
    btnFinal.addEventListener('click', finalizeOrder);
    panel3.after(btnFinal);

    // Nút quay lại bước 2
    const back2 = document.createElement('button');
    back2.id = 'ck-back-2';
    back2.className = 'w-full py-2 text-xs font-bold uppercase tracking-widest mt-1';
    back2.style.cssText = 'color:rgba(139,0,0,0.45);display:none;background:none;border:none;cursor:pointer;';
    back2.textContent = '← Quay lại thanh toán';
    back2.addEventListener('click', () => goToStep(2));
    btnFinal.after(back2);

    /* ── 5. Override selectPayMethod để show/hide detail ── */
    const origSPM = window.selectPayMethod;
    window.selectPayMethod = function(method) {
      origSPM && origSPM(method);
      ['cod','bank','momo'].forEach(m => {
        const d = document.getElementById('pay-' + m + '-detail');
        if (d) d.style.display = (m === method) ? 'block' : 'none';
      });
    };

    /* ── 6. Helper: copy to clipboard ── */
    window.vsCopyText = function(text, msg) {
      navigator.clipboard && navigator.clipboard.writeText(text).catch(() => {});
      const toast = document.createElement('div');
      toast.textContent = msg || 'Đã sao chép!';
      toast.style.cssText = 'position:fixed;bottom:80px;left:50%;transform:translateX(-50%);background:#1a0800;color:#FFD700;padding:8px 20px;border-radius:99px;font-size:11px;font-weight:900;z-index:9999;pointer-events:none;';
      document.body.appendChild(toast);
      setTimeout(() => toast.remove(), 1800);
    };

    /* ── 7. goToStep ── */
    function goToStep(step) {
      // Validate bước 1
      if (step >= 2) {
        const name  = (document.getElementById('ck-name') || {}).value || '';
        const phone = (document.getElementById('ck-phone') || {}).value || '';
        const addr  = (document.getElementById('ck-addr') || {}).value || '';
        if (!name.trim() || !phone.trim() || !addr.trim()) {
          if (typeof window.showCartToast === 'function') window.showCartToast('Vui lòng điền đầy đủ thông tin giao hàng!');
          return;
        }
      }

      // Cập nhật step indicator
      [1, 2, 3].forEach(n => {
        const el = document.getElementById('ck-step-' + n);
        if (!el) return;
        const circle = el.querySelector('div');
        const label  = el.querySelector('span');
        if (n < step) {
          // Đã hoàn thành
          el.style.opacity = '1';
          if (circle) { circle.style.background = '#2e7d32'; circle.style.color = 'white'; circle.style.border = 'none'; }
          if (label)  label.style.color = '#2e7d32';
        } else if (n === step) {
          // Đang ở
          el.style.opacity = '1';
          if (circle) { circle.style.background = '#8B0000'; circle.style.color = 'white'; circle.style.border = 'none'; }
          if (label)  label.style.color = '#8B0000';
        } else {
          // Chưa đến
          el.style.opacity = '0.4';
          if (circle) { circle.style.background = 'transparent'; circle.style.color = 'rgba(139,0,0,0.5)'; circle.style.border = '1.5px solid rgba(139,0,0,0.3)'; }
          if (label)  label.style.color = 'rgba(139,0,0,0.5)';
        }
      });

      // Hiển thị đúng panels & buttons
      const show = id => { const el = document.getElementById(id); if (el) el.style.display = ''; };
      const hide = id => { const el = document.getElementById(id); if (el) el.style.display = 'none'; };

      if (step === 1) {
        show('ck-panel-1'); show('ck-btn-1');
        hide('ck-panel-2'); hide('ck-btn-2'); hide('ck-back-1');
        hide('ck-panel-3'); hide('ck-btn-3'); hide('ck-back-2');
      } else if (step === 2) {
        show('ck-panel-1');
        show('ck-panel-2'); show('ck-btn-2'); show('ck-back-1');
        hide('ck-btn-1');
        hide('ck-panel-3'); hide('ck-btn-3'); hide('ck-back-2');
        // Show COD detail by default nếu chưa chọn gì
        window.selectPayMethod(getSelectedPayMethod());
      } else if (step === 3) {
        hide('ck-panel-1');
        hide('ck-panel-2'); hide('ck-btn-2'); hide('ck-back-1');
        show('ck-panel-3'); show('ck-btn-3'); show('ck-back-2');
        renderConfirmPanel();
      }

      // Scroll to top of checkout
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    function getSelectedPayMethod() {
      const r = document.querySelector('input[name="pay"]:checked');
      return r ? r.value : 'cod';
    }

    function renderConfirmPanel() {
      const name  = (document.getElementById('ck-name')  || {}).value || '';
      const phone = (document.getElementById('ck-phone') || {}).value || '';
      const addr  = (document.getElementById('ck-addr')  || {}).value || '';
      const city  = (document.getElementById('ck-city')  || {}).value || '';
      const note  = (document.getElementById('ck-note')  || {}).value || '';
      const total = (document.getElementById('ck-total') || {}).textContent || '';
      const method = getSelectedPayMethod();
      const methodLabel = { cod: '💵 Thanh toán khi nhận hàng', bank: '🏦 Chuyển khoản ngân hàng', momo: '📱 Ví điện tử' };

      // Cập nhật nội dung chuyển khoản với tên
      const bcEl = document.getElementById('vs-bank-order');
      if (bcEl && name) bcEl.textContent = name.split(' ').pop().toUpperCase();

      const rows = [
        ['Người nhận', name],
        ['Điện thoại', phone],
        ['Địa chỉ', addr + (city ? ', ' + city : '')],
        note ? ['Ghi chú', note] : null,
        ['Thanh toán', methodLabel[method] || method],
        ['Tổng tiền', `<strong style="color:#8B0000;font-size:15px;">${total}</strong>`],
      ].filter(Boolean);

      const container = document.getElementById('ck-confirm-content');
      if (!container) return;
      container.innerHTML = rows.map(([k, v]) => `
        <div class="vs-confirm-row">
          <span class="vs-confirm-label">${k}</span>
          <span class="vs-confirm-value">${v}</span>
        </div>`).join('') + `
        <div class="vs-confirm-pledge">
          🌿 Đơn hàng được đóng gói bằng <strong>vật liệu tái chế</strong>, giao trong 2–5 ngày làm việc.
        </div>`;
    }

    /* ── 8. Finalize order (gọi orig placeOrder + certificate) ── */
    const origPlaceOrder = window.placeOrder;
    function finalizeOrder() {
      origPlaceOrder();
      setTimeout(() => {
        const nameEl  = document.getElementById('ck-name');
        const totalEl = document.getElementById('ck-total');
        const items   = window.cartItems ? [...window.cartItems] : [];
        const orderId = 'VS' + Date.now().toString().slice(-6);
        setTimeout(() => {
          if (window.showCertificate) window.showCertificate({
            orderId, items,
            total: totalEl ? totalEl.textContent : '',
            customerName: nameEl ? nameEl.value : ''
          });
        }, 900);
      }, 200);
    }

    /* ── 9. Khởi động: bước 1 ── */
    goToStep(1);

    // Reset về bước 1 mỗi khi mở lại trang checkout
    const origShowPage = window.showPage;
    if (typeof origShowPage === 'function' && !origShowPage._ckReset) {
      const wrapped = function(pid) {
        origShowPage(pid);
        if (pid === 'checkout') setTimeout(() => goToStep(1), 50);
      };
      wrapped._ckReset = true;
      wrapped._vsPatched = origShowPage._vsPatched;
      window.showPage = wrapped;
    }
  }

  function patchPlaceOrder() { initCheckoutFlow(); }

  /* ════════════════════════════════════════════════════════════
     5. HERO WARM TINT
  ════════════════════════════════════════════════════════════ */
  function applyWarmTint() {
    const tints = [
      'linear-gradient(160deg,rgba(255,140,50,.09) 0%,rgba(139,0,0,.11) 100%)',
      'linear-gradient(160deg,rgba(180,60,0,.07) 0%,rgba(90,0,40,.09) 100%)',
      'linear-gradient(160deg,rgba(200,130,0,.07) 0%,rgba(139,0,0,.09) 100%)'
    ];
    document.querySelectorAll('#home-page > section:first-child a.relative').forEach((banner, i) => {
      if (banner.querySelector('.vs-warm-layer')) return;
      const layer = document.createElement('div');
      layer.className = 'vs-warm-layer';
      layer.style.background = tints[i % 3];
      banner.appendChild(layer);
    });
  }

  /* ════════════════════════════════════════════════════════════
     6. MARQUEE
  ════════════════════════════════════════════════════════════ */
  const MARQUEE_ITEMS = ['Bát Tràng','Vạn Phúc','Kim Bồng','Làng Sình','Đồng Kỵ','Thanh Tiên','Phù Lãng','Bao La','Xuân La','Chu Đậu','Mù Cang Chải','A Lưới','Đông Triều','Tây Hồ','Thuận Hóa'];
  function injectMarquee() {
    if (document.getElementById('vs-marquee')) return;
    const hero = document.querySelector('#home-page > section:first-child');
    if (!hero) return;
    const track = [...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map(n => `<span class="marquee-item">${n}</span>`).join('');
    const strip = document.createElement('div');
    strip.id = 'vs-marquee'; strip.className = 'marquee-strip';
    strip.innerHTML = `<div class="marquee-track">${track}</div>`;
    hero.insertAdjacentElement('afterend', strip);
  }

  /* ════════════════════════════════════════════════════════════
     7. INK REVEAL — FIXED (handles already-visible cards)
  ════════════════════════════════════════════════════════════ */
  function initInkReveal() {
    const io = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('vs-ink-visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -10px 0px' });

    const DYNAMIC_GRIDS = ['bestseller-grid', 'featured-products-grid', 'marketplace-grid'];

    function attachToGrid(gridId) {
      const grid = document.getElementById(gridId);
      if (!grid) return;

      function processNode(node) {
        if (node.nodeType !== 1) return;
        if (node.classList.contains('vs-ink-reveal')) return;
        node.classList.add('vs-ink-reveal');
        // Already in viewport → reveal immediately, no need to wait for scroll
        const r = node.getBoundingClientRect();
        if (r.top < window.innerHeight && r.bottom > 0) {
          requestAnimationFrame(() => node.classList.add('vs-ink-visible'));
        } else {
          io.observe(node);
        }
      }

      // Process cards already rendered in grid
      Array.from(grid.children).forEach(processNode);

      new MutationObserver(mutations => {
        mutations.forEach(m => m.addedNodes.forEach(processNode));
      }).observe(grid, { childList: true });
    }

    DYNAMIC_GRIDS.forEach(attachToGrid);
    window._vsReobserve = () => DYNAMIC_GRIDS.forEach(attachToGrid);
  }

  /* ════════════════════════════════════════════════════════════
     8. MAGAZINE REGION PANEL
  ════════════════════════════════════════════════════════════ */
  const REGION_DATA = {
    bac:       { name:'Miền Bắc',   emoji:'🌲', color:'1b5e20', img:'https://puluongexcursions.com/wp-content/uploads/2023/03/image5-16.png',                                                     quote:'"Hà Nội 36 phố phường — nơi mỗi con phố là một nghề thủ công."',        villages:['Bát Tràng','Vạn Phúc','Đồng Kỵ','Xuân La','Chu Đậu','Phù Lãng'], locations:['Hà Nội','Bắc Ninh','Hải Dương','Hà Giang','Yên Bái','Quảng Ninh'] },
    trung:     { name:'Miền Trung', emoji:'☀️', color:'7a5c00', img:'https://dulich3mien.vn/wp-content/uploads/2022/07/Du-lich-mien-Trung-8.jpg',                                                   quote:'"Hội An — ánh đèn lồng và linh hồn làng nghề còn nguyên vẹn nhất."',     villages:['Làng Sình','Kim Bồng','Thanh Hà','Tây Hồ','Thuận Hóa'],               locations:['Huế','Đà Nẵng','Hội An','Quảng Nam'] },
    taynguyen: { name:'Tây Nguyên', emoji:'🏔️', color:'7a2500', img:'https://datviettour.com.vn/uploads/images/tin-tuc/Tin-mo-ta-danh-muc-tour/tay-nguyen/Tay-nguyen-1.jpg',                     quote:'"Cao nguyên đất đỏ — thổ cẩm kể chuyện đại ngàn qua từng sợi chỉ."',     villages:['Buôn Ma Thuột','Pleiku','Kon Tum','A Lưới'],                            locations:['Gia Lai','Đắk Lắk','Lâm Đồng','A Lưới, Huế'] },
    nam:       { name:'Miền Nam',   emoji:'🌊', color:'6a0026', img:'https://media.vneconomy.vn/images/upload/2021/07/09/tp-hcm.jpeg',                                                             quote:'"Sông nước đồng bằng — nơi lá buông dệt thành túi, lục bình thành đệm."', villages:['Bao La','Đồng Tháp','An Giang','Bến Tre'],                              locations:['TP.HCM','Cần Thơ','An Giang','Đồng Tháp'] }
  };

  function buildMagPanel(key) {
    const r = REGION_DATA[key];
    if (!r) return '';
    const prods = (window.allProductsRef || [])
      .filter(p => r.locations.some(l => p.location && p.location.includes(l.split(',')[0].trim())))
      .slice(0, 6);
    const pg = prods.map(p => `
      <div class="mag-product-card" onclick="window.openProductDetail&&window.openProductDetail(${p.id})">
        <img class="mag-product-img" src="${p.img}" onerror="this.src='${p.fallback}'" alt="${p.name}">
        <div class="mag-product-info">
          <div class="mag-product-name">${p.name}</div>
          <div class="mag-product-price">${p.price}₫</div>
        </div>
      </div>`).join('');
    const vg = r.villages.map(v => `<span class="mag-village-tag">🏘 ${v}</span>`).join('');
    return `
      <div class="mag-panel">
        <div class="mag-hero">
          <img src="${r.img}" onerror="this.src='https://placehold.co/640x200/${r.color}/fff?text=${encodeURIComponent(r.name)}'" alt="${r.name}">
          <div class="mag-hero-overlay" style="background:linear-gradient(to top,rgba(0,0,0,.72) 0%,transparent 60%)">
            <div class="mag-region-name">${r.emoji} ${r.name}</div>
            <div class="mag-pull-quote">${r.quote}</div>
          </div>
        </div>
        <div class="mag-body">
          <div class="mag-section-label">Làng nghề nổi tiếng</div>
          <div class="mag-villages">${vg}</div>
          <div class="mag-section-label">Sản phẩm đặc trưng</div>
          <div class="mag-product-grid">${pg || '<p style="font-size:11px;color:#9a7a60;grid-column:1/-1">Đang cập nhật...</p>'}</div>
          <button class="mag-view-all" onclick="window.showPage&&window.showPage('products')">Xem tất cả sản phẩm ${r.name} →</button>
        </div>
      </div>`;
  }

  let _selPatch = false;
  function patchSelectRegion() {
    if (_selPatch) return;
    if (typeof window.selectRegion !== 'function') { setTimeout(patchSelectRegion, 300); return; }
    _selPatch = true;
    const orig = window.selectRegion;
    window.selectRegion = function(key) {
      orig(key);
      const r = REGION_DATA[key];
      if (!r) return;
      const prev = document.getElementById('vs-mag-hero');
      if (prev) prev.remove();
      const header = document.getElementById('map-region-header');
      if (!header) return;
      const hero = document.createElement('div');
      hero.id = 'vs-mag-hero';
      hero.style.cssText = 'position:relative;overflow:hidden;height:150px;margin:-24px -24px 16px;flex-shrink:0;';
      const fallbackUrl = 'https://placehold.co/640x150/' + r.color + '/fff?text=' + encodeURIComponent(r.name);
      hero.innerHTML = `
        <img src="${r.img}" onerror="this.src='${fallbackUrl}'" alt="${r.name}"
          style="width:100%;height:100%;object-fit:cover;display:block;">
        <div style="position:absolute;inset:0;background:linear-gradient(to top,rgba(0,0,0,.65) 0%,transparent 55%);
          display:flex;align-items:flex-end;padding:12px 16px;">
          <span style="font-family:'SVN Agency FB','Playfair Display',serif;font-size:26px;font-weight:900;
            color:white;text-transform:uppercase;text-shadow:0 2px 10px rgba(0,0,0,.5);">
            ${r.emoji} ${r.name}
          </span>
        </div>`;
      header.insertBefore(hero, header.firstChild);
      const desc = document.getElementById('map-region-desc');
      if (desc && r.quote) {
        desc.textContent = r.quote.replace(/[\u201c\u201d""]/g, '');
        desc.style.fontStyle = 'italic';
        desc.style.color = '#7a5c44';
        desc.style.fontSize = '11px';
      }
    };
  }

  


  /* ════════════════════════════════════════════════════════════
     9. CARD HOVER OVERLAY + PARALLAX SCROLL

     THIẾT KẾ:
     - Card luôn hiển thị bình thường (không ẩn gì cả)
     - Hover → overlay trượt lên từ dưới, hiện story + tags + nút
     - Parallax nhẹ khi scroll tạo chiều sâu
     - Không đụng opacity/ink-reveal, không clone, không backface
  ════════════════════════════════════════════════════════════ */

  function injectCardEffectCSS() {
    if (document.getElementById('vs-card-fx-style')) return;
    const s = document.createElement('style');
    s.id = 'vs-card-fx-style';
    s.textContent = `
      /* Card wrapper — giữ nguyên layout, chỉ thêm overflow:hidden */
      .vs-card-fx {
        position: relative;
        overflow: hidden;
        border-radius: inherit;
        will-change: transform;
      }

      /* Overlay trượt lên từ dưới */
      .vs-card-overlay {
        position: absolute;
        inset: 0;
        background: linear-gradient(
          to top,
          rgba(15,3,0,.98) 0%,
          rgba(25,5,0,.93) 35%,
          rgba(35,7,0,.72) 58%,
          rgba(10,2,0,.18) 78%,
          transparent 100%
        );
        transform: translateY(100%);
        transition: transform .38s cubic-bezier(.4,0,.2,1);
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
        padding: 14px 12px 12px;
        box-sizing: border-box;
        z-index: 3;
      }
      .vs-card-fx:hover .vs-card-overlay,
      .vs-card-fx.tapped .vs-card-overlay {
        transform: translateY(0);
      }

      /* Nội dung overlay */
      .vs-ov-meta {
        font-size: 8px; font-weight: 900;
        letter-spacing: .18em; text-transform: uppercase;
        color: #C8960C;
        text-shadow: 0 1px 6px rgba(0,0,0,.9);
        margin-bottom: 4px;
      }
      .vs-ov-name {
        font-family: 'SVN Agency FB','Playfair Display',serif;
        font-size: 14px; font-weight: 900;
        color: #fff; text-transform: uppercase;
        line-height: 1.2; margin-bottom: 5px;
        text-shadow: 0 2px 10px rgba(0,0,0,1), 0 1px 3px rgba(0,0,0,.9);
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
      }
      .vs-ov-story {
        font-size: 9.5px; color: rgba(255,235,205,.85);
        line-height: 1.55; margin-bottom: 7px;
        text-shadow: 0 1px 4px rgba(0,0,0,.95);
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
      }
      .vs-ov-tags {
        display: flex; flex-wrap: wrap; gap: 3px;
        margin-bottom: 9px;
      }
      .vs-ov-tag {
        font-size: 7.5px; font-weight: 800;
        letter-spacing: .06em;
        background: rgba(200,150,12,.14);
        color: #C8960C;
        border: 1px solid rgba(200,150,12,.25);
        padding: 2px 6px; border-radius: 99px;
      }
      .vs-ov-footer {
        display: flex; align-items: center;
        justify-content: space-between; gap: 8px;
      }
      .vs-ov-price {
        font-family: 'SVN Agency FB','Playfair Display',serif;
        font-size: 15px; font-weight: 900;
        color: #FFD700; flex-shrink: 0;
      }
      .vs-ov-btn {
        flex: 1; padding: 7px 6px;
        background: linear-gradient(135deg,#8B0000,#C8960C);
        color: #fff; font-size: 9px; font-weight: 900;
        text-transform: uppercase; letter-spacing: .12em;
        border: none; border-radius: 7px; cursor: pointer;
        box-shadow: 0 3px 10px rgba(139,0,0,.45);
        transition: transform .15s, box-shadow .15s;
        white-space: nowrap;
      }
      .vs-ov-btn:hover {
        transform: translateY(-1px);
        box-shadow: 0 5px 14px rgba(139,0,0,.55);
      }

      /* Parallax wrapper */
      .vs-par { will-change: transform; }
    `;
    document.head.appendChild(s);
  }

  /* Thêm overlay vào card — không thay card, không clone */
  function addOverlayToCard(card, p) {
    // Đã xử lý rồi thì bỏ qua
    if (card.dataset.vsOv) return;
    card.dataset.vsOv = '1';

    // Bọc nội dung card trong wrapper giữ overflow:hidden
    card.classList.add('vs-card-fx', 'vs-par');

    const tags = (p.tags || []).slice(0, 3)
      .map(t => `<span class="vs-ov-tag">${t}</span>`).join('');

    const ov = document.createElement('div');
    ov.className = 'vs-card-overlay';
    ov.innerHTML = `
      <div class="vs-ov-meta">${p.artist} · ${p.location}</div>
      <div class="vs-ov-name">${p.name}</div>
      <div class="vs-ov-story">${p.story || 'Sản phẩm thủ công truyền thống Việt Nam.'}</div>
      <div class="vs-ov-tags">${tags}</div>
      <div class="vs-ov-footer">
        <span class="vs-ov-price">${p.price}₫</span>
        <button class="vs-ov-btn"
          onclick="event.stopPropagation();
                   if(window.openProductDetail) window.openProductDetail(${p.id})">
          Xem & Mua →
        </button>
      </div>`;

    card.appendChild(ov);

    // Mobile: tap để toggle overlay
    card.addEventListener('click', function(e) {
      if (!window.matchMedia('(hover:none)').matches) return;
      if (e.target.closest('.vs-ov-btn')) return;
      card.classList.toggle('tapped');
      e.stopPropagation();
    });
  }

  /* Lấy product id từ onclick="openProductDetail(N)" trong card */
  function getProductId(card) {
    const walk = el => {
      const m = (el.getAttribute('onclick') || '').match(/openProductDetail[^(]*\((\d+)\)/);
      if (m) return parseInt(m[1]);
      for (const ch of el.children) { const r = walk(ch); if (r) return r; }
      return null;
    };
    return walk(card);
  }

  function applyOverlayToGrid(gridId) {
    const grid = document.getElementById(gridId);
    if (!grid) return;

    function processCard(card) {
      if (card.dataset.vsOv) return;
      const pid = getProductId(card);
      if (!pid) return;
      const p = (window.allProductsRef || []).find(x => x.id === pid);
      if (!p) return;
      addOverlayToCard(card, p);
    }

    Array.from(grid.children).forEach(processCard);
    new MutationObserver(mutations => {
      mutations.forEach(m => m.addedNodes.forEach(node => {
        if (node.nodeType === 1) processCard(node);
      }));
    }).observe(grid, { childList: true });
  }

  /* Parallax scroll — rAF throttled */
  function initParallax() {
    if (window._vsParOn) return;
    window._vsParOn = true;
    let raf = false;
    window.addEventListener('scroll', () => {
      if (raf) return;
      raf = true;
      requestAnimationFrame(() => {
        const mid = window.innerHeight / 2;
        document.querySelectorAll('.vs-par').forEach((el, i) => {
          const rect  = el.getBoundingClientRect();
          const ratio = (rect.top + rect.height / 2 - mid) / window.innerHeight;
          const depth = 1 + (i % 3) * 0.06;
          el.style.transform = `translateY(${ratio * 14 * depth}px)`;
        });
        raf = false;
      });
    }, { passive: true });
  }

  function initCardEffects() {
    injectCardEffectCSS();
    function tryInit() {
      if (!window.allProductsRef || !window.allProductsRef.length) {
        setTimeout(tryInit, 200); return;
      }
      applyOverlayToGrid('featured-products-grid');
      applyOverlayToGrid('bestseller-grid');
      initParallax();
    }
    setTimeout(tryInit, 900);
  }

  /* ════════════════════════════════════════════════════════════
     10. PERSONALIZE MODAL — cá nhân hoá đặt theo yêu cầu
  ════════════════════════════════════════════════════════════ */

  const PZ_OPTIONS = {
    engrave:  { label: 'Khắc tên / thông điệp', icon: '🖋️', placeholder: 'VD: Tặng Mẹ yêu — Sinh nhật 2025' },
    color:    { label: 'Màu sắc đặc biệt',       icon: '🎨', placeholder: 'VD: Đỏ đậm kết hợp vàng son' },
    size:     { label: 'Kích thước tuỳ chỉnh',   icon: '📐', placeholder: 'VD: 25×35 cm hoặc size XL đặc biệt' },
    material: { label: 'Chất liệu theo yêu cầu', icon: '🌿', placeholder: 'VD: Gỗ hương, lụa tơ tằm hạng A' },
    wrap:     { label: 'Gói quà & thiệp',         icon: '🎁', placeholder: 'VD: Hộp gỗ + thiệp viết tay tiếng Việt' },
    other:    { label: 'Yêu cầu khác',            icon: '💬', placeholder: 'Mô tả chi tiết ý tưởng của bạn...' },
  };

  function initPersonalizeModal() {
    if (document.getElementById('vs-pz-overlay')) return;

    const ov = document.createElement('div');
    ov.id = 'vs-pz-overlay';
    ov.innerHTML = `
      <div id="vs-pz-panel">
        <div class="vs-pz-header">
          <div>
            <div class="vs-pz-pre">VietSoul · Đặt riêng</div>
            <div class="vs-pz-title">Cá nhân hoá sản phẩm</div>
          </div>
          <button id="vs-pz-close">✕</button>
        </div>

        <div id="vs-pz-product-bar"></div>

        <div class="vs-pz-body">
          <p class="vs-pz-desc">
            Chọn một hoặc nhiều tuỳ chọn bên dưới. Nghệ nhân sẽ liên hệ xác nhận trong <strong>24 giờ</strong>.
          </p>

          <div class="vs-pz-options" id="vs-pz-options">
            ${Object.entries(PZ_OPTIONS).map(([key, o]) => `
              <label class="vs-pz-opt" data-key="${key}">
                <input type="checkbox" class="hidden" value="${key}">
                <div class="vs-pz-opt-inner" id="vs-pz-opt-${key}">
                  <span class="vs-pz-opt-icon">${o.icon}</span>
                  <span class="vs-pz-opt-label">${o.label}</span>
                  <span class="vs-pz-opt-check">✓</span>
                </div>
                <div class="vs-pz-detail" id="vs-pz-detail-${key}">
                  <textarea class="vs-pz-textarea" id="vs-pz-txt-${key}"
                    placeholder="${o.placeholder}" rows="2"></textarea>
                </div>
              </label>`).join('')}
          </div>

          <div class="vs-pz-contact-block">
            <div class="vs-pz-section-title">📞 Thông tin liên hệ xác nhận</div>
            <div class="vs-pz-contact-grid">
              <div>
                <label class="vs-pz-field-label">Họ tên *</label>
                <input class="vs-pz-input" id="vs-pz-name" type="text" placeholder="Nguyễn Văn A">
              </div>
              <div>
                <label class="vs-pz-field-label">Số điện thoại *</label>
                <input class="vs-pz-input" id="vs-pz-phone" type="tel" placeholder="0901 234 567">
              </div>
            </div>
            <div style="margin-top:10px;">
              <label class="vs-pz-field-label">Thời gian cần nhận hàng</label>
              <input class="vs-pz-input" id="vs-pz-deadline" type="text" placeholder="VD: Trước 20/01/2026 — kịp Tết">
            </div>
          </div>
        </div>

        <div class="vs-pz-footer">
          <button id="vs-pz-cancel">Huỷ</button>
          <button id="vs-pz-submit">✨ Gửi yêu cầu cá nhân hoá</button>
        </div>
      </div>`;

    document.body.appendChild(ov);

    // Close
    document.getElementById('vs-pz-close').addEventListener('click', closePersonalizeModal);
    document.getElementById('vs-pz-cancel').addEventListener('click', closePersonalizeModal);
    ov.addEventListener('click', e => { if (e.target === ov) closePersonalizeModal(); });
    document.addEventListener('keydown', e => { if (e.key === 'Escape') closePersonalizeModal(); });

    // Toggle options — click để check/uncheck + hiện textarea
    document.querySelectorAll('.vs-pz-opt').forEach(label => {
      label.addEventListener('click', function(e) {
        if (e.target.tagName === 'TEXTAREA') return;
        const key    = this.dataset.key;
        const inner  = document.getElementById('vs-pz-opt-' + key);
        const detail = document.getElementById('vs-pz-detail-' + key);
        const cb     = this.querySelector('input[type="checkbox"]');
        const active = !cb.checked;
        cb.checked = active;
        inner.classList.toggle('active', active);
        detail.classList.toggle('open', active);
        if (active) setTimeout(() => document.getElementById('vs-pz-txt-' + key)?.focus(), 200);
      });
    });

    // Submit
    document.getElementById('vs-pz-submit').addEventListener('click', submitPersonalize);
  }

  function openPersonalizeModal(p) {
    initPersonalizeModal();
    const ov = document.getElementById('vs-pz-overlay');
    if (!ov) return;

    // Product bar
    const bar = document.getElementById('vs-pz-product-bar');
    if (bar && p) {
      bar.innerHTML = `
        <div class="vs-pz-product-bar">
          <img src="${p.img}" onerror="this.src='${p.fallback}'" alt="${p.name}">
          <div>
            <div class="vs-pz-product-name">${p.name}</div>
            <div class="vs-pz-product-sub">${p.artist} · ${p.location}</div>
          </div>
          <div class="vs-pz-product-price">${p.price}₫</div>
        </div>`;
    }

    // Reset form
    document.querySelectorAll('.vs-pz-opt input[type="checkbox"]').forEach(cb => {
      cb.checked = false;
      const key = cb.closest('.vs-pz-opt').dataset.key;
      document.getElementById('vs-pz-opt-' + key)?.classList.remove('active');
      document.getElementById('vs-pz-detail-' + key)?.classList.remove('open');
      const ta = document.getElementById('vs-pz-txt-' + key);
      if (ta) ta.value = '';
    });
    ['vs-pz-name','vs-pz-phone','vs-pz-deadline'].forEach(id => {
      const el = document.getElementById(id);
      if (el) el.value = '';
    });

    // Pre-fill name/phone from checkout if available
    const ckName  = document.getElementById('ck-name');
    const ckPhone = document.getElementById('ck-phone');
    if (ckName?.value)  document.getElementById('vs-pz-name').value  = ckName.value;
    if (ckPhone?.value) document.getElementById('vs-pz-phone').value = ckPhone.value;

    ov.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closePersonalizeModal() {
    const ov = document.getElementById('vs-pz-overlay');
    if (ov) ov.classList.remove('open');
    document.body.style.overflow = '';
  }

  function submitPersonalize() {
    const name  = (document.getElementById('vs-pz-name')  || {}).value || '';
    const phone = (document.getElementById('vs-pz-phone') || {}).value || '';
    if (!name.trim() || !phone.trim()) {
      const n = document.getElementById('vs-pz-name');
      const p = document.getElementById('vs-pz-phone');
      if (n) n.style.borderColor = '#8B0000';
      if (p) p.style.borderColor = '#8B0000';
      setTimeout(() => {
        if (n) n.style.borderColor = '';
        if (p) p.style.borderColor = '';
      }, 1800);
      if (typeof window.showCartToast === 'function')
        window.showCartToast('Vui lòng điền họ tên và số điện thoại!');
      return;
    }

    const selected = [];
    document.querySelectorAll('.vs-pz-opt input[type="checkbox"]:checked').forEach(cb => {
      const key = cb.closest('.vs-pz-opt').dataset.key;
      const txt = (document.getElementById('vs-pz-txt-' + key) || {}).value || '';
      const opt = PZ_OPTIONS[key];
      selected.push(`${opt.icon} ${opt.label}${txt ? ': ' + txt : ''}`);
    });

    // Show success state
    const btn = document.getElementById('vs-pz-submit');
    btn.textContent = '✅ Đã gửi yêu cầu!';
    btn.disabled = true;
    btn.style.background = 'linear-gradient(135deg,#2e7d32,#4caf50)';

    setTimeout(() => {
      closePersonalizeModal();
      // Reset button sau khi đóng
      setTimeout(() => {
        btn.textContent = '✨ Gửi yêu cầu cá nhân hoá';
        btn.disabled = false;
        btn.style.background = '';
      }, 500);
      if (typeof window.showCartToast === 'function')
        window.showCartToast('Yêu cầu đã gửi! Nghệ nhân sẽ liên hệ trong 24 giờ 🌿');
    }, 1200);
  }

  /* ════════════════════════════════════════════════════════════
     INIT
  ════════════════════════════════════════════════════════════ */
  ready(function() {
    // 1. DOM overlays — idempotent
    initStoryOverlay();
    initCertificate();
    initPersonalizeModal();

    // 2. Visual — no side effects
    applyWarmTint();
    injectMarquee();
    initInkReveal();
    initCardEffects();

    // 3. Function patches — all guarded, run after module scripts
    setTimeout(() => {
      patchProductDetail();
      patchPlaceOrder();
      patchSelectRegion();
    }, 600);

    // 4. Patch showPage to re-observe + re-flip on page switches
    const origSP = window.showPage;
    if (typeof origSP === 'function' && !origSP._vsPatched) {
      window.showPage = function(pid) {
        origSP(pid);
        if (pid === 'products' || pid === 'home') {
          setTimeout(() => {
            window._vsReobserve && window._vsReobserve();
          }, 300);
        }
      };
      window.showPage._vsPatched = true;
    }
  });

})();