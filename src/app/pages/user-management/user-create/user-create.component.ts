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
  selectedImg: File;
  previews: string = "";
  createEmployeeForm: FormGroup;
  listDepartment: Department[] = [];
  listPosition: Position[] = [];
  formdata = new FormData();

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
        // console.log(this.previews);
      };

      this.formdata.append(
        "timekeeping_photo",
        this.selectedImg,
        this.selectedImg.name
      );
      console.log(this.formdata);
      reader.readAsDataURL(this.selectedImg);
    }
  }

  createEmployee() {
    const controls = this.createEmployeeForm.controls;
    console.log(this.createEmployeeForm);

    this.apiService
      .createUser(controls.username.value, controls.password.value)
      .subscribe((res) => {
        debugger;
        console.log(res);
        if (res) {
          this.formdata.append(
            "name",
            `${controls.lastName.value} ${controls.firstName.value}`
          );
          this.formdata.append("firstName", controls.firstName.value);
          this.formdata.append("lastName", controls.lastName.value);
          this.formdata.append("DOB", controls.DOB.value.toString());
          this.formdata.append("gender", controls.gender.value);
          this.formdata.append(
            "phoneNumber",
            controls.phoneNumber.value.toString()
          );
          this.formdata.append("department_id", controls.department_id.value);
          this.formdata.append("position_id", controls.position_id.value);
          this.formdata.append("personalEmail", controls.personalEmail.value);
          this.formdata.append(
            "skype",
            controls.skype?.value ? controls.skype.value : ""
          );
          this.formdata.append(
            "address",
            controls.address?.value ? controls.address.value : ""
          );
          this.formdata.append("cccd", controls.cccd.value);
          this.formdata.append("user_id", res.id.toString());
          this.formdata.append("work_status", "");
          this.formdata.append("companyEmail", "");

          this.apiService.createEmployee(this.formdata).subscribe((result) => {
            console.log(result);
            alert("Thêm mới hồ sơ thành công!");
            this.route.navigateByUrl("/user");
          });
        }
      });
  }
}
