import { Injectable } from '@angular/core';
import { ConfiguracionService } from './configuracion.service';  // Inyectamos ConfiguracionService
import { Publicacion } from '../Modelo/Publicacion';

@Injectable({
  providedIn: 'root'
})
export class PublicacionesService {

  private idCounter = 4;

  constructor(private configuracionService: ConfiguracionService) { }

  // Obtener publicaciones (usamos el servicio ConfiguracionService para obtenerlas de Preferences)
  async getPublicaciones(): Promise<Publicacion[]> {
    return await this.configuracionService.obtenerPublicacion();  // Obtenemos de la persistencia
  }
  
  // Agregar una publicación (usamos ConfiguracionService para guardarla)
  async agregarPublicacion(p: Publicacion): Promise<void> {
    p.id = this.idCounter++;  // Asignamos un nuevo ID
    await this.configuracionService.guardarPublicacion(p.titulo, p.descripcion, p.foto);  // Guardamos en Preferences
  }

  // Eliminar una publicación (usamos ConfiguracionService para eliminarla)
  async eliminarPublicacion(id: number): Promise<void> {
    await this.configuracionService.eliminarPublicacion(id);  // Eliminamos desde Preferences
  }
}
