import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {

  usuariosData = [];
  usuarioFormulario = {};
  usuarioId = {};
  usuarioFormularioActualizar = {};

  constructor(
    private usuarios: UsuariosService
  ) { }

  ngOnInit(): void {

    this.obtenerUsuarios();

  }

  obtenerUsuarios(){

    this.usuarios.obtenerUsuarios().subscribe( resp => {
      // console.log(resp);
      this.usuariosData = resp;
    });

  }

  usuarioForm(formUsuario: NgForm){

    this.usuarioFormulario = formUsuario.value;

    // console.log(this.usuarioFormulario);

    if (formUsuario.invalid) {

      Object.values(formUsuario.controls).forEach( control => {
        control.markAsTouched();
      });

    }else{
      
      this.usuarios.registrarUsuario(this.usuarioFormulario).subscribe( resp => {
        console.log(resp);
        this.obtenerUsuarios();
        formUsuario.reset();
      });

    }
    
  }

  usuarioById(id: any){

    this.usuarios.obtenerUsuarioById(id).subscribe( (resp: any) => {

      this.usuarioId = resp.usuario;
      //  console.log(this.usuarioId);

    });

  }

  actualizarUsuarioForm(formUsuarioActualizar: NgForm){

    this.usuarioFormularioActualizar = formUsuarioActualizar.value;

    const idUsuario = formUsuarioActualizar.value._id;

    console.log(this.usuarioFormularioActualizar);

    if (formUsuarioActualizar.invalid) {

      Object.values(formUsuarioActualizar.controls).forEach( control => {
        control.markAsTouched();
      });

    }else{
      
      this.usuarios.actualizarUsuario(this.usuarioFormularioActualizar, idUsuario).subscribe( 
        resp => {
          // console.log(resp);
          this.obtenerUsuarios();
          formUsuarioActualizar.reset();
        },
        error => {
          console.log(error);
        }
      );

    }

  }

  eliminarUsuario(id: any){

    this.usuarios.eliminarUsuario(id).subscribe( resp => {

      this.obtenerUsuarios();

    });

  }

}
