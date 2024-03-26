import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ContactsService } from '../contacts/contacts.service';

@Component({
  templateUrl: './edit-contact.component.html',
  styleUrls: ['./edit-contact.component.css']
})
export class EditContactComponent implements OnInit {
  contactForm = new FormGroup({
    id: new FormControl('', { nonNullable: true }),
    firstName: new FormControl(),
    lastName: new FormControl(),
    dateOfBirth: new FormControl(),
    favoritesRanking: new FormControl(),
    phone: new FormGroup({
      phoneNumber: new FormControl(),
      phoneType: new FormControl(),
    }),
    address: new FormGroup({
      streetAddress: new FormControl(),
      city: new FormControl(),
      state: new FormControl(),
      postalCode: new FormControl(),
      addressType: new FormControl()
    })
  });

  constructor(
    private route: ActivatedRoute,
    private contactService: ContactsService,
    private formBuilder: FormBuilder,
    private router: Router
  ) { }

  ngOnInit() {
    const contactId = this.route.snapshot.params['id'];
    if (!contactId) return;

    this.contactService.getContact(contactId).subscribe({
      next: (data) => {
        this.contactForm.controls.id.setValue(contactId);
        this.contactForm.controls.firstName.setValue(data?.firstName);
        this.contactForm.controls.lastName.setValue(data?.lastName);
        this.contactForm.controls.dateOfBirth.setValue(data?.dateOfBirth);
        this.contactForm.controls.favoritesRanking.setValue(data?.favoritesRanking);

        this.contactForm.controls.phone.controls.phoneNumber.setValue(data?.phone.phoneNumber);
        this.contactForm.controls.phone.controls.phoneType.setValue(data?.phone.phoneType);

        this.contactForm.controls.address.controls.streetAddress.setValue(data?.address.streetAddress);
        this.contactForm.controls.address.controls.city.setValue(data?.address.city);
        this.contactForm.controls.address.controls.state.setValue(data?.address.state);
        this.contactForm.controls.address.controls.postalCode.setValue(data?.address.postalCode);
        this.contactForm.controls.address.controls.addressType.setValue(data?.address.addressType);
      },
      error: (error) => error
    })
  }

  saveContact() {
    console.log(this.contactForm.value);
    this.contactService.saveContact(this.contactForm.value).subscribe({
      next: () => this.router.navigate(['contact'])
    })
  }
}
