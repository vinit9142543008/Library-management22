import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Borrowbooks } from './borrowbooks';

describe('Borrowbooks', () => {
  let component: Borrowbooks;
  let fixture: ComponentFixture<Borrowbooks>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Borrowbooks]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Borrowbooks);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
