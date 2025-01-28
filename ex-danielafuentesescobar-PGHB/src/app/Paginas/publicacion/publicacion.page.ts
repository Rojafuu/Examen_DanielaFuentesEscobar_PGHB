import { Component, OnInit } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'
import { PublicacionesService } from 'src/app/Servicios/publicaciones.service'
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButton, IonButtons, IonBackButton, IonIcon } from '@ionic/angular/standalone'
import { Publicacion } from 'src/app/Modelo/Publicacion'
import { FormularioPublicacionComponent } from 'src/app/Componentes/formulario-publicacion/formulario-publicacion.component'

@Component({
  selector: 'app-publicacion',
  templateUrl: './publicacion.page.html',
  styleUrls: ['./publicacion.page.scss'],
  standalone: true,
  imports: [ IonBackButton, IonButtons,FormularioPublicacionComponent , IonContent, IonHeader, IonTitle, IonToolbar, CommonModule,FormsModule]
})
export class PublicacionPage implements OnInit {

  private contador: number = 1;  // Para generar ids únicos
   
  listaPublicaciones:Publicacion[] = []

  constructor(
    private publicacionesService:PublicacionesService
  ) { }

  ngOnInit() {
    this._actualizar();
  }

  private async _actualizar() {
    try {
      // Recupera las publicaciones de Preferences
      this.listaPublicaciones = await this.publicacionesService.getPublicaciones();
    } catch (error) {
      console.error("Error al obtener publicaciones", error);
    }
  }

  async onCreatePublicacion($event: Publicacion) {
    const publicacion: Publicacion = {
      id: this.contador++,              // Asignar un id único incrementando el contador
      titulo: $event.titulo,            // Asignar el título recibido desde el formulario
      foto: $event.foto || 'foto_default.jpg',  // Si no se recibe foto, se usa una foto predeterminada
      descripcion: $event.descripcion || 'Descripción por defecto',  // Si no se recibe descripción, se usa la predeterminada
      fecha: $event.fecha             // Fecha de creación actual
    };
    try {
      // Agregar publicación
      await this.publicacionesService.agregarPublicacion(publicacion);
      // Actualiza la lista después de agregar
      this._actualizar();
    } catch (error) {
      console.error("Error al agregar publicación", error);
    }
  }

  async deletePublicacion(publicacion: Publicacion) {
    try {
      if (publicacion.id !== undefined) {  // Verifica que id no sea undefined
        // Eliminar publicación
        await this.publicacionesService.eliminarPublicacion(publicacion.id);
        // Actualiza la lista después de eliminar
        this._actualizar();
      } else {
        console.error("ID de publicación no definido.");
      }
    } catch (error) {
      console.error("Error al eliminar publicación", error);
    }
  }
  
}
