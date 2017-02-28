package com.ll.ssh.spring.model;

import org.springframework.beans.factory.annotation.Autowired;

public class People {

	protected String username = "ÕÅÈý";
	protected Integer age;
	
	public People() {
		super();
		// TODO Auto-generated constructor stub
	}

	@Autowired(required=false)
	public People(String username, Integer age) {
		super();
		this.username = username;
		this.age = age;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public Integer getAge() {
		return age;
	}

	public void setAge(Integer age) {
		this.age = age;
	}

	@Override
	public String toString() {
		return "People [username=" + username + ", age=" + age + "]";
	}

}
