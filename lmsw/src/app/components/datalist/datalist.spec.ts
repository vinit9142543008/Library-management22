import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Datalist } from './datalist';

describe('Datalist', () => {
  let component: Datalist;
  let fixture: ComponentFixture<Datalist>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Datalist]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Datalist);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
