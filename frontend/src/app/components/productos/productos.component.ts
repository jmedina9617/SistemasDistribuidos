import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ProductosService } from 'src/app/services/productos.service';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit {

  productosData = [];
  productoFormulario = {};
  productoId = {};
  productoFormularioActualizar = {};

  constructor(
    private productos: ProductosService
  ) { }

  ngOnInit(): void {

    this.obtenerProductos();

  }

  obtenerProductos(){

    this.productos.obtenerProductos().subscribe( resp => {
      // console.log(resp);
      this.productosData = resp;
    });

  }

  productoForm(formProducto: NgForm){

    this.productoFormulario = formProducto.value;

    // console.log(this.productoFormulario);

    if (formProducto.invalid) {

      Object.values(formProducto.controls).forEach( control => {
        control.markAsTouched();
      });

    }else{
      
      this.productos.registrarProducto(this.productoFormulario).subscribe( resp => {
        console.log(resp);
        this.obtenerProductos();
        formProducto.reset();
      });

    }
    
  }

  conductorById(id: any){

    this.productos.obtenerProductosById(id).subscribe( (resp: any) => {

      this.productoId = resp.conductor;
      // console.log(this.productoId);

    });

  }

  actualizarConductorForm(formConductorActualizar: NgForm){

    this.productoFormularioActualizar = formConductorActualizar.value;

    const idConductor = formConductorActualizar.value._id;

    // console.log(this.productoFormularioActualizar);

    if (formConductorActualizar.invalid) {

      Object.values(formConductorActualizar.controls).forEach( control => {
        control.markAsTouched();
      });

    }else{
      
      this.productos.actualizarProducto(this.productoFormularioActualizar, idConductor).subscribe( 
        resp => {
          console.log(resp);
          this.obtenerProductos();
          formConductorActualizar.reset();
        },
        error => {
          console.log(error);
        }
      );

    }

  }

  eliminarConductor(id: any){

    this.productos.eliminarProducto(id).subscribe( resp => {

      this.obtenerProductos();

    });

  }

}
