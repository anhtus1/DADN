import React, {Component} from 'react'
import DeviceDataService from '../../api/device/DeviceDataService.js'
import AuthenticationService from './AuthenticationService.js'
import moment from 'moment'


class ListDevicesComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            devices: [],
            message: null
        }
        this.deleteDeviceClicked = this.deleteDeviceClicked.bind(this)
        this.updateDeviceClicked = this.updateDeviceClicked.bind(this)
        this.refreshDevices = this.refreshDevices.bind(this)
        this.addDeviceClicked = this.addDeviceClicked.bind(this)
    }
    componentWillUnmount() {
        console.log("componentWillUnmount")
    }

    // shouldComponentUpdate(nextProps, nextState) {
    //     console.log('shouldComponentUpdate')
    //     console.log(nextProps)
    //     console.log(nextState)
    //     return true
    // }

    componentDidMount() {
        console.log("componentDidMount")
        this.refreshDevices()
        console.log(this.state)
    }

    refreshDevices() {
        // lấy name ở AuthenticationService
        let username = AuthenticationService.getLoggedInUserName()

        // lấy dữ liệu từ back end
        DeviceDataService.retrieveAllDevices(username)
        .then(
            response => {
                //console.log(response)
                this.setState({devices: response.data})
            }
        )
       
    }


    deleteDeviceClicked(id) {
        let username = AuthenticationService.getLoggedInUserName()
        //console.log(id + " " + username)
        DeviceDataService.deleteDevice(username, id)
        .then (
            // khi xóa thành công thì thông báo
            response => {
                this.setState({message: `Delete of device ${id} Successful`})
                // khi xóa thành công sẽ gọi lại backend để cập nhật
                this.refreshDevices()
            }
        )
    }

    updateDeviceClicked(id) {
        console.log("update " + id )
        this.props.history.push(`/devices/${id}`) //URL có tên người dùng
        // let username = AuthenticationService.getLoggedInUserName()
        // //console.log(id + " " + username)
        // DeviceDataService.deleteDevice(username, id)
        // .then (
        //     // khi xóa thành công thì thông báo
        //     response => {
        //         this.setState({message: `Delete of device ${id} Successful`})
        //         // khi xóa thành công sẽ gọi lại backend để cập nhật
        //         this.refreshDevices()
        //     }
        // )
    }

    addDeviceClicked() {
        // chuyển trang frontend
        this.props.history.push('/devices/-1')
    }


    render() {
        console.log("render")
        return (
            <div>
                <h1>List Devices</h1>
                {this.state.message && <div className='alert alert-success'>{this.state.message}</div>}
                 <div className="container">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Device</th>
                                <th>Temperature</th>
                                <th>Humidity</th>
                                <th>Update</th>
                                <th>Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                        {
                            this.state.devices.map (
                                device =>
                                    <tr key={device.id}>
                                        <td>{device.device}</td>
                                        <td>{device.temperature}</td>
                                        <td>{device.humidity}</td>
                                        <td><button className='btn btn-success' onClick={() => this.updateDeviceClicked(device.id)}>Update</button></td>
                                        <td><button className='btn btn-warning' onClick={() => this.deleteDeviceClicked(device.id)}>Delete</button></td>
                                    </tr>
                            )
                            }
                        </tbody>
                    </table>
                    <div className="row">
                        <button className="btn btn-success" onClick={this.addDeviceClicked}>Add</button>
                    </div>
                 </div>
            </div>
        )
    }
}

export default ListDevicesComponent