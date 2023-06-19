import React, { useEffect, useState } from 'react';
import Rotas from './routes';

function App() {
  const [liberador, setLiberador] = useState('');

  const handleChange = (event) => {
    setLiberador(event.target.value)
  };

  return (
  <>
      <div className="sidebar">
      <div className="logo-details">
      <img src="/images/PngItem_2078247.png" style={{width : "60px", paddingLeft : "15px"}}/>
      <span className="logo_name" style={{paddingLeft : "6px"}}>Contas Bancárias</span>
      </div>
      <ul className="nav-links">
      <li>
          <a href="/chamados">
          <i className='bx bx-collection' ></i>
          <span className="link_name">Usuários</span>
          </a>
      </li>
      <li>
      </li>
      </ul>
      </div>
      <Rotas />
  </>
  )
}

export default App;
