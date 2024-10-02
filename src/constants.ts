import { Label } from './types.js';

export const DELETE = 'insert-rkey-of-delete-post-here';
export const LABEL_LIMIT = 1;
export const LABELS: Label[] = [
  {
    rkey: 'insert-rkey-here',
    identifier: 'earth',
    locales: [
      { lang: 'en', name: 'Earth 🌎', description: 'Earth'},
      { lang: 'pt-BR', name: 'Terra 🌎', description: 'Terra'},
    ]
  },
  {
    rkey: 'insert-rkey-here',
    identifier: 'fire',
    locales: [
      { lang: 'en', name: 'Fire 🔥', description: 'Fire'},
      { lang: 'pt-BR', name: 'Fogo 🔥', description: 'Fogo'},
    ]
  },
  {
    rkey: 'insert-rkey-here',
    identifier: 'air',
    locales: [
      { lang: 'en', name: 'Air 💨', description: 'Air'},
      { lang: 'pt-BR', name: 'Ar 💨', description: 'Ar'},
    ]
  },
  {
    rkey: 'insert-rkey-here',
    identifier: 'water',
    locales: [
      { lang: 'en', name: 'Water 💧', description: 'Water'},
      { lang: 'pt-BR', name: 'Água 💧', description: 'Água'},
    ]
  },
  {
    rkey: 'insert-rkey-here',
    identifier: 'love',
    locales: [
      { lang: 'en', name: 'Love 💞', description: 'Love'},
      { lang: 'pt-BR', name: 'Amor 💞', description: 'Amor'},
    ]
  },
];
