import { Component, Inject } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CreateLinkComponent } from '../create-link/create-link.component';
import { TelegramService } from 'src/app/services/telegram.service';
import { approveReject } from 'src/app/model/approveReject.model';

@Component({
  selector: 'app-request-join',
  templateUrl: './request-join.component.html',
  styleUrls: ['./request-join.component.css']
})
export class RequestJoinComponent {
  title: string;
  linkform : FormGroup;
  show:boolean;
  message : string;
  id : number;
  title1 : any = '';
  expirydate : any = '';
  usagelimit : any = '';
  link : any = "";
  requested : boolean;
  RequestJoin : RequestJoin[] = [];
  constructor(private fb : FormBuilder,
    private dialogref: MatDialogRef<CreateLinkComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private services : TelegramService) {
    this.id = +this.data.id;
    this.title = "Join Request";
  }

  async ngOnInit(): Promise<void> {
    if(this.data.id){
      try {
      this.services.getwaitinglist(this.id).subscribe(
        (res) => {
          if(res.success){
            this.RequestJoin = res.data;
          }else{
            setTimeout(() => {
              this.message = "";
            }, 1000);
          }
          },
          (err)=>{
            console.log(err);
          }
        );
      } catch (e) {
        console.log(e);
      }
    }
    this.show = false;
    console.log(this.linkform);
  }

  async create() : Promise<void>{
    this.dialogref.close(this.linkform.value);
  }

  cancel() {
    this.dialogref.close();
  }

  getInfo(val : any){

  }

  Dismiss(val : any){
    var model : approveReject = {
      userId : val.user_id,
      channelId : this.id,
      link : "",
      approved : false,
      requested : false
    }
    try{
      this.services.approveRejectChatJoinRequest(model).subscribe(
        (res) => {
          if(res.success){
            this.RequestJoin = res.data;
          }else{
            setTimeout(() => {
              this.message = "";
            }, 1000);
          }
          },
          (err)=>{
            console.log(err);
          }
        );
      } catch (e) {
        console.log(e);
    }
  }
  AddtoChannel(val : any){
    var model : approveReject = {
      userId : val.user_id,
      channelId : this.id,
      link : "",
      approved : true,
      requested : true
    }
    try{
      this.services.approveRejectChatJoinRequest(model).subscribe(
        (res) => {
          if(res.success){
            this.RequestJoin = res.data;
          }else{
            setTimeout(() => {
              this.message = "";
            }, 1000);
          }
          },
          (err)=>{
            console.log(err);
          }
        );
      } catch (e) {
        console.log(e);
      }
  }
}
export class RequestJoin{
  first_name : string;
  last_name : string;
  message : string;
  user_id : any;
}
export class invite{

}
