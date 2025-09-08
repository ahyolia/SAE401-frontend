import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Benevoles } from './benevoles';

describe('Benevoles', () => {
  let component: Benevoles;
  let fixture: ComponentFixture<Benevoles>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Benevoles]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Benevoles);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
