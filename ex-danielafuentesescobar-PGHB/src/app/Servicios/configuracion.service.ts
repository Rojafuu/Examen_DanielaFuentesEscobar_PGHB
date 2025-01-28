import { Injectable } from '@angular/core';
import { Preferences } from '@capacitor/preferences';
import { Publicacion } from '../Modelo/Publicacion';

@Injectable({
  providedIn: 'root'
})
export class ConfiguracionService {

  private readonly KEY_ORDENAR = "ORDENAR";

  constructor() { }


  async guardarPublicacion(titulo: string, descripcion: string, foto: string): Promise<void> {
    const fecha = new Date().toISOString();
    const nuevaPublicacion = { id: Date.now(), titulo, descripcion, fecha, foto };

  
    const result = await Preferences.get({ key: this.KEY_ORDENAR });
    let publicaciones = result.value ? JSON.parse(result.value) : [];

    publicaciones.push(nuevaPublicacion);

    await Preferences.set({
      key: this.KEY_ORDENAR,
      value: JSON.stringify(publicaciones)
    });
  }


  async obtenerPublicacion(): Promise<Publicacion[]> {
    const result = await Preferences.get({ key: this.KEY_ORDENAR });
    return result.value ? JSON.parse(result.value) : [];
  }

  async eliminarPublicacion(id: number): Promise<void> {
    const result = await Preferences.get({ key: this.KEY_ORDENAR });
    let publicaciones = result.value ? JSON.parse(result.value) : [];

 
    publicaciones = publicaciones.filter((publicacion: Publicacion) => publicacion.id !== id);

    
    await Preferences.set({
      key: this.KEY_ORDENAR,
      value: JSON.stringify(publicaciones)
    });
  }
}
