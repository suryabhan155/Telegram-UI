import { Component, Inject, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router, ActivatedRoute } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { addUser, RemoveUser } from 'src/app/model/addRemoveUser.model';
import { user } from 'src/app/model/user.model';
import { TelegramService } from 'src/app/services/telegram.service';
import { AddUserComponent } from '../add-user/add-user.component';
import { RemoveUserComponent } from '../remove-user/remove-user.component';
import { link } from 'src/app/model/link.model';
import {Clipboard} from '@angular/cdk/clipboard';
import { DeleteLinkComponent } from '../delete-link/delete-link.component';
import { CreateLinkComponent } from '../create-link/create-link.component';

@Component({
  selector: 'app-manage-link',
  templateUrl: './manage-link.component.html',
  styleUrls: ['./manage-link.component.css']
})
export class ManageLinkComponent {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  public pageSize = 10;
  public currentPage = 0;
  public totalSize = 0;
  public array: any;
  id: any;
  message : string;
  closetoast : boolean;
  result :any[] =[];
  displayedColumns: string[] = ['Sr.No','Link','UsageLimit','ExpiryDate','Status','Action'];
  public linkModel : linkModel[] = [];
  dataSource = new MatTableDataSource(this.linkModel);
  selectedRow: any;
  editmode = false;
  allchecked :boolean= false;

  constructor(private router : Router,
              private route : ActivatedRoute,
              private services : TelegramService,
              private ngxService: NgxUiLoaderService,
              private dialog: MatDialog,
              private clipboard: Clipboard) {
              this.route.params.subscribe(res=>{
                this.id = res['id'];
              })
            }
  async ngOnInit(): Promise<void> {
    this.ngxService.start();
      await this.services.getlinkandSend(this.id).toPromise().then(x=>{
        if(x.success){
          this.linkModel = x.data;
          this.linkModel.forEach(element => {
            if(element.expire_Date == "0001-01-01T00:00:00"){
              element.status = "active";
            }
            else if(element.expire_Date < new Date().toJSON()){
              element.status = "expired";
            }else{
              element.status = "active";
            }
          });
          this.result = x.data;
        }
        else{
          this.message = x.message;
          setTimeout(() => {
            this.message = "";
          }, 1000);
        }
        this.ngxService.stop();
      });
      this.dataSource = new MatTableDataSource(this.linkModel);
      
      this.dataSource.paginator = this.paginator;
      this.array = this.result;
      this.totalSize = this.array.length;
      this.iterator();
  }
  async onDeleteSelected(value: any): Promise<void> {
      const dialogConfig = new MatDialogConfig();
      dialogConfig.disableClose = true;
      dialogConfig.autoFocus = true;
      dialogConfig.width = "400px";
      dialogConfig.data = {
      };
      const dialogRef = this.dialog.open(DeleteLinkComponent, dialogConfig);
      dialogRef.afterClosed().subscribe(
          data => {
            if (data === 'no') {
                return;
            }
            try {
              var p = +(this.id)
              this.services.deleteLink(p).subscribe(
                async (res) => {
                    if(res.success){
                     await this.ngOnInit();
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
  onCopySelected(val:any){0
    this.clipboard.copy(val.link);
  }
  onWaitListSelected(val: any){
    
  }
  onEditSelected(val:any){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '480px';

    if (val) {
      dialogConfig.data = {
        id: this.id,
        title : val.title,
        expirydate : val.expire_Date,
        usagelimit :val.usage_limit,
        legacy_revoke_permanent : false,
        request_needed : false,//val.requested
        link : val.link,
        channelId : this.id
      };
    }

    const dialogRef = this.dialog.open(CreateLinkComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(
      async (data) => {
        try
        {
          let currentDate = new Date().toJSON().slice(0, 10);
          var model : link = {
            title :data.title,
            usage_limit : data.usagelimit,
            legacy_revoke_permanent : false,
            request_needed : false,//data.requested
            expire_Date : data.expirydate,
            createdDate : currentDate,
            link : data.link,
            Id : 0,
            channelId : data.id
          }
          await this.services.editLink(model).toPromise().then(async x=>{
            console.log(x);
            if(x.success){
                this.message = x.message;
                setTimeout(async () => {
                  this.message = "";
                },5000);
            }else{
              this.message = x.message;
                setTimeout(async () => {
                  this.message = "";
                },1000);
            }
          }).catch(err=>{
            console.log(err);
          })
        } catch (e) {

        }
      }
    );
  }
  // onDeleteSelected(){

  // }
  async CreateLink(value : any){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '480px';

    if (value) {
      dialogConfig.data = {
        id: value
      };
    }

    const dialogRef = this.dialog.open(CreateLinkComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(
      async (data) => {
        try
        {
          let currentDate = new Date().toJSON().slice(0, 10);
          var model : link = {
            title :data.title,
            usage_limit : data.usagelimit,
            legacy_revoke_permanent : false,
            request_needed : false,//data.requested
            expire_Date : data.expirydate,
            createdDate : currentDate,
            link : null,
            Id : 0,
            channelId : data.id
          }
          await this.services.createLink(model).toPromise().then(async x=>{
            if(x.success){
                this.message = x.message;
                setTimeout(async () => {
                  this.message = "";
                  await this.ngOnInit();
                },5000);
            }else{
              this.message = x.message;
                setTimeout(async () => {
                  this.message = "";
                },1000);
            }
          }).catch(err=>{
            console.log(err);
          })
        } catch (e) {

        }
      }
  );
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
interface linkModel{
  link:any;
  usage_limit : any;
  expire_Date : any;
  title : any;
  status : any;
}
