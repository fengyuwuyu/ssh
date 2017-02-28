package com.ll.ssh.spring.test;

import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;

import com.ll.ssh.spring.service.TestAopServiceImpl;

public class SpringTest {

	public static void main(String[] args) {
		ApplicationContext ac = new ClassPathXmlApplicationContext("/spring/spring.xml");
		TestAopServiceImpl service = (TestAopServiceImpl) ac.getBean("testAopServiceImpl");
		service.testAop("admin");
		
		
	}
}
