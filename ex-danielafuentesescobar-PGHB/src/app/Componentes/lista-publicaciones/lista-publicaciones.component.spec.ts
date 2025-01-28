import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ListaPublicacionesComponent } from './lista-publicaciones.component';

describe('ListaPublicacionesComponent', () => {
  let component: ListaPublicacionesComponent;
  let fixture: ComponentFixture<ListaPublicacionesComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [ListaPublicacionesComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ListaPublicacionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
