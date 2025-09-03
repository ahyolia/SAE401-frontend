import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Topbutton } from './topbutton';

describe('Topbutton', () => {
  let component: Topbutton;
  let fixture: ComponentFixture<Topbutton>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Topbutton]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Topbutton);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
