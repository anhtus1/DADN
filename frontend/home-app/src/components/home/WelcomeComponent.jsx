import React, {Component} from 'react'
import {Link} from 'react-router-dom'
// {this.props.match.params.name} tương đương name trên URL
import HelloWorldService from '../../api/device/HelloWorldService.js'
class WelcomeComponent extends Component {
    constructor(props) {
        super(props)
        this.retrieveWelcomeMessage = this.retrieveWelcomeMessage.bind(this)
        this.handleSuccessfulResponse = this.handleSuccessfulResponse.bind(this)
        this.handleError = this.handleError.bind(this)
        this.state = {
            welcomeMessage: ''
        }
    }
    render() {
        return (
            <>
                <h1>Welcome!</h1>
                <div className="container">
                Welcome {this.props.match.params.name}.
                You can manage your devices <Link to="/devices">here</Link>.
                </div>
                <div className="container">
                Click here to get a customized welcome message.
                <button onClick={this.retrieveWelcomeMessage}
                    className="btn btn-success">Get Welcome Message</button>
                </div>
                <div className='container'>
                    {this.state.welcomeMessage}
                </div>
            </>
        )        
    }

    retrieveWelcomeMessage() {
        // console.log("để debug")
        //HelloWorldService.executeHelloWorldService()
        // nếu yêu cầu đến http thành công thì hiện thông tin ra màn hình console
        // .then(response => console.log(response))

        // HelloWorldService.executeHelloWorldBeanService()
        // .then(response => this.handleSuccessfulResponse(response))
        //.catch()


        HelloWorldService.executeHelloWorldPathVariableService(this.props.match.params.name)
        .then(response => this.handleSuccessfulResponse(response))
        .catch(error => this.handleError(error))
    }

    handleSuccessfulResponse(response) {
        console.log(response)
        this.setState({welcomeMessage: response.data.message})
    }

    handleError(error) {
        console.log(error.response)
        this.setState({welcomeMessage: error.response.data.message})
    }
}


export default WelcomeComponent