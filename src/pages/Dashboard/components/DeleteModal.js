import React, { useState, useContext } from 'react';
import { Modal } from 'react-bootstrap';
import { AuthContext } from '../../../shared/Context/auth-context';

import axios from '../../../axios';
import Error from '../../../shared/UIElements/Error/Error';
import Loading from '../../../shared/UIElements/Loading/Loading';

const CreateModal = (props) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    
    const auth = useContext(AuthContext);

    const onDeleteHandler = async e => {
        setError(false);
        setLoading(true);
        try{
            await axios({
                method: 'DELETE',
                url: `/alerts/${props.id}`,
                headers: {
                    Authorization: 'Bearer ' + auth.token
                }
            })
            setError(false);
            setLoading(false);
            props.close();
        } catch (err) {
            setLoading(false);
            setError(false);
            setError(err.response?.data?.message || 'Something went wrong. Please try again!!!');
        }
    };

    return (
        <Modal
            show={props.open}
            size="md"
            aria-labelledby="contained-modal-title-vcenter"
            onHide={props.close}
            className="modal"
            centered
        > 
            <div className="col-lg-12 login-form">
                <div className="form">
                    <div className="col-lg-12 login-form">
                        <div className="form">
                            <h4 className="title mb-4">Delete Alert</h4>
                            <Error error={error}/>
                            <Loading loading={loading}/>
                            <div className="pt-3 pb-3">
                                <button type="submit" className="btn-b btn--primary" onClick={onDeleteHandler}>DELETE</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Modal>
    );
};

export default CreateModal;