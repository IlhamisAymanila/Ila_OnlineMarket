import { Component, inject, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AccountService } from '../Service/account.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  imports: [FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  private accountService = inject(AccountService);
    private toaster = inject(ToastrService);
  cancelRegister = output<boolean>();
  model: any ={}


  regsiter(){
    this.accountService.register(this.model).subscribe({
      next: res =>{
        console.log(res);
        this.cancel();
      },
      error: error => this.toaster.error(error.error)
      
    })
  }

  cancel(){
    this.cancelRegister.emit(false);
  }

}
