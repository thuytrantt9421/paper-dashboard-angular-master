import { Component, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { ApiService } from "app/api/api";

@Component({
  selector: "request-management-cmp",
  moduleId: module.id,
  templateUrl: "request-management.component.html",
  styleUrls: ["request-management.component.scss"],
})
export class RequestManagementComponent implements OnInit {
  public waitList = [];
  public acceptList = [];
  public refuseList = [];

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.initTable();
  }

  initTable() {
    this.apiService.getListRequest().subscribe((res) => {
      if (res && res.listDonxinnghi) {
        console.log(res.listDonxinnghi[0]);
        res.listDonxinnghi[0].forEach((request) => {
          if (request.status === "wait") {
            this.waitList.push(request);
          } else if (request.status === "accept") {
            this.acceptList.push(request);
          } else {
            this.refuseList.push(request);
          }
        });
      }
    });
  }

  acceptRequest(id: number) {
    this.apiService.acceptRequest(id).subscribe((res) => {
      if (res) {
        alert("Duyệt yêu cầu thành công!");
        location.reload();
      }
    });
  }

  refuseRequest(id: number) {
    this.apiService.refuseRequest(id).subscribe((res) => {
      if (res) {
        alert("Từ chối yêu cầu thành công!");
        location.reload();
      }
    });
  }
}
