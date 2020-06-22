import React, { useState, useContext } from 'react';
import { useForm } from "react-hook-form";
import { NavLink, useHistory } from 'react-router-dom';
import { AuthContext } from '../../shared/Context/auth-context';

import axios from '../../axios';
import Input from '../../shared/FormElements/Input/Input';
import Error from '../../shared/UIElements/Error/Error';
import Loading from '../../shared/UIElements/Loading/Loading';
import './Login.scss';

const Login = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const { register, handleSubmit, triggerValidation, errors } = useForm();
    
    const auth = useContext(AuthContext);
    const history = useHistory();

    const onLoginHandler = async e => {
        setError(false);
        setLoading(true);
        try{
            let response = await axios({
                method: 'POST',
                url: '/auth/login',
                data: e
            })
            setError(false);
            getUserData(response.data);
            history.push('/dashboard');
        } catch (err) {
            setLoading(false);
            setError(false);
            setError(err.response?.data?.message || 'Something went wrong. Please try again!!!');
        }
    };

    const getUserData = async ({ token }) => {
        try{
            let response = await axios({
                method: 'GET',
                url: '/users/me',
                headers: {
                    Authorization: 'Bearer ' + token
                }
            });
            const userData = {
                uid: response.data.id,
                token: token,
                name: response.data.name
            }
            setLoading(false);
            auth.login(userData.uid, userData.token, userData.name);
        } catch (err) {
            setLoading(false);
            setError(false);
            setError(err.response?.data?.message || 'Something went wrong. Please try again!!!');
        }
        
    }

    return (
        <div className="row">
            <div className="col-lg-12" id="app-login">
                <div className="row justify-content-center">
                    <div className="col-lg-6 login-image">
                        <img src="/assets/images/bvwd_zx6-zk-saksham-gangwar.jpg" alt="alerts"/>
                    </div>
                    <div className="col-lg-6 login-form">
                        <div className="form">
                            <h4 className="title mb-4">Sign in</h4>
                            <Error error={error}/>
                            <Loading loading={loading}/>
                            <form onSubmit={handleSubmit(onLoginHandler)}>
                                <Input 
                                    type="text" 
                                    class="form--control" 
                                    id="exampleInputPassword1" 
                                    placeholder="Email address"
                                    name="email"
                                    label="EMAIL*"
                                    register={register({ required: true, pattern: /^\S+@\S+\.\S+$/ })}
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
                                <div className="pt-3 pb-3">
                                    <button type="submit" className="btn-b btn--primary">Login</button>
                                </div>
                                <hr/>
                                <div className="pt-3 pb-3">
                                    <NavLink to="/signup" className="btn-b">Already a new accout!</NavLink>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;