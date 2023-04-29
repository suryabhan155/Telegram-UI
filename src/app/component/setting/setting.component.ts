import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TelegramService } from 'src/app/services/telegram.service';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.css']
})
export class SettingComponent {

  id:any;
  listLink : string;
  modeltitleurl :string;
  modeltitle : string = "";
  addModelInsert :boolean = true;
  modelform : FormGroup;
  save: boolean;
  edit: boolean;
  message: string;
  show: boolean;
  cellList : boolean = true;
  constructor(private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private services : TelegramService) {

  }

  async ngOnInit(): Promise<void> {
    this.modelform= this.formBuilder.group({
      code: ['',Validators.required]
    })
    this.show = false;
    await this.services.getStatus().toPromise().then((x)=>{
      if(x.status == 200){
        console.log("FRT");
      }
    }).catch(p=>{
      // if(p.status == 200){
      //   this.router.navigate(['channel']);
      // }
    });
  }
  get f() { return this.modelform.controls; }

  async onSave(): Promise<void> {
    try {
      const model: any = {
        code: this.f['code'].value,
      };
      // stop here if form is invalid
      if (this.modelform.invalid) {
        this.message = "Code is not supplied";
        setTimeout(async () => {
          this.message = "";
        },1000);
        return;
      }
      const result = await this.services.getConfig(this.f['code'].value).toPromise();
      debugger
      //if (result.status == 200) {
        this.router.navigate(['channel']);
      //}
      setTimeout(() => {
      //this.router.navigate(['admin/client/list']);
      },1000);
    }
    catch (ex) {
      console.log(ex);
      this.message = ex.message;
      setTimeout(async () => {
        this.message = "";
      },1000);
    }
  }
}
