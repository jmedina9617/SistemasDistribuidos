import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { LoginComponent } from '../login/login.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  nombres = [];

  constructor(
    private authService: AuthService,
    private router: Router) {}

  ngOnInit(): void {

    const nombreService = this.authService.obtenerNombre();
    
    this.nombres.push(nombreService);
    // console.log(this.nombres);

    // this.isAdmin();

  }

  isAdmin(): boolean{

    if(!this.authService.isAdmin()){
      return false;
    }
    
    return true;

  }

  logout(){
    this.authService.logout();
    this.router.navigateByUrl('login');
  }

}
