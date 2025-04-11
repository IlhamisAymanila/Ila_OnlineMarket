import { Component, inject } from '@angular/core';
import{FormsModule} from '@angular/forms'
import { AccountService } from '../Service/account.service';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-nav',
  imports: [FormsModule, RouterLink, RouterLinkActive],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css'
})
export class NavComponent {
  accountService = inject(AccountService);
  private router = inject(Router);
  private toaster = inject(ToastrService);
  model: any = {};

  login(){
    this.accountService.login(this.model).subscribe({
      next: _ =>{
        this.router.navigateByUrl('/members')
      },
      error:error => this.toaster.error(error.error)
    })
  }

  logout(){
    this.accountService.logout();
  }

}
