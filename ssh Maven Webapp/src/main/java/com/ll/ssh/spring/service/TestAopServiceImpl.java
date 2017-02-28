package com.ll.ssh.spring.service;

import org.springframework.stereotype.Service;

@Service
public class TestAopServiceImpl {

	public String testAop(String name){
		return "hello aop";
	}
}
