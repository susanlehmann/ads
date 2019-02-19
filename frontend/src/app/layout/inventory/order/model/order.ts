export class Order {
  id: number;
  orderName: string;
  updatetime: string;

  constructor() {
    this.new();
    return this;
  }

  new() {
    this.orderName = "";
    this.updatetime = "";
  }

  mockData() {
    this.orderName = "Giang";
  }

  static toModel(dto: any) {
    const model = new Order();
    model.updateData(dto);
    return model;
  }

  toDto(): any {
    return {
      id: this.id,
      name_supplier: this.orderName,
      updated_at: this.updatetime,
    };
  }

  updateData(data: any) {
    const {
      id,
      name_Order,
      updated_at,
      name_supplier,
   } = data;

    this.id = id;
    this.orderName = name_supplier;
    this.updatetime = updated_at;
  }

}
