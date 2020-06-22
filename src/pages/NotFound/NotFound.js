import React, { useContext } from 'react';
import { AuthContext } from '../../shared/Context/auth-context';
import { useHistory } from 'react-router-dom';

const NotFound = () => {
    const auth = useContext(AuthContext);
    const history = useHistory();

    if(auth.token){
        history.push('/dashboard');
    }
    else
    {
        history.push('/login');
    }

    return <></>;
};

export default NotFound;