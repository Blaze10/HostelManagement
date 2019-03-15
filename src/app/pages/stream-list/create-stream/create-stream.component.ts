import { Router } from '@angular/router';
import { AlertifyService } from './../../../_services/alertify.service';
import { StreamsService } from './../../../_services/streams.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';


@Component({
  selector: 'app-create-stream',
  templateUrl: './create-stream.component.html',
  styleUrls: ['./create-stream.component.css']
})
export class CreateStreamComponent implements OnInit {
  streamForm: FormGroup;
  showLoader = false;

  constructor(private streamService: StreamsService, private alertify: AlertifyService,
              private router: Router) { }

  ngOnInit() {
    this.streamService.getStreamList();

    this.streamForm = new FormGroup({
      streamName: new FormControl('', Validators.required)
    });
  }

  onSubmit() {
    this.showLoader = true;
    this.streamService.setStreamList(this.streamForm.value)
    .then(() => {
      this.showLoader = false;
      this.alertify.success('Stream created successfully');
      console.log('Success');
    }).catch(() => {
      this.showLoader = false;
      this.alertify.error('Oops some error Occured');
    }).finally(() => {
      this.showLoader = false;
    });
  }

  onCancel() {
    this.router.navigate(['/streamList']);
  }
}
