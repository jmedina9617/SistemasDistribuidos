import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {map} from 'rxjs/operators';

import jwtDecode from 'jwt-decode';

import { JwtHelperService } from "@auth0/angular-jwt";
import { environment } from 'src/environments/environment';

const helper = new JwtHelperService();

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  url: string = environment.apiURL;

  userToken: string;

  payload: any = {};

  constructor(private http: HttpClient) { }

  login(credenciales: any){

    return this.http.post(`${this.url}/login`, credenciales).pipe(
      map((resp: any) => {
        const expirationDate = helper.getTokenExpirationDate(resp.token).getTime();
        this.payload = jwtDecode(resp.token);
        this.guardarToken(resp.token, expirationDate, this.payload.usuario.nombre, this.payload.usuario.tipo);
        return resp;
      })
    );

  }

  logout(){

    localStorage.removeItem('token');
    localStorage.removeItem('expira');
    localStorage.removeItem('nombre');

  }

  guardarToken(token: string, expiration: number, nombre: string, tipoUsuario: string){

    localStorage.setItem('token', token);

    localStorage.setItem('expira', expiration.toString() );

    localStorage.setItem('nombre', nombre);

    localStorage.setItem('tipo', tipoUsuario);

  }
  
  leerToken(){

    if (localStorage.getItem('token')){
      this.userToken = localStorage.getItem('token');
    }else{
      this.userToken = '';
    }
    return this.userToken;
  }

  isAutenticado(): boolean {

    const token = this.leerToken();

    if (typeof this.userToken === 'undefined' || token === ''){
      return false;
    }else{

      const expiraToken = Number(localStorage.getItem('expira'));
      const expiraDate = new Date().getTime();

      if ( expiraToken > expiraDate ) {
        return true;
      }else{
        return false;
      }
    }

  }

  obtenerNombre(){

    const nombre = localStorage.getItem('nombre');

    return nombre;

  }

  isAdmin(): boolean{

    const tipo = localStorage.getItem('tipo');
    
    if (tipo === 'ADMIN') {
      return true;
    } else {
      return false;
    }

  }
  

}
