import { Component, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { ApiService } from "app/api/api";
import { Department } from "app/models/department";
import { Employee } from "app/models/employee";
import { Position } from "app/models/position";

@Component({
  selector: "user-edit-cmp",
  moduleId: module.id,
  templateUrl: "user-edit.component.html",
})
export class UserEditComponent implements OnInit {
  selectedImg: Blob;
  previews: string = "";
  editEmployeeForm: FormGroup;
  listDepartment: Department[] = [];
  listPosition: Position[] = [];
  employeeId: string;
  employeeName: string = "";

  constructor(
    private route: Router,
    private fb: FormBuilder,
    private apiService: ApiService,
    private activatedRouter: ActivatedRoute
  ) {}

  ngOnInit() {
    this.apiService.getListDepartment().subscribe((res) => {
      this.listDepartment = res.departments;
    });
    this.apiService.getListPosition().subscribe((res) => {
      this.listPosition = res.positons;
    });

    this.initFilterForm();

    this.activatedRouter.paramMap.subscribe((params) => {
      const id = params.get("id") ? params.get("id") : null;
      console.log(id);
      this.employeeId = id;
      this.getDataById(id);
    });
  }

  initFilterForm() {
    this.editEmployeeForm = this.fb.group({
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
      user_id: new FormControl(""),
    });
  }

  getDataById(id: string) {
    const controls = this.editEmployeeForm.controls;

    this.apiService.getEmployeeInfo(id).subscribe((res) => {
      console.log(res);
      if (!res) {
        return;
      }
      this.employeeName = res.name;
      controls.firstName.patchValue(res.firstName);
      controls.lastName.patchValue(res.lastName);
      controls.DOB.patchValue(new Date(res.DOB).toISOString().slice(0, 10));
      controls.gender.patchValue(res.gender);
      controls.cccd.patchValue(res.cccd);
      controls.phoneNumber.patchValue(res.phoneNumber);
      controls.personalEmail.patchValue(res.personalEmail);
      controls.department_id.patchValue(res.department_id);
      controls.position_id.patchValue(res.position_id);
      controls.address.patchValue(res.address);
      controls.skype.patchValue(res.skype);
      controls.facebook.patchValue(res.facebook);
      controls.user_id.patchValue(res.user_id);

      this.apiService.getUserInfo(res.user_id).subscribe((result) => {
        controls.username.patchValue(result.username);
        // console.log(result);
      });
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

  updateEmployee() {
    const controls = this.editEmployeeForm.controls;
    console.log(this.editEmployeeForm);
    if (this.editEmployeeForm.invalid) {
      return;
    }
    let employee: Employee = new Employee();
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
    employee.cccd = controls.cccd.value;
    employee.companyEmail = null;
    employee.work_status = null;

    console.log(employee);

    this.apiService
      .editEmployee(employee, this.employeeId)
      .subscribe((result) => {
        console.log(result);
        alert("Cập nhật hồ sơ thành công!");
        this.route.navigateByUrl("/user");
      });
  }
}
