import React from 'react';
import jwt_decode from 'jwt-decode';

import Navigation from './components/Navigation';
import HomePage from './components/pages/HomePage';
import AccountPage from './components/pages/Account/AccountPage';
import PortfolioPage from './components/pages/Portfolio/PortfolioPage';
import OptimisePage from './components/pages/Optimise/OptimisePage';

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            page: "home",
            errorMessage: null,
            successMessage: null,
            
            // (token = json web token (JWT) received from server upon login, and
            //  user = the user object (fName, lName, email etc) stored in the payload of the JWT)
            token: null,
            user: null
        };
    }

    openPage = (page) => {
        this.setState({page: page});
    }

    logout = () => {
        this.setState({token: null, user: null, page: "home"});
    }

    // updates the state to hold a JWT and the object decoded by it (user)
    // once updated, we can load the data (as we need a valid JWT to access it)
    setToken = (token) => {
        this.setState({token: token, user: jwt_decode(token)});
    }

    displayError = (message) => {
        this.setState({errorMessage: message});

        setTimeout(() => {
            this.setState({errorMessage: null});
        }, 5000);
    }

    displaySuccess = (message) => {
        this.setState({successMessage: message});

        setTimeout(() => {
            this.setState({successMessage: null});
        }, 5000);
    }

    render = () => {
        const {token, user, errorMessage, successMessage, page} = this.state;
        
        return (
            <>
            <Navigation user={user} openPage={this.openPage} page={page} logout={this.logout}/>

            {errorMessage ? (
                <div className="error">
                    <div className="wrapper"><p>{errorMessage}</p></div>
                </div>
            ) : null}

            {successMessage ? (
                <div className="success">
                    <div className="wrapper"><p>{successMessage}</p></div>
                </div>
            ) : null}

            {page === "home" ? 
                <HomePage/>
            : null}

            {page === "account" ? 
                <AccountPage 
                    setToken={this.setToken} 
                    displayError={this.displayError} 
                    displaySuccess={this.displaySuccess} 
                    openPage={this.openPage}
                /> 
            : null}

            {page === "portfolio" ? 
                <PortfolioPage 
                    user={user} 
                    displaySuccess={this.displaySuccess} 
                    token={token}
                /> 
            : null}

            {page === "optimise" ? 
                <OptimisePage/>
            :null}
            </>
        )
    }
}
