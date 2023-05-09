export function Header() {
  return (
    <div className="header">
      <div className="clock">
        <h1 className="clock-date"></h1>
        <h1 className="clock-time"></h1>
      </div>
      <div className="search">
        <input type="text" name="search" id="search" />
      </div>
      <div className="theme">
        <button>Change Theme</button>
      </div>
    </div>
  );
}

export default Header;
