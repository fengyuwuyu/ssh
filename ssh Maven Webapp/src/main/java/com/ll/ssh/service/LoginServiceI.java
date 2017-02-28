package com.ll.ssh.service;

import com.ll.ssh.model.User;

public interface LoginServiceI {

	User login(String username,String passwd);
}
