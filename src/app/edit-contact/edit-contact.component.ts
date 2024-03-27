import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ContactsService } from '../contacts/contacts.service';
import { phoneTypeValues, addressTypeValues, Contact } from '../contacts/contact.model';
import { restrictedWords } from '../validators/restricted-words.validator';

@Component({
  templateUrl: './edit-contact.component.html',
  styleUrls: ['./edit-contact.component.css']
})
export class EditContactComponent implements OnInit {
  phoneTypes = phoneTypeValues;
  addressTypes = addressTypeValues;

  contactForm = this.formBuilder.nonNullable.group({
    id: '',
    firstName: ['', [Validators.required, Validators.minLength(3)]],
    lastName: ['', Validators.required],
    personal: <boolean>false,
    dateOfBirth: <Date | null>null,
    favoritesRanking: <number | null>null,
    phone: this.formBuilder.nonNullable.group({
      phoneNumber: ['', Validators.required],
      phoneType: '',
    }),
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
      this.contactForm.patchValue(contact);
    });
  }

  saveContact() {
    console.log(this.contactForm.value);
    this.contactService.saveContact(<Partial<Contact>>this.contactForm.value).subscribe({
      next: () => this.router.navigate(['/contacts'])
    })
  }

  // getters
  get firstName() {
    return this.contactForm.controls.firstName;
  }

  get notes() {
    return this.contactForm.controls.notes;
  }
}
