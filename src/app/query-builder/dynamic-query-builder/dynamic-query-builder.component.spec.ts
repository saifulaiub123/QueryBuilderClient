import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicQueryBuilderComponent } from './dynamic-query-builder.component';

describe('DynamicQueryBuilderComponent', () => {
  let component: DynamicQueryBuilderComponent;
  let fixture: ComponentFixture<DynamicQueryBuilderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DynamicQueryBuilderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DynamicQueryBuilderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
