import React from 'react';

import 'bootswatch/dist/flatly/bootstrap.css';
import './custom.css';
import 'toastr/build/toastr.css';

import 'toastr/build/toastr.min.js';

import Navbar from './components/navbar';
import Rotas from './main/rotas';


function App() {
  return (
    <>
      <Navbar />
      <div className="container">
        <Rotas />
      </div>
    </>
  );
}

export default App;
