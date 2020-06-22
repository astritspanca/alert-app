import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { AuthContext } from './shared/Context/auth-context';
import { useAuth } from './shared/Hooks/auth-hook';
import './App.scss';

const Login = lazy(() => import('./pages/Login/Login'));
const Signup = lazy(() => import('./pages/Signup/Signup'));
const Dashboard = lazy(() => import('./pages/Dashboard/Dashboard'));
const NotFound = lazy(() => import('./pages/NotFound/NotFound'));

function App() {
  const { token, login, logout, userId, name } = useAuth();

  let routes;
  if(!token){
    routes = (
      <Suspense fallback="Loading...">
        <Switch>
            <Route path="/login" exact component={Login} />
            <Route path="/signup" exact component={Signup} />
            <Route render={() => <NotFound/>}/>
        </Switch>
      </Suspense>
    )
  }
  else
  {
    routes = (
      <Suspense fallback="Loading...">
        <Switch>
          <Route path="/dashboard" exact component={Dashboard} />
          <Route render={() => <NotFound/>}/>
        </Switch>
      </Suspense>
    )
  }

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn:!!token,
        token:token,
        userId:userId,
        name: name,
        login:login,
        logout:logout
      }}
    >
      <Router>
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-12">
                <main>{routes}</main>
            </div>
          </div>
        </div>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
