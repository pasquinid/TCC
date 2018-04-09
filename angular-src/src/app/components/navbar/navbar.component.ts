import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CredentialsViewModel } from '../../login/viewModels/credentials.view-model';
import { Router } from '@angular/router';
import { ValidateService } from '../../services/validate.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(    
    private validateService: ValidateService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  onLogoutClick(){
    this.validateService.logout();
    console.log("Logging out");
    this.router.navigate(['/']);
    return false;
  }
}
