import { TestBed } from '@angular/core/testing';

import { Borrows } from './borrows';

describe('Borrows', () => {
  let service: Borrows;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Borrows);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
