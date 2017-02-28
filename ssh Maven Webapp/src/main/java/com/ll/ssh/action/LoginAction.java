package com.ll.ssh.action;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;

import com.ll.ssh.model.User;
import com.ll.ssh.service.LoginServiceI;
import com.opensymphony.xwork2.ActionSupport;

@Controller
public class LoginAction extends ActionSupport {

	/**
	 * 
	 */
	private static final long serialVersionUID = 6607583874377582911L;
	
	@Autowired
	private LoginServiceI loginServiceI;

	private String username;
	private String passwd;
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
	
	public String login(){
		if(loginServiceI==null){
			return "error";
		}
		User user = loginServiceI.login(username, passwd);
		if(user==null){
			return "error";
		}
		return SUCCESS;
	}
	
}
