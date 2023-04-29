import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { channel } from 'src/app/model/channel.model';
import { CommonService } from 'src/app/services/common.service';
import { TelegramService } from 'src/app/services/telegram.service';

@Component({
  selector: 'app-add-super-channel',
  templateUrl: './add-super-channel.component.html',
  styleUrls: ['./add-super-channel.component.css']
})
export class AddSuperChannelComponent {
  id:any;
  modelform : FormGroup;
  save: boolean;
  edit: boolean;
  message: string;
  show: boolean;
  constructor(private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private services : TelegramService,
    private common : CommonService) {

  }

  async ngOnInit(): Promise<void> {
    this.modelform= this.formBuilder.group({
      title: ['',Validators.required],
      about: ['',Validators.required],
    })
    this.show = false;
  }
  get f() { return this.modelform.controls; }

  async onSave(): Promise<void> {
    try {
      const model: channel = {
        title: this.f['title'].value,
        about : this.f['about'].value,
        broadcast : false,
        megagroup : true,
        address : "",
        channelId : 0,
        for_import : false,
        geo_point : ""
      };
      // stop here if form is invalid
      if (this.modelform.invalid) {
        this.message = "Group required";
        setTimeout(async () => {
          this.message = "";
        },1000);
        return;
      }
      const result = await this.services.createSuperGroup(model).subscribe(x=>{
        this.message = x.message;
        if(x.success){
          setTimeout(async () => {
            this.message = "";
            //this.router.navigate(['channel']);
            this.common.chlist.push({
              isActive : 'true',
              id: x.data.channelId,
              title : this.f['title'].value,
              photo: null,
              type:'group',
              noofuser : 1,
              IsRequestJoin : false,
              RequestCount : 0
            });
          },1000);
        }else{
          setTimeout(async () => {
            this.message = "";
          },1000);
        }
      },err=>{
        this.message = err.message;
          setTimeout(async () => {
            this.message = "";
            //this.router.navigate(['channel']);
          },1000);
      });
    }
    catch (ex) {
      this.message = ex.message;
      setTimeout(async () => {
        this.message = "";
      },1000);
    }
  }
}

