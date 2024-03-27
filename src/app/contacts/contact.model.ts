export interface Contact {
  icon: string,
  id: string,
  firstName: string,
  lastName: string,
  personal: boolean,
  dateOfBirth: Date | null,
  favoritesRanking: number | null,
  phone: Partial<Phone>,
  address: Partial<Address>,
  notes: string
}

export interface Phone {
  phoneNumber: string,
  phoneType: string,
}

export interface Address {
  streetAddress: string,
  city: string,
  state: string,
  postalCode: string,
  addressType: string,
}

export const phoneTypeValues = [
  {
    title: 'Mobile', value: 'mobile'
  },
  {
    title: 'Work', value: 'work'
  },
  {
    title: 'Other', value: 'other'
  },
]

export const addressTypeValues = [
  {
    title: 'Home', value: 'home'
  },
  {
    title: 'Work', value: 'work'
  },
  {
    title: 'Other', value: 'other'
  },
]