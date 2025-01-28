import React, { useContext } from 'react';
import AuthContext from '../context/AuthContext/AuthContext';
import { Navigate, useLocation } from 'react-router-dom';

const PrivateRoute = ({children, allowedRoles}) => {
    const {user, loading, role} = useContext(AuthContext);
    const location = useLocation();
    
    if(loading){
        return <div>loading...</div>
    }

    if(!user || !allowedRoles.includes(role)){
        return <Navigate to="/login" state={{ from: location}} replace></Navigate>
    }
    return children;
};

export default PrivateRoute;