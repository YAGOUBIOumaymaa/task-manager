import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../auth/AuthContext";
import '../css/Navbar.css'; // <-- CSS séparé

const Navbar = () => {
  const { token, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="navbar-custom">
      <div style={{
        width: '100%',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '0 2rem'
      }}>
        {/* Titre */}
        <span
          className="navbar-brand-custom"
          onClick={() => navigate(-1)}
          style={{ cursor: 'pointer' }}
        >
          Task Manager
        </span>

        {/* Bouton Logout - SANS classe 'btn' de Bootstrap */}
        {token && (
          <button 
            className="btn-logout"
            onClick={handleLogout}
            style={{
              margin: 0,
              alignSelf: 'center'
            }}
          >
            Logout
          </button>
        )}
      </div>
    </nav>
  );
};
export default Navbar;




