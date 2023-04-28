import '../../css/largedevices/largedevices.css';
import '../../css/mediumdevices/mediumdevices.css';
import '../../css/smalldevices/smalldevices.css';
import { BrowserRouter, Route, Link } from 'react-router-dom';
function Navbar() {
  return (
    <>
    <div className="navbar">
                <div className="container">
                    <header>
                        <div className="first-header">
                            <ul className="contact">
                                <li>
                                    <i className="fa-solid fa-mobile-screen"></i> 
                                    <h6> NA TELEFONONI! +383 48 802 827</h6>
                                </li>
                                <li>
                                    <i className="fa-regular fa-envelope"></i> 
                                    <h6> e-Shendetsia </h6>
                                </li>
                                <li>
                                    <i className="fa-solid fa-location-dot"></i>
                                    <h6> Gjeni vendndodhjen tone! </h6>
                                </li>
                            </ul>
                            
                        </div>
                        <div className="second-header">
                            <div className="logo">
                            
                            </div>
                            <nav>
                                <ul className="menu">
                                    <li><a href="#">HOME</a></li>
                                    <li><a href="#">DEPARTMENTS</a></li>
                                    <li><a href="#">DOCTORS</a></li>
                                    <li><a href="#">PAGES</a></li>
                                    <li><a href="#">CONTACT</a></li>
                                    <li><Link to="/Login"><a href="#">LOGIN</a></Link></li>
                                    
                                </ul>
                            </nav>
                        </div>
                    </header>
                </div>
            </div>
    </>
  );
}

export default Navbar;
