import { Component, OnInit } from '@angular/core'
import { IonHeader, IonToolbar, IonTitle, IonContent, IonFab, IonFabButton, IonIcon} from '@ionic/angular/standalone'
import { PublicacionesService } from 'src/app/Servicios/publicaciones.service'
import { CommonModule } from '@angular/common'
import { Publicacion } from 'src/app/Modelo/Publicacion'
import { ListaPublicacionesComponent } from 'src/app/Componentes/lista-publicaciones/lista-publicaciones.component'
import { Router } from '@angular/router'
import { addIcons } from 'ionicons'
import { add,trashOutline } from 'ionicons/icons'
import { RouterModule } from '@angular/router'

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone:true,
  imports: [IonHeader, RouterModule,ListaPublicacionesComponent, IonToolbar, IonTitle, IonContent, CommonModule, IonFab, IonFabButton, IonIcon ],
})

export class HomePage  implements OnInit{

  Lista_publicaciones:Publicacion[] =[]

  constructor(
       private publicacionesService:PublicacionesService,
       private router: Router
  ) {  
    addIcons({
      add,
      trashOutline
    });
  }

  async ngOnInit() {
    this.Lista_publicaciones = await this.publicacionesService.getPublicaciones();
  }
  
  async deletePublicacion(publicacion: Publicacion) {
    console.log("Eliminando la publicación: " + publicacion.titulo);
  
    // Llamamos al servicio para eliminar la publicación
    await this.publicacionesService.eliminarPublicacion(publicacion.id!);
  
    // Actualizamos la lista de publicaciones después de eliminarla
    this.Lista_publicaciones = await this.publicacionesService.getPublicaciones();
  }
}

