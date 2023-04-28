import Navbar from './Navbar';
import Banner from './Banner';
import '../../css/largedevices/largedevices.css';
import '../../css/mediumdevices/mediumdevices.css';
import '../../css/smalldevices/smalldevices.css';
function Wrapper() {
  return (
      <>
         <div className='wrapper'>
          <Navbar />
          <Banner />
          </div>
    </>
  );
}

export default Wrapper;