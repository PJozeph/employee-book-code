import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService } from 'src/app/cca-core/services/employee.service';
import { mergeMap } from 'rxjs';
import { Employee } from 'src/app/cca-core/modals/employee.moda';

@Component({
  selector: 'app-employe-view',
  templateUrl: './employe-view.component.html',
  styleUrls: ['./employe-view.component.scss'],
})
export class EmployeViewComponent {
  activateRoute: ActivatedRoute = inject(ActivatedRoute);
  employeService: EmployeeService = inject(EmployeeService);
  router: Router = inject(Router);

  employee$ = this.activateRoute.params.pipe(
    mergeMap((params) => this.employeService.getEmployeeById(params['id']))
  );

  backClick() {
    this.router.navigate(['employee']);
  }

  onEditClick(employee: Employee) {
    this.router.navigate(['employee', 'edit', employee.id]);
  }
}
