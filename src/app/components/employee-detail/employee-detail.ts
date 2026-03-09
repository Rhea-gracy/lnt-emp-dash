import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { EmployeeService } from '../../services/employee.service';
import { Employee } from '../../models/employee.model';

@Component({
  selector: 'app-employee-detail',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule,
    MatSnackBarModule
  ],
  templateUrl: './employee-detail.html',
  styleUrl: './employee-detail.css',
})
export class EmployeeDetail implements OnInit {
  employeeForm: FormGroup;
  isEditMode: boolean = false;
  employeeId?: number;
  departments = ['HR', 'Engineering', 'Marketing', 'Sales', 'Management'];
  statuses = ['Active', 'Inactive', 'On Leave'];

  constructor(
    private fb: FormBuilder,
    private employeeService: EmployeeService,
    private route: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    this.employeeForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      lastName: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      role: ['', Validators.required],
      department: ['', Validators.required],
      salary: ['', [Validators.required, Validators.min(0)]],
      status: ['Active', Validators.required],
      joinDate: [new Date().toISOString().split('T')[0], Validators.required],
    });
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id && id !== 'new') {
      this.isEditMode = true;
      this.employeeId = +id;
      this.employeeService.getEmployeeById(this.employeeId).subscribe(employee => {
        if (employee) {
          this.employeeForm.patchValue(employee);
        } else {
          this.snackBar.open('Employee not found', 'Close', { duration: 3000 });
          this.router.navigate(['/employees']);
        }
      });
    }
  }

  onSubmit(): void {
    if (this.employeeForm.valid) {
      if (this.isEditMode && this.employeeId) {
        this.employeeService.updateEmployee(this.employeeId, this.employeeForm.value);
        this.snackBar.open('Employee updated successfully', 'Close', { duration: 3000 });
      } else {
        this.employeeService.addEmployee(this.employeeForm.value);
        this.snackBar.open('Employee added successfully', 'Close', { duration: 3000 });
      }
      this.router.navigate(['/employees']);
    } else {
      this.employeeForm.markAllAsTouched();
    }
  }

  onCancel(): void {
    this.router.navigate(['/employees']);
  }
}
