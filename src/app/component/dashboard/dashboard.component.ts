import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TelegramService } from 'src/app/services/telegram.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  constructor(private router : Router,private services : TelegramService) {
     }

  message : any;
  noofchannel : Number;
  async ngOnInit(): Promise<void> {
    await this.services.chatcount().subscribe(x=>{
      if(x.success){
        this.noofchannel = x.data;
      }else{
        this.message = x.message;
        setTimeout(() => {
          this.message = "";
        }, 1000);
      }
    },err=>{
      this.message = err.error;
        setTimeout(() => {
          this.message = "";
        }, 2000);
    });
    
    // //project
    // var projectresult = await this.services.getProjectbyCId(this.cid).toPromise();
    // this.noofproject = projectresult.length;
  }
  onChannelClick(){
    this.router.navigate(['channel']);
  }
  toggle:boolean=false;
  togglemenuclick(){
    this.toggle = !this.toggle;
    
  }
}
