import { Component, Input } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Auth } from '../../auth/auth';
import { MaterialModule } from '../../modules/material.module';
import { MatSidenav } from '@angular/material/sidenav';


@Component({
  selector: 'app-navbar',
  imports: [MaterialModule, RouterLink],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar {

  @Input() sidenav!: MatSidenav;

   constructor(private authService: Auth, private router: Router) {}

   isAuth(): boolean {
    return this.authService.isLogged()
   }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
