export class Category {
    id: number;
    categoryName: string;
    updatetime: string;

    constructor() {
      this.new();
      return this;
    }

    new() {
      this.categoryName = "";
      this.updatetime = "";
    }

    static toModel(dto: any) {
      const model = new Category();
      model.updateData(dto);
      return model;
    }

    toDto(): any {
      return {
        id: this.id,
        name_category: this.categoryName,
        updated_at: this.updatetime,
      };
    }

    updateData(data: any) {
      const {
        id,
        name_category,
        updated_at
     } = data;

      this.id = id;
      this.categoryName = name_category;
      this.updatetime = updated_at;
    }

  }
