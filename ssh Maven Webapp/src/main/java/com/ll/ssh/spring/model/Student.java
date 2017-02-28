package com.ll.ssh.spring.model;

import org.springframework.stereotype.Component;

@Component
public class Student extends People{

	
	public void sayName(){
		System.out.println(this.username);
	}
}
