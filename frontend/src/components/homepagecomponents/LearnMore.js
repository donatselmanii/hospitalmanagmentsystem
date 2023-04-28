import '../../css/largedevices/largedevices.css';
import '../../css/mediumdevices/mediumdevices.css';
import '../../css/smalldevices/smalldevices.css';
import main from '../../img/learnmore/main.webp'

function LearnMore() {
  return (
    <>

          <div className="container">
              <main>
                  <div className="container-1">
                      <img src={main} alt="main"></img>
                  </div>
                  <div className="container-2">
                      <h2>Welcome to our clinic</h2>
                      <p>Subdue whales void god which living don't midst lesser yielding over lights whose. Cattle greater brought sixth fly den dry good tree isn't seed stars were.</p>
                      <p>Subdue whales void god which living don't midst lesser yielding over lights whose. Cattle greater brought sixth fly den dry good tree isn't seed stars were the boring.</p>
                      <button>learn more</button>
                  </div>
              </main>
          </div>
    </>
  );
}

export default LearnMore;