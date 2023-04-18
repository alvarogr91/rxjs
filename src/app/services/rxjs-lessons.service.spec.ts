import { TestBed } from '@angular/core/testing';

import { RxjsLessonsService } from './rxjs-lessons.service';

describe('RxjsLessonsService', () => {
  let service: RxjsLessonsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RxjsLessonsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
