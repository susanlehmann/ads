export class User {
    id: number;
    firstName: string;
    lastName: string;
    staffTitle: string;
    dialCode: string;
    mobileNumber: string;
    email: string;
    password: string;
    userPermission: string;
    notes: string;
    employmentStartDate: any;
    employmentEndDate: any;
    apointmentBooking: boolean;
    apointmentColor: string
    services: [];
    commissions: Commission;

    constructor() {
      this.new();
      return this;
    }

    new() {
      this.firstName = "";
      this.lastName = "";
      this.staffTitle = "";
      this.dialCode = "";
      this.mobileNumber = "";
      this.email = "";
      this.userPermission = "";
      this.notes = "";
      this.employmentStartDate = this.getCurrentDateObject();
      this.employmentEndDate = "";
      this.apointmentBooking = false;
      this.apointmentColor = "";
      this.services = [];
      if (this.commissions === undefined) {
        this.commissions = new Commission();
      } else {
        this.commissions.new();
      }
    }

    getCurrentDateObject() {
      const d = new Date();
      return {year: d.getFullYear(), month: d.getMonth(), day: d.getDate() };
    }

    mockData() {
      this.firstName = "Giang";
      this.lastName = "Mai";
      this.staffTitle = "Admin";
      this.dialCode = "84";
      this.mobileNumber = "9123456789";
      this.email = "giang@mai.com";
      this.userPermission = "Basic";
      this.notes = "11111";
      this.employmentStartDate = this.getCurrentDateObject();
      this.employmentEndDate = this.getCurrentDateObject();
      this.apointmentBooking = true;
      this.apointmentColor = "red";
      this.services = [];
      this.commissions = new Commission();
      this.commissions.product = 11;
      this.commissions.service = 22;
      this.commissions.voucherSale = 33;
    }

    static toModel(dto: any) {
      const model = new User();
      model.updateData(dto);
      return model;
    }

    toDto(): any {
      const {service, product, voucherSale} = this.commissions;
      return {
        id: this.id,
        firstName: this.firstName,
        lastName: this.lastName,
        email: this.email,
        phone : this.mobileNumber,
        ennable_appointment_bookig : this.apointmentBooking ? 1 : 0,
        notes : this.notes,
        start_date : '',
        end_date : '',
        appointment_color: this.apointmentColor,
        dial_code : this.dialCode,
        service_commission : service,
        product_commission : product,
        voucher_sales_commission : voucherSale,
        user_permission : this.userPermission,
      };
    }

    updateData(data: any) {
      const {
        id,
        firstName,
        lastName,
        email,
        phone,
        ennable_appointment_booking,
        notes,
        start_date,
        end_date,
        appointment_color,
        dial_code,
        service_commission,
        product_commission,
        user_permission,
        voucher_sales_commission
     } = data;

      this.id = id;
      this.firstName = firstName;
      this.lastName = lastName;
      this.email = email;
      this.dialCode = dial_code;
      this.mobileNumber = phone;
      this.notes = notes;
      this.employmentStartDate = start_date;
      this.employmentEndDate = end_date;
      this.apointmentBooking = ennable_appointment_booking === 1 ? true : false;
      this.apointmentColor = appointment_color;
      this.userPermission = user_permission;
      this.commissions.updateData(service_commission, product_commission, voucher_sales_commission);
    }

}

export class Commission {
  service: number;
  product: number;
  voucherSale: number;

  constructor() {
    this.new();
    return this;
  }

  new() {
    this.service = null;
    this.product = null;
    this.voucherSale = null;
  }

  updateData(service_commission, product_commission, voucher_sales_commission) {
    this.service = service_commission;
    this.product = product_commission;
    this.voucherSale = voucher_sales_commission;
  }

}

export interface UserDto {
  find_user: {
    id : number;
    firstName : string;
    lastName : string;
    email : string;
    password : string;
    phone : string;
    ennable_appointment_booking : number;
    notes : string;
    start_date : string;
    end_date : string;
    appointment_color : string;
    dial_code : string;
    first_login : number;
    service_commission : number;
    product_commission : number;
    voucher_sales_commission : number;
    user_permission : number;
    sort_order: number;
    level: number;
  };
  
}
