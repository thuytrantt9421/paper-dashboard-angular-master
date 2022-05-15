import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators";
import { BehaviorSubject } from "rxjs";
import { Employee } from "app/models/employee";
import { Position } from "app/models/position";
import { Department } from "app/models/department";

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
      .get<Employee>(`${URL}employee/getEmployeeInfo?id=${id}`, options)
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
}
