import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators";
import { BehaviorSubject } from "rxjs";
import { Employee } from "app/models/employee";
import { Position } from "app/models/position";
import { Department } from "app/models/department";
import { RequestForm } from "app/models/request";

const URL = "http://backend-timekeeping.herokuapp.com/api/";
const options = {
  headers: {
    token: window.sessionStorage.getItem("token"),
  },
};

export class listUser {
  employees;
}
export class listPosition {
  positons: Position[];
}
export class listDepartment {
  departments: Department[];
}
export class registerRes {
  message: string;
  id: number;
}
export class loginRes {
  message: string;
  id: number;
  username: string;
  role: string;
  token: string;
}
export class userInfo {
  id: number;
  username: string;
  password: string;
  role: string;
  disable: false;
}
export class UploadRes {
  asset_id: string;
  public_id: string;
  secure_url: string;
}
export class RequestRes {
  listDonxinnghi: [RequestForm[]];
}

@Injectable({
  providedIn: "root",
})
export class ApiService {
  constructor(private httpClient: HttpClient) {}

  public allDepartments = new BehaviorSubject<Department[]>([]);

  public allPositions = new BehaviorSubject<Position[]>([]);

  public getListEmployee() {
    return this.httpClient.get<listUser>(URL + "employee/listEmployee").pipe(
      map((result) => {
        return result;
      })
    );
  }

  public createEmployee(employee: any) {
    return this.httpClient
      .post(URL + "employee/createEmployee", employee, options)
      .pipe(
        map((result) => {
          return result;
        })
      );
  }

  public editEmployee(employee: Employee, id: any) {
    return this.httpClient
      .put(`${URL}employee/updateEmployee?employeeId=${id}`, employee, options)
      .pipe(
        map((result) => {
          return result;
        })
      );
  }

  public deleteEmployee(id: number) {
    return this.httpClient
      .delete(`${URL}employee/deleteEmployee?employeeId=${id}`, options)
      .pipe(
        map((result) => {
          return result;
        })
      );
  }

  public getListDepartment() {
    return this.httpClient
      .get<listDepartment>(URL + "department/listDepartment")
      .pipe(
        map((result) => {
          return result;
        })
      );
  }

  public getListPosition() {
    return this.httpClient
      .get<listPosition>(URL + "position/listPosition")
      .pipe(
        map((result) => {
          return result;
        })
      );
  }

  public createUser(username: string, password: string) {
    return this.httpClient
      .post<registerRes>(URL + "auth/register", {
        username: username,
        password: password,
        role: "user",
      })
      .pipe(
        map((result) => {
          return result;
        })
      );
  }

  public login(username: string, password: string) {
    return this.httpClient
      .post<loginRes>(URL + "auth/login", {
        username: username,
        password: password,
      })
      .pipe(
        map((result) => {
          return result;
        })
      );
  }

  public getEmployeeInfo(id: string) {
    return this.httpClient
      .get<Employee>(`${URL}employee/getEmployeeInfoForWeb?id=${id}`, options)
      .pipe(
        map((result) => {
          return result;
        })
      );
  }
  public getUserInfo(id: number) {
    return this.httpClient
      .get<userInfo>(`${URL}auth/getUserInfo?id=${id}`, options)
      .pipe(
        map((result) => {
          return result;
        })
      );
  }
  public deleteUser(id: number) {
    return this.httpClient
      .delete(`${URL}auth/deleteUser?id=${id}`, options)
      .pipe(
        map((result) => {
          return result;
        })
      );
  }

  public uploadFile(file: File) {
    let url = "https://api.cloudinary.com/v1_1/dfglhscaj/image/upload";
    let formData = new FormData();

    formData.append("file", file);
    formData.append("upload_preset", "timekeeping");

    if (file.size > 5000000) {
      alert("File cannot be more than 5 MB");
      return;
    }

    return this.httpClient.post<UploadRes>(url, formData).pipe(
      map((result) => {
        return result;
      })
    );
  }

  public getListRequest() {
    return this.httpClient
      .get<RequestRes>(URL + "donxinnghi/adminGetList", options)
      .pipe(
        map((result) => {
          return result;
        })
      );
  }

  public acceptRequest(id: number) {
    return this.httpClient
      .put(`${URL}donxinnghi/acceptDonxinnghi/${id}`, null, options)
      .pipe(
        map((result) => {
          return result;
        })
      );
  }

  public refuseRequest(id: number) {
    return this.httpClient
      .put(`${URL}donxinnghi/refuseDonxinnghi/${id}`, null, options)
      .pipe(
        map((result) => {
          return result;
        })
      );
  }
}
