export class Staff {
  id: number;
  firstName: string;
  lastName: string;
  staffTitle: string;
  mobileNumber: any;
  email: string;
  password: string;
  userPermission: string;
  notes: string;
  employmentStartDate: Date;
  employmentEndDate: Date;
  appointmentBooking: boolean;
  appointmentColor: string
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
    this.mobileNumber = "";
    this.email = "";
    this.userPermission = "No Access";
    this.notes = "";
    this.employmentStartDate = new Date();
    this.employmentEndDate = null;
    this.appointmentBooking = true;
    this.appointmentColor = "";
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
    this.mobileNumber = "+84 123456789";
    this.email = "giang@mai.com";
    this.userPermission = "Basic";
    this.notes = "11111";
    this.employmentStartDate = new Date();
    this.employmentEndDate = null;
    this.appointmentBooking = true;
    this.appointmentColor = "red";
    this.services = [];
    this.commissions = new Commission();
    this.commissions.product = 11;
    this.commissions.service = 22;
    this.commissions.voucherSale = 33;
  }

  static toModel(dto: any) {
    const model = new Staff();
    model.updateData(dto);
    return model;
  }

  toDto(): any {
    const {service, product, voucherSale} = this.commissions;
    const options = {month: 'numeric', day: 'numeric', year: 'numeric' };
    return {
      id: this.id,
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
      phone : this.mobileNumber.internationalNumber,
      ennable_appointment_booking : this.appointmentBooking ? 1 : 0,
      notes : this.notes,
      start_date : this.employmentStartDate.toLocaleDateString('en-US', options),
      end_date : this.employmentEndDate.toLocaleDateString('en-US', options),
      appointment_color: this.appointmentColor,
      dial_code : this.mobileNumber.countryCode,
      service_commission : service,
      product_commission : product,
      voucher_sales_commission : voucherSale,
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
      voucher_sales_commission
   } = data;

    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.mobileNumber = phone;
    this.notes = notes;
    this.employmentStartDate = start_date ? new Date(start_date) : null;
    this.employmentEndDate = end_date ? new Date(end_date) : null;
    this.appointmentBooking = ennable_appointment_booking === 1 ? true : false;
    this.appointmentColor = appointment_color;
    this.commissions.updateData(service_commission, product_commission, voucher_sales_commission);
  }

  create_UUID() {
    var dt = new Date().getTime();
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = (dt + Math.random()*16)%16 | 0;
        dt = Math.floor(dt/16);
        return (c=='x' ? r :(r&0x3|0x8)).toString(16);
    });
    return uuid;
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