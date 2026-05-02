import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Bookborrow } from './bookborrow';

describe('Bookborrow', () => {
  let component: Bookborrow;
  let fixture: ComponentFixture<Bookborrow>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Bookborrow]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Bookborrow);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
