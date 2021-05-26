package com.pirates.rest.webServicesHome.restfulwebservicesHome.device;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;

@Service
public class DeviceHardcodeService {
	
	protected DeviceHardcodeService() {
		
	}
	
	private static List<Device> devices = new ArrayList();
	private static int idCounter = 0;
	
	static {
		devices.add(new Device(++idCounter, "admin", "Living room", "26 degrees Celsius", "70 %"));
		devices.add(new Device(++idCounter, "admin", "Bedroom", "24 degrees Celsius", "65 %"));
		devices.add(new Device(++idCounter, "admin", "Kitchen", "28 degrees Celsius", "75 %"));
	}
	
	public List<Device> findAll() {
		return devices;
	}
	
	
	
	public Device save(Device device) {
		if (device.getId()==-1 || device.getId()==0) {
			device.setId(++idCounter);
			devices.add(device);
		}
		else {
			deleteById(device.getId());
			devices.add(device);
		}
		return device;
	}
	
	//b1
	public Device deleteById(long id) {
		Device device = findById(id);
		if(device==null) return null;
		if (devices.remove(device)) {
			// tạo equal trong class device
			return device;
		}
		return null;
	}

	public Device findById(long id) {
		for(Device device:devices) {
			if(device.getId() == id) {
				return device;
			}
		}
		return null;
	}
	
}
