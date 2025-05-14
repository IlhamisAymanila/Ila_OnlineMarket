import { Component, inject, input, OnInit, output } from '@angular/core';
import { Memeber } from '../../model/member';
import { DecimalPipe, NgClass, NgFor, NgIf, NgStyle } from '@angular/common';
import {FileUploader, FileUploadModule} from 'ng2-file-upload';
import { AccountService } from '../../Service/account.service';
import { environment } from '../../../environments/environment';
import { ToastrService } from 'ngx-toastr';
import { Photos } from '../../model/photos';
import { MembersService } from '../../Service/members.service';

@Component({
  selector: 'app-photo-editor',
  imports: [NgIf, NgFor, NgClass, NgStyle, FileUploadModule, DecimalPipe],
  templateUrl: './photo-editor.component.html',
  styleUrl: './photo-editor.component.css'
})
export class PhotoEditorComponent implements OnInit {
  
  private accountService = inject(AccountService);
  private memberService = inject(MembersService);
  member = input.required<Memeber>();
  uploader?:FileUploader;
  hasBaseDropZoneOver = false;
  baseUrl = environment.apiUrl;
  memberChange = output<Memeber>();

  private toaster = inject(ToastrService);

  ngOnInit(): void {
   this.initializeUploder();
  }

  fileOverBase(e: any){
    this.hasBaseDropZoneOver = e;
  }

  deletePhoto(photo: Photos){
    this.memberService.deletePhoto(photo).subscribe({
      next: _ =>{
        const updateMember = {...this.member()};
        updateMember.photos = updateMember.photos.filter(x => x.id !== photo.id);
        this.memberChange.emit(updateMember);  
      }
    })
  }

  setMainPhoto(photo: Photos){
    this.memberService.setMainPhoto(photo).subscribe({
      next: _ => {

        const user = this.accountService.currentUser();
        if(user){
          user.photoUrl = photo.url;
          this.accountService.setCurrentUser(user)
        }

        const updateMember = {...this.member()}
        updateMember.photoUrl = photo.url;
        updateMember.photos.forEach(p => {
          if (p.isMain) p.isMain =false;
          if(p.id === photo.id) p.isMain=true;
        });

        this.memberChange.emit(updateMember);
      }
    })
  }

  initializeUploder(){

    this.uploader = new FileUploader({

      url: this.baseUrl + 'user/add-photo',
      authToken: 'Bearer ' + this.accountService.currentUser()?.token,
      isHTML5:true,
      allowedFileType: ['image'],
      removeAfterUpload: true,
      autoUpload: false,
      maxFileSize: 10 * 1024 * 1024,  
    });

    this.uploader.onAfterAddingFile = (file) => {
      file.withCredentials = false
    }

    this.uploader.onSuccessItem = (item, respone, status, headers) => {
      const photo = JSON.parse(respone);
      const updateMember = {...this.member()}
      updateMember.photos.push(photo);
      this.memberChange.emit(updateMember);
    }

    this.uploader.onErrorItem = (item,response,status) =>{
      let msg: string;
      try{
        const body = JSON.parse(response);
        msg = body.error || body.message || response;

      }catch{
        msg = response;
      }
      this.toaster.error(msg, `Upload failed`);
    }
  }

  
}
