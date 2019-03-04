export class Supplier {
  id: number;
  name_supplier: string;
  discription_suppliner: string;
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
  country: string;
  timeupdate: any;
  second_address: any;
  constructor() {
    this.new();
    return this;
  }

  new() {
    this.name_supplier = "";
    this.discription_suppliner = "";
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
    this.country = "empty";
    this.second_address = "";
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
      discription_suppliner: this.discription_suppliner,
      firtname_supplier: this.firstName,
      lasname_supplier: this.lastName,
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
      second_address: this.second_address,
    };
  }

  updateData(data: any) {
    const {
      id,
      name_supplier,
      discription_suppliner,
      firtname_supplier,
      lasname_supplier,
      mobilenumber_supplier,
      telephone_supplier,
      email_supplier,
      website_supplier,
      street_supplier,
      suburb_supplier,
      city_supplier,
      state_supplier,
      zipcode_supplier,
      countryid_supplier,
      updated_at,
      second_address,
   } = data;

    this.id = id;
    this.name_supplier = name_supplier;
    this.discription_suppliner = discription_suppliner;
    this.firstName = firtname_supplier;
    this.lastName = lasname_supplier;
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
    this.timeupdate = updated_at;
    this.second_address = second_address;
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
