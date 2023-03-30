import { Component, Inject } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-remove-user',
  templateUrl: './remove-user.component.html',
  styleUrls: ['./remove-user.component.css']
})
export class RemoveUserComponent {
  title: string;

  constructor(private formbuilder: FormBuilder,
    private dialogref: MatDialogRef<RemoveUserComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.title = "Delete User";
  }

  ngOnInit(): void {
  }

  no(): void {
    this.dialogref.close('no');
  }

  yes(): void {
    this.dialogref.close('yes');
  }
}