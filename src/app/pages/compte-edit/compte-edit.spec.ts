import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompteEdit } from './compte-edit';

describe('CompteEdit', () => {
  let component: CompteEdit;
  let fixture: ComponentFixture<CompteEdit>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CompteEdit]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompteEdit);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
