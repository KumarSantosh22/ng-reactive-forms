import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ContactsService } from '../contacts/contacts.service';
import { phoneTypeValues, addressTypeValues, Contact } from '../contacts/contact.model';
import { restrictedWords } from '../validators/restricted-words.validator';
import { distinctUntilChanged } from 'rxjs';

@Component({
  templateUrl: './edit-contact.component.html',
  styleUrls: ['./edit-contact.component.css']
})
export class EditContactComponent implements OnInit {
  phoneTypes = phoneTypeValues;
  addressTypes = addressTypeValues;

  contactForm = this.formBuilder.nonNullable.group({
    icon: '',
    id: '',
    firstName: ['', [Validators.required, Validators.minLength(3)]],
    lastName: ['', Validators.required],
    personal: <boolean>false,
    dateOfBirth: <Date | null>null,
    favoritesRanking: <number | null>null,
    phones: this.formBuilder.array([this.createPhoneGroup()]),
    address: this.formBuilder.nonNullable.group({
      streetAddress: '',
      city: '',
      state: '',
      postalCode: '',
      addressType: ''
    }),
    notes: ['', restrictedWords(['foo', 'bars'])]
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

    this.contactService.getContact(contactId).subscribe((contact) => {
      if (!contact) return;

      for (let index = 1; index < contact.phones.length; index++) {
        this.contactForm.controls.phones.push(this.createPhoneGroup())
      }
      // this.contactForm.patchValue(contact);
    });
  }

  createPhoneGroup() {
    const phoneGroup = this.formBuilder.nonNullable.group({
      phoneNumber: ['', Validators.required],
      phoneType: '',
    })

    phoneGroup.controls.phoneType.valueChanges.
      pipe(distinctUntilChanged((a, b) => JSON.stringify(a) === JSON.stringify(b)))
      .subscribe(val => {
        // subscription to value change
        if (val)
          phoneGroup.controls.phoneNumber.addValidators([Validators.required]);
        else
          phoneGroup.controls.phoneNumber.removeValidators([Validators.required]);
        phoneGroup.controls.phoneNumber.updateValueAndValidity();
      })

    return phoneGroup;
  }

  saveContact() {
    console.log(this.contactForm.value);
    this.contactService.saveContact(<Partial<Contact>>this.contactForm.value).subscribe({
      next: () => this.router.navigate(['/contacts'])
    })
  }

  addNewPhone() {
    this.contactForm.controls.phones.push(this.createPhoneGroup())
  }

  // getters
  get firstName() {
    return this.contactForm.controls.firstName;
  }

  get notes() {
    return this.contactForm.controls.notes;
  }
}
