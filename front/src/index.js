import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { Produtos } from './pages/Produtos';
import { NovoProduto } from './pages/Produtos/novoProduto';
import { MostrarProduto } from './pages/Produtos/mostrarProduto';
import { Pedidos } from './pages/Pedidos';
import { NovoPedido } from './pages/Pedidos/novoPedido';
import { MostrarPedido } from './pages/Pedidos/mostrarPedido';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path='/' element={<Produtos />} />
      <Route path='/produtos/novo' element={<NovoProduto />} />
      <Route path='/produtos/mostrar/:id' element={<MostrarProduto />} />
      <Route path='/pedidos' element={<Pedidos />} />
      <Route path='/pedidos/novo' element={<NovoPedido />} />
      <Route path='/pedidos/mostrar/:id' element={<MostrarPedido />} />
    </Routes>
  </BrowserRouter>
);
