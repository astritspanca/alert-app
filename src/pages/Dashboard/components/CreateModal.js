import React, { useState, useEffect, useContext, useCallback } from 'react';
import { useForm, Controller } from "react-hook-form";
import { Modal } from 'react-bootstrap';
import Select from 'react-select';
import { AuthContext } from '../../../shared/Context/auth-context';

import axios from '../../../axios';
import Input from '../../../shared/FormElements/Input/Input';
import Error from '../../../shared/UIElements/Error/Error';
import Loading from '../../../shared/UIElements/Loading/Loading';

const METHODS = [
    { value: 1, label: 'SMS' },
    { value: 2, label: 'EMAIL' }
]

const CreateModal = (props) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [events, setEvents] = useState();
    const { register, handleSubmit, triggerValidation, control, errors } = useForm();
    
    const auth = useContext(AuthContext);

    const getEvents = useCallback(async () => {
        let response = await axios({
            method: 'GET',
            url: '/alert-events',
            headers: {
                Authorization: 'Bearer ' + auth.token
            }
        });

        let filteredEvents = response.data.map((el) => ({ value: el.id, label: el.name }));
        setEvents(filteredEvents);
    }, [auth.token])

    useEffect(() => {
        getEvents();
    }, [getEvents])

    const onCreateAlertHandler = async e => {
        const data = {
            alert_event_id: e.event.value,
            alert_method_id: e.method.value,
            value: e.value
        }

        setError(false);
        setLoading(true);
        try{
            await axios({
                method: 'POST',
                url: '/alerts',
                data: data,
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
                <h4 className="title mb-4">Add new alert</h4>
                <Error error={error}/>
                <Loading loading={loading}/>
                <form onSubmit={handleSubmit(onCreateAlertHandler)}>
                    <div className="row">
                        <div className="col-lg-6 pt-1 pb-1">
                            <div className="form--group">
                                <label>EVENT*</label>
                                <Controller
                                    as={<Select options={events}/>
                                    }
                                    control={control}
                                    onChange={([selected]) => {
                                        return selected;
                                    }}
                                    rules={{ required: true }}
                                    placeholder="EVENT*"
                                    name="event"
                                />
                                {errors.event?.type === 'required' && <p className="error-text">Event is required!</p>}
                            </div>
                        </div>
                        <div className="col-lg-6 pt-1 pb-1">
                            <div className="form--group">
                                <label>EVENT*</label>
                                <Controller
                                    as={<Select options={METHODS}/>
                                    }
                                    control={control}
                                    onChange={([selected]) => {
                                        return selected;
                                    }}
                                    rules={{ required: true }}
                                    placeholder="METHOD*"
                                    name="method"
                                />
                                {errors.method?.type === 'required' && <p className="error-text">Method is required!</p>}
                            </div>
                        </div>
                        <div className="col-lg-12 pt-1 pb-1">
                            <Input 
                                type="text" 
                                class="form--control" 
                                id="exampleInputPassword1" 
                                placeholder="Value"
                                name="value"
                                label="VALUE*"
                                register={register({ required: true })}
                                onBlur={() => triggerValidation('email')}
                                onChange={() => errors.value?.type === 'required'}
                                error={errors.value?.type === 'required'}
                            >
                                {errors.value?.type === 'required' && <p className="error-text">Value is required!</p>}
                            </Input>
                        </div>
                    </div>
                    <div className="pt-3 pb-3">
                        <button type="submit" className="btn-b btn--primary">CREATE ALERT</button>
                    </div>
                </form>
            </div>
        </div>
        </Modal>
    );
};

export default CreateModal;