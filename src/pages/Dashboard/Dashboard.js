import React from 'react';
import './Dashboard.scss';

const Dashboard = () => {
    return (
       <div className="row">
            <div className="col-lg-12 dashboard-header-wrapper">
                <div className="row">
                    <div className="container dashboard-header">
                        <div className="row">
                            <div className="col-lg-6 app-logo">
                                <h3>PWD<span>RESET</span></h3>
                            </div>
                            <div className="col-lg-6 user-menu">
                                <div className="user-data">
                                    <h4 className="user-name">Astrit Spanca</h4>
                                    <div className="avatar">AS</div>
                                </div>
                            </div>
                            <button className="add--more__button">+</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container">
                <div className="row">
                    <div className="col-lg-12 dashboard-table">
                        
                    </div>
                </div>
            </div>
       </div>
    );
};

export default Dashboard;