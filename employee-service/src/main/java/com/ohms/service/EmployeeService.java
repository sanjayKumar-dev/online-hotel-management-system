package com.ohms.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ohms.model.Employee;
import com.ohms.repository.EmployeeRepository;

@Service
public class EmployeeService {
	
	@Autowired
	private EmployeeRepository employeeRepository;
	
	@Autowired
	private SequenceService sequenceService;
	
	// Add Employee
	public void addEmployee(Employee employee) {
		int getId = sequenceService.getNextSequence("employee");
		employee.setEmployeeId(getId);
		employeeRepository.save(employee);
	}
	
	// Return all the Employee Details in the form of list
	public List<Employee> getAllEmployee(){
		return employeeRepository.findAll();
	}
	
	// Return Employee Detail for requested id
	public Optional<Employee> getEmployeeById(int employeeId) {
		return employeeRepository.findById(employeeId);
	}
	
	// Update Employee Detail for requested Id
	public void updateEmployee(Employee employee) {
		employeeRepository.save(employee);
	}
	
	// Delete Employee Detail for requested Id
	public void deleteEmployee(int employeeId) {
		employeeRepository.deleteById(employeeId);
	}

}
