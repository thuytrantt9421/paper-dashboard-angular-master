import { Component, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { Router } from "@angular/router";
import { ApiService } from "app/api/api";
import { Department } from "app/models/department";
import { Employee } from "app/models/employee";
import { Position } from "app/models/position";

@Component({
  selector: "user-create-cmp",
  moduleId: module.id,
  templateUrl: "user-create.component.html",
})
export class UserCreateComponent implements OnInit {
  selectedImg: Blob;
  previews: string = "";
  createEmployeeForm: FormGroup;
  listDepartment: Department[] = [];
  listPosition: Position[] = [];

  constructor(
    private route: Router,
    private fb: FormBuilder,
    private apiService: ApiService
  ) {}

  ngOnInit() {
    this.apiService.getListDepartment().subscribe((res) => {
      this.listDepartment = res.departments;
      console.log(this.listDepartment);
    });
    this.apiService.getListPosition().subscribe((res) => {
      this.listPosition = res.positons;
    });
    this.initFilterForm();
  }

  initFilterForm() {
    this.createEmployeeForm = this.fb.group({
      DOB: new FormControl("", Validators.required),
      address: new FormControl(""),
      cccd: new FormControl("", Validators.required),
      companyEmail: new FormControl(""),
      department_id: new FormControl("", Validators.required),
      facebook: new FormControl(""),
      firstName: new FormControl("", Validators.required),
      gender: new FormControl("", Validators.required),
      lastName: new FormControl("", Validators.required),
      personalEmail: new FormControl("", Validators.required),
      phoneNumber: new FormControl("", Validators.required),
      position_id: new FormControl("", Validators.required),
      skype: new FormControl(""),
      timekeeping_photo: new FormControl(""),
      username: new FormControl("", Validators.required),
      work_status: new FormControl(""),
      password: new FormControl("", Validators.required),
    });
  }

  uploadImg() {
    const inputFile = document.getElementById("file");
    inputFile.click();
  }

  async changeImage(event: any) {
    this.selectedImg = event.target.files ? event.target.files[0] : null;
    console.log(this.selectedImg);
    this.previews = "";
    if (this.selectedImg) {
      const reader = new FileReader();

      reader.onload = (e: any) => {
        this.previews = e.target.result;
      };

      reader.readAsDataURL(this.selectedImg);
    }
  }

  createEmployee() {
    const controls = this.createEmployeeForm.controls;
    console.log(this.createEmployeeForm);
    if (this.createEmployeeForm.invalid) {
      return;
    }
    let employee: Employee = Employee.build();
    this.apiService
      .createUser(controls.username.value, controls.password.value)
      .subscribe((res) => {
        debugger;
        console.log(res);
        if (res) {
          employee.name = `${controls.lastName.value} ${controls.firstName.value}`;
          employee.firstName = controls.firstName.value;
          employee.lastName = controls.lastName.value;
          employee.DOB = controls.DOB.value.toString();
          employee.gender = controls.gender.value;
          employee.phoneNumber = controls.phoneNumber.value.toString();
          employee.department_id = Number(controls.department_id.value);
          employee.position_id = Number(controls.position_id.value);
          employee.personalEmail = controls.personalEmail.value;
          employee.skype = controls.skype?.value;
          // employee.facebook = controls.facebook?.value;
          employee.address = controls.address?.value;
          employee.user_id = res.id;
          employee.cccd = controls.cccd.value;
          console.log(employee);
          this.apiService.createEmployee(employee).subscribe((result) => {
            console.log(result);
            alert("Thêm mới hồ sơ thành công!");
            this.route.navigateByUrl("/user");
          });
        }
      });
  }
}
