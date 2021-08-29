export interface Contact {
  id: number;
  name: string;
  email: string;
  phoneNumber: string;
  favourite: boolean;
}

export const generateId = () => Math.floor(Math.random() * 100);

export const contacts: Contact[] = [
  {
    id: generateId(),
    name: 'Andrei Popescu',
    email: 'andrei.popescu@yahoo.com',
    phoneNumber: '+40712345678',
    favourite: false,
  },
  {
    id: generateId(),
    name: 'Marin Preda',
    email: 'marin.preda@gmail.com',
    phoneNumber: '+40712345678',
    favourite: false,
  },
  {
    id: generateId(),
    name: 'Mihai Treistariu',
    email: 'mihai.treistariu@yahoo.com',
    phoneNumber: '+40712345678',
    favourite: false,
  },
  {
    id: generateId(),
    name: 'Gigi Jifcu',
    email: 'gigi.jifcu@yahoo.com',
    phoneNumber: '+40712345678',
    favourite: false,
  },
];
