import { Component, OnInit } from '@angular/core';
import { ValidateService } from '../../services/validate.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PersonViewModel } from '../../register/viewModels/person.view-model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit {
  
  personForm: FormGroup; 
  personData: PersonViewModel = new PersonViewModel({ });

  constructor(
    private validateService: ValidateService,
    private formBuilder: FormBuilder,
    private router: Router
  ) { }

  ngOnInit() {
    this.buildForm();
  }

  buildForm(){
    this.personForm = this.formBuilder.group({
      'name': ['', Validators.required],
      'username': ['', Validators.required],
      'email': ['', Validators.compose([Validators.required,Validators.email])],
      'password': ['', Validators.required]
    });
  }

  Submit(){
    this.validateService.registerUser(this.personData).subscribe(data => {
      if(data.success){
        console.log("Registro obteve sucesso");
        this.router.navigate(['login']);
      }
      else{
        console.log("Registro falhou");
        this.router.navigate(['/']);
      }
    });
  }


}
