import { Component, OnInit } from '@angular/core';
import { ValidateService } from '../../services/validate.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user:Object;

  constructor(    
    private validateService: ValidateService,
    private router: Router
  ) { }

  ngOnInit() {
    this.validateService.getProfile().subscribe(profile => {
      this.user = profile.user;
    },err =>{
      console.log(err);
      return false;
    });
  }

}
