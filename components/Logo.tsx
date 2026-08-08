export default function Logo() {
  return (
    <>
      <div className="logo-icon-wrapper">
        <svg width="34" height="34" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <path d="M12 52L52 12" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
          <path d="M12 12L52 52" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
          <circle cx="25" cy="25" r="2" fill="currentColor" />
          <circle cx="30" cy="30" r="2" fill="currentColor" />
          <circle cx="35" cy="35" r="2" fill="currentColor" />
          <circle cx="39" cy="25" r="2" fill="currentColor" />
          <circle cx="34" cy="30" r="2" fill="currentColor" />
          <circle cx="29" cy="35" r="2" fill="currentColor" />
        </svg>
      </div>
      <div className="logo-text">
        <span className="logo-title">HỒNG VIỆT</span>
        <span className="logo-subtitle">SÁO TRÚC & ÂM NHẠC DÂN TỘC</span>
      </div>
    </>
  );
}
