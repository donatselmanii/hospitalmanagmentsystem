import '../css/largedevices/largedevices.css';
import '../css/mediumdevices/mediumdevices.css';
import '../css/smalldevices/smalldevices.css';
import Wrapper from './homepagecomponents/Wrapper';
import AboutUs from './homepagecomponents/AboutUs';
import LearnMore from './homepagecomponents/LearnMore';
import Footer from './homepagecomponents/Footer';
function Homepage() {
  return (
      <> 

<Wrapper />
<AboutUs />
<LearnMore />
<Footer />
    </>
  );
}

export default Homepage;
