import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageSidenav } from './page-sidenav';

describe('PageSidenav', () => {
  let component: PageSidenav;
  let fixture: ComponentFixture<PageSidenav>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PageSidenav]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PageSidenav);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
