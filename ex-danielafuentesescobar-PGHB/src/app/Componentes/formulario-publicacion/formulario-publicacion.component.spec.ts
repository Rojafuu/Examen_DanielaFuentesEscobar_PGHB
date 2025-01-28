import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { FormularioPublicacionComponent } from './formulario-publicacion.component';

describe('FormularioPublicacionComponent', () => {
  let component: FormularioPublicacionComponent;
  let fixture: ComponentFixture<FormularioPublicacionComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [FormularioPublicacionComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FormularioPublicacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
