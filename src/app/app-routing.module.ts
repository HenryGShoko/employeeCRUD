import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeTableComponent } from './employee-table/employee-table.component';
import { EmployeeModalComponent } from './employee-modal/employee-modal.component';
import { EmployeeDashboardComponent } from './employee-dashboard/employee-dashboard.component';
import { PaginatorComponent } from './paginator/paginator.component';

const routes: Routes = [
  // { path: 'employee-table', component: EmployeeTableComponent },
  // { path: 'paginator', component: PaginatorComponent },
  // { path: 'employee-modal', component: EmployeeModalComponent },
  // { path: '', component: EmployeeDashboardComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
