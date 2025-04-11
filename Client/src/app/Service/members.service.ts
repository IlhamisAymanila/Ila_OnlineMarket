import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Memeber } from '../model/member';

@Injectable({
  providedIn: 'root'
})
export class MembersService {

  private http = inject(HttpClient);
  baseUrl= environment.apiUrl;

  getMemebers() {
    return this.http.get<Memeber[]>(this.baseUrl + 'user');
  }

  getMember(username: string){
    return this.http.get<Memeber>(this.baseUrl+ 'user/' + username);
  }


}
