import { Input } from '@angular/core';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

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
  constructor(private router: Router) {
    //this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
   }

  async ngOnInit(): Promise<void> {
    //this.user = this.currentUser.data.role.roleName;
    // await this.services.getUserInfoPicbyId(this.currentUser.data.id).toPromise().then(x=>{
    //   if(x.statusCode == 200)
    //   {
    //     this.img = 'data:image/jpeg;base64,'+ x.data.image;
    //   }else{
    //     this.img = '/assets/img/profile/profile-11.jpg';
    //   }
    // });
  }
  
  logout() {
      // this.authenticationService.logout();
      // this.router.navigate(['/login']);
  }
}
