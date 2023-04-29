import { Input } from '@angular/core';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TelegramService } from 'src/app/services/telegram.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  @Input() image:any;
  //currentUser: User;
  user : string;
  img:string;
  constructor(private router: Router,private services : TelegramService) {
    //this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
   }

  async ngOnInit(): Promise<void> {
    await this.services.username().subscribe(x=>{
      this.user = x;
    });
    // await this.services.getUserInfoPicbyId(this.currentUser.data.id).toPromise().then(x=>{
    //   if(x.statusCode == 200)
    //   {
    //     this.img = 'data:image/jpeg;base64,'+ x.data.image;
    //   }else{
         this.img = '/assets/img/profile/profile-11.jpg';
    //   }
    // });
  }
  
  async logout() {
      // this.authenticationService.logout();
      // this.router.navigate(['/login']);
    await this.services.logout().subscribe(x=>{
      if(x.success){

      }
    })
  }
}
