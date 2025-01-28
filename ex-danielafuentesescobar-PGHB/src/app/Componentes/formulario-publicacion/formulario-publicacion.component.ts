import { Component, EventEmitter, OnInit, Output } from '@angular/core'
import { PublicacionesService } from 'src/app/Servicios/publicaciones.service'
import { FormsModule } from '@angular/forms'
import { IonList,IonLabel, IonItem, IonInput, IonButton,  IonText, IonContent, IonGrid, IonRow, IonImg, IonCol } from "@ionic/angular/standalone";
import { Publicacion } from 'src/app/Modelo/Publicacion';
import { CommonModule } from '@angular/common';
import { Camera, CameraResultType } from '@capacitor/camera';

@Component({
  selector: 'app-formulario-publicacion',
  templateUrl: './formulario-publicacion.component.html',
  styleUrls: ['./formulario-publicacion.component.scss'],
  standalone: true,
  imports: [IonCol, IonImg, IonRow, IonGrid, IonContent,  IonText,CommonModule, IonButton, IonInput, IonItem, IonList, IonLabel, FormsModule]
})
export class FormularioPublicacionComponent  implements OnInit {

  titulo: string = '';
  descripcion: string = '';
  foto: string = '';
  fecha: Date = new Date();
 
  @Output() onCreate = new EventEmitter<Publicacion>()
  
  constructor(
    private publicacionesService:PublicacionesService
  ) { }

  ngOnInit() {
    // Esto le asigna la fecha actual como un objeto Date
    this.fecha = new Date();
  }

  async tomarFoto() {
    try {
      const image = await Camera.getPhoto({
        quality: 90,
        allowEditing: false,
        resultType: CameraResultType.Base64
      });

      if (image.base64String) {
        this.foto = image.base64String; // Guardamos el base64 de la foto
      }
    } catch (error) {
      console.error("Error al tomar la foto", error);
    }
  }

  onClick() {
    if (this.titulo && this.descripcion && this.foto && this.fecha) {
      const nuevaPublicacion: Publicacion = {
        id: undefined,  // El id se asignará automáticamente por el servicio
        titulo: this.titulo,
        foto: this.foto,
        descripcion: this.descripcion,
        fecha: this.fecha, // Fecha de creación actual
      };
      this.onCreate.emit(nuevaPublicacion); // Emitimos la nueva publicación al componente padre
    }
  }
}