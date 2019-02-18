export class Brand {
  id: number;
  brandName: string;
  updatetime: string;

  constructor() {
    this.new();
    return this;
  }

  new() {
    this.brandName = "";
    this.updatetime = "";
  }

  mockData() {
    this.brandName = "Giang";
  }

  static toModel(dto: any) {
    const model = new Brand();
    model.updateData(dto);
    return model;
  }

  toDto(): any {
    return {
      id: this.id,
      name_category: this.brandName,
      updated_at: this.updatetime,
    };
  }

  updateData(data: any) {
    const {
      id,
      name_brand,
      updated_at
   } = data;

    this.id = id;
    this.brandName = name_brand;
    this.updatetime = updated_at;
  }

}
