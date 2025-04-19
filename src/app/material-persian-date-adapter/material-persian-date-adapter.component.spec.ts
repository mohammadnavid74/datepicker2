import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaterialPersianDateAdapterComponent } from './material-persian-date-adapter.component';

describe('MaterialPersianDateAdapterComponent', () => {
  let component: MaterialPersianDateAdapterComponent;
  let fixture: ComponentFixture<MaterialPersianDateAdapterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MaterialPersianDateAdapterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MaterialPersianDateAdapterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
