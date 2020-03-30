import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { FormProductPage } from './form-product.page';

describe('FormProductPage', () => {
  let component: FormProductPage;
  let fixture: ComponentFixture<FormProductPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormProductPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(FormProductPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
