import { Injectable } from "@angular/core";
import { NgbDateParserFormatter, NgbDateStruct } from "@ng-bootstrap/ng-bootstrap";

@Injectable()
export class NgbDateEnGbParserFormatter extends NgbDateParserFormatter {
  parse(value: string): NgbDateStruct {
    return <NgbDateStruct>{};
  }

  format(date: NgbDateStruct): string {
    if (!date) return '';
    
    const options = {weekday: 'long', day: '2-digit', month: 'long', year: 'numeric'};
    return new Date(date.year, date.month, date.day).toLocaleDateString('en-GB', options);
  }
}