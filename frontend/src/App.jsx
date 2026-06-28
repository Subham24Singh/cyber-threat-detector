import { useMemo, useState } from 'react';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import DashboardPage from './pages/DashboardPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';

function App() {
  const [view, setView] = useState('login');
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState('Welcome to the threat detector.');

  const content = useMemo(() => {
    if (view === 'register') {
      return (
        <RegisterPage 
          onNavigate={setView} 
          onSuccess={(email) => { 
            setUser(email); 
            setMessage(`Welcome, ${email}! Account secured.`); 
            setView('dashboard'); 
          }} 
        />
      );
    }

    if (view === 'dashboard') {
      return <DashboardPage user={user} message={message} />;
    }

    return (
      <LoginPage 
        onNavigate={setView} 
        onSuccess={(email) => { 
          setUser(email); 
          setMessage(`Welcome back, ${email}! Scanning active.`); 
          setView('dashboard'); 
        }} 
      />
    );
  }, [message, user, view]);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 font-sans">
      <Navbar title="Cyber Threat Detector" />
      <div className="flex">
        {/* Sidebar only appears after login */}
        {view === 'dashboard' && <Sidebar onNavigate={setView} />}
        
        <main className={`flex-1 p-6 ${view !== 'dashboard' ? 'flex justify-center items-center' : ''}`}>
          {content}
        </main>
      </div>
    </div>
  );
}

export default App;