export class Service {
  id: number;
  groupName: string;
  groupColor: string;
  groupDescription: string;
  idclient: number;

  constructor() {
    this.new();
    return this;
  }

  new() {
    this.groupName = "";
    this.groupColor = "";
    this.groupDescription = "";
  }

  mockData() {
    this.groupName = "Giang";
    this.groupColor = "red";
  }

  static toModel(dto: any) {
    const model = new Service();
    //model.updateData(dto);
    model.groupName = dto.name_service_group;
    model.groupColor = dto.color_service_group;
    model.groupDescription = dto.description_service_group
    model.idclient = dto.id_client;
    return model;
  }

  toDto(): any {
    return {
      id: this.id,
      groupName: this.groupName,
      group_color: this.groupColor,
      idclient: this.idclient,
    };
  }
  updateData(data: any) {
    const {
      id,
      groupName,
      groupColor,
      groupDescription,
      idclient
   } = data;

    this.id = id;
    this.groupName = groupName;
    this.groupColor = groupColor;
    this.groupDescription = groupDescription;
    this.idclient = idclient;
  }


}
