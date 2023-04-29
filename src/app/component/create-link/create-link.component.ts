import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TelegramService } from 'src/app/services/telegram.service';
import { ManageLinkComponent } from '../manage-link/manage-link.component';

@Component({
  selector: 'app-create-link',
  templateUrl: './create-link.component.html',
  styleUrls: ['./create-link.component.css']
})
export class CreateLinkComponent {
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
  usagemsg : string;
  constructor(private fb : FormBuilder,
    private dialogref: MatDialogRef<CreateLinkComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.id = +this.data.id;
    this.title1 = this.data.title;
    this.expirydate = this.data.expirydate != undefined ? this.data.expirydate.slice(0,10) : '';
    this.usagelimit = this.data.usagelimit;
    this.link = this.data.link;
    this.requested = this.data.requested;
    this.title = "Create Link";
  }

  async ngOnInit(): Promise<void> {
    this.linkform = this.fb.group({
      id : this.id,
      title : [this.title1],
      expirydate : [this.expirydate],
      usagelimit :[this.usagelimit],
      link : [this.link],
      requested : [this.requested]
    });
    if(this.data.id){
      this.linkform.controls['id'].setValue(this.data.id);
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

  OnChange(e:any){
    if(e.target.checked){
      this.requested=true;
      this.usagemsg = "user limit is not required for admin approval.";
      this.linkform.controls['usagelimit'].setValue(0);
     }else{
      this.requested=false;
      this.usagemsg = "";
    }
  }
}

