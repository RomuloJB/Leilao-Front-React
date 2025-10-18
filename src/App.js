import './App.css';
import Categoria from './components/categoria/Categoria';
import Home from './pages/home/Home';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import CadastrarProduto from './pages/cadastrar-produto/CadastrarProduto';
import Login from './pages/login/Login';
import RecuperarSenha from './pages/login/recuperar-senha/RecuperarSenha';
import RotaPrivadaLayout from './components/layout/RotaPrivadaLayout';
import PadraoLayout from './components/layout/PadraoLayout';
import Perfil from './pages/perfil/Perfil';
import CadastrarPerfil from './pages/cadastrar-perfil/CadastrarPerfil';
import QuemSomos from './pages/quem-somos/QuemSomos';


function App() {
  return (
    <div className="app-shell">
      <BrowserRouter>
        <div className="main">
          <Routes>
            <Route element={<RotaPrivadaLayout />}>
              <Route path="/login" element={<PadraoLayout><Login/></PadraoLayout>} />
              <Route path="/" element={<PadraoLayout><Home /></PadraoLayout>} />
              <Route path="/perfil" element={<PadraoLayout><Perfil /></PadraoLayout>} />
              <Route path="/cadastrar-produto" element={<PadraoLayout><CadastrarProduto /></PadraoLayout>} />
              <Route path="/categoria" element={<PadraoLayout><Categoria/></PadraoLayout>} />
              <Route path="/quem-somos" element={<PadraoLayout><QuemSomos/></PadraoLayout>} />
            </Route>

            <Route path="/cadastrar-perfil" element={<CadastrarPerfil />} />
            <Route path="/recuperar-senha" element={<RecuperarSenha />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}
export default App;