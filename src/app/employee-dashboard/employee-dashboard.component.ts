import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../shared/api.service';
import { EmployeeModel } from './employee-dashboard.model';

@Component({
  selector: 'app-employee-dashboard',
  templateUrl: './employee-dashboard.component.html',
  styleUrls: ['./employee-dashboard.component.css'],
})
export class EmployeeDashboardComponent implements OnInit {
  formValue!: FormGroup;
  employeeModelObj: EmployeeModel = new EmployeeModel();
  employeeData!: any;
  showAdd!: boolean;
  showUpdate!: boolean;
  allEmployees: any[] = [];
  noResultsFound: boolean = false;
  itemsPerPage: number = 10;
  currentPage: number = 1;
  totalPages!: number;
  isDatepickerActive: boolean = false;

  constructor(private formbuilder: FormBuilder, private api: ApiService) {}

  ngOnInit(): void {
    this.formValue = this.formbuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      mobile: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      dateOfBirth: ['', Validators.required],
      streetAddress: ['', Validators.required],
      city: ['', Validators.required],
      postalCode: ['', Validators.required],
      country: ['', Validators.required],
      skill: ['', Validators.required],
      yrsExp: ['', Validators.required],
      seniorityRating: ['', Validators.required],
    });
    this.GetEmployeeDetails();
  }

  clickAddEmployee() {
    this.formValue.reset();
    this.showAdd = true;
    this.showUpdate = false;
  }
  postEmployeeDetails() {
    this.employeeModelObj.FirstName = this.formValue.value.firstName;
    this.employeeModelObj.LastName = this.formValue.value.lastName;
    this.employeeModelObj.Mobile = this.formValue.value.mobile;
    this.employeeModelObj.Email = this.formValue.value.email;
    this.employeeModelObj.DateOfBirth = this.formValue.value.dateOfBirth
      .toISOString()
      .substr(0, 10);

    this.employeeModelObj.StreetAddress = this.formValue.value.streetAddress;
    this.employeeModelObj.City = this.formValue.value.city;
    this.employeeModelObj.PostalCode = this.formValue.value.postalCode;
    this.employeeModelObj.Country = this.formValue.value.country;
    this.employeeModelObj.Skill = this.formValue.value.skill;
    this.employeeModelObj.YrsExp = this.formValue.value.yrsExp;
    this.employeeModelObj.SeniorityRating =
      this.formValue.value.seniorityRating;

    this.api.PostEmployee(this.employeeModelObj).subscribe(
      (res: any) => {
        console.log('res');
        alert('Employee created successfully');
        let ref = document.getElementById('cancel');
        ref?.click();
        this.formValue.reset();
        this.GetEmployeeDetails();
      },
      (err: any) => {
        console.log('something went wrong');
      }
    );
  }
  GetEmployeeDetails() {
    this.api.GetEmployees().subscribe((res) => {
      this.employeeData = res.employeeDetails;
      this.allEmployees = res.employeeDetails;
      this.totalPages = Math.ceil(this.employeeData.length / this.itemsPerPage);
    });
  }

  get paginatedEmployees() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    return this.employeeData.slice(startIndex, startIndex + this.itemsPerPage);
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
    }
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  deleteEmployee(row: any) {
    this.api.DeleteEmployee(row.id).subscribe((res) => {
      alert('Employee  deleted');
      this.GetEmployeeDetails();
    });
  }

  onEdit(row: any) {
    this.showAdd = false;
    this.showUpdate = true;
    this.employeeModelObj.Id = row.id;
    this.formValue.controls['firstName'].setValue(row.firstName);
    this.formValue.controls['lastName'].setValue(row.lastName);
    this.formValue.controls['mobile'].setValue(row.mobile);
    this.formValue.controls['email'].setValue(row.email);
    this.formValue.controls['dateOfBirth'].setValue(row.dateOfBirth);
    this.formValue.controls['streetAddress'].setValue(row.streetAddress);
    this.formValue.controls['city'].setValue(row.city);
    this.formValue.controls['postalCode'].setValue(row.postalCode);
    this.formValue.controls['country'].setValue(row.country);
    this.formValue.controls['skill'].setValue(row.skill);
    this.formValue.controls['yrsExp'].setValue(row.yrsExp);
    this.formValue.controls['seniorityRating'].setValue(row.seniorityRating);
  }
  editEmployeeDetails() {
    this.employeeModelObj.FirstName = this.formValue.value.firstName;
    this.employeeModelObj.LastName = this.formValue.value.lastName;
    this.employeeModelObj.Mobile = this.formValue.value.mobile;
    this.employeeModelObj.Email = this.formValue.value.email;
    this.employeeModelObj.DateOfBirth = this.formValue.value.dateOfBirth;

    this.employeeModelObj.StreetAddress = this.formValue.value.streetAddress;
    this.employeeModelObj.City = this.formValue.value.city;
    this.employeeModelObj.PostalCode = this.formValue.value.postalCode;
    this.employeeModelObj.Country = this.formValue.value.country;
    this.employeeModelObj.Skill = this.formValue.value.skill;
    this.employeeModelObj.YrsExp = this.formValue.value.yrsExp;
    this.employeeModelObj.SeniorityRating =
      this.formValue.value.seniorityRating;

    let selectedDate = this.formValue.value.dateOfBirth;

    if (selectedDate instanceof Date) {
      this.employeeModelObj.DateOfBirth = selectedDate
        .toISOString()
        .substr(0, 10);
    } else if (typeof selectedDate === 'string' && selectedDate.trim() !== '') {
      this.employeeModelObj.DateOfBirth = selectedDate.trim();
    }

    console.log('EmployeeModelObj:', this.employeeModelObj);

    this.api.UpdateEmployee(this.employeeModelObj).subscribe((res) => {
      alert('Updated successfully');
      let ref = document.getElementById('cancel');
      ref?.click();
      this.GetEmployeeDetails();
    });
  }

  setSelectedDate(selectedDate: Date) {
    if (selectedDate) {
      selectedDate.setHours(0, 0, 0, 0);
      this.formValue.get('dateOfBirth')?.setValue(selectedDate);
    }
  }

  onSearch(event: Event) {
    const query = (event.target as HTMLInputElement).value.toLowerCase();

    if (this.allEmployees) {
      this.employeeData = this.allEmployees.filter((employee: any) => {
        return (
          employee.firstName.toLowerCase().includes(query) ||
          employee.lastName.toLowerCase().includes(query) ||
          employee.email.toLowerCase().includes(query) ||
          employee.dateOfBirth.toLowerCase().includes(query) ||
          employee.skill.toLowerCase().includes(query)
        );
      });

      // Check if no results are found and toggle the flag.
      this.noResultsFound = this.employeeData.length === 0;
    }
  }

  onFilterChange(event: any): void {
    const selectedFilter = event.target.value;

    // If no filter selected, revert to original data
    if (!selectedFilter) {
      this.employeeData = [...this.allEmployees];
      return;
    }

    this.employeeData.sort((a: any, b: any) => {
      // Handle numeric fields (like dateOfBirth if it's a timestamp)
      if (selectedFilter === 'dateOfBirth' || selectedFilter === 'joinDate') {
        return a[selectedFilter] - b[selectedFilter];
      }

      // Handle alphabetical fields
      const nameA = a[selectedFilter].toLowerCase();
      const nameB = b[selectedFilter].toLowerCase();

      if (nameA < nameB) return -1;
      if (nameA > nameB) return 1;
      return 0;
    });
  }
}
