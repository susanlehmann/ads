export class Schedule {
  id: number;
  shift1_start: string;
  shift1_end: string;
  shift2_start: string;
  shift2_end: string;
  is_repeat: string;
  repeat_weekly: string;
  end_repeat: string;
  constructor() {
    this.new();
    return this;
  }

  new() {
    this.shift1_start = "";
    this.shift1_end = "";
    this.shift2_start = "";
    this.shift2_end = "";
    this.is_repeat = "";
    this.repeat_weekly = "";
    this.end_repeat = "";
  }

  getCurrentDateObject() {
    const d = new Date();
    return {year: d.getFullYear(), month: d.getMonth(), day: d.getDate() };
  }

  static toModel(dto: any) {
    const model = new Schedule();
    model.updateData(dto);
    return model;
  }

  toDto(): any {
    return {
      id: this.id,
      shift1_start: this.shift1_start,
      shift1_end: this.shift1_end,
      shift2_start: this.shift2_start,
      shift2_end : this.shift2_end,
      is_repeat : this.is_repeat,
      repeat_weekly : this.repeat_weekly,
      end_repeat: this.end_repeat,
    };
  }

  updateData(data: any) {
    const {
      id,
      shift1_start,
      shift1_end,
      shift2_start,
      shift2_end,
      is_repeat,
      repeat_weekly,
      end_repeat,
   } = data;

    this.id = id;
    this.shift1_start = shift1_start;
    this.shift1_end = shift1_end;
    this.shift2_start = shift2_start;
    this.shift2_end = shift2_end;
    this.is_repeat = is_repeat;
    this.repeat_weekly = repeat_weekly;
    this.end_repeat = end_repeat;
  }

}
