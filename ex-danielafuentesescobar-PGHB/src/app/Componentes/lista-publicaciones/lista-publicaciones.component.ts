import { CommonModule } from '@angular/common'
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core'
import { Publicacion } from 'src/app/Modelo/Publicacion'
import { PublicacionesService } from 'src/app/Servicios/publicaciones.service'
import { IonList, IonItem, IonLabel,IonContent, IonText, IonButton, IonIcon, IonImg,  IonHeader, IonTitle, IonModal, IonButtons } from "@ionic/angular/standalone";

@Component({
  selector: 'app-lista-publicaciones',
  templateUrl: './lista-publicaciones.component.html',
  styleUrls: ['./lista-publicaciones.component.scss'],
  standalone: true,
  imports: [IonButtons, IonModal, IonTitle, IonHeader, IonContent, IonText, IonImg, IonLabel,IonButton, IonIcon , IonItem, IonList, CommonModule]
})

export class ListaPublicacionesComponent implements OnInit {

  @Input() publicaciones: Publicacion[] = [];
  @Output() onDelete = new EventEmitter<Publicacion>();

  isModalPriceOpen: boolean = false; 
  publicacionAEliminar: Publicacion | null = null;  // Publicación seleccionada para eliminar

  constructor(
    private publicacionesService: PublicacionesService
  ) { }

  ngOnInit() {}

  // Función para abrir el modal con la publicación seleccionada
  openDeleteModal(publicacion: Publicacion) {
    this.publicacionAEliminar = publicacion; // Guardamos la publicación seleccionada
    this.isModalPriceOpen = true; // Abrimos el modal
  }

  // Función para cerrar el modal
  closeModal() {
    this.isModalPriceOpen = false; // Cerramos el modal
  }

  // Función para confirmar la eliminación
  confirmDelete() {
    if (this.publicacionAEliminar) {
      console.log('Eliminando publicación:', this.publicacionAEliminar);
      this.publicacionesService.eliminarPublicacion(this.publicacionAEliminar.id!); // Eliminamos la publicación
      // Actualizamos la lista de publicaciones después de la eliminación
      this.publicaciones = this.publicaciones.filter(p => p.id !== this.publicacionAEliminar?.id);
      this.closeModal(); // Cerramos el modal después de eliminar
    }
  }
}
