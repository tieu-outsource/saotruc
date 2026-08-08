export default function Logo() {
  return (
    <>
      <div className="logo-icon-wrapper">
        <img
          src="/logo-icon.avif"
          alt=""
          width={164}
          height={220}
          style={{ height: 38, width: "auto" }}
        />
      </div>
      <div className="logo-text">
        <span className="logo-title">SÁO TRÚC ÂU CƠ</span>
        <span className="logo-subtitle">SÁO TRÚC & ÂM NHẠC DÂN TỘC</span>
      </div>
    </>
  );
}
