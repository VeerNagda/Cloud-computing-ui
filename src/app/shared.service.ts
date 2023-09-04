import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  apiUrl: string = "https://localhost:5000/api/";
  //apiUrl: string = "/api/";

}
