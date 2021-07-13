import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ConductoresService {

  url: string = environment.apiURL;
  token: string;

  constructor(
    private http: HttpClient,
    private authService: AuthService) { 
      
    }


  obtenerConductores(){

    this.token = this.authService.leerToken();

    const token = new HttpHeaders().set("Authorization", this.token);

    return this.http.get(`${this.url}/conductor`, {headers: token})
                    .pipe(
                      map( resp => {
                        // console.log(resp);
                        return resp['conductor'];
                      })
                    );

  }

  obtenerConductoresById(idConductor: any){

    this.token = this.authService.leerToken();

    const token = new HttpHeaders().set("Authorization", this.token);

    const id = idConductor;

    return this.http.get(`${this.url}/conductor/${id}`, {headers: token})
                    .pipe(
                      map( resp => {
                        // console.log(resp);
                        return resp;
                      })
                    );

  }

  registrarConductor(body: any){

    this.token = this.authService.leerToken();

    const token = new HttpHeaders().set("Authorization", this.token);

    return this.http.post(`${this.url}/conductor`, body, { headers: token})
             .pipe(
               map( resp => {
                 return resp;
               })
             )

  }

  actualizarConductor(body: any, idConductor: any){

    this.token = this.authService.leerToken();

    const token = new HttpHeaders().set("Authorization", this.token);

    const id = idConductor;

    return this.http.put(`${this.url}/conductor/${id}`, body, { headers: token})
             .pipe(
               map( resp => {
                 return resp;
               })
             );

  }

  eliminarConductor(idConductor: any){

    this.token = this.authService.leerToken();

    const token = new HttpHeaders().set("Authorization", this.token);

    const id = idConductor;

    return this.http.delete(`${this.url}/conductor/${id}`, { headers: token})
             .pipe(
               map( resp => {
                 return resp;
               })
             );

  }
    
}
