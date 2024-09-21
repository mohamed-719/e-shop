import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Login, ResetPassword, SendMail, Signup, VerifyCode } from '../interfaces/auth';
import { BehaviorSubject, Observable } from 'rxjs';
import Cookies from 'js-cookie'
import { GlobalService } from './global.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl: string = '';
  private authRoute: string = '';
  private apiKey: string = '';
  currentUser = new BehaviorSubject(null);
  authPhoto: string = 'images/phone.svg'
  constructor(private _GlobalService: GlobalService, private _HttpClient: HttpClient, private _Router: Router) {
    this.baseUrl = this._GlobalService.baseUrl;
    this.authRoute = this._GlobalService.authRoute;
    this.apiKey = this._GlobalService.apiKey;
    // if (localStorage.getItem('user') !== null) {
    //   this.saveCurrentUser();
    // }
  };


signup(formData: Signup): Observable<any> { 
 return this._HttpClient.post(`${this.baseUrl}${this.authRoute}/signup`,formData
      , {
        headers: {
          "X-API-KEY": `${this.apiKey}`,
          "X-CSRF-Token": `${Cookies.get('cookies')}`
        }, withCredentials: true
      })
}
  login(formData: Login): Observable<any> {
    return this._HttpClient.post(`${this.baseUrl}${this.authRoute}/login`, formData
      , {
        headers: {
          "X-API-KEY": `${this.apiKey}`,
          "X-CSRF-Token": `${Cookies.get('cookies')}`
        }, withCredentials: true
      })
  }

    resetPassword(formData: ResetPassword): Observable<any> {
    return this._HttpClient.put(`${this.baseUrl}${this.authRoute}/resetCode`, formData
      , {
        headers: {
          "X-API-KEY": `${this.apiKey}`,
          "X-CSRF-Token": `${Cookies.get('cookies')}`,
          authorization: `Bearer ${localStorage.getItem('verify')}`
        }, withCredentials: true
      })
  }
}