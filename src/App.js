import './App.css';
import Calculadora from './pages/calculadora/Calculadora';
import Categoria from './components/categoria/Categoria';
import Home from './pages/home/Home';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Cadastro from './pages/cadastro/Cadastro';
import Login from './pages/login/Login';
import RecuperarSenha from './pages/recuperar-senha/RecuperarSenha';
import RotaPrivadaLayout from './components/layout/RotaPrivadaLayout';
import PadraoLayout from './components/layout/PadraoLayout';
import Perfil from './pages/perfil/Perfil';

function App() {
  return (
    <div className="app-shell">
      <BrowserRouter>
        <div className="main">
          <Routes>
            <Route element={<RotaPrivadaLayout />}>
              <Route path="/" element={<PadraoLayout><Home /></PadraoLayout>} />
              <Route path="/perfil" element={<PadraoLayout><Perfil /></PadraoLayout>} />
              <Route path="/cadastro" element={<PadraoLayout><Cadastro /></PadraoLayout>} />
              <Route path="/categoria" element={<PadraoLayout><Categoria/></PadraoLayout>} />
              <Route path="/calculadora" element={<PadraoLayout><Calculadora /></PadraoLayout>} />
            </Route>

            <Route path="/login" element={<Login />} />
            <Route path="/recuperar-senha" element={<RecuperarSenha />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}
export default App;