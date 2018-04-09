import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CredentialsViewModel } from '../../login/viewModels/credentials.view-model';
import { Router } from '@angular/router';
import { ValidateService } from '../../services/validate.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  
  credentialsForm: FormGroup; 
  credentialsData: CredentialsViewModel = new CredentialsViewModel({ });

  constructor(
    private validateService: ValidateService,
    private router: Router,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.buildForm();
  }

  buildForm(){
    this.credentialsForm = this.formBuilder.group({
      'username': ['',Validators.required],
      'password': ['',Validators.required]
    });
  }

  Submit(){ 
    console.log("Logging in...");
    this.validateService.authenticateUser(this.credentialsData).subscribe(data => {
      if(data.success){
        console.log("Login obteve sucesso");
        this.validateService.storeUserData(data.token,data.user);
        this.router.navigate(['dashboard']);
      }
      else{
        console.log("Login falhou");
        this.router.navigate(['login']);
      }
    });
  }

}
