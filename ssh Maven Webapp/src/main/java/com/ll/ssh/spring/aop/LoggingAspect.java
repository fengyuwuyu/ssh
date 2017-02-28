package com.ll.ssh.spring.aop;

import java.util.Arrays;
import java.util.List;

import org.aspectj.lang.JoinPoint;
import org.springframework.stereotype.Component;

//@Aspect
//@Order(99)
@Component
public class LoggingAspect {

//	@Pointcut("execution(* com.ll.ssh.spring.service..*.*(..))")
	public void pointCut(){}
	
//	@AfterReturning(pointcut="pointCut()",returning="result")
	public void afterReturn(JoinPoint joinPoint, Object result){
		String className = joinPoint.getSignature().getDeclaringTypeName();
		String methodName = joinPoint.getSignature().getName();
		List<Object> args = Arrays.asList(joinPoint.getArgs());
		System.out.println("the method is "+className+"."+methodName);
		System.out.println("the args is "+args);
		System.out.println("the result is "+result);
	}
}
