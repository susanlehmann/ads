export class Order {
  id: number;
  orderName: string;
  updatetime: string;
  statusOrder: number;

  constructor() {
    this.new();
    return this;
  }

  new() {
    this.orderName = "";
    this.updatetime = "";
    this.statusOrder = 1;
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
      status_order: this.statusOrder,
    };
  }

  updateData(data: any) {
    const {
      id,
      name_Order,
      updated_at,
      name_supplier,
      status_order,
   } = data;

    this.id = id;
    this.orderName = name_supplier;
    this.updatetime = updated_at;
    this.statusOrder = status_order;
  }

}
