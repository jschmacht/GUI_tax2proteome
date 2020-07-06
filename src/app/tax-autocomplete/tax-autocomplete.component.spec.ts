import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaxAutocompleteComponent } from './tax-autocomplete.component';

describe('TaxAutocompleteComponent', () => {
  let component: TaxAutocompleteComponent;
  let fixture: ComponentFixture<TaxAutocompleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaxAutocompleteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaxAutocompleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
