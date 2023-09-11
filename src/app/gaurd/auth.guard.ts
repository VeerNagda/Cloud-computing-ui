import {CanActivateFn, Router} from '@angular/router';
import {inject} from "@angular/core";
import {CookieService} from 'ngx-cookie-service';
import {MessageService} from "primeng/api";
import {SharedService} from "../shared.service";

let redirected = false
export const authGuard: CanActivateFn = (route, state) => {
    const cookieService = inject(CookieService);
    const router = inject(Router);
    const messageService = inject(MessageService);
    if (cookieService.get("authCookie").toString() === "" && cookieService.get("role").toString() === "") {
        messageService.add({severity: 'warn', summary: 'User timed out', detail: "The session has ended. Please Login to again"});
        setTimeout(() => {
                router.navigate(["/"])
        }, 1000)
        return false;
    }
    return true;
};

