import { Injectable } from '@angular/core';
import { DatePipe } from '@angular/common';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';
const CSV_EXTENSION = '.csv';

@Injectable()
export class ExcelService {

	constructor(private datePipe: DatePipe) { }

	public exportAsExcelFile(json: any[], excelFileName: string): void {
		const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(json);
		const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
		const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
		this.saveAsExcelFile(excelBuffer, excelFileName);
	}

	private saveAsExcelFile(buffer: any, fileName: string): void {
		const data: Blob = new Blob([buffer], {type: EXCEL_TYPE});
		FileSaver.saveAs(data, fileName + '_' + this.datePipe.transform(new Date(), 'yyyy-MM-dd') + EXCEL_EXTENSION);
	}

	private saveAsCsvFile(buffer: any, fileName: string): void {
		const data: Blob = new Blob([buffer], {type: EXCEL_TYPE});
		FileSaver.saveAs(data, fileName + '_' + this.datePipe.transform(new Date(), 'yyyy-MM-dd') + CSV_EXTENSION);
	}

	public exportAsCSVFile(json: any[], excelFileName: string): void {
		const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(json);
		const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
		const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
		this.saveAsCsvFile(excelBuffer, excelFileName);
	}
}