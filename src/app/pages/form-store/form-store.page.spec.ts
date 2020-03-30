import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { FormStorePage } from './form-store.page';

describe('FormStorePage', () => {
  let component: FormStorePage;
  let fixture: ComponentFixture<FormStorePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormStorePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(FormStorePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
