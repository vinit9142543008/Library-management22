import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageNotfound } from './page-notfound';

describe('PageNotfound', () => {
  let component: PageNotfound;
  let fixture: ComponentFixture<PageNotfound>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PageNotfound]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PageNotfound);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
