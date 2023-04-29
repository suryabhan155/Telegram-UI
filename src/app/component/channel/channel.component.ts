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
import { RequestJoinComponent } from '../request-join/request-join.component';
import { CommonService } from 'src/app/services/common.service';

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
  public channelModel : channelModel[] = [];
  dataSource = new MatTableDataSource(this.common.chlist);
  selectedRow: any;
  editmode = false;
  IsRequestJoin : boolean = false;

  constructor(private router : Router,
    private route : ActivatedRoute,
    private services : TelegramService,
    private ngxService: NgxUiLoaderService,
    private dialog: MatDialog,
    private common : CommonService) {
    
  }
  async ngOnInit(): Promise<void> {
    if(this.common.chlist.length == 0){
      this.ngxService.start();
        await this.services.getChannellist().toPromise().then(async (x)=>{
          if(x.success){
            this.channelModel = x.data;
            this.common.chlist = x.data;
          }else{
            this.message = x.message;
            setTimeout(async () => {
              this.message = "";
              await this.ngOnInit();
            }, 1000);
          }
          this.ngxService.stop()
        });
    }
    debugger;
    this.dataSource = new MatTableDataSource(this.common.chlist);
    this.dataSource.paginator = this.paginator;
    this.array = this.common.chlist;
    this.totalSize = this.array.length;
    this.iterator();
  }

  onEdit(value: any): void{
    this.router.navigate(['addchannel/' + value.id]);
  }
  async JoinLink(value : any){
    await this.services.joinpublicLink(value.id).toPromise().then(x=>{
      console.log(x);
    }).catch(err=>{
      console.log(err);
    })
  }
  ManageUser(val: any){
    try{
      this.router.navigate(['users/'+val.id]);
    }catch(e){

    }
  }
  ManageLink(val: any){
    try{
      this.router.navigate(['link/'+val.id]);
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
                this.message = res.message;
                if(res.success){
                  const index = this.common.chlist.indexOf(value);
                  if(index >-1){
                    this.common.chlist.splice(index,1);
                  }
                  setTimeout(async () => {
                    this.message = "";
                    await this.ngOnInit();
                  },1000);
                }else{
                  setTimeout(() => {
                    this.message = "";
                  }, 1000);
                }
              });
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
            //this.common.chlist.push(val);
          },1000);
          },(err)=>{
            this.message = err;
            setTimeout(async () => {
              this.message = "";
            },1000);
          }
        );
      } catch (e) {
        
      }
  }
  CreateSuperGroup(){
    this.router.navigate(['addsuperchannel']);
  }
  CreatePrivateChannel(){
    localStorage.removeItem('channeltype');
    localStorage.setItem('channeltype','private');
    this.router.navigate(['addchannel']);
  }
  CreatePublicChannel(){
    localStorage.removeItem('channeltype');
    localStorage.setItem('channeltype','public');
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
export class channelModel {
  isActive: string;
  id: any;
  title : string;
  photo: any;
  type:any;
  noofuser : any;
  IsRequestJoin : boolean;
  RequestCount : number;
}
