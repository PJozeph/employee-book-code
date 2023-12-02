import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeeListComponent } from './components/employee-list/employee-list.component';
import { EmployeeRoutingModule } from './employee-routing.module';
import { CcaCoreModule } from '../cca-core/cca-core.module';
import { EmployeeService } from '../cca-core/services/employee.service';
import { HttpClientModule } from '@angular/common/http';
import { IonicModule } from '@ionic/angular';
import { EmployeViewComponent } from './components/employe-view/employe-view.component';
import { EmployeeEditComponent } from './components/employee-edit/employee-edit.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    EmployeeListComponent,
    EmployeViewComponent,
    EmployeeEditComponent,
  ],
  imports: [
    CommonModule,
    EmployeeRoutingModule,
    CcaCoreModule,
    HttpClientModule,
    IonicModule,
    ReactiveFormsModule
  ],
  providers: [EmployeeService],
})
export class EmployeeModule {}
