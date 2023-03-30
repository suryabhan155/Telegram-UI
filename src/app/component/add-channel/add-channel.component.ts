import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { channel } from 'src/app/model/channel.model';
import { TelegramService } from 'src/app/services/telegram.service';

@Component({
  selector: 'app-add-channel',
  templateUrl: './add-channel.component.html',
  styleUrls: ['./add-channel.component.css']
})
export class AddChannelComponent {

  id:any;
  modelform : FormGroup;
  save: boolean;
  edit: boolean;
  message: string;
  show: boolean;
  constructor(private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private services : TelegramService) {
      this.route.params.subscribe(res => {
        this.id = res['id'];
      });

  }

  async ngOnInit(): Promise<void> {
    this.modelform= this.formBuilder.group({
      title: ['',Validators.required],
      about: ['',Validators.required],
    })
    if (this.id) {
      this.save = false;
      this.edit = true;
      const res = await this.services.getChannelbyId(this.id).toPromise();
      //this.selectedstate = res.state;
      this.modelform.setValue(res);
    }
    else if (this.id === undefined) {
      this.save = true;
      this.edit = false;
    }
    this.show = false;
  }
  get f() { return this.modelform.controls; }

  async onSave(): Promise<void> {
    try {
      if(this.id){
        const model: channel = {
          title: this.f['title'].value,
          about : this.f['about'].value,
          broadcast : true,
          megagroup : false,
          address : "",
          channelId : this.id,
          for_import : false,
          geo_point : ""
        };
        // stop here if form is invalid
      if (this.modelform.invalid) {
        this.message = "Channel required";
        setTimeout(async () => {
          this.message = "";
        },500);
        return;
      }
      const result = await this.services.updateChannelTitle(model).toPromise();
      if (result.status == 200) {
        this.router.navigate(['channel']);
      }
      setTimeout(() => {
      //this.router.navigate(['admin/client/list']);
      },500);
      }else if(this.id == undefined){
        const model1: channel = {
          title: this.f['title'].value,
          about : this.f['about'].value,
          broadcast : true,
          megagroup : false,
          address : "",
          channelId : 0,
          for_import : false,
          geo_point : ""
        };
        // stop here if form is invalid
      if (this.modelform.invalid) {
        this.message = "Channel required";
        setTimeout(async () => {
          this.message = "";
        },500);
        return;
      }
      const result = await this.services.createChannel(model1).toPromise();
      this.message = "Channel created successfully";
        setTimeout(async () => {
          this.message = "";
          this.router.navigate(['channel']);
        },1000);
      //if (result.status == 200) {
        
      //}
      setTimeout(() => {
      //this.router.navigate(['admin/client/list']);
      },500);
      }
      
    }
    catch (ex) {
      console.log(ex);
    }
  }
}

