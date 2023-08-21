import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  public employeeAPIUrl: string = 'https://localhost:44349/api/Employee/';

  constructor(private http: HttpClient) {}

  PostEmployee(data: any) {
    return this.http.post<any>(`${this.employeeAPIUrl}add_employee`, data).pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  DeleteEmployee(id: number) {
    return this.http
      .delete<any>(`${this.employeeAPIUrl}delete_employee/` + id)
      .pipe(
        map((res: any) => {
          return res;
        })
      );
  }

  UpdateEmployee(data: any) {
    return this.http
      .put<any>(`${this.employeeAPIUrl}update_employee`, data)
      .pipe(
        map((res: any) => {
          return res;
        })
      );
  }

  GetEmployees() {
    return this.http.get<any>(`${this.employeeAPIUrl}get_all_employees`).pipe(
      map((res: any) => {
        return res;
      })
    );
  }
}
