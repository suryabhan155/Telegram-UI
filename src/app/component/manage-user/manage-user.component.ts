import { Component, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { addUser, RemoveUser } from 'src/app/model/addRemoveUser.model';
import { user } from 'src/app/model/user.model';
import { TelegramService } from 'src/app/services/telegram.service';
import { AddUserComponent } from '../add-user/add-user.component';
import { RemoveUserComponent } from '../remove-user/remove-user.component';
import { approveReject } from 'src/app/model/approveReject.model';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-manage-user',
  templateUrl: './manage-user.component.html',
  styleUrls: ['./manage-user.component.css']
})
export class ManageUserComponent {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  public pageSize = 10;
  public currentPage = 0;
  public totalSize = 0;
  public array: any;
  id: any;
  message : string;
  closetoast : boolean;
  displayedColumns: string[] = ['Sr.No','Username','FirstName','Action'];
  public userModel : user[] = [];
  RequestJoin : RequestJoin[] = [];
  dataSource = new MatTableDataSource(this.RequestJoin);
  selectedRow: any;
  editmode = false;
  allchecked :boolean= false;
  result : any[] = [];

  constructor(private router : Router,
              private route : ActivatedRoute,
              private services : TelegramService,
              private ngxService: NgxUiLoaderService,
              private dialog: MatDialog,
              private common : CommonService) {
              this.route.params.subscribe(res=>{
                this.id = res['id'];
              })
            }
  async ngOnInit(): Promise<void> {
    this.ngxService.start();
      await this.services.getAllParticipants(this.id).toPromise().then(async (x)=>{
        if(x.success){
            this.services.getwaitinglist(this.id).subscribe(
              (res) => {
                if(res.success){
                  res.data.forEach(element => {
                    //this.userModel.push(element);
                    const request : RequestJoin = {
                      user : element,
                      isRequest : true
                    }
                    this.RequestJoin.push(request)
                  });
                  x.data.forEach(element => {
                    const request : RequestJoin = {
                      user : element,
                      isRequest : false
                    }
                    this.RequestJoin.push(request)
                  });
                  this.result = this.RequestJoin;
                  this.dataSource = new MatTableDataSource(this.RequestJoin);
      
                  this.dataSource.paginator = this.paginator;
                  this.array = this.RequestJoin;
                  this.totalSize = this.array.length;
                  this.iterator();
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
        }else{
          this.message = x.message;
          setTimeout(() => {
            this.message = "";
          }, 1000);
        }
        this.ngxService.stop();
      });

  }

  AddUser(id:any):void{
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '480px';

    if (this.id) {
      dialogConfig.data = {
        id: this.id
      };
    }

    const dialogRef = this.dialog.open(AddUserComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(
      data => {
        try {
          const model : addUser={
            id : data.id,
            rdoPhoneNumber : data.rdoPhoneNumber,
            rdoUsername:data.rdoUsername,
            username:data.username
          }
          this.services.AddUserToChannel(model).subscribe(
            (res) => {
              this.message = res.message;
              if(res.success){
                setTimeout(async () => {
                  this.message = "";
                  await this.ngOnInit();
                }, 1000);
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
    );
  }
  LeaveUser(val:any): void{
    // try {
    //   const model : addRemoveUser={
    //     id : data.id,
    //     rdoPhoneNumber : data.rdoPhoneNumber,
    //     rdoUsername:data.rdoUsername,
    //     username:data.username
    //   }
    //   this.services.LeftUserToChannel(model).subscribe(
    //     (res) => {
    //       this.router.navigate(['channel']);
    //       },
    //       (err)=>{
    //         console.log(err);
    //       }
    //     );
    //   } catch (e) {
    //     console.log(e);
    //   }
  }

  async onDeleteSelected(value: any): Promise<void> {
      const dialogConfig = new MatDialogConfig();
      dialogConfig.disableClose = true;
      dialogConfig.autoFocus = true;
      dialogConfig.width = "400px";
      dialogConfig.data = {
      };
      const dialogRef = this.dialog.open(RemoveUserComponent, dialogConfig);
      dialogRef.afterClosed().subscribe(
          data => {
            if (data === 'no') {
                return;
            }
            try {
              const model : RemoveUser={
                id : this.id,//channelid
                userid : value.id,//userid
                access_hash:value.access_hash
              }
              this.services.LeftUserToChannel(model).subscribe(
                (res) => {
                  if(res.success){
                    this.message = res.message;
                    setTimeout(async () => {
                      await this.ngOnInit();
                    }, 1000);
                  }else{
                    this.message = res.message;
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
      );
  }

  Dismiss(val : any){
    var model : approveReject = {
      userId : val.id,
      channelId : this.id,
      link : "",
      approved : false,
      requested : false
    }
    try{
      this.ngxService.start();
      this.services.approveRejectChatJoinRequest(model).subscribe(
        async (res) => {
          if(res.success){
            this.RequestJoin = res.data;
            this.ngxService.stop();
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
      userId : val.id,
      channelId : this.id,
      link : "",
      approved : true,
      requested : true
    }
    try{
      this.ngxService.start();
      this.services.approveRejectChatJoinRequest(model).subscribe(
        async (res) => {
          if(res.success){
            this.RequestJoin = res.data;
            this.common.chlist.forEach(x=>{
              if(x.id == this.id){
                x.RequestCount = x.RequestCount-1;
                x.IsRequestJoin = false; 
              }
            });
            this.ngxService.stop();
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
  
  highlight(): void {
    this.editmode = !!this.selectedRow;
  }
  public handlePage(e: any) {
    this.currentPage = e.pageIndex;
    this.pageSize = e.pageSize;
    this.iterator();
  }
  
  private iterator() {
    const end = (this.currentPage + 1) * this.pageSize;
    const start = this.currentPage * this.pageSize;
    const part = this.array.slice(start, end);
    this.dataSource = part;
  }
  closeToast(){
    this.closetoast = true;
  }
}
export class RequestJoin{
  user : user;
  isRequest : boolean;
}
