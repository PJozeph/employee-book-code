import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { Employee } from 'src/app/cca-core/modals/employee.moda';
import { EmployeeService } from 'src/app/cca-core/services/employee.service';
import { Observable, Subscription, mergeMap, of } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss'],
})
export class EmployeeListComponent implements OnDestroy {
  employeeService: EmployeeService = inject(EmployeeService);
  router: Router = inject(Router);

  private subscription: Subscription = new Subscription();

  employeeList$: Observable<Employee[]> = this.employeeService.getEmployees();

  ionViewWillEnter() {
    this.employeeList$ = this.employeeService.getEmployees();
  }

  handleSearchEvent(event: any) {
    this.subscription.add(
      this.employeeService
        .searchByName(event.detail.value)
        .subscribe((response: Employee[]) => {
          this.employeeList$ = of(response);
        })
    );
  }

  onDeleteAction(employee: Employee) {
    this.employeeList$ = this.employeeService
      .deleteEmployee(employee.id)
      .pipe(mergeMap(() => this.employeeService.getEmployees()));
  }

  onViewclick(employee: Employee) {
    this.router.navigate(['employee', employee.id]);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
