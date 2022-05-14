import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { ApiService } from "app/api/api";
import { Department } from "app/models/department";
import { Employee } from "app/models/employee";
import { Position } from "app/models/position";

@Component({
  selector: "table-cmp",
  moduleId: module.id,
  templateUrl: "table.component.html",
  styleUrls: ["table.component.scss"],
})
export class TableComponent implements OnInit {
  public dataSource: Employee[] = [];

  constructor(private apiService: ApiService, public router: Router) {}

  ngOnInit() {
    this.apiService.getListEmployee().subscribe((res) => {
      this.dataSource = res.employees[0];
      console.log(this.dataSource);
      this.dataSource.forEach((item) => {
        item.DOB = new Date(item.DOB).toLocaleDateString();
      });
    });
  }

  editUser(id: number) {
    const url = `/user/edit/${id}`;
    this.router.navigateByUrl(url);
  }

  deleteEmployee(employee_id: number, user_id: number) {
    this.apiService.deleteEmployee(employee_id).subscribe((res) => {
      if (res) {
        this.apiService.deleteUser(user_id).subscribe((result) => {
          console.log(result);
          alert("Xoá người dùng thành công!");
          location.reload();
        });
      }
    });
  }
}
