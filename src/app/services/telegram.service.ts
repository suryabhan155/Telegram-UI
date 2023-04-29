import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { addUser,RemoveUser } from '../model/addRemoveUser.model';
import { channel } from '../model/channel.model';
import { Inputchannel } from '../model/Inputchannel.model';
import { link } from '../model/link.model';
import { approveReject } from '../model/approveReject.model';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' ,'Accept': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})

export class TelegramService {

  private readonly baseUrl = environment.Url;

  constructor(private http : HttpClient) { }

  // Channel status
  public getStatus(): Observable<any> {
    return this.http.get<any>(this.baseUrl + '/Channel/status').pipe();
  }
  public chatcount():Observable<any>{
    return this.http.get<any>(this.baseUrl + '/Channel/chatcount').pipe();
  }
  // Channel config
  public getConfig(val:any): Observable<any> {
    return this.http.post<any>(this.baseUrl + '/Channel/config', JSON.stringify(val),httpOptions).pipe();
  }
  public createChannel(channel: channel): Observable<any> {
    return this.http.post<any>(this.baseUrl + '/Channel/createchannel', JSON.stringify(channel), httpOptions).pipe();
  }
  public createPublicChannel(channel: channel): Observable<any> {
    return this.http.post<any>(this.baseUrl + '/Channel/createpublicchannel', JSON.stringify(channel), httpOptions).pipe();
  }
  public createSuperGroup(channel: channel): Observable<any> {
    return this.http.post<any>(this.baseUrl + '/Channel/createsupergroup', JSON.stringify(channel), httpOptions).pipe();
  }
  public createGigaGroup(id: number): Observable<any> {
    return this.http.post<any>(this.baseUrl + '/Channel/creategigagroup', JSON.stringify(id), httpOptions).pipe();
  }

  // public deleteChannel(Inputchannel: Inputchannel): Observable<any> {
  //   return this.http.post<any>(this.baseUrl + '/Channel/deletechannel', JSON.stringify(Inputchannel), httpOptions).pipe();
  // }
  public deleteChannel(id:number): Observable<any> {
    return this.http.post<any>(this.baseUrl + '/Channel/deletechannel', JSON.stringify(id), httpOptions).pipe();
  }

  public getChannellist(): Observable<any> {
    return this.http.get<any>(this.baseUrl + '/Channel/getchannel').pipe();
  } 

  public getChannelInfo(id:any): Observable<any> {
    return this.http.post<any>(this.baseUrl + '/Channel/getchannelinfo',JSON.stringify(id), httpOptions).pipe();
  }  

  public getChannelFull(id:any): Observable<any> {
    return this.http.get<any>(this.baseUrl + '/Channel/getchannelfull/'+id).pipe();
  } 

  public getChannelbyId(id:number): Observable<any> {
    return this.http.post<any>(this.baseUrl + '/Channel/getchannelbyid', JSON.stringify(id), httpOptions).pipe();
  }  
  public updateChannelTitle(channel: any): Observable<any> {
    return this.http.post<any>(this.baseUrl + '/Channel/editchanneltitle',JSON.stringify(channel), httpOptions).pipe();
  }

  public AddUserToChannel(addremoveuser: addUser): Observable<any> {
    return this.http.post<any>(this.baseUrl + '/Channel/AddUserToChannel', JSON.stringify(addremoveuser), httpOptions).pipe();
  }

  public LeftUserToChannel(addRemoveUser: RemoveUser): Observable<any> {
    return this.http.post<any>(this.baseUrl + '/Channel/LeftUserToChannel', JSON.stringify(addRemoveUser), httpOptions).pipe();
  }
  public createLink(model: link): Observable<any> {
    return this.http.post<any>(this.baseUrl + '/Channel/createLink', JSON.stringify(model), httpOptions).pipe();
  }
  public editLink(model: link): Observable<any> {
    return this.http.post<any>(this.baseUrl + '/Channel/editLink', JSON.stringify(model), httpOptions).pipe();
  }
  public getlinkandSend(id: any): Observable<any> {
    return this.http.post<any>(this.baseUrl + '/Channel/getLinkAndSend', JSON.stringify(id), httpOptions).pipe();
  }
  public deleteLink(id: any): Observable<any> {
    return this.http.post<any>(this.baseUrl + '/Channel/deleteLink', JSON.stringify(id), httpOptions).pipe();
  }
  public joinpublicLink(link: any): Observable<any> {
    return this.http.post<any>(this.baseUrl + '/Channel/JoinPublicGroupWithLink', JSON.stringify(link), httpOptions).pipe();
  }
  public joinprivateLink(link: any): Observable<any> {
    return this.http.post<any>(this.baseUrl + '/Channel/JoinPrivateGroupWithLink', JSON.stringify(link), httpOptions).pipe();
  }
  public getAllParticipants(id:number):Observable<any>{
    return this.http.post<any>(this.baseUrl + '/Channel/getAllParticipants',JSON.stringify(id),httpOptions).pipe();
  }
  public approveRejectChatJoinRequest(approveReject:approveReject):Observable<any>{
    return this.http.post<any>(this.baseUrl + '/Channel/approveRejectChatJoinRequest', JSON.stringify(approveReject),httpOptions).pipe();
  }
  public searchUserbyPhone(phone:any):Observable<any>{
    return this.http.post<any>(this.baseUrl + '/Channel/searchuserbyphone', JSON.stringify(phone),httpOptions).pipe();
  }
  public searchUserbyName(name:string):Observable<any>{
    return this.http.post<any>(this.baseUrl + '/Channel/searchuserbyname', JSON.stringify(name),httpOptions).pipe();
  }
  public getwaitinglist(id:number):Observable<any>{
    return this.http.post<any>(this.baseUrl + '/Channel/getwaitinglistuser', JSON.stringify(id),httpOptions).pipe();
  }
  public logout():Observable<any>{
    return this.http.get<any>(this.baseUrl + '/Channel/logout',httpOptions).pipe();
  }
  public username() : Observable<any>{
    return this.http.get<any>(this.baseUrl + '/Channel/username',httpOptions).pipe();
  }
}
