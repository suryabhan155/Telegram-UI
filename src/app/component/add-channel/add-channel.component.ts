import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { channel } from 'src/app/model/channel.model';
import { CommonService } from 'src/app/services/common.service';
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
  ispublic: boolean;
  constructor(private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private ngxService: NgxUiLoaderService,
    private services : TelegramService,
    private common : CommonService) {
      this.route.params.subscribe(res => {
        this.id = res['id'];
      });

  }

  async ngOnInit(): Promise<void> {
    localStorage.getItem('channeltype') == 'public' ? (this.ispublic = true) : (this.ispublic = false);
    this.modelform= this.formBuilder.group({
      title: ['',Validators.required],
      about: ['',Validators.required],
      username : ['']
    })
    if (this.id) {
      var p: number = +(this.id);
      this.save = false;
      this.edit = true;
      const res = await this.services.getChannelbyId(p).subscribe(x=>{
        if(x.success){
          this.modelform.controls['title'].setValue(x.data.title);
          this.modelform.controls['username'].setValue(x.data.username);
          this.modelform.controls['about'].setValue(x.data.about);
        }else{
          //
        }
      },err=>{
        console.log(err);
        
      });
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
        await this.services.updateChannelTitle(model).subscribe(async x=>{
          if (x.success) {
            this.common.chlist.forEach(element => {
              if(element.id == this.id){
                element.title = this.f['title'].value;
              }
            });
            this.router.navigate(['channel']);
          }else{
            this.message = x.message;
            setTimeout(async () => {
              this.message = "";
            },1000);
          }
        })
      }else if(this.id == undefined){
        const model1: channel = {
          title: this.f['title'].value,
          about : this.f['about'].value,
          broadcast : true,
          megagroup : false,
          address : this.f['username'].value,//for public channel
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
      if(localStorage.getItem('channeltype') == 'public'){
        await this.services.createPublicChannel(model1).subscribe((res)=>{
          this.message = res.message;
          if(res.success){
            this.common.chlist.push({
              isActive : 'true',
              id: res.data.channelId,
              title : this.f['title'].value,
              photo: null,
              type:'channel',
              noofuser : 1,
              IsRequestJoin : false,
              RequestCount : 0
            });
            setTimeout(async () => {
              this.message = "";
              this.router.navigate(['channel']);
            },1000);
          }else{
            setTimeout(async () => {
              this.message = "";
            },1000);
          }
        },(err)=>{
          this.message = err.message;
            setTimeout(async () => {
              this.message = "";
            },1000);
        })
      }else if(localStorage.getItem('channeltype') == 'private'){
        await this.services.createChannel(model1).subscribe(x=>{   
          this.message = x.message;         
          if(x.success){
            this.common.chlist.push({
              isActive : 'true',
              id: x.data.channelId,
              title : this.f['title'].value,
              photo: null,
              type:'channel',
              noofuser : 1,
              IsRequestJoin : false,
              RequestCount : 0
            });
            setTimeout(async () => {
              this.message = "";
              this.router.navigate(['channel']);
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
              this.router.navigate(['channel']);
            },1000);
        });
      }
    }
  }
    catch (ex) {
      this.message = ex.message;
      setTimeout(async () => {
        this.message = "";
        this.router.navigate(['channel']);
      },1000);
    }
  }
}

