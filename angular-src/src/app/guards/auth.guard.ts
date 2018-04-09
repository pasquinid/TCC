import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { ValidateService } from '../services/validate.service';

@Injectable()
export class AuthGuard implements CanActivate{
    constructor(
        private validateService:ValidateService, 
        private router:Router
    ){ };

    canActivate(){
        if(this.validateService.loggedIn()){
            return true;
        }
        else{
            this.router.navigate(['/login']);
        }
    }
}

