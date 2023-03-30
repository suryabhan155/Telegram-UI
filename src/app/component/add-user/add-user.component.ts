import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { user } from 'src/app/model/user.model';
import { TelegramService } from 'src/app/services/telegram.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent {
  title: string;
  form : FormGroup;
  show:boolean;
  message : string;
  constructor(private fb : FormBuilder,private services : TelegramService,
    private dialogref: MatDialogRef<AddUserComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.title = "Add User";
  }

  async ngOnInit(): Promise<void> {
    this.form = this.fb.group({
      id : this.data.id,
      rdoPhoneNumber : [''],
      rdoUsername : [''],
      username :['',Validators.required]
    });
    if(this.data.id){
      this.form.controls['id'].setValue(this.data.id);
    }
    this.show = false;
  }

  Inactive(): void {
    this.dialogref.close('Inactive');
  }

  Active(): void {
    this.dialogref.close('Active');
  }

  async create() : Promise<void>{
    if(this.data.id){
      var user: any = null;
      if(this.form.controls['rdoPhoneNumber']){
        // await this.services.searchUserbyPhone(this.form.controls['username'].value).toPromise().then(res=>{
        //   user= res;
        // })
      }else if(this.form.controls['rdoUsername']){
        // const result = await this.services.searchUserbyName(this.form.controls['username'].value).toPromise().then(x=>{
        //   user= x;
        // });
      }else{
        this.message = "Please select phone number or name";
        setTimeout(async () => {
          this.message = "";
        },1000);
      }
    }
    this.dialogref.close(this.form.value);
  }

  cancel() {
    this.dialogref.close();
  }
}