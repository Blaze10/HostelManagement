import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AlertifyService } from './../../../_services/alertify.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { RoomsService } from 'src/app/_services/rooms.service';

@Component({
  selector: 'app-create-room',
  templateUrl: './create-room.component.html',
  styleUrls: ['./create-room.component.css']
})
export class CreateRoomComponent implements OnInit {
  showLoader = false;
  roomsForm: FormGroup;
  constructor(private router: Router, private roomsService: RoomsService,
              private alertify: AlertifyService) { }

  ngOnInit() {
    this.roomsService.getRoomsList();
    this.initRoomForm();
  }

  initRoomForm() {
    this.roomsForm = new FormGroup({
      roomNo: new FormControl('', Validators.required),
      totalCapacity: new FormControl('', [Validators.required]),
      remainingCapacity: new FormControl('', Validators.required)
    });
  }

  onCancel() {
    this.router.navigate(['/roomsList']);
  }

  onSubmit() {
    this.showLoader = true;
    const formValue = this.roomsForm.value;
    this.roomsService.insertRooms(formValue).then(() => {
      this.showLoader = false;
      this.alertify.success('Room creation successful');
      this.router.navigate(['/roomsList']);
    }).catch((err) => {
      this.showLoader = false;
      console.log(err);
      this.alertify.error('Oops some error occured');
    }).finally(() => {
      this.showLoader = false;
    });
  }

}
