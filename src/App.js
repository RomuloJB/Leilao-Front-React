import './App.css';
import Footer from './components/footer/Footer';
import Header from './components/header/Header';
import Calculadora from './pages/calculadora/Calculadora';
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
    <BrowserRouter>
      <Routes>
        <Route element={<RotaPrivadaLayout />}>
          <Route path="/" element={<PadraoLayout><Home /></PadraoLayout>} />
          <Route path="/perfil" element={<PadraoLayout><Perfil /></PadraoLayout>} />
        </Route>
        <Route path="/calculadora" element={<PadraoLayout><Calculadora /></PadraoLayout>} />
        <Route path="/cadastro" element={<PadraoLayout><Cadastro /></PadraoLayout>} />
        <Route path="/login" element={<PadraoLayout><Login /></PadraoLayout>} />
        <Route path="/recuperar-senha" element={<PadraoLayout><RecuperarSenha /></PadraoLayout>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;