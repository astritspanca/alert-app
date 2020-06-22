import React from 'react';
import './Dashboard.scss';

const Dashboard = () => {
    return (
        <div id="dashboard">
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
                            <table class="table">
                                <thead>
                                    <tr>
                                        <th scope="col">EVENT</th>
                                        <th scope="col">METHOD</th>
                                        <th scope="col">VALUE</th>
                                        <th scope="col">CREATED</th>
                                        <th scope="col">DELETE</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td className="event-td">ICON Mark</td>
                                        <td className="method-td">ICON Mark</td>
                                        <td className="value-td">ICON Mark</td>
                                        <td className="created-td">1 days ago</td>
                                        <td className="created-td">DELETE</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;