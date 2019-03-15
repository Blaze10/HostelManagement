import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AlertifyService } from './../../_services/alertify.service';
import { UsersService } from './../../_services/users.service';
import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/_models/user.model';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {
  currentUser: User;
  userKey;
  userForm: FormGroup;
  showLoader = false;
  mainLoader = false;
  constructor(private userService: UsersService, private alertify: AlertifyService) { }

  ngOnInit() {
    this.mainLoader = true;
    this.userKey = localStorage.getItem('userId');
    if (this.userKey) {
      this.userService.getUserById(this.userKey).valueChanges().subscribe(
        ((user: User) => {
          this.mainLoader = false;
          this.currentUser = user;
          console.log(this.currentUser);
        }), ((err) => {
          console.log(err);
          this.mainLoader = false;
          this.alertify.error('Oops some error occured');
        })
      );
    }
    this.initUserForm();
  }

  initUserForm() {
    this.userForm = new FormGroup({
      password: new FormControl('', [Validators.required, Validators.minLength(6)])
    });
  }

  onSubmit() {
    this.showLoader = true;
    const password = this.userForm.value.password;
    this.currentUser.password = password;
    this.userService.editUser(this.userKey, this.currentUser).then(() => {
      this.showLoader = false;
      this.alertify.success('Password changed successfully');
    }).catch((err) => {
      console.log(err);
      this.showLoader = false;
      this.alertify.error('Oops some error occured');
    }).finally(() => {
      this.showLoader = false;
    });
   }

}
