export class Client {
    id: number;
    firstName: string;
    lastName: string;
    telephone: string;
    mobile: string;
    email: string;
    password: string;
    notificationType: number;
    acceptNotification: number;
    gender: number;
    referral: number;
    notes: string;
    displayAllBooking: boolean;
    address: string;
    suburb: string
    city: String;
    state: String;
    zip: String;
    getuser: any;

    constructor() {
      this.new();
      return this;
    }
  
    new() {
      this.firstName = "";
      this.lastName = "";
      this.telephone = "";
      this.mobile = "";
      this.email = "";
      this.notificationType = 1;
      this.notes = "";
      this.gender = 1;
      this.referral = 1;
      this.address = "";
      this.suburb = "";
      this.city = "";
      this.state = "";
      this.zip = "";
      this.getuser = null;
    }
  
  
    mockData() {
      this.firstName = "Giang";
      this.lastName = "Mai";
      this.telephone = "123456789";
      this.mobile = "987654321";
      this.email = "giang@mai.com";
      this.notificationType = 2;
      this.notes = "11111";
      this.gender = 2;
      this.referral = 2;
      this.address = "Earth";
      this.city = "Hanoi";
      this.state = "Hanoi";
      this.zip = "100000";
      this.suburb = "Green star";
    }
  
    static toModel(dto: any) {
      const model = new Client();
      model.updateData(dto);
      return model;
    }

    newUser(): any {
      return {
        getuser: this.getuser,
        firstName: this.firstName,
        lastName: this.lastName,
        email: this.email,
        mobile: this.mobile,
        telephone: this.telephone,
        notes: this.notes,
        gender: this.gender,
        referral: this.referral,
        address: this.address,
        suburb: this.suburb,
        city: this.city,
        state: this.state,
        zip: this.zip,
        password: this.password,
        notificationType: this.notificationType,
        acceptNotification: this.acceptNotification,
      };
    }
  
    toDto(): any {
      return {
        id: this.id,
        firstName: this.firstName,
        lastName: this.lastName,
        email: this.email,
        mobile: this.mobile,
        telephone: this.telephone,
        notes: this.notes,
        gender: this.gender,
        referral: this.referral,
        address: this.address,
        suburb: this.suburb,
        city: this.city,
        state: this.state,
        zip: this.zip,
      };
    }
  
    updateData(data: any) {
      const {
        id,
        firstName,
        lastName,
        email,
        phone,
        notes,
        start_date,
        end_date,
        appointment_color,
        dial_code,
        address,
     } = data;
  
      this.id = id;
      this.firstName = firstName;
      this.lastName = lastName;
      this.email = email;
      this.telephone = dial_code;
      this.mobile = phone;
      this.notes = notes;
      this.gender = start_date;
      this.referral = end_date;
      this.address = address;
      this.suburb = appointment_color;
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
  