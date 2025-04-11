import { Component, inject, OnInit } from '@angular/core';
import { MembersService } from '../../Service/members.service';
import { Memeber } from '../../model/member';
import { MemberCardComponent } from "../member-card/member-card.component";

@Component({
  selector: 'app-member-list',
  imports: [MemberCardComponent],
  templateUrl: './member-list.component.html',
  styleUrl: './member-list.component.css'
})
export class MemberListComponent implements OnInit {
  
  private membeService = inject(MembersService);

  members: Memeber[] = [];
  
  
  
  ngOnInit(): void {
    this.loadMember();
  }

  loadMember(){
    this.membeService.getMemebers().subscribe({
      next: members => this.members= members
    })
  }

  

}
