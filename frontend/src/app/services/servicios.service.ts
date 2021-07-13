import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ServiciosService {

  url: string = environment.apiURL;
  token: string;

  constructor(
    private http: HttpClient,
    private authService: AuthService) { 
      
    }

  obtenerServicios(){

    this.token = this.authService.leerToken();

    const token = new HttpHeaders().set("Authorization", this.token);

    return this.http.get(`${this.url}/servicio`, {headers: token})
          .pipe(
            map(
              resp => {
                return resp['servicios'];
              })
          );

  }

  registrarServicio(body: any){

    const conductorBody = {
      conductor: body.conductorForm,
      solicitante: body.solicitante,
      tarifa: body.tarifasForm,
      fecha: body.fecha
    };

    this.token = this.authService.leerToken();

    const token = new HttpHeaders().set("Authorization", this.token);

    return this.http.post(`${this.url}/servicio`, conductorBody, {headers: token}).pipe(
      map( resp =>{
        return resp;
      })
    );

  }

}
