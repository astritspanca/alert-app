import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.scss';

const Login = lazy(() => import('./pages/Login/Login'));
const Signup = lazy(() => import('./pages/Signup/Signup'));
const Dashboard = lazy(() => import('./pages/Dashboard/Dashboard'));

function App() {
  return (
    <Router>
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-12">
              <Suspense fallback="Loading...">
                <Switch>
                    <Route path="/login" exact component={Login} />
                    <Route path="/signup" exact component={Signup} />
                    <Route path="/dashboard" exact component={Dashboard} />
                </Switch>
              </Suspense>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
