package com.example.em_project;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class EmployeeServiceImpl implements EmployeeService{

    @Autowired
    private EmployeeRepository employeeRepository;
    // List<Employee> employees = new ArrayList<>();

    @Override
    @Transactional
    public String createEmployee(Employee employee) {
        EmployeeEntity employeeEntity = new EmployeeEntity();
        BeanUtils.copyProperties(employee, employeeEntity);
        employeeRepository.save(employeeEntity);
        return "Saved Successfully";

    }

    @Override
    public List<Employee> readEmployees() {
        List<EmployeeEntity> employeesList = employeeRepository.findAll();
        List<Employee> employees = new ArrayList<>();

        for (EmployeeEntity employeeEntity : employeesList) {
            Employee emp = new Employee();
            emp.setId(employeeEntity.getId());
            emp.setName(employeeEntity.getName());
            emp.setEmail(employeeEntity.getEmail());
            emp.setPhone(employeeEntity.getPhone());

            employees.add(emp);
        }
        return employees;
    }

    @Override
    @Transactional
    public List<Employee> insertEmployees(List<Employee> employeeList) {
        List<EmployeeEntity> savedEntities = new ArrayList<>();

        for (Employee emp : employeeList) {
            EmployeeEntity entity = new EmployeeEntity();
            BeanUtils.copyProperties(emp, entity);
            savedEntities.add(employeeRepository.save(entity));
        }

        // Optionally return saved Employee DTOs
        List<Employee> savedEmployees = new ArrayList<>();
        for (EmployeeEntity entity : savedEntities) {
            Employee savedEmp = new Employee();
            BeanUtils.copyProperties(entity, savedEmp);
            savedEmployees.add(savedEmp);
        }

        return savedEmployees;
    }


    @Override
    public boolean deleteEmployee(Long id) {
        EmployeeEntity emp = employeeRepository.findById(id).get();
        employeeRepository.delete(emp);
        return true;
        
    }

    @Override
    public String updateEmployee(Long id, Employee employee) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'updateEmployee'");
    }

}
