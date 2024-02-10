import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { Auth } from './pages/Auth';
import { Produtos } from './pages/Produtos';
import { NovoProduto } from './pages/Produtos/novoProduto';
import { Mostrar } from './pages/Produtos/mostrarProduto';
import { Pedidos } from './pages/Pedidos';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path='/' element={<Auth />} />
      <Route path='/produtos' element={<Produtos />} />
      <Route path='/produtos/novo' element={<NovoProduto />} />
      <Route path='/produtos/mostrar/:id' element={<Mostrar />} />
      <Route path='/pedidos' element={<Pedidos />} />
    </Routes>
  </BrowserRouter>
);
