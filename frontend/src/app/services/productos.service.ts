import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  url: string = environment.apiURL;
  token: string;

  constructor(
    private http: HttpClient,
    private authService: AuthService) { 
      
    }


  obtenerProductos(){

    this.token = this.authService.leerToken();

    const token = new HttpHeaders().set("Authorization", this.token);

    return this.http.get(`${this.url}/productos`, {headers: token})
                    .pipe(
                      map( resp => {
                        // console.log(resp);
                        return resp['productos'];
                      })
                    );

  }

  obtenerProductosById(idConductor: any){

    this.token = this.authService.leerToken();

    const token = new HttpHeaders().set("Authorization", this.token);

    const id = idConductor;

    return this.http.get(`${this.url}/productos/${id}`, {headers: token})
                    .pipe(
                      map( resp => {
                        // console.log(resp);
                        return resp;
                      })
                    );

  }

  registrarProducto(body: any){

    this.token = this.authService.leerToken();

    const token = new HttpHeaders().set("Authorization", this.token);

    return this.http.post(`${this.url}/productos`, body, { headers: token})
             .pipe(
               map( resp => {
                 return resp;
               })
             )

  }

  actualizarProducto(body: any, idProducto: any){

    this.token = this.authService.leerToken();

    const token = new HttpHeaders().set("Authorization", this.token);

    const id = idProducto;

    return this.http.put(`${this.url}/productos/${id}`, body, { headers: token})
             .pipe(
               map( resp => {
                 return resp;
               })
             );

  }

  eliminarProducto(idProducto: any){

    this.token = this.authService.leerToken();

    const token = new HttpHeaders().set("Authorization", this.token);

    const id = idProducto;

    return this.http.delete(`${this.url}/productos/${id}`, { headers: token})
             .pipe(
               map( resp => {
                 return resp;
               })
             );

  }

}
