import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  url: string = environment.apiURL;
  token: string;

  constructor(
    private http: HttpClient,
    private authService: AuthService) { 
      
    }

    obtenerUsuarios(){

      this.token = this.authService.leerToken();
  
      const token = new HttpHeaders().set("Authorization", this.token);
  
      return this.http.get(`${this.url}/usuario`, {headers: token})
                      .pipe(
                        map( resp => {
                          // console.log(resp);
                          return resp['usuarios'];
                        })
                      );
  
    }

    obtenerUsuarioById(idUsuario: any){

      this.token = this.authService.leerToken();
  
      const token = new HttpHeaders().set("Authorization", this.token);
  
      const id = idUsuario;
  
      return this.http.get(`${this.url}/usuario/${id}`, {headers: token})
                      .pipe(
                        map( resp => {
                          // console.log(resp);
                          return resp;
                        })
                      );
  
    }
  
    registrarUsuario(body: any){
  
      this.token = this.authService.leerToken();
  
      const token = new HttpHeaders().set("Authorization", this.token);
  
      return this.http.post(`${this.url}/usuario`, body, { headers: token})
               .pipe(
                 map( resp => {
                   return resp;
                 })
               )
  
    }
  
    actualizarUsuario(body: any, idUsuario: any){
  
      this.token = this.authService.leerToken();
  
      const token = new HttpHeaders().set("Authorization", this.token);
  
      const id = idUsuario;
  
      return this.http.put(`${this.url}/usuario/${id}`, body, { headers: token})
               .pipe(
                 map( resp => {
                   return resp;
                 })
               );
  
    }
  
    eliminarUsuario(idUsuario: any){
  
      this.token = this.authService.leerToken();
  
      const token = new HttpHeaders().set("Authorization", this.token);
  
      const id = idUsuario;
  
      return this.http.delete(`${this.url}/usuario/${id}`, { headers: token})
               .pipe(
                 map( resp => {
                   return resp;
                 })
               );
  
    }
}
