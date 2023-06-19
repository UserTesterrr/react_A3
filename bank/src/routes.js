import { Route, Routes } from "react-router-dom";
import Chamados from './usuarios/pages/index';

const Rotas = () => (
  <Routes>
      <Route path="/" element={<Chamados />}/> 
      <Route path="/chamados" element={<Chamados />}/> 
  </Routes>
);

export default Rotas;
