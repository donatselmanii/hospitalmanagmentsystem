import React from 'react';
<<<<<<< Updated upstream
import ReactDOM from 'react-dom/client';
=======
import ReactDOM from 'react-dom';
import './index.css';
>>>>>>> Stashed changes
import App from './App';



ReactDOM.render(<App />, document.getElementById('root'));

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);


