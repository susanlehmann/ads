export class Supplier {
  id: number;
  name_supplier: string;
  description_supplier: string;
  firstName: string;
  lastName: string;
  mobileNumber: string;
  telephoneNumber: string;
  email: string;
  website: string;
  street: string;
  suburb: string;
  city: string;
  sate: string;
  postCode: string;
  country: any;
  constructor() {
    this.new();
    return this;
  }

  new() {
    this.name_supplier = "";
    this.description_supplier = "";
    this.firstName = "";
    this.lastName = "";
    this.mobileNumber = "";
    this.telephoneNumber = "";
    this.email = "";
    this.website = "";
    this.street = "";
    this.suburb = "";
    this.city = "";
    this.sate = "";
    this.postCode = "";
    this.country = "";
  }

  static toModel(dto: any) {
    const model = new Supplier();
    model.updateData(dto);
    return model;
  }

  toDto(): any {
    return {
      id: this.id,
      name_supplier: this.name_supplier,
      discription_supplier: this.description_supplier,
      firstName_supplier: this.firstName,
      lastName_supplier: this.lastName,
      email_supplier: this.email,
      mobilenumber_supplier : this.mobileNumber,
      telephone_supplier : this.telephoneNumber,
      website_supplier : this.website,
      street_supplier : this.street,
      suburb_supplier : this.suburb,
      city_supplier: this.city,
      state_supplier : this.sate,
      zipcode_supplier : this.postCode,
      countryid_supplier : this.country,
    };
  }

  updateData(data: any) {
    const {
      id,
      name_supplier,
      discription_supplier,
      firstName_supplier,
      lastName_supplier,
      mobilenumber_supplier,
      telephone_supplier,
      email_supplier,
      website_supplier,
      street_supplier,
      suburb_supplier,
      city_supplier,
      state_supplier,
      zipcode_supplier,
      countryid_supplier
   } = data;

    this.id = id;
    this.name_supplier = name_supplier;
    this.description_supplier = this.description_supplier;
    this.firstName = firstName_supplier;
    this.lastName = lastName_supplier;
    this.mobileNumber = mobilenumber_supplier;
    this.telephoneNumber = telephone_supplier;
    this.email = email_supplier;
    this.website = website_supplier;
    this.street = street_supplier;
    this.suburb = suburb_supplier;
    this.city = city_supplier;
    this.sate = state_supplier;
    this.postCode = zipcode_supplier;
    this.country = countryid_supplier;
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
