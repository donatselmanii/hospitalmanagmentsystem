import '../../css/largedevices/largedevices.css';
import '../../css/mediumdevices/mediumdevices.css';
import '../../css/smalldevices/smalldevices.css';
import box1 from '../../img/aboutus/box1.webp';
import box2 from '../../img/aboutus/box2.webp';
import box3 from '../../img/aboutus/box3.webp';
import box4 from '../../img/aboutus/box4.webp';
function AboutUs() {
  return (
      <>
<div className="container">
                <section className="about-us">
                    <div className="box">
                        <img src={box1} alt="box1"></img>
                        <h3>ADVANCE TECHNOLOGY</h3>
                        <p>We offer a wide range of medical services, including emergency care, surgery, and rehabilitation</p> 
                    </div>
                    <div className="box">
                        <img src={box2}  alt="box2"></img>
                        <h3>COMFORTABLE PLACE</h3>
                        <p>We offer a wide range of medical services, including emergency care, surgery, and rehabilitation</p>
                    </div>
                    <div className="box">
                        <img src={box3}  alt="box3"></img>
                        <h3>QUALITY EQUIPMENT</h3>
                        <p>We offer a wide range of medical services, including emergency care, surgery, and rehabilitation</p>
                    </div>
                    <div className="box">
                        <img src={box4}  alt="box4"></img>
                        <h3>FRIENDLY STAFF</h3>
                        <p>We offer a wide range of medical services, including emergency care, surgery, and rehabilitation</p>
                    </div>
                </section>
        </div>
    </>
  );
}

export default AboutUs;