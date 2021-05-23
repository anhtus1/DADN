import React, {Component} from 'react'
import {BrowserRouter as Router, Route, Switch, Link} from 'react-router-dom'
// chặn người dùng chuyển trang trên thanh URL
import AuthenticatedRoute from './AuthenticatedRoute.jsx'
import LoginComponent from './LoginComponent.jsx';
import LogoutComponent from './LogoutComponent.jsx';
import ListDevicesComponent from './ListDevicesComponent.jsx';
import WelcomeComponent from './WelcomeComponent.jsx';
import HeaderComponent from './HeaderComponent.jsx';
import FooterComponent from './FooterComponent.jsx';
import ErrorComponent from './ErrorComponent.jsx';


class HomeApp extends Component {
    render() {
        return (
            <div className = 'HomeApp'>
                <Router>
                    <HeaderComponent/>
                    <Switch>   {/*  hiển thị chỉ duy nhất một trong các đường dẫn */}
                        <Route path='/' exact component={LoginComponent}/>
                        <Route path='/login' component={LoginComponent}/>
                        <AuthenticatedRoute path="/welcome/:name" component={WelcomeComponent}/>
                        <AuthenticatedRoute path="/devices" component={ListDevicesComponent}/>
                        <AuthenticatedRoute path="/logout" component={LogoutComponent}/>
                        <Route component={ErrorComponent}/>
                    </Switch>
                    <FooterComponent/>
                </Router>
            </div>
        )
    }
}








// function ShowInvalidCredentials(props) {
//     if (props.hasLoginFailed) {
//         return <div>Invalid Credentials</div>
//     }
//     return null
// }

// function ShowLoginSuccessMessage(props) {
//     if (props.showSuccessMessage) {
//         return <div>Login Successful</div>
//     }
//     return null
// }

export default HomeApp
//export default withRouter(HeaderComponent);