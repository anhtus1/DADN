import axios from 'axios'


// dùng các api dưới đây để gọi backend
class DeviceDataService {
    retrieveAllDevices(name) {
        //console.log('executed service')
        return axios.get(`http://localhost:8080/users/${name}/devices`);
    }

    retrieveDevice(name, id) {
        //console.log('executed service')
        return axios.get(`http://localhost:8080/users/${name}/devices/${id}`);
    }

    deleteDevice(name, id) {
        //console.log('executed service')
        return axios.delete(`http://localhost:8080/users/${name}/devices/${id}`);
    }

    // kết nối với DeviceResource.java / frontend gọi api backend
    updateDevice(name, id, device) {
        //console.log('executed service')
        return axios.put(`http://localhost:8080/users/${name}/devices/${id}`, device);
    }

    createDevice(name, device) {
        //console.log('executed service')
        return axios.post(`http://localhost:8080/users/${name}/devices/`, device);
    }

}

export default new DeviceDataService()