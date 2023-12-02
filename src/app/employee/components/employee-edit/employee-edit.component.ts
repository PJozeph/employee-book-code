import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService } from 'src/app/cca-core/services/employee.service';
import { mergeMap, tap } from 'rxjs';
import { Employee } from 'src/app/cca-core/modals/employee.moda';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-employee-edit',
  templateUrl: './employee-edit.component.html',
  styleUrls: ['./employee-edit.component.scss'],
})
export class EmployeeEditComponent {
  activatedRoute: ActivatedRoute = inject(ActivatedRoute);
  employeService: EmployeeService = inject(EmployeeService);
  router: Router = inject(Router);
  formBuilder: FormBuilder = inject(FormBuilder);

  employeeForm = this.formBuilder.nonNullable.group({
    id: [''],
    name: [''],
    imagePath: [''],
    salary: [0],
    email: [''],
    phone: [''],
    bankAccount: [''],
  });

  employee$ = this.activatedRoute.params.pipe(
    mergeMap((params) => this.employeService.getEmployeeById(params['id'])),
    tap((employee: Employee) => this.employeeForm.setValue(employee))
  );

  back(employee: Employee) {
    this.router.navigate(['employee', employee.id]);
  }
  onDeleteClick(employeeId: string) {
    this.employeService.deleteEmployee(employeeId).subscribe(() => {
      this.router.navigate(['employee']);
    });
  }

  onSubmit() {
    const updatedEmployee: Employee = this.employeeForm.getRawValue();
    this.employeService.updateEmployee(updatedEmployee).subscribe(() => {
      this.router.navigate(['employee']);
    });
  }
}
