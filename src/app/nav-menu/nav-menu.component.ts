import {Component} from '@angular/core';
import {SharedService} from "../shared.service";
import {CookieService} from "ngx-cookie-service";
import {Router} from "@angular/router";

@Component({
    selector: 'app-nav-menu',
    templateUrl: './nav-menu.component.html',
    styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent {
    isExpanded = false;

    constructor(private cookieService: CookieService, private router: Router) {
    }


    collapse() {
        this.isExpanded = false;
    }

    toggle() {
        this.isExpanded = !this.isExpanded;
    }

    logOut() {
        console.log("fg")
        this.cookieService.delete("role");
        this.cookieService.delete("authCookie");
        this.router.navigateByUrl("/");
        SharedService.loggedIn=false
    }

    protected readonly SharedService = SharedService;
}
