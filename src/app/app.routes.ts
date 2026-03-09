import { Routes } from '@angular/router';
import { Home } from './components/home/home';
import { EmployeeList } from './components/employee-list/employee-list';
import { EmployeeDetail } from './components/employee-detail/employee-detail';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: Home },
  { path: 'employees', component: EmployeeList },
  { path: 'employee/new', component: EmployeeDetail },
  { path: 'employee/:id', component: EmployeeDetail },
  { path: '**', redirectTo: 'home' }
];
