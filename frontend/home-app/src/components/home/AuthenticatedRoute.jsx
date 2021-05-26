import React, {Component} from 'react'
import {Route, Redirect} from 'react-router-dom'
import AuthenticationService from './AuthenticationService.js'

// dùng để check xem người dùng có đặng nhập chưa mới cho chuyển trang
class AuthenticatedRoute extends Component {    
    render() {
        if(AuthenticationService.isUserLoggedIn()) {
            return <Route {...this.props}/>
        } else {
            return <Redirect to="/login"/>
        }

    }
}

export default AuthenticatedRoute