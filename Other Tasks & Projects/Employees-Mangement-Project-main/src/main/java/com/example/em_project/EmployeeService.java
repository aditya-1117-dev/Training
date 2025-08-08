package com.example.em_project;

import java.util.List;

public interface EmployeeService {
    String createEmployee(Employee employee);
    List<Employee> readEmployees();
    List<Employee> insertEmployees(List<Employee> employeeList);
    boolean deleteEmployee(Long id);
    String updateEmployee(Long id, Employee employee);

}
