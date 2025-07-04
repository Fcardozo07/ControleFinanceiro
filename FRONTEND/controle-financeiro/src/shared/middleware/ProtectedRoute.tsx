import {Navigate, Outlet} from 'react-router-dom';

const ProtectedRoute = () => {

    const isAuthenticated = sessionStorage.getItem('id');

    return isAuthenticated ? <Outlet/> : <Navigate to="/tela-login"/>
}


export default ProtectedRoute;
