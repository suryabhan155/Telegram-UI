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
  dataSource = new MatTableDataSource(this.userModel);
  selectedRow: any;
  editmode = false;
  allchecked :boolean= false;

  constructor(private router : Router,
              private route : ActivatedRoute,
              private services : TelegramService,
              private ngxService: NgxUiLoaderService,
              private dialog: MatDialog) {
              this.route.params.subscribe(res=>{
                this.id = res['id'];
              })
            }
  async ngOnInit(): Promise<void> {
    this.ngxService.start();
      var result = await this.services.getAllParticipants(this.id).toPromise().then(async (x)=>{
        this.userModel = x;
        this.ngxService.stop();
      });
      this.dataSource = new MatTableDataSource(this.userModel);
      
      this.dataSource.paginator = this.paginator;
      this.array = result;
      this.totalSize = this.array.length;
      this.iterator();
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
              // this.router.navigate(['users/' + this.id]);
              window.location.reload();
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
                    window.location.reload();
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
