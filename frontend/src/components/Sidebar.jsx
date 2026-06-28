function Sidebar({ onNavigate }) {
  return (
    <aside className="sidebar">
      <button onClick={() => onNavigate('login')}>Login</button>
      <button onClick={() => onNavigate('register')}>Register</button>
      <button onClick={() => onNavigate('dashboard')}>Dashboard</button>
    </aside>
  );
}

export default Sidebar;
