import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { environment } from '../../environments/environment';
import { Memeber } from '../model/member';
import { of, tap } from 'rxjs';
import { Photos } from '../model/photos';

@Injectable({
  providedIn: 'root'
})
export class MembersService {

  private http = inject(HttpClient); 
  baseUrl= environment.apiUrl;
  members = signal<Memeber[]>([]);

  getMemebers() {
    return this.http.get<Memeber[]>(this.baseUrl + 'user').subscribe({
      next: members => this.members.set(members)
    });
  }

  getMember(username: string){
   
    const member = this.members().find(x => x.userName === username);

    if (member !== undefined) return of(member);

    return this.http.get<Memeber>(this.baseUrl+ 'user/' + username);
  }

  updateMember(member: Memeber){
    return this.http.put(this.baseUrl + 'user', member).pipe(
      tap(() =>{
        this.members.update(m => m.map(mm => mm.userName === member.userName ? member : mm))
      })
    )
  }

  setMainPhoto(photo: Photos){
    return this.http.put(this.baseUrl + 'user/set-main-photo/' + photo.id, {}).pipe(
      tap(() => {
        this.members.update(mem => mem.map(m => {
          if (m.photos.includes(photo)){
            m.photoUrl = photo.url
          }
          return m;
        }))
      })
    )
  }

  deletePhoto(photo: Photos){
    return this.http.delete(this.baseUrl + 'user/delete-Photo/' + photo.id).pipe(
      tap(() => {
        this.members.update(members => members.map(m =>{
          if(m.photos.includes(photo)){
            m.photos = m.photos.filter(x => x.id !== photo.id)
          }
          return m;
        }))
      })
    );
  }


}
