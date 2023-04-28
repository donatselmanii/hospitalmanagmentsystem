import '../../css/largedevices/largedevices.css';
import '../../css/mediumdevices/mediumdevices.css';
import '../../css/smalldevices/smalldevices.css';
function Footer() {
  return (
      <>
      <footer>
            <div className="container">
                    <div className="container-1">
                        <div className="produkts">
                            <h3>TOP PRODUCTS</h3>
                            <ul>
                                <li><a href="#">Managed Website</a></li>
                                <li><a href="#">Managed Reputation</a></li>
                                <li><a href="#">Power Tools</a></li>
                                <li><a href="#">Marketing Service</a></li>
                            </ul>
                        </div>
                        <div className="newsletter">
                            <h3>NEWSLETTER</h3>
                            <p>You can trust us. we only send promo offers, not a single.</p>
                            <form action="#">
                                <input type="email" name="email" placeholder="Your email here" />
                                <button type="submit">SUBSCRIPE NOW</button>
                            </form>
                        </div>
                        <div className="instagram">
                            <div className="title">
                                <h3>INSTAGRAM FEED</h3>
                            </div>
                            <div className="image">
                                <img src="./assets/img/instagram1.webp" alt="instagram-1"></img>
                                <img src="./assets/img/instagram2.webp" alt="instagram-2"></img>
                                <img src="./assets/img/instagram3.webp" alt="instagram-3"></img>
                                <img src="./assets/img/instagram4.webp" alt="instagram-4"></img>
                                <img src="./assets/img/instagram5.webp" alt="instagram-5"></img>
                                <img src="./assets/img/instagram6.webp" alt="instagram-6"></img>
                                <img src="./assets/img/instagram7.webp" alt="instagram-7"></img>
                                <img src="./assets/img/instagram8.webp" alt="instagram-8"></img>
                            </div>
                        </div>
                    </div>
                    <div className="container-2">
                        <div className="copyright">
                            
                        </div>
                        <div className="social">
                            <ul>
                                <li><a href="#"><i className="fa-brands fa-facebook-f"></i></a></li>
                                <li><a href="#"><i className="fa-brands fa-twitter"></i></a></li>
                                <li><a href="#"><i className="fa-brands fa-dribbble"></i></a></li>
                                <li><a href="#"><i className="fa-brands fa-behance"></i></a></li>
                            </ul>
                        </div>
                    </div>
                </div>
                </footer>
    </>
  );
}

export default Footer;
