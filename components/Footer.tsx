export default function Footer() {
  return (
    <footer>
      <div className="footer-container">
        <div className="footer-motto-wrapper">
          <div className="footer-icon-wrapper" aria-hidden="true">
            <i className="fa-solid fa-music" />
          </div>
          <div className="footer-motto">
            <span className="footer-title">
              ĐAM MÊ LÀM NÊN GIÁ TRỊ - CHẤT LƯỢNG TẠO NÊN UY TÍN
            </span>
            <span className="footer-subtitle">
              Đồng hành cùng bạn trên hành trình chạm đến âm nhạc truyền thống.
            </span>
          </div>
        </div>
        <a href="/#consultation" className="footer-cta" id="btn-consultation">
          <i className="fa-solid fa-phone" aria-hidden="true" />
          LIÊN HỆ TƯ VẤN
        </a>
      </div>
    </footer>
  );
}
