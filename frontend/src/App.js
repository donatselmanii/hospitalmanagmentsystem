import './App.css';
import Homepage from './components/Homepage';
import Read from './components/homepagecomponents/Read';
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
        <Route path="/" element={<Homepage />} />
          <Route path="/Read" element={<Read />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
