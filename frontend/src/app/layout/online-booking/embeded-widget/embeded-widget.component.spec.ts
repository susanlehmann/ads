import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmbededWidgetComponent } from './embeded-widget.component';

describe('EmbededWidgetComponent', () => {
  let component: EmbededWidgetComponent;
  let fixture: ComponentFixture<EmbededWidgetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmbededWidgetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmbededWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
