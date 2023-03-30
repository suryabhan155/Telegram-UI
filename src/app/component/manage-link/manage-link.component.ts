import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TelegramService } from 'src/app/services/telegram.service';

@Component({
  selector: 'app-manage-link',
  templateUrl: './manage-link.component.html',
  styleUrls: ['./manage-link.component.css']
})
export class ManageLinkComponent {
  title: string;
  linkform : FormGroup;
  show:boolean;
  message : string;
  constructor(private fb : FormBuilder,private services : TelegramService,
    private dialogref: MatDialogRef<ManageLinkComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.title = "Manage Link";
  }

  async ngOnInit(): Promise<void> {
    debugger
    this.linkform = this.fb.group({
      id : this.data.id,
      title : [''],
      expirydate : [''],
      usagelimit :['']
    });
    console.log(this.linkform);
    
    if(this.data.id){
      this.linkform.controls['id'].setValue(this.data.id);
    }
    this.show = false;
    console.log(this.linkform);
  }

  async create() : Promise<void>{
    this.dialogref.close(this.linkform.value);
  }

  cancel() {
    this.dialogref.close();
  }
}
