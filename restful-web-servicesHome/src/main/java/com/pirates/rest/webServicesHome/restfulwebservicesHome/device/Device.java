package com.pirates.rest.webServicesHome.restfulwebservicesHome.device;

public class Device {
	private long id;
	private String username;
	private String device;
	private String temperature;
	private String humidity;
	
	protected Device() {
		
	}

	public Device(long id, String username, String device, String temperature, String humidity) {
		super();
		this.id = id;
		this.username = username;
		this.device = device;
		this.temperature = temperature;
		this.humidity = humidity;
	}

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getDevice() {
		return device;
	}

	public void setDevice(String device) {
		this.device = device;
	}

	public String getTemperature() {
		return temperature;
	}

	public void setTemperature(String temperature) {
		this.temperature = temperature;
	}

	public String getHumidity() {
		return humidity;
	}

	public void setHumidity(String humidity) {
		this.humidity = humidity;
	}

	
	
	
	
	// dùng để so sánh 2 đối tượng bằng nhau không
	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + (int) (id ^ (id >>> 32));
		return result;
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		Device other = (Device) obj;
		if (id != other.id)
			return false;
		return true;
	}
	
	// tạo hashcode id thôi
	
}
