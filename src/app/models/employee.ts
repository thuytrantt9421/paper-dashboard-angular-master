export class Employee {
  DOB: string;
  address: string;
  back_photo?: string;
  cccd: string;
  companyEmail?: string;
  createdAt?: string;
  department_id: number;
  facebook?: string;
  firstName: string;
  front_photo?: string;
  gender: string;
  id: number;
  lastName: string;
  name: string;
  personalEmail?: string;
  phoneNumber: string;
  position_id: number;
  skype?: string;
  updatedAt?: string;
  user_id: number;
  work_status?: string;
  department?: string;
  position?: string;
  timekeeping_photo?: string;

  public static build(): Employee {
    const instance: Employee = new Employee();
    instance.DOB = null;
    instance.address = null;
    instance.name = null;
    instance.firstName = null;
    instance.lastName = null;
    instance.personalEmail = null;
    instance.department_id = null;
    instance.position_id = null;
    instance.phoneNumber = null;
    instance.skype = null;
    // instance.facebook = null;
    instance.gender = null;
    instance.cccd = null;
    instance.companyEmail = null;
    instance.work_status = null;
    instance.user_id = null;
    return instance;
  }
}
