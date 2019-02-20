import { Component, OnInit, ViewChild } from '@angular/core';
import { routerTransition } from '../../router.animations';
import * as $ from 'jquery';
import { EventSesrvice } from './event.service';
import {NgbModal, NgbModalRef, ModalDismissReasons, NgbModalOptions} from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'app-calendar',
    templateUrl: './calendar.component.html',
    styleUrls: ['./calendar.component.scss'],
    animations: [routerTransition()]
})
export class CalendarComponent implements OnInit {
    calendarOptions: any;
    displayEvent: any;
    _clickEvent: any;
    closeResult: any;
    modalOptions: NgbModalOptions;
    viewDate: Date = new Date();
    view: string = 'week';
    
    constructor(protected eventService: EventSesrvice,
      private modal: NgbModal) {}


  ngOnInit() {
    this.eventService.getEvents().subscribe(data => {
      this.calendarOptions = {
        editable: true,
        eventLimit: false,
        contentHeight: 450,
        header: {
          left: 'prev,next today',
          // center: 'title',
          right: 'agendaWeek,listMonth'
        },
        defaultView: 'agendaWeek',
        buttonText: {
          prev: "<",
          next: ">",
          today: 'Hôm nay',
          month: 'Danh sách',
          week: 'Tuần',
          day: 'Ngày'
        },
        selectable: true,
        events: data
      };
    });
  }
  clickButton(model: any) {
    this.displayEvent = model;
  }

  eventClick(model: any) {
    model = {
      event: {
        id: model.event.id,
        start: model.event.start,
        end: model.event.end,
        title: model.event.title,
        allDay: model.event.allDay
        // other params
      },
      duration: {}
    }
    this.displayEvent = model;
  }
  updateEvent(model: any) {
    model = {
      event: {
        id: model.event.id,
        start: model.event.start,
        end: model.event.end,
        title: model.event.title
        // other params
      },
      duration: {
        _data: model.duration._data
      }
    }
    this.displayEvent = model;
  }

  dayClick(event: any, content){
    this._clickEvent = event;
    this.modalOptions = {
      backdrop: 'static',
      size: 'lg'
    };
    this.openModal(content);
  }

  openModal(content: NgbModalRef) {
    this.modal.open(content, this.modalOptions).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
}
