import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { EmployeeService } from '../../services/employee.service';
import { map, Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule, MatCardModule, MatButtonModule, MatIconModule],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements OnInit {
  totalEmployees$: Observable<number>;
  activeEmployees$: Observable<number>;
  departmentsCount$: Observable<number>;

  constructor(private employeeService: EmployeeService) {
    this.totalEmployees$ = this.employeeService.employees$.pipe(
      map(employees => employees.length)
    );
    this.activeEmployees$ = this.employeeService.employees$.pipe(
      map(employees => employees.filter(e => e.status === 'Active').length)
    );
    this.departmentsCount$ = this.employeeService.employees$.pipe(
      map(employees => new Set(employees.map(e => e.department)).size)
    );
  }

  ngOnInit(): void {}
}
