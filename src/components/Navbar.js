import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Navbar() {
  const token = localStorage.getItem('token');
  const navigate = useNavigate(); 

  const handleLogout = () => {
    
    localStorage.removeItem('token');
    navigate('/'); 
  };

  const navStyle = {
    backgroundColor: '#007bff', 
    padding: '10px 20px',
    display: 'flex',
    justifyContent: 'flex-end', 
  };

  const buttonStyle = {
    backgroundColor: 'transparent',
    border: 'none',
    color: '#fff',
    fontSize: '1.2rem',
    cursor: 'pointer',
  };

  const linkStyle = {
    color: '#fff',
    textDecoration: 'none',
    fontSize: '1.2rem',
    marginLeft: '20px', 
  };

  const linkHoverStyle = {
    color: '#ccc',
  };

  return (
    <nav style={navStyle}>
      <div>
        <ul style={{ listStyleType: 'none', padding: 0, margin: 0, display: 'flex', gap: '15px' }}>
          {token ? (
            <>
              <li>
                <Link 
                  to="/employees" 
                  style={linkStyle} 
                  onMouseEnter={(e) => e.target.style.color = linkHoverStyle.color} 
                  onMouseLeave={(e) => e.target.style.color = linkStyle.color}
                >
                  Employee List
                </Link>
              </li>
              <li>
                <button 
                  onClick={handleLogout} 
                  style={buttonStyle}
                  onMouseEnter={(e) => e.target.style.color = linkHoverStyle.color}
                  onMouseLeave={(e) => e.target.style.color = buttonStyle.color}
                >
                  Logout
                </button>
              </li>
            </>
          ) : (
            <li>
              <Link 
                to="/" 
                style={linkStyle} 
                onMouseEnter={(e) => e.target.style.color = linkHoverStyle.color} 
                onMouseLeave={(e) => e.target.style.color = linkStyle.color}
              >
                Login
              </Link>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
