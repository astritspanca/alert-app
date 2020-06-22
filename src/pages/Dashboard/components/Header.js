import React, { useState, useContext } from 'react';
import { AuthContext } from '../../../shared/Context/auth-context';
import { useHistory } from 'react-router-dom';

const Header = props => {
    const [dropdown, setDropdown] = useState(false);
    const auth = useContext(AuthContext);
    const history = useHistory();

    const logoutHandler = () => {
        auth.logout();
        history.push('/login');
    }

    return (
        <div className="col-lg-12 dashboard-header-wrapper">
            <div className="row">
                <div className="container dashboard-header">
                    <div className="row">
                        <div className="col-6 app-logo">
                            <h3>PWD<span>RESET</span></h3>
                        </div>
                        <div className="col-6 user-menu">
                            <div className="user-data" onClick={() => setDropdown(true)}>
                                <h4 className="user-name">{auth.name}</h4>
                                <div className="avatar">AS</div>
                            </div>
                            {
                                dropdown && <button onClick={logoutHandler}>Logout</button>
                            }
                        </div>
                        <button className="add--more__button" onClick={() => props.openModal(1)}>+</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Header;