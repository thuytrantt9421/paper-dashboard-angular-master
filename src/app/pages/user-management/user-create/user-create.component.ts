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
  file_content: string = "";

  constructor(
    private route: Router,
    private fb: FormBuilder,
    private apiService: ApiService
  ) {}

  ngOnInit() {
    this.apiService.getListDepartment().subscribe((res) => {
      this.listDepartment = res.departments;
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

        // var b64 = this.previews.replace(/^data:.+;base64,/, "");
        // console.log(b64.length);
        // this.file_content = b64;

        // var blob = window.dataURLtoBlob(reader.result);

        // const temp = atob(b64);
        // console.log(temp);

        // this.formdata.append("timekeeping_photo", this.selectedImg);
      };

      reader.readAsDataURL(this.selectedImg);
    }
  }

  createEmployee() {
    const controls = this.createEmployeeForm.controls;
    console.log(this.createEmployeeForm);

    this.apiService
      .createUser(controls.username.value, controls.password.value)
      .subscribe((res) => {
        console.log(res);
        if (res) {
          // this.formdata.append(
          //   "name",
          //   `${controls.lastName.value} ${controls.firstName.value}`
          // );
          // this.formdata.append("firstName", controls.firstName.value);
          // this.formdata.append("lastName", controls.lastName.value);
          // this.formdata.append("DOB", controls.DOB.value.toString());
          // this.formdata.append("gender", controls.gender.value);
          // this.formdata.append(
          //   "phoneNumber",
          //   controls.phoneNumber.value.toString()
          // );
          // this.formdata.append("department_id", controls.department_id.value);
          // this.formdata.append("position_id", controls.position_id.value);
          // this.formdata.append("personalEmail", controls.personalEmail.value);
          // this.formdata.append(
          //   "skype",
          //   controls.skype?.value ? controls.skype.value : ""
          // );
          // this.formdata.append(
          //   "address",
          //   controls.address?.value ? controls.address.value : ""
          // );
          // this.formdata.append("cccd", controls.cccd.value);
          // this.formdata.append("user_id", res.id.toString());
          // this.formdata.append("work_status", "");
          // this.formdata.append("companyEmail", "");

          let employee = new Employee();
          employee.name = `${controls.lastName.value} ${controls.firstName.value}`;
          employee.firstName = controls.firstName.value;
          employee.lastName = controls.lastName.value;
          employee.DOB = controls.DOB.value.toString();
          employee.address = controls.address?.value
            ? controls.address.value
            : "";
          employee.work_status = null;
          employee.skype = controls.skype?.value ? controls.skype.value : "";
          employee.gender = controls.gender.value;
          employee.personalEmail = controls.personalEmail.value;
          employee.companyEmail = null;
          employee.department_id = Number(controls.department_id.value);
          employee.position_id = Number(controls.position_id.value);
          employee.phoneNumber = controls.phoneNumber.value.toString();
          employee.user_id = res.id;
          employee.cccd = controls.cccd.value;
          // employee.timekeeping_photo = this.selectedImg;

          this.apiService.uploadFile(this.selectedImg).subscribe((result) => {
            console.log(result);
            if (result) {
              employee.timekeeping_photo = result.secure_url;
              this.apiService.createEmployee(employee).subscribe((rs) => {
                console.log(rs);
                alert("Thêm mới hồ sơ thành công!");
                this.route.navigateByUrl("/user");
              });
            }
          });
        }
      });
  }
}
