import React, {Component} from 'react'
import {Link} from 'react-router-dom'
// {this.props.match.params.name} tương đương name trên URL
class WelcomeComponent extends Component {
    render() {
        return (
            <>
                <h1>Welcome!</h1>
                <div className="container">
                Welcome {this.props.match.params.name}. You can manage your devices <Link to="/devices">here</Link>.
                </div>
            </>
        )        
    }
}


export default WelcomeComponent