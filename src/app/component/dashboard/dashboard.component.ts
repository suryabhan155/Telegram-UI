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

     cid:any;
  noofchannel : Number;
  async ngOnInit(): Promise<void> {
    var result = await this.services.chatcount().toPromise();
    this.noofchannel = result;
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
