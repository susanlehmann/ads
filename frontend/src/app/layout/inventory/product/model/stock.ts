export class Stock {
  id: number;
  productId: number;
  stockQty: number;
  supplyPrice: number;
  savePrice: boolean;
  reason: number;
  description: string;
  isIncreased: boolean;

  totalStock: number;
  createdAt: string;
  action: string;
  staffName = "Giang";

  decreaseReasons = [
    {id: 1, name: 'Internal Use'},
    {id: 2, name: 'Damaged'},
    {id: 3, name: 'Out of date'},
    {id: 4, name: 'Adjustment'},
    {id: 5, name: 'Lost'},
    {id: 6, name: 'Other'},
  ];
  increaseReasons = [
    {id: 1, name: 'New Stock'},
    {id: 2, name: 'Return'},
    {id: 3, name: 'Adjustment'},
    {id: 4, name: 'Other'},
  ];

  constructor() {
    this.new();
    return this;
  }

  new() {
    this.id = 1;
    this.supplyPrice = 1;
    this.savePrice = false;
    this.reason = 1;
    this.description = "";
    this.supplyPrice = 0;
  }

  static toModel(dto: any) {
    const model = new Stock();
    model.updateData(dto);
    return model;
  }

  toDto(): any {
    return {
      id: this.id,
      id_product: this.productId,
      stock_qty: this.stockQty,
      stock_price : this.supplyPrice,
      save_price : this.savePrice ? 1 : 0,
      reason_stock : this.reason,
      discription_stock: this.description,
      total_stock: this.totalStock,
      status_stock: this.isIncreased ? 1 : 0,
    };
  }

  updateData(data: any) {
    this.id = data.id;
    this.stockQty = data.stock_qty;
    this.supplyPrice = data.stock_price;
    this.reason = data.reason_stock;
    this.savePrice = data.save_price === 1 ? true : false;
    this.description = data.discryption_product;
    this.isIncreased = data.status_stock === 1 ? true : false;
    this.totalStock = data.total_stock;
    this.createdAt = data.created_at;
    this.action = this.getActionName();
  }

  getActionName() {
    if (this.isIncreased) {
      const v = this.increaseReasons.filter(v => this.reason === v.id)[0];
      return v ? v.name : "";
    }
    const v = this.decreaseReasons.filter(v => this.reason === v.id)[0];
    return v ? v.name : "";
  }

}
