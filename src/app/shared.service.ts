import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  apiUrl: string = "https://localhost:5000/api/"; // created a variable apiUrl for the ASP.NET development
  //apiUrl: string = "http://localhost:8080/server-1.0-SNAPSHOT/api/"; // created a variable apiUrl for the JAKARTA development
  //apiUrl: string = "/api/";  //for uploading part and gets the api files to the server
  static loggedIn: boolean = false

}
