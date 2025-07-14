
import {Routes, Route, Navigate} from 'react-router-dom';
import { ConsultaPorMes, Dashboard, NovoOrcamento, TelaCadastroUser, TelaEditarUser, TelaLogin } from '../pages/';
import ProtectedRoute from '../shared/middleware/ProtectedRoute';
import { CalculadorCDI } from '../pages/CalculadorCDI/CalculadorCDI';

export const AppRoutes = () => {
    return (

     

        <Routes>

            <Route element={<ProtectedRoute/>}>
            <Route path="/pagina-inicial" element={<Dashboard/>} /> 
            <Route path="/novo-orcamento" element={<NovoOrcamento/>} />
            <Route path="/consulta-mes" element={<ConsultaPorMes/>} />
            <Route path="/editar-user" element={<TelaEditarUser/>} />
            <Route path="/calcular-cdi" element={<CalculadorCDI/>} />
            "
            </Route>

   
            <Route path="/tela-login" element={<TelaLogin/>}/>
            <Route path="/cadastro-user" element={<TelaCadastroUser/>}/>             
            <Route path="*" element={<Navigate to= "/tela-login"/>} />
  
        </Routes>

    );
}

