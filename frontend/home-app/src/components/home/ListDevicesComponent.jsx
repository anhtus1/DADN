import React, {Component} from 'react'


class ListDevicesComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            devices: 
            [
                {id: 1, device: 'Living room', temperature: '26 degrees Celsius', humidity: '70 %'},
                {id: 2, device: 'Bedroom', temperature:'24 degrees Celsius', humidity: '65 %'},
                {id: 3, device: 'Kitchen', temperature:'28 degrees Celsius', humidity: '75 %'}
            ]
        }
    }
    render() {
        return (
            <div>
                <h1>List Devices</h1>
                 <div className="container">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Device</th>
                                <th>Temperature</th>
                                <th>Humidity</th>
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
                                    </tr>
                            )
                            }
                        </tbody>
                    </table>
                 </div>
            </div>
        )
    }
}

export default ListDevicesComponent