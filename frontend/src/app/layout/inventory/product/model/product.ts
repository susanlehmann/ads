export class Product {
  id: string;
  productName: string;
  category: string;
  brand: string;
  enableRetail: string;
  retailPrice: string;
  specialPrice: string;
  tax: string;
  enableCommission: string;
  barCode: string;
  sku: string;
  description: any;
  enableStockControl: boolean;
  supplyPrice: string
  reorderPoint: [];
  reorderQty: any;

  constructor() {
    this.new();
    return this;
  }

  new() {
    this.id = this.create_UUID();
    this.productName = this.randomString();
    this.category = "";
    this.brand = "";
    this.enableRetail = "";
    this.retailPrice = "";
    this.specialPrice = "";
    this.enableCommission = "";
    this.barCode = this.create_UUID();
    this.sku = "";
    this.description = "";
    this.enableStockControl = false;
    this.supplyPrice = "";
    this.reorderPoint = [];
    if (this.reorderQty === undefined) {
      this.reorderQty = new Commission();
    } else {
      this.reorderQty.new();
    }
  }

  getCurrentDateObject() {
    const d = new Date();
    return {year: d.getFullYear(), month: d.getMonth(), day: d.getDate() };
  }

  mockData() {
    this.productName = "Giang";
    this.category = "Mai";
    this.brand = "Admin";
    this.enableRetail = "84";
    this.retailPrice = "9123456789";
    this.specialPrice = "giang@mai.com";
    this.enableCommission = "Basic";
    this.barCode = "11111";
    this.sku = "";
    this.description = this.getCurrentDateObject();
    this.enableStockControl = true;
    this.supplyPrice = "red";
    this.reorderPoint = [];
    this.reorderQty = new Commission();
    this.reorderQty.product = 11;
    this.reorderQty.service = 22;
    this.reorderQty.voucherSale = 33;
  }

  static toModel(dto: any) {
    const model = new Product();
    model.updateData(dto);
    return model;
  }

  toDto(): any {
    const {service, product, voucherSale} = this.reorderQty;
    return {
      id: this.id,
      firstName: this.productName,
      lastName: this.category,
      email: this.specialPrice,
      phone : this.retailPrice,
      ennable_appointment_booking : this.enableStockControl ? 1 : 0,
      notes : this.barCode,
      start_date : '',
      end_date : '',
      appointment_color: this.supplyPrice,
      dial_code : this.enableRetail,
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
    this.productName = firstName;
    this.category = lastName;
    this.specialPrice = email;
    this.enableRetail = dial_code;
    this.retailPrice = phone;
    this.barCode = notes;
    this.sku = start_date;
    this.description = end_date;
    this.enableStockControl = ennable_appointment_booking === 1 ? true : false;
    this.supplyPrice = appointment_color;
    this.reorderQty.updateData(service_commission, product_commission, voucher_sales_commission);
  }

  randomString() {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  
    for (var i = 0; i < 5; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));
  
    return text;
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
