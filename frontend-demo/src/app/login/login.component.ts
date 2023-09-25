import { Component } from '@angular/core';
import { FormControl, FormGroup, NonNullableFormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  constructor(
    private fb: NonNullableFormBuilder,
    public route: Router) {}

  validateForm: FormGroup<{
    userName: FormControl<string>;
    password: FormControl<string>;
    // remember: FormControl<boolean>;
  }> = this.fb.group({
    userName: ['', [
      Validators.required,
      Validators.minLength(5),  // 最小长度
      Validators.maxLength(20), // 最大长度
      Validators.pattern(/^[a-zA-Z0-9].*$/), // 以字母或数字开头
    ]],
    password: ['', [
      Validators.required,
      Validators.minLength(5),  // 最小长度
      Validators.maxLength(20), // 最大长度
      //需包含数字,字母,特殊字符三种中的任意两种
      Validators
      .pattern(/^(?=.*[0-9])(?=.*[a-zA-Z!@#$%^&*()_+])(?=.*[a-zA-Z!@#$%^&*()_+])[0-9a-zA-Z!@#$%^&*()_+]+$/)
    
    ]],
    // remember: [true]
  });

  submitForm(): void {
    if (this.validateForm.valid) {
      console.log('submit', this.validateForm.value);
      //跳转到首页
       //this.route.navigate(['/layout']);
    } else {
      Object.values(this.validateForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }
}
