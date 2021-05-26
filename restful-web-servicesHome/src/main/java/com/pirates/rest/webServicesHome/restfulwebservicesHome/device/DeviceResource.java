package com.pirates.rest.webServicesHome.restfulwebservicesHome.device;

import java.net.URI;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.pirates.rest.webServicesHome.restfulwebservicesHome.device.Device;
import com.pirates.rest.webServicesHome.restfulwebservicesHome.device.DeviceHardcodeService;



//tạo API để frontend call 
@RestController
@CrossOrigin(origins="http://localhost:4200")
public class DeviceResource {
	
	@Autowired
	private DeviceHardcodeService deviceService;
	
	// GetMapping: return success status back không cần responseEntity bởi vì nó là defaut
	@GetMapping("users/{username}/devices")
	public List<Device> getAllDevices(@PathVariable String username) {
		return deviceService.findAll();
	}
	
	// b1 backend update
	@GetMapping("users/{username}/devices/{id}")
	public Device getDevice(@PathVariable String username, @PathVariable long id) {
		return deviceService.findById(id);
	}
	
	// b2
	// DELETE /users/{username}/devices/{id}
	@DeleteMapping("/users/{username}/devices/{id}")
	public ResponseEntity<Void> deleteDevice(@PathVariable String username, @PathVariable long id) {

		Device device = deviceService.deleteById(id);

		if (device != null) {
			return ResponseEntity.noContent().build();
		}

		return ResponseEntity.notFound().build();
	}
		
	//Edit/Update a Device
	//PUT /users/{user_name}/devices/{device_id}
	@PutMapping("/users/{username}/devices/{id}")
	public ResponseEntity<Device> updateDevice(
			@PathVariable String username,
			@PathVariable long id, @RequestBody Device device){
		
		Device deviceUpdated = deviceService.save(device);
		
		return new ResponseEntity<Device>(device, HttpStatus.OK);
	}
	
		
	
	@PostMapping("/users/{username}/devices")
	public ResponseEntity<Void> createDevice(
			@PathVariable String username, @RequestBody Device device){
		
		Device createdDevice = deviceService.save(device);
		
		// tạo một URL mới chứa device mới tạo
		//Location
		//Get current resource url
		///{id}
		URI uri = ServletUriComponentsBuilder.fromCurrentRequest()
				.path("/{id}").buildAndExpand(createdDevice.getId()).toUri();
		
		return ResponseEntity.created(uri).build();
	}
		
}
