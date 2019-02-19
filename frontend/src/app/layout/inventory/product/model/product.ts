export class Product {
  id: number;
  productName: string;
  categoryId: number;
  brandId: number;
  enableRetail: boolean;
  retailPrice: number;
  specialPrice: number;
  tax: number;
  enableCommission: boolean;
  barCode: string;
  sku: string;
  description: string;
  enableStockControl: boolean;
  supplyPrice: number
  reorderPoint: number;
  reorderQty: number;

  // view detail
  totalOnHand: number;
  totalStockCost: number;
  avgStockCost: number;
  brandName: string;
  categoryName: string;
  supplierName: string;

  constructor() {
    this.new();
    return this;
  }

  new() {
    this.id = 1;
    this.productName = this.randomString();
    this.categoryId = 1;
    this.brandId = 1;
    this.enableRetail = true;
    this.retailPrice = 0;
    this.specialPrice = 0;
    this.enableCommission = false;
    this.barCode = this.create_UUID();
    this.sku = "";
    this.description = "";
    this.enableStockControl = false;
    this.supplyPrice = 0;
  }

  getCurrentDateObject() {
    const d = new Date();
    return {year: d.getFullYear(), month: d.getMonth(), day: d.getDate() };
  }

  mockData() {
    this.productName = "Giang";
    this.barCode = "11111";
    this.sku = "";
    this.enableStockControl = true;
  }

  static toModel(dto: any) {
    const model = new Product();
    model.updateData(dto);
    return model;
  }

  toDto(): any {
    return {
      id: this.id,
      id_category: this.categoryId,
      name_product: this.productName,
      id_brand: this.brandId,
      specialprice_product: this.specialPrice,
      retaiprice_product : this.retailPrice,
      barcode_product : this.barCode,
      sku_product : this.sku,
      discryption_product : this.description,
      supplyprice_product : this.supplyPrice,
      initialstock_product : this.id,
      reorderpoint_product: this.reorderPoint,
      reorderqty_product: this.reorderQty,
    };
  }

  updateData(data: any) {

    this.id = data.id_client_product;
    this.productName = data.name_product;
    this.categoryId = data.id_category;
    this.specialPrice = data.id_category;
    this.enableRetail = data.id_category;
    this.retailPrice = data.id_category;
    this.barCode = data.id_category;
    this.sku = data.sku_product;
    this.description = data.discryption_product;
    this.enableStockControl = data.discryption_product === 1 ? true : false;
    this.supplyPrice = data.discryption_product;
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