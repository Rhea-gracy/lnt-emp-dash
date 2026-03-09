import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map, of } from 'rxjs';
import { Employee } from '../models/employee.model';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private employees: Employee[] = [
    {
      id: 1,
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      role: 'Software Engineer',
      department: 'Engineering',
      salary: 85000,
      joinDate: '2022-01-15',
      status: 'Active',
      imageUrl: 'https://i.pravatar.cc/150?u=1'
    },
    {
      id: 2,
      firstName: 'Jane',
      lastName: 'Smith',
      email: 'jane.smith@example.com',
      role: 'Senior Project Manager',
      department: 'Management',
      salary: 110000,
      joinDate: '2021-06-12',
      status: 'Active',
      imageUrl: 'https://i.pravatar.cc/150?u=2'
    },
    {
      id: 3,
      firstName: 'Michael',
      lastName: 'Brown',
      email: 'michael.b@example.com',
      role: 'HR Specialist',
      department: 'HR',
      salary: 62000,
      joinDate: '2023-03-10',
      status: 'On Leave',
      imageUrl: 'https://i.pravatar.cc/150?u=3'
    },
    {
      id: 4,
      firstName: 'Sarah',
      lastName: 'Wilson',
      email: 'sarah.w@example.com',
      role: 'DevOps Engineer',
      department: 'Engineering',
      salary: 95000,
      joinDate: '2022-11-01',
      status: 'Active',
      imageUrl: 'https://i.pravatar.cc/150?u=4'
    },
    {
      id: 5,
      firstName: 'David',
      lastName: 'Miller',
      email: 'david.m@example.com',
      role: 'Marketing Lead',
      department: 'Marketing',
      salary: 78000,
      joinDate: '2022-08-20',
      status: 'Inactive',
      imageUrl: 'https://i.pravatar.cc/150?u=5'
    }
  ];

  private employeesSubject = new BehaviorSubject<Employee[]>(this.employees);
  employees$ = this.employeesSubject.asObservable();

  getEmployees(): Observable<Employee[]> {
    return this.employees$;
  }

  getEmployeeById(id: number): Observable<Employee | undefined> {
    return this.employees$.pipe(
      map(employees => employees.find(e => e.id === id))
    );
  }

  addEmployee(employee: Omit<Employee, 'id'>): void {
    const nextId = this.employees.length > 0 ? Math.max(...this.employees.map(e => e.id)) + 1 : 1;
    const newEmployee = { ...employee, id: nextId };
    this.employees = [...this.employees, newEmployee];
    this.employeesSubject.next(this.employees);
  }

  updateEmployee(id: number, updatedData: Partial<Employee>): void {
    this.employees = this.employees.map(e => (e.id === id ? { ...e, ...updatedData } : e));
    this.employeesSubject.next(this.employees);
  }

  deleteEmployee(id: number): void {
    this.employees = this.employees.filter(e => e.id !== id);
    this.employeesSubject.next(this.employees);
  }
}
