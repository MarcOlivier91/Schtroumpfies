import { TestBed } from '@angular/core/testing';

import { ChangeRoleService } from './change-role.service';

describe('ChangeRoleService', () => {
  let service: ChangeRoleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChangeRoleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
