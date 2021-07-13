import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
// import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class TarifasService {

  url: string = environment.apiURL;
  token: string;

  constructor(
    private http: HttpClient,
    private authService: AuthService) { 
      
    }

    obtenerTarifas(){

      this.token = this.authService.leerToken();
  
      const token = new HttpHeaders().set("Authorization", this.token);
  
      return this.http.get(`${this.url}/tarifa`, {headers: token})
                      .pipe(
                        map( resp => {
                          // console.log(resp);
                          return resp['tarifas'];
                        })
                      );
  
    }

    obtenerTarifaById(idConductor: any){

      this.token = this.authService.leerToken();
  
      const token = new HttpHeaders().set("Authorization", this.token);
  
      const id = idConductor;
  
      return this.http.get(`${this.url}/tarifa/${id}`, {headers: token})
                      .pipe(
                        map( resp => {
                          // console.log(resp);
                          return resp;
                        })
                      );
  
    }
  
    registrarTarifa(body: any){
  
      this.token = this.authService.leerToken();
  
      const token = new HttpHeaders().set("Authorization", this.token);
  
      return this.http.post(`${this.url}/tarifa`, body, { headers: token})
               .pipe(
                 map( resp => {
                   return resp;
                 })
               )
  
    }
  
    actualizarTarifa(body: any, idConductor: any){
  
      this.token = this.authService.leerToken();
  
      const token = new HttpHeaders().set("Authorization", this.token);
  
      const id = idConductor;
  
      return this.http.put(`${this.url}/tarifa/${id}`, body, { headers: token})
               .pipe(
                 map( resp => {
                   return resp;
                 })
               );
  
    }
  
    eliminarTarifa(idConductor: any){
  
      this.token = this.authService.leerToken();
  
      const token = new HttpHeaders().set("Authorization", this.token);
  
      const id = idConductor;
  
      return this.http.delete(`${this.url}/tarifa/${id}`, { headers: token})
               .pipe(
                 map( resp => {
                   return resp;
                 })
               );
  
    }

}
