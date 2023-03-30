import { Component, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { link } from 'src/app/model/link.model';
import { TelegramService } from 'src/app/services/telegram.service';
import { DeleteChannelComponent } from '../delete-channel/delete-channel.component';
import { ManageLinkComponent } from '../manage-link/manage-link.component';
import { NgxUiLoaderService } from 'ngx-ui-loader';

@Component({
  selector: 'app-channel',
  templateUrl: './channel.component.html',
  styleUrls: ['./channel.component.css']
})
export class ChannelComponent {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  public pageSize = 10;
  public currentPage = 0;
  public totalSize = 0;
  public array: any;
  id: string;
  message : string;
  closetoast : boolean;
  displayedColumns: string[] = ['Sr.No','Channel','Type','NoofUser', 'Action'];
  public channelList : channelList[] = [];
  public channelModel : channelModel[] = [];
  public channelModel1 : channelModel1[] = [];
  dataSource = new MatTableDataSource(this.channelModel);
  selectedRow: any;
  editmode = false;

  constructor(private router : Router,
              private route : ActivatedRoute,
              private services : TelegramService,
              private ngxService: NgxUiLoaderService,
              private dialog: MatDialog) {
              
            }
  async ngOnInit(): Promise<void> {
      // var result = await this.services.getChannellist().toPromise().then(async (x)=>{
      //     this.channelList = x;
      //     for (const k in this.channelList) { 
      //       const v :any = this.channelList[k]; 
      //       console.log(v);
      //       this.channelModel.push(v);
      //       await this.services.getChannelInfo(v.id).subscribe(p=>{
      //         var model : channelModel1={
      //           channelModel:v,
      //           type: "",
      //           noofuser: ""
      //         }
      //         this.channelModel1.push(model);
      //       })
      //     }
      //   });
      this.ngxService.start();
      var result = await this.services.getChannellist().toPromise().then(async (x)=>{
        this.channelModel = x;
        this.ngxService.stop()
      });
      this.dataSource = new MatTableDataSource(this.channelModel);
      
      this.dataSource.paginator = this.paginator;
      this.array = result;
      this.totalSize = this.array.length;
      this.iterator();
  }

  onEdit(value: any): void{
    this.router.navigate(['addchannel/' + value.clientId]);
  }
  async CreateLink(value : any){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '480px';

    if (value.id) {
      dialogConfig.data = {
        id: value.id
      };
    }

    const dialogRef = this.dialog.open(ManageLinkComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(
      async (data) => {
        try
        {
          let currentDate = new Date().toJSON().slice(0, 10);
          var model : link = {
            title :data.title,
            usage_limit : data.usagelimit,
            legacy_revoke_permanent : false,
            request_needed : false,
            expire_Date : data.expirydate,
            createdDate : currentDate,
            link : null,
            Id : 0,
            channelId : data.id
          }
          await this.services.createLink(model).toPromise().then(async x=>{
            console.log(x);
            //if(x.status == 200){
              //await this.services.getlinkandSend(value.id).toPromise().then(c=>{
                //console.log(c);
                this.message = "Link is: "+ x;
                setTimeout(async () => {
                  this.message = "";
                },5000);
              // }).catch(p=>
              // {
              //   console.log(p);
              // });
            //}
          }).catch(err=>{
            console.log(err);
          })
        } catch (e) {

        }
      }
  );
  }
  async JoinLink(value : any){
    await this.services.joinpublicLink(value.id).toPromise().then(x=>{
      console.log(x);
    }).catch(err=>{
      console.log(err);
    })
  }
  // AddUser(val : any):void{
  //   try {
  //     const model : addRemoveUser={
  //       channelId : val.id,
  //       user : val.title
  //     }
  //     this.services.AddUserToChannel(model).subscribe(
  //       (res) => {
  //         this.router.navigate(['channel']);
  //         },
  //         (err)=>{
  //           console.log(err);
  //         }
  //       );
  //     } catch (e) {
  //       console.log(e);
  //     }
  // }
  // LeaveUser(val:any): void{
  //   try {
  //     const model : addRemoveUser={
  //       channelId : val.id,
  //       user : val.title
  //     }
  //     this.services.LeftUserToChannel(model).subscribe(
  //       (res) => {
  //         this.router.navigate(['channel']);
  //         },
  //         (err)=>{
  //           console.log(err);
  //         }
  //       );
  //     } catch (e) {
  //       console.log(e);
  //     }
  // }
  ManageUser(val: any){
    try{
      this.router.navigate(['users/'+val.id]);
    }catch(e){

    }
  }
  async onDeleteSelected(value: any): Promise<void> {
      const dialogConfig = new MatDialogConfig();
      dialogConfig.disableClose = true;
      dialogConfig.autoFocus = true;
      dialogConfig.width = "400px";
      dialogConfig.data = {
      };
      const dialogRef = this.dialog.open(DeleteChannelComponent, dialogConfig);
      dialogRef.afterClosed().subscribe(
          data => {
            if (data === 'no') {
                return;
            }
    
        try {
            this.services.deleteChannel(value.id).subscribe(
              (res) => {
                this.message = "Channel deleted successfully";
                setTimeout(async () => {
                  this.message = "";
                  window.location.reload();
                },1000);
                }
              );
            } catch (e) {

            }
          }
      );
  }
  CreateGigaGroup(val:any){
    try {
      this.services.createGigaGroup(val.id).subscribe(
        (res) => {
          this.message = "Gigagroup created successfully";
          setTimeout(async () => {
            this.message = "";
            window.location.reload();
          },1000);
          },(err)=>{
            debugger
            this.message = err;
            setTimeout(async () => {
              this.message = "";
              window.location.reload();
            },1000);
          }
        );
      } catch (e) {
        
      }
  }
  CreateSuperGroup(){
    this.router.navigate(['addsuperchannel']);
  }
  CreateChannel(){
    this.router.navigate(['addchannel']);
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
export class channelList{
  channelModel: Array<channelModel>;
}
export class channelModel {
  isActive: string;
  id: any;
  title : string;
  photo: any;
  type:any;
  noofuser : any;
}
export class channelModel1 {
  channelModel : channelModel;
  type:any;
  noofuser : any;
}
