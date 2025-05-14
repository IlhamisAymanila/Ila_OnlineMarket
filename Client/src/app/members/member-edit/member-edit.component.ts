import { Component, HostListener, inject, OnInit, ViewChild, viewChild } from '@angular/core';
import { Memeber } from '../../model/member';
import { AccountService } from '../../Service/account.service';
import { MembersService } from '../../Service/members.service';
import { DatePipe, NgIf } from '@angular/common';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { FormsModule, NgForm} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { PhotoEditorComponent } from "../photo-editor/photo-editor.component";

@Component({
  selector: 'app-member-edit',
  imports: [DatePipe, TabsModule, FormsModule, NgIf, PhotoEditorComponent],
  templateUrl: './member-edit.component.html',
  styleUrl: './member-edit.component.css'
})
export class MemberEditComponent implements OnInit {
 @ViewChild('editForm') editForm?:NgForm;
 @HostListener('window:beforeunload',['$event']) notify($event:any){
  if(this.editForm?.dirty){
    $event.returnValue = true;
  }
 }  
  member?: Memeber;
  private accountService = inject(AccountService);
  private memberService = inject(MembersService);
  private toast = inject(ToastrService);


  
  
  ngOnInit(): void {
    this.loadMember();
  }

  loadMember(){
    const user = this.accountService.currentUser();
    if(!user) return;

    this.memberService.getMember(user.username).subscribe({
      next:member=>this.member=member
    })
    
  }

  updateMember(){
    this.memberService.updateMember(this.editForm?.value).subscribe({
      next: _ =>{
        this.toast.success('Profile update successfully');
        this.editForm?.reset(this.member);
      }
    })
  }

  onMemberChange(event:Memeber){
    this.member=event;
  }
  


}
