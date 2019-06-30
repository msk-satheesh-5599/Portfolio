import { Component, OnInit, HostListener } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { MailerService } from '../mailer.service';
import * as AOS from 'aos';
import Typed from 'typed.js';



@Component({
  selector: 'msk-main',
  templateUrl: './main.component.html',
  styleUrls: [ './main.component.scss' ]
})
export class MainComponent implements OnInit {
  constructor(private fb: FormBuilder,private mailer: MailerService) {
    this.contactForm = this.fb.group({
      contactFormName : ['',Validators.required],
      contactFormSubjects : ['', Validators.required],
      contactFormMessage : ['', Validators.required]
    });
  }

  contactForm: FormGroup;
  disabledSubmitButton: boolean = true;
  @HostListener('input') oninput() {
    if (this.contactForm.valid) {
      this.disabledSubmitButton = false;
    }
  }

  ngOnInit() {
    AOS.init();
    const conster = new Typed('.typer', {
      strings: ['Developer', 'Designer'],
      loop: true,
      typeSpeed: 40,
      backSpeed: 40
    });
    conster.start();

  }

  onSubmit() {
    this.mailer.sendMessage(this.contactForm.value).subscribe(() => {
      this.contactForm.reset();
      this.disabledSubmitButton = true;
    }, error => {
      console.log('Error', error);
    });
  }
}
