export class Stock {
  id: number;
  productId: number;
  stockQty: number;
  decreaseQty: number;
  supplyPrice: number;
  savePrice: boolean;
  increaseReason: number;
  decreaseReason: number;
  description: string;
  isIncreased: boolean;

  constructor() {
    this.new();
    return this;
  }

  new() {
    this.id = 1;
    this.supplyPrice = 1;
    this.savePrice = false;
    this.increaseReason = 0;
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
      stock_price : this.increaseReason,
      save_price : this.description,
      reason_stock : this.decreaseReason,
      discription_stock: this.description,
    };
  }

  updateData(data: any) {
    this.id = data.id;
    this.stockQty = data.stock_qty;
    this.supplyPrice = data.stock_price;
    this.increaseReason = data.reason_stock;
    this.savePrice = data.save_price === 1 ? true : false;
    this.description = data.discryption_product;
    this.isIncreased = data.status_stock === 1 ? true : false;
  }

}