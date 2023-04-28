import '../../css/largedevices/largedevices.css';
import '../../css/mediumdevices/mediumdevices.css';
import '../../css/smalldevices/smalldevices.css';
import logo from "../img/50px.png";

function Navbar() {
  return (
    <>
    <nav className="navbar">
      <div className="logo">
        
        <img src={logo} alt="" />
        
      </div>
      <ul className="nav-links">
        <li>
           Lajmet
        </li>
        <li>
         Rreth nesh
        </li>
        <li>
         Na kontaktoni
        </li>
        <li>
            <i className="fa-solid fa-user"></i>
        </li>
      </ul>

    </nav>
    </>
  );
}

export default Navbar;
