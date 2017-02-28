package com.ll.ssh.spring.model;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class StudentService {

	private Student student;

	@Autowired
	public void setStudent(Student student) {
		this.student = student;
	}
	
	public void testStudent(){
		student.sayName();
	}
}
