import {CanActivateFn, Router} from '@angular/router';
import {inject} from "@angular/core";

export const authGuard: CanActivateFn = (route, state) => {
  const token = "kjbadkjas";
  const router = inject(Router)
  if (token){
    return true;
  }
  else {
    router.navigate(['login']);
    return false;
  }
};