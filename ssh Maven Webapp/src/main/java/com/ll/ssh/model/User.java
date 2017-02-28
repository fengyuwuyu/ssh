package com.ll.ssh.model;

public class User {

	private Integer userId;
	private String username;
	private String passwd;
	private Department department;
	
	

	public User() {}

	public User(Integer userId, String username, String passwd,
			Department department) {
		this.userId = userId;
		this.username = username;
		this.passwd = passwd;
		this.department = department;
	}

	public Integer getUserId() {
		return userId;
	}

	public void setUserId(Integer userId) {
		this.userId = userId;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getPasswd() {
		return passwd;
	}

	public void setPasswd(String passwd) {
		this.passwd = passwd;
	}

	public Department getDepartment() {
		return department;
	}

	public void setDepartment(Department department) {
		this.department = department;
	}

	@Override
	public String toString() {
		return "User [userId=" + userId + ", username=" + username
				+ ", passwd=" + passwd + ", department=" + department + "]";
	}

}
