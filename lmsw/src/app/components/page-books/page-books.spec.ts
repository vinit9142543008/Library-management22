import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageBooks } from './page-books';

describe('PageBooks', () => {
  let component: PageBooks;
  let fixture: ComponentFixture<PageBooks>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PageBooks]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PageBooks);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
