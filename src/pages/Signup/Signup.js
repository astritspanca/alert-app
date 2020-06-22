import React, { useState, useRef } from 'react';
import { useForm } from "react-hook-form";
import { NavLink, useHistory } from 'react-router-dom';

import axios from '../../axios';
import Input from '../../shared/FormElements/Input/Input';
import Error from '../../shared/UIElements/Error/Error';
import Loading from '../../shared/UIElements/Loading/Loading';
import './Signup.scss';

const Signup = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const { register, handleSubmit, watch, triggerValidation, errors } = useForm();

    const password = useRef({});
    password.current = watch("password", "");
    const history = useHistory();

    const onSignupHandler = async e => {
        if(loading){
            return; // prevent user from resubmiting the form while http request is going on
        }
        
        setError(false);
        setLoading(true);
        try{
            let response = await axios({
                method: 'POST',
                url: '/users',
                data: e
            })
            setLoading(false);
            setError(false);
            console.log(response);
            history.push('/login');
        } catch (err) {
            setLoading(false);
            setError(false);
            setError(err.response?.data?.message || 'Something went wrong. Please try again');
        }
    };

    return (
        <div className="row">
            <div className="col-lg-12" id="app-signup">
                <div className="row justify-content-center">
                    <div className="col-lg-6 signup-image">
                        <img src="/assets/images/login-image-2.jpg" alt="alerts"/>
                    </div>
                    <div className="col-lg-6 signup-form">
                        <div className="form">
                            <h4 className="title mb-4">Sign up</h4>
                            <Error error={error}/>
                            <Loading loading={loading}/>
                            <form onSubmit={handleSubmit(onSignupHandler)}>
                                <Input 
                                    type="text" 
                                    class="form--control" 
                                    id="exampleInputPassword1" 
                                    placeholder="Name"
                                    name="name"
                                    label="NAME*"
                                    register={register({ required: true })}
                                    onBlur={() => triggerValidation('email')}
                                    onChange={() => {
                                        (errors.name?.type === 'required') && triggerValidation('name');
                                    }}
                                    error={errors.name?.type === 'required'}
                                >
                                    {errors.name?.type === 'required' && <p className="error-text">Name is required!</p>}
                                </Input>
                                <Input 
                                    type="text" 
                                    class="form--control" 
                                    id="exampleInputPassword1" 
                                    placeholder="Email address"
                                    name="email"
                                    label="EMAIL*"
                                    ref={register({ required: true, pattern: /^\S+@\S+\.\S+$/ })}
                                    onBlur={() => triggerValidation('email')}
                                    onChange={() => {
                                        (errors.email?.type === 'required' || errors.email?.type === 'pattern') && triggerValidation('email');
                                    }}
                                    error={errors.email?.type === 'required' || errors.email?.type === 'pattern'}
                                >
                                    {errors.email?.type === 'required' && <p className="error-text">Email is required!</p>}
                                    {errors.email?.type === 'pattern' && <p className="error-text">Field must be email!</p>}
                                </Input>
                                <Input 
                                    type="password" 
                                    class="form--control" 
                                    id="exampleInputPassword2" 
                                    placeholder="Password"
                                    name="password"
                                    label="PASSWORD*"
                                    register={register({ required: true, minLength: 8 })}
                                    onBlur={() => triggerValidation('password')}
                                    onChange={() => {
                                        (errors.password?.type === 'required' || errors.password?.type === 'minLength') && triggerValidation('password');
                                    }}
                                    error={errors.password?.type === 'required' || errors.password?.type === 'minLength'}
                                >
                                    {errors.password?.type === 'required' && <p className="error-text">Password is required!</p>}
                                    {errors.password?.type === 'minLength' && <p className="error-text">Password should be atleast 8 characters long!</p>}
                                </Input>
                                <Input 
                                    type="password" 
                                    class="form--control" 
                                    id="exampleInputPassword2" 
                                    placeholder="Password"
                                    name="confirm"
                                    label="PASSWORD CONFIRMATION*"
                                    ref={register({
                                        validate: value =>
                                            value === password.current
                                        })
                                    }
                                    error={errors.confirm?.type === 'validate'}
                                >
                                    {errors.confirm?.type === 'validate' && <div className="error-text">Password does not match</div>}
                                </Input>
                                <div className="pt-3 pb-3">
                                    <button type="submit" className="btn-b btn--primary">Login</button>
                                </div>
                                <hr/>
                                <div className="pt-3 pb-3">
                                    <NavLink to="/login" className="btn-b">Already have an account? Log in</NavLink>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Signup;