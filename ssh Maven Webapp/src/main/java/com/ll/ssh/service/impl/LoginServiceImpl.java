package com.ll.ssh.service.impl;

import org.springframework.stereotype.Service;

import com.ll.ssh.model.User;
import com.ll.ssh.service.LoginServiceI;

@Service
public class LoginServiceImpl implements LoginServiceI {

	public User login(String username, String passwd) {
		
		return new User(1, "admin", "123", null);
	}

}
