import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { Auth } from './pages/Auth';
import { Produtos } from './pages/Produtos';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path='/' element={<Auth />} />
      
      <Route path='/produtos' element={<Produtos />} />
    </Routes>
  </BrowserRouter>
);
