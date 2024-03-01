import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '@env/environment';
import { LoginForm } from "./view-models";
import Swal from 'sweetalert2';
import { FormsModule } from "@angular/forms";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {lastValueFrom} from "rxjs";


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  env = environment;
  form: LoginForm | undefined;
  isLogin: boolean | undefined;
  hasLoginData: boolean | undefined;

  constructor(
    private router: Router,
    private http: HttpClient
  ) { }

  async ngOnInit() {
    this.initProcess();

    // 已登入，直接跳轉至首頁
    if (this.isLogin) {
      if (!this.env.production) { console.log('已登入'); }

       await Swal.fire(
        {
          'title': '登入訊息',
          'html': '已有登入訊息，將自動跳轉至首頁',
          'icon': 'warning',
          'showCancelButton': false,
          'showConfirmButton': false,
          'timer': 1500
        }
      );

      this.router.navigate(['/']);
    }
  }

  // 頁面初始化參數
  initProcess() {
    if (!this.env.production) { console.log('頁面初始化參數'); }

    this.form = new LoginForm();

    // Todo 暫時預設為未登入，之後 localStorage 是否有 authInfo 來判斷是否登入
    this.isLogin = false;

    // Todo 預設狀態為不存放，之後 localStorage 是否有 opts.loginOpts 來判斷
    this.hasLoginData = false;
  }

  // 送出登入表單
  async submitLogin() {
    if (!this.env.production) { console.log('登入'); }

    // 前端表單檢查
    const verifyStatus = await this.verifyLogin();
    if (!verifyStatus) { return; }

    let apiResp;
    try {
      apiResp = await lastValueFrom(this.http.post<any>(`${this.env.apiUrl}/auth/token`, this.form, {}));
    } catch (e) {

    }
    console.log(apiResp);


  }

  // 檢查登入表單
  async verifyLogin() {
    if (!this.env.production) { console.log('檢查登入表單'); }

    let verifyStatus = true;
    let errorMsg = `<p>帳號或密碼發生錯誤，請檢查後再試。</p>
    <hr />
    <div>
    <p class="text-start"><span class="fw-bold">帳號規則:</span><br />(1) 長度 4-128、(2) 允許半形英文、數字、底線。</p>
    <p class="text-start"><span class="fw-bold">密碼規則:</span><br />(1) 長度 4-128、(2) 不允許包含空白格。</p>
    </div>`;

    // 檢查帳號條件
    // 1. 長度 4-128
    // 2. 允許半形英文、數字、底線
    // 3. 大寫自動轉小寫

    const usernameReg = /^\w{4,128}$/;
    if (this.form?.username === '') {verifyStatus = false;}
    const username = this.form!.username.toLowerCase();
    if (!usernameReg.test(this.form!.username)) {verifyStatus = false;}

    // 檢查密碼條件
    // 1. 長度 4-128
    // 2. 不允許包含空白格
    const passwordReg = /^\S{4,128}$/;
    if (this.form?.password === '') {verifyStatus = false;}
    if (!passwordReg.test(this.form!.password)) {verifyStatus = false;}

    if (!verifyStatus) {
      await Swal.fire(
        {
          'title': '登入訊息',
          'html': errorMsg,
          'icon': 'error',
          'showCancelButton': false,
          'showConfirmButton': true
        }
      );

      return verifyStatus;
    }

    return verifyStatus;
  }

}
