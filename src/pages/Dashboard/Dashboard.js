import React, { useState, useCallback } from 'react';

import Header from './components/Header';
import Table from './components/Table';
import CreateModal from './components/CreateModal';
import DeleteModal from './components/DeleteModal';
import './Dashboard.scss';

const Dashboard = () => {
    const [modal, setModal] = useState(false);
    const [updated, setUpdated] = useState(false);
    const openModalHandler = index => setModal(index);

    const closeModalHandler = useCallback((rerender) => {
        setModal(false);
        console.log(rerender);
        !!rerender && setUpdated(Math.random());
    }, []);

    return (
        <div className="row" id="dashboard">
            <CreateModal 
                open={modal === 1 ? true : false}
                close={closeModalHandler}
            />
            <DeleteModal 
                open={modal > 1 ? true : false}
                id={modal}
                close={closeModalHandler}
            />
            <Header openModal={openModalHandler}/>
            <Table 
                openModal={openModalHandler}
                updated={updated}
            />
        </div>
    );
};

export default Dashboard;