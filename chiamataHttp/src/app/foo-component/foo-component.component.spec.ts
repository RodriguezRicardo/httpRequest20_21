import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FooComponentComponent } from './foo-component.component';

describe('FooComponentComponent', () => {
  let component: FooComponentComponent;
  let fixture: ComponentFixture<FooComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FooComponentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FooComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
