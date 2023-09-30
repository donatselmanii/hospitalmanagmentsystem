import React from 'react'
import { BrowserRouter, Route, Link } from 'react-router-dom';
import '../css/largedevices/largedevices.css';
import '../css/mediumdevices/mediumdevices.module.css';
import '../css/smalldevices/smalldevices.module.css';
import Background from '../img/home/Background.jpg';
import box1 from '../img/aboutus/box1.webp';
import box2 from '../img/aboutus/box2.webp';
import box3 from '../img/aboutus/box3.webp';
import box4 from '../img/aboutus/box4.webp';
import main from '../img/learnmore/main.webp'
import logo from "../img/home/logo.webp";
import doctor1 from '../img/home/doctor1.webp';
import doctor2 from '../img/home/doctor1.webp';
import doctor3 from '../img/home/doctor1.webp';
import doctor4 from '../img/home/doctor1.webp';
import instagram1 from '../img/home/instagram1.webp';
import instagram2 from '../img/home/instagram2.webp';
import instagram3 from '../img/home/instagram3.webp';
import instagram4 from '../img/home/instagram4.webp';
import instagram5 from '../img/home/instagram5.webp';
import instagram6 from '../img/home/instagram6.webp';
import instagram7 from '../img/home/instagram7.webp';
import instagram8 from '../img/home/instagram8.webp';
import news1 from '../img/home/news1.webp';
import news2 from '../img/home/news2.webp';
import news3 from '../img/home/news3.webp';
import person1 from '../img/home/person1.png';
import person2 from '../img/home/person2.png';

function Home(){
    return(
    <>
     <div className="wrapper">
            <div className="mobile-menu">
                <i className="fa-solid fa-bars"></i>
            </div>
            <div className="navbar">
                <div className="container">
                    <header>
                        <div className="first-header">
                            <ul className="contact">
                                <li>
                                    <i className="fa-solid fa-mobile-screen"></i> 
                                    <h6> CALL US NOW! +1 305 708 2563 </h6>
                                </li>
                                <li>
                                    <i className="fa-regular fa-envelope"></i> 
                                    <h6> MEDICAL@EXAMPLE.COM </h6>
                                </li>
                                <li>
                                    <i className="fa-solid fa-location-dot"></i>
                                    <h6> FIND OUR LOCATION </h6>
                                </li>
                            </ul>
                            <ul className="social-media">
                                <li><a href="#"><i className="fa-brands fa-facebook-f"></i></a></li>
                                <li><a href="#"><i className="fa-brands fa-linkedin-in"></i></a></li>
                                <li><a href="#"><i className="fa-brands fa-twitter"></i></a></li>
                                <li><a href="#"><i className="fa-brands fa-instagram"></i></a></li>
                                <li><a href="#"><i className="fa-brands fa-vimeo-v"></i></a></li>
                            </ul>
                        </div>
                        <div className="second-header">
                            <div className="logo">
                                <img src={logo} alt="logo"/>
                            </div>
                            <nav>
                                <ul className="menu">
                                    <li><a href="#">HOME</a></li>
                                    <li><a href="/E-Pharmacy">E-PHARMACY</a></li>
                                    <li><Link to="/Register"><a href="#">REGISTER</a></Link></li>
                                    <li><Link to="/Login"><a href="#">LOGIN</a></Link></li>
                                </ul>
                            </nav>
                        </div>
                    </header>
                </div>
            </div>
            <section className="banner">
                <div className="container">
                    <div className="banner-text-left-side">
                        <div className="description">
                            <h4 className='h4-home'>Caring for better life</h4>
                        </div>
                        <div className="title-banner">
                            <h1 className='h1-home'>Leading the way in medical excellence</h1>
                        </div>
                        <div className="paragraph">
                            <p className='p1-home'>Earth greater grass for good. Place for divide evening yielding them that. Creeping beginning over gathered brought.</p>
                        </div>
                        <div className="button">
                            <button className='button-take'>take appointment</button>
                        </div>
                    </div>
                </div>
            </section>
        </div>
        <div className="container">
                <section className="about-us">
                    <div className="box">
                        <img src={box1} alt="box1"/>
                        <h3>ADVANCE TECHNOLOGY</h3>
                        <p>Creeping for female light years that lesser can't evening heaven isn't bearing tree appear</p> 
                    </div>
                    <div className="box">
                        <img src={box2} alt="box2"/>
                        <h3>COMFORTABLE PLACE</h3>
                        <p>Creeping for female light years that lesser can't evening heaven isn't bearing tree appear</p>
                    </div>
                    <div className="box">
                        <img src={box3} alt="box3"/>
                        <h3>QUALITY EQUIPMENT</h3>
                        <p>Creeping for female light years that lesser can't evening heaven isn't bearing tree appear</p>
                    </div>
                    <div className="box">
                        <img src={box4} alt="box4"/>
                        <h3>FRIENDLY STAFF</h3>
                        <p>Creeping for female light years that lesser can't evening heaven isn't bearing tree appear</p>
                    </div>
                </section>
        </div>
        <div className="container">
                <main>
                    <div className="container-1">
                        <img src={main} alt="main"/>
                    </div>
                    <div className="container-2">
                        <h2>Welcome to our clinic</h2>
                        <p>Subdue whales void god which living don't midst lesser yielding over lights whose. Cattle greater brought sixth fly den dry good tree isn't seed stars were.</p>
                        <p>Subdue whales void god which living don't midst lesser yielding over lights whose. Cattle greater brought sixth fly den dry good tree isn't seed stars were the boring.</p>
                        <button>learn more</button>
                    </div>
                </main>
        </div>
    <div className="background">
        <div className="container">
            <section className="popular-departement">
                <h2>Popular department</h2>
                <p>Green above he cattle god saw day multiply under fill in the cattle fowl a all, living,<br/> tree word link available in the service for subdue fruit.
                </p>
            </section>
    </div>
    </div>
       
        <div className="container">
                <section className="pacient-saying">
                    <div className="title">
                        <h2>Patient are saying</h2>
                        <p>Green above he cattle god saw day multiply under fill in the cattle fowl a all, living,<br/> tree word link available in the service for subdue fruit.
                        </p>
                    </div>
                    <div className="content">
                        <div className="box-left">
                            <div className="person">
                                <img src={person1} alt="person-1"/>
                                <div className="person-content">
                                    <h3>DAREN JHONSON</h3>
                                    <h5>Hp Specialist</h5>
                                    <p>Elementum libero hac leo integer. Risus hac road parturient feugiat. Litora cursus hendrerit bib elit Tempus inceptos posuere metus.</p>
                                </div>
                            </div>
                            <div className="person">
                                <img src={person2} alt="person-2"/>
                                <div className="person-content">
                                    <h3>BLACK HEIDEN</h3>
                                    <h5>Hp Specialist</h5>
                                    <p>Elementum libero hac leo integer. Risus hac road parturient feugiat. Litora cursus hendrerit bib elit Tempus inceptos posuere metus.</p>
                                </div>
                            </div>
                        </div>
                        <div className="box-right">
                            <form>
                                <h3>APPOINTMENT NOW</h3>
                                <input type="text" placeholder="Your Name"/>
                                <input type="email" placeholder="Your Email"/>
                                <input type="date"/>
                                <textarea required="" cols="30" rows="5" style={{ resize: 'none' }} placeholder="Message"></textarea>
                                <button>APPOINTMENT NOW</button>
                            </form>
                            <div className="square">

                            </div>
                        </div>
                    </div>
                  
                </section>
        </div>
        
    <div className="background">
    <div className="container">
    
</div>
<div className="background">
<div className="container">
            <section className="our-specialish">
                <div className="title">
                    <h2>Our specialish</h2>
                    <p>Green above he cattle god saw day multiply under fill in the cattle fowl a all, living,<br/> tree word link available in the service for subdue fruit.</p>
                </div>
                <div className="container-doc">
                    <div className="doc-box">
                        <img src={doctor1} alt="doc-1"/>
                        <div className="doctor-header">
                            <h3>ETHEL DAVIS</h3>
                            <h6>SR. FACULTY DATA SCIENCE</h6>
                        </div>
                        <p>If you are looking at blank cassettes on the web, you may be very confused at the.</p>
                        <ul className="social-media">
                            <li><a href="#"><i className="fa-brands fa-facebook-f"></i></a></li>
                            <li><a href="#"><i className="fa-brands fa-twitter"></i></a></li>
                            <li><a href="#"><i className="fa-brands fa-linkedin-in"></i></a></li>
                            <li><a href="#"><i className="fa-brands fa-pinterest"></i></a></li>
                        </ul>  
                    </div>
                    <div className="doc-box">
                            <img src={doctor2} alt="doc-2"/>
                            <div className="doctor-header">
                                <h3>DAND MORIES</h3>
                                <h6>SR. FACULTY PLASTIC SURGERY</h6>
                            </div>
                            <p>If you are looking at blank cassettes on the web, you may be very confused at the.</p>
                            <ul className="social-media">
                                <li><a href="#"><i className="fa-brands fa-facebook-f"></i></a></li>
                                <li><a href="#"><i className="fa-brands fa-twitter"></i></a></li>
                                <li><a href="#"><i className="fa-brands fa-linkedin-in"></i></a></li>
                                <li><a href="#"><i className="fa-brands fa-pinterest"></i></a></li>
                            </ul>
                    </div>
                    <div className="doc-box">
                            <img src={doctor3} alt="doc-3"/>
                            <div class="doctor-header">
                                <h3>ALIGN BOARD</h3>
                                <h6>SR. FACULTY DATA SCIENCE</h6>
                            </div>
                            <p>If you are looking at blank cassettes on the web, you may be very confused at the.</p>
                            <ul className="social-media">
                                <li><a href="#"><i className="fa-brands fa-facebook-f"></i></a></li>
                                <li><a href="#"><i className="fa-brands fa-twitter"></i></a></li>
                                <li><a href="#"><i className="fa-brands fa-linkedin-in"></i></a></li>
                                <li><a href="#"><i className="fa-brands fa-pinterest"></i></a></li>
                            </ul>
                    </div>
                    <div className="doc-box">
                            <img src={doctor4} alt="doc-4"/>
                            <div className="doctor-header">
                                <h3>JESON LIMIT</h3>
                                <h6>SR. FACULTY PLASTIC SURGERY</h6>
                            </div>
                            <p>If you are looking at blank cassettes on the web, you may be very confused at the.</p>
                            <ul className="social-media">
                                <li><a href="#"><i className="fa-brands fa-facebook-f"></i></a></li>
                                <li><a href="#"><i className="fa-brands fa-twitter"></i></a></li>
                                <li><a href="#"><i className="fa-brands fa-linkedin-in"></i></a></li>
                                <li><a href="#"><i className="fa-brands fa-pinterest"></i></a></li>
                            </ul>
                        </div>
                    </div>
            </section>
        </div>
        </div>
    </div>
        <div className="banner-2">
                <div className="container">
                    <section className="hotline">
                        <h2>Emergency hotline</h2>
                        <h1>(+01) – 256 567 550</h1>
                        <p>We provide 24/7 customer support. Please feel free to contact us <br/>for emergency case.</p>
                    </section>
                </div>
        </div>
            
        <div className="container">
                <section className="news">
                    <div className="title">
                        <h2>Recent medical news</h2>
                        <p>Green above he cattle god saw day multiply under fill in the cattle fowl a all, living, <br/>tree word link available in the service for subdue fruit.</p>
                    </div>
                    <div className="content">
                        <div className="box">
                            <div className="box-image">
                                <img src={news1} alt="new1"/>
                            </div>
                            <div className="box-date">
                                <p>22 July 2018</p>
                            </div>
                            <div className="box-content">
                                <h3><a href="#">CHIP TO MODEL COELIAC DISEASE</a></h3>
                                <p>Elementum libero hac leo integer. Risus hac part duriw feugiat litora cursus hendrerit bibendum per person on elit.Tempus inceptos posuere me.</p>
                            </div>
                            <div className="box-footer">
                                <a href="#">READ MORE <i className="fa-solid fa-arrow-right-long"></i></a>
                            </div>
                        </div>
                        <div className="box">
                            <div className="box-image">
                                <img src={news2}  alt="news2"/>
                            </div>
                            <div className="box-date">
                                <p>22 Oct 2018</p>
                            </div>
                            <div className="box-content">
                                <h3><a href="#">GALECTINS AN ANCIENT FASI FUTURE</a></h3>
                                <p>Elementum libero hac leo integer. Risus hac part duriw feugiat litora cursus hendrerit bibendum per person on elit.Tempus inceptos posuere me.</p>
                            </div>
                            <div className="box-footer">
                                <a href="#">READ MORE <i className="fa-solid fa-arrow-right-long"></i></a>
                            </div>
                        </div>
                        <div className="box">
                            <div className="box-image">
                                <img src={news3}  alt="news3"/>
                            </div>
                            <div className="box-date">
                                <p>22 Sep 2018</p>
                            </div>
                            <div className="box-content">
                                <h3><a href="#">GETTING THE MOST OUT OF THE CLARI</a></h3>
                                <p>Elementum libero hac leo integer. Risus hac part duriw feugiat litora cursus hendrerit bibendum per person on elit.Tempus inceptos posuere me.</p>
                            </div>
                            <div className="box-footer">
                                <a href="#">READ MORE <i className="fa-solid fa-arrow-right-long"></i></a>
                            </div>
                        </div>
                    </div>
                </section>
        </div>
        
        <footer>
            <div className="container">
                    <div className="container-1">
                        <div className="produkts">
                            <h3 className='h3-footer'>TOP PRODUCTS</h3>
                            <ul>
                                <li className='li-footer'><a href="#">Managed Website</a></li>
                                <li className='li-footer'><a href="#">Managed Reputation</a></li>
                                <li className='li-footer'><a href="#">Power Tools</a></li>
                                <li className='li-footer'><a href="#">Marketing Service</a></li>
                            </ul>
                        </div>
                        <div className="newsletter">
                            <h3 className='h3-footer'>NEWSLETTER</h3>
                            <p className='p-footer'>You can trust us. we only send promo offers, not a single.</p>
                            <form action="#">
                                <input type="email" name="email" placeholder="Your email here" />
                                <button className='button-take' type="submit">SUBSCRIBE NOW</button>
                            </form>
                        </div>
                        <div className="instagram">
                            <div className="title">
                                <h3 className='h3-footer'>INSTAGRAM FEED</h3>
                            </div>
                            <div className="image">
                                <img src={instagram1} alt="instagram-1"/>
                                <img src={instagram2} alt="instagram-3"/>
                                <img src={instagram3} alt="instagram-2"/>
                                <img src={instagram4} alt="instagram-5"/>
                                <img src={instagram5} alt="instagram-4"/>
                                <img src={instagram6} alt="instagram-7"/>
                                <img src={instagram7} alt="instagram-6"/>
                                <img src={instagram8} alt="instagram-8"/>
                            </div>
                        </div>
                    </div>
                    <div className="container-2">
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
    )
}

export default Home;