import { Injectable } from '@angular/core';
import { channelModel } from '../component/channel/channel.component';
import { TelegramService } from './telegram.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { RequestJoin } from '../component/manage-user/manage-user.component';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  public chlist : channelModel[] = [];
  public userlist : RequestJoin[] = [];
  public channelModel : channelModel;
  constructor(private service : TelegramService) { 
  }
}
