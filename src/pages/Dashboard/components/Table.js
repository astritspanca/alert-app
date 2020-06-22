import React, { useState, useEffect, useContext, useCallback } from 'react';
import axios from '../../../axios';
import { AuthContext } from '../../../shared/Context/auth-context';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAddressBook, faTrashAlt } from '@fortawesome/free-solid-svg-icons';

const Table = props => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [alerts, setAlerts] = useState();
    
    const auth = useContext(AuthContext);
    const { updated } = props;

    const getAlerts = useCallback(async () => {
        setError(false);
        setLoading(true);
        try{
            let response = await axios({
                method: 'GET',
                url: '/alerts',
                headers: {
                    Authorization: 'Bearer ' + auth.token
                }
            })
            setError(false);
            setLoading(false);
            setAlerts(response.data);
        } catch (err) {
            setLoading(false);
            setError(false);
            setError(err.response?.data?.message || 'Something went wrong. Please try again!!!');
        }
    }, [auth.token]);
    
    useEffect(() => {
        getAlerts();
    }, [getAlerts, updated]);

    if(loading){
        return (
            <div className="container">
                <div className="row">
                    <div className="col-lg-12 dashboard-table">
                        <p>Loading all alerts...</p>
                    </div>
                </div>
            </div>
        )
    }
    
    if(error){
        return (
            <div className="container">
                <div className="row">
                    <div className="col-lg-12 dashboard-table">
                        <p>Failed to load alerts. Try refreshing the page...</p>
                    </div>
                </div>
            </div>
        )
    }

    const getDayDifference = (day) => {
        const oneDay = 24 * 60 * 60 * 1000;
        const firstDate = new Date(day);
        const secondDate = new Date();

        const diffDays = Math.round(Math.abs((firstDate - secondDate) / oneDay));
        if(diffDays === 0){
            return 'today';
        }
        else if(diffDays === 1){
            return 'yesterday'
        }
        else {
            return `${diffDays} days ago`;
        }
    }
    
    return (
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
                                <th scope="col"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                alerts?.map((el, index) => {
                                    return(
                                        <tr key={index}>
                                            <td className="event-td">
                                                <FontAwesomeIcon icon={faAddressBook} className="mr-3" />
                                                {el.alert_event.name}
                                            </td>
                                            <td className="event-td">{el.alert_method.name}</td>
                                            <td className="event-td">{el.value}</td>
                                            <td className="event-td">{getDayDifference(el.created_at)}</td>
                                            <td className="event-td text-center">
                                                <FontAwesomeIcon icon={faTrashAlt} className="delete-button" onClick={() => props.openModal(el.id)}/>
                                            </td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Table;