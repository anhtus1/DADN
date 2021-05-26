import React, {Component} from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import DeviceDataService from '../../api/device/DeviceDataService.js'
import AuthenticationService from './AuthenticationService.js'

class DeviceComponent extends Component {

    constructor(props) {
        super(props)

        this.state = {
            id : this.props.match.params.id,
            device : '',
            temperature: '',
            humidity: ''
        }

        this.onSubmit = this.onSubmit.bind(this)
        this.validate = this.validate.bind(this)

    }

    componentDidMount() {

        // nếu tạo cái mới thì không cần gọi api backend để hiện cái cũ như update
        if(this.state.id===-1) {
            return
        }
        

        // gọi api backend hiện device
        let username = AuthenticationService.getLoggedInUserName()
        // response => console.log(response)
        DeviceDataService.retrieveDevice(username, this.state.id)
             .then(response => this.setState({
                device: response.data.device,
                temperature: response.data.temperature,
                humidity: response.data.humidity
             }))
    }


    // check người dùng update đúng quy tắc ko
    validate(values) {
        let errors = {}
        if(!values.device) {
            errors.device = 'Enter a device'
        } else if(values.device.length<5) {
            errors.device = 'Enter atleast 5 Characters in device'
        }

        return errors

    }


    // sau khi điền đầy đủ thông tin cần update thì nhấn nút sumbit sẽ vào deviceDataservice update API gọi backend
    onSubmit(values) {

        //lấy name
        let username = AuthenticationService.getLoggedInUserName()

        let device = {
            id: this.state.id,
            device: values.device,
            temperature: values.temperature,
            humidity: values.humidity
        }

        if (this.state.id === -1) {
            DeviceDataService.createDevice(username, device)
                // để sau khi nhấn update thì chuyển về componet listdevice
                .then(() => this.props.history.push('/devices'))
        } else {
            DeviceDataService.updateDevice(username, this.state.id, device)
                .then(() => this.props.history.push('/devices'))
        }
        
        console.log(values);
    }

    render() {
        
        let {device,temperature,humidity} = this.state
        //let targetDate = this.state.targetDate

        return (
            <div>
                <h1>Device</h1>
                <div className="container">
                    <Formik 
                        initialValues={{device,temperature,humidity}}
                        onSubmit={this.onSubmit}
                        validateOnChange={false}
                        validateOnBlur={false}
                        validate={this.validate}
                        // render lại sau khi componentDidmount
                        enableReinitialize={true}
                    >
                        {
                            (props) => (
                                <Form>
                                    <ErrorMessage name="device" component="div" 
                                                                className="alert alert-warning"/>
                                    <fieldset className="form-group">
                                        <label>Device</label>
                                        <Field className="form-control" type="text" name="device"/>
                                    </fieldset>
                                    <fieldset className="form-group">
                                        <label>Temperature</label>
                                        <Field className="form-control" type="text" name="temperature"/>
                                    </fieldset>
                                    <fieldset className="form-group">
                                        <label>Humidity</label>
                                        <Field className="form-control" type="text" name="humidity"/>
                                    </fieldset>
                                    <button className="btn btn-success" type="submit">Save</button>
                                </Form>
                            )
                        }
                    </Formik>
                
                </div>                
            </div>
        )
    }
}

export default DeviceComponent