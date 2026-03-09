export interface Employee {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  department: 'HR' | 'Engineering' | 'Marketing' | 'Sales' | 'Management';
  salary: number;
  joinDate: string;
  imageUrl?: string;
  status: 'Active' | 'Inactive' | 'On Leave';
}
