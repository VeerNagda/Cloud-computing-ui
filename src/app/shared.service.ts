import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  // created a variable apiUrl for the development
  apiUrl: string = "https://localhost:5000/api/";
  //apiUrl: string = "/api/";  //for uploading part and gets the api files to the server


}
