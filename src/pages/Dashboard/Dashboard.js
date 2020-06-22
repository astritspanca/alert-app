import React from 'react';

import Header from './components/Header';
import Table from './components/Table';
import './Dashboard.scss';

const Dashboard = () => {
    return (
        <div id="dashboard">
            <div className="row">
                <Header/>
                <Table/>
            </div>
        </div>
    );
};

export default Dashboard;