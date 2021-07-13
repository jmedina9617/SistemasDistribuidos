import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

import Swal from 'sweetalert2';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor( private authService: AuthService, private router: Router ) { }

  credenciales: {};
  public usuario = [{}];

  public estadoLogin: boolean;

  mensajeError: string = '';

  ngOnInit(): void {
  }

  logForm(form: NgForm){

    this.credenciales = form.value;    

    if (form.invalid) {

      Object.values(form.controls).forEach( control => {
        control.markAsTouched();
      });
      
    }else{

      this.authService.login(this.credenciales).subscribe(
        (resp: any) => {

          // console.log(resp);
          this.router.navigateByUrl('productos');

        },
        error => {
          
          this.mensajeError = error.error.err.message;

          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: this.mensajeError,
          });

        });

    }

  }

  logout(){
    this.authService.logout();
    this.router.navigateByUrl('login');
  }

}
