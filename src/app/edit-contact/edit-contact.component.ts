import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ContactsService } from '../contacts/contacts.service';

@Component({
  templateUrl: './edit-contact.component.html',
  styleUrls: ['./edit-contact.component.css']
})
export class EditContactComponent implements OnInit {
  firstName = new FormControl();
  lastName = new FormControl();
  dateOfBirth = new FormControl();
  favoritesRanking = new FormControl();

  constructor(
    private route: ActivatedRoute,
    private contactService: ContactsService
  ) { }

  ngOnInit() {
    const contactId = this.route.snapshot.params['id'];
    if (!contactId) return;

    this.contactService.getContact(contactId).subscribe({
      next: (data) => {
        this.firstName.setValue(data?.firstName);
        this.lastName.setValue(data?.lastName);
        this.dateOfBirth.setValue(data?.dateOfBirth);
        this.favoritesRanking.setValue(data?.favoritesRanking);
      },
      error: (error) => error
    })
  }

  saveContact() {
    console.log(this.firstName.value)
  }
}
