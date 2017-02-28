package com.ll.ssh.model;

import java.util.List;

public class Department {

	private Integer depId;
	private Integer parentId;
	private String depName;
	private List<User> users;

	public Integer getDepId() {
		return depId;
	}

	public void setDepId(Integer depId) {
		this.depId = depId;
	}

	public Integer getParentId() {
		return parentId;
	}

	public void setParentId(Integer parentId) {
		this.parentId = parentId;
	}

	public String getDepName() {
		return depName;
	}

	public void setDepName(String depName) {
		this.depName = depName;
	}

	public List<User> getUsers() {
		return users;
	}

	public void setUsers(List<User> users) {
		this.users = users;
	}

	@Override
	public String toString() {
		return "Department [depId=" + depId + ", parentId=" + parentId
				+ ", depName=" + depName + ", users=" + users + "]";
	}

}
