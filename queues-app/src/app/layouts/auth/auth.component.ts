import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '@core/services';

@Component({
  selector: 'app-auth',
  imports: [RouterModule],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css'
})
export class AuthComponent implements OnInit {

  constructor(private readonly auth: AuthService, private readonly router: Router) { }

  ngOnInit(): void {
    if (this.auth.getSession()) {
      this.router.navigate(['/'])
    }
  }

}
