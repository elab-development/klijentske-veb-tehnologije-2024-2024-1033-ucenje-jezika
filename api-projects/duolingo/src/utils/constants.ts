import { Course } from '../models/Course';
import { Language } from '../models/Language';

export const duolingoReviews = [
  {
    name: 'John Doe',
    review: 5,
    reviewText: 'Duolingo is amazing! I learned so much in such a short time.',
  },
  {
    name: 'Jane Smith',
    review: 4,
    reviewText:
      'Great app for learning languages. Some lessons could be improved.',
  },
  {
    name: 'Emily Johnson',
    review: 3,
    reviewText:
      "It's okay. The repetition helps, but it can get boring after a while.",
  },
  {
    name: 'Michael Brown',
    review: 5,
    reviewText: "I love Duolingo! It's fun and easy to use. Highly recommend.",
  },
  {
    name: 'Sarah Davis',
    review: 2,
    reviewText:
      'I found it difficult to stay motivated. The lessons are too repetitive.',
  },
  {
    name: 'David Wilson',
    review: 4,
    reviewText:
      'Good app for beginners. I wish there were more advanced lessons.',
  },
  {
    name: 'Chris Lee',
    review: 5,
    reviewText:
      'Fantastic app! The gamified learning makes it really engaging.',
  },
  {
    name: 'Amanda Martinez',
    review: 3,
    reviewText: 'Decent app, but there are some bugs that need to be fixed.',
  },
  {
    name: 'Jessica Garcia',
    review: 4,
    reviewText:
      "I've made great progress with Duolingo. The reminders help a lot.",
  },
];

export const languages: Language[] = [
  {
    id: 1,
    name: 'english',
    image:
      'https://www.countryflags.com/wp-content/uploads/united-kingdom-flag-png-large.png',
    translateCode: 'en',
  },
  {
    id: 2,
    name: 'spanish',
    image:
      'https://www.countryflags.com/wp-content/uploads/spain-flag-png-large.png',
    translateCode: 'es',
  },
  {
    id: 3,
    name: 'french',
    image:
      'https://www.countryflags.com/wp-content/uploads/france-flag-png-large.png',
    translateCode: 'fr',
  },
  {
    id: 4,
    name: 'italian',
    image:
      'https://www.countryflags.com/wp-content/uploads/italy-flag-png-large.png',
    translateCode: 'it',
  },
  {
    id: 5,
    name: 'german',
    image:
      'https://www.countryflags.com/wp-content/uploads/germany-flag-png-large.png',
    translateCode: 'de',
  },
  {
    id: 6,
    name: 'danish',
    image:
      'https://www.countryflags.com/wp-content/uploads/denmark-flag-png-large.png',
    translateCode: 'da',
  },
  {
    id: 7,
    name: 'turkish',
    image:
      'https://www.countryflags.com/wp-content/uploads/turkey-flag-png-large.png',
    translateCode: 'tr',
  },
  {
    id: 8,
    name: 'polish',
    image:
      'https://www.countryflags.com/wp-content/uploads/poland-flag-png-large.png',
    translateCode: 'pl',
  },
  {
    id: 9,
    name: 'portugese',
    image:
      'https://www.countryflags.com/wp-content/uploads/portugal-flag-400.png',
    translateCode: 'pt',
  },
  {
    id: 10,
    name: 'dutch',
    image:
      'https://www.countryflags.com/wp-content/uploads/netherlands-flag-png-large.png',
    translateCode: 'nl',
  },
];

export const courses: Course[] = [
  {
    id: 1,
    name: 'colors',
    noOfQuestions: 10,
    questions: [
      {
        questionText: 'red',
        questionImage:
          'https://upload.wikimedia.org/wikipedia/commons/thumb/6/62/Solid_red.svg/2048px-Solid_red.svg.png',
      },
      {
        questionText: 'green',
        questionImage:
          'https://2.imimg.com/data2/VW/WH/MY-769630/chlorophlly-green-colour-water-soluble-500x500.jpg',
      },
      {
        questionText: 'blue',
        questionImage:
          'https://paintspot.ca/wp-content/uploads/2022/02/625-royal-blue.jpg',
      },
      {
        questionText: 'black',
        questionImage:
          'https://upload.wikimedia.org/wikipedia/commons/7/71/Black.png',
      },
      {
        questionText: 'white',
        questionImage:
          'https://m.media-amazon.com/images/I/31NEE5DjnqL._AC_UF894,1000_QL80_.jpg',
      },
      {
        questionText: 'pink',
        questionImage:
          'https://www.maycocolors.com/wp-content/uploads/2020/09/ss-141.jpg',
      },
      {
        questionText: 'purple',
        questionImage:
          'https://www.thefortunateone.com/wp-content/uploads/2021/08/purple.png',
      },
      {
        questionText: 'yellow',
        questionImage:
          'https://www.chromacolour.co.uk/pub/media/catalog/product/cache/63037f042c39a4e9f865b2c784706fd6/c/a/cadmium-yellow-light.jpg',
      },
      {
        questionText: 'orange',
        questionImage:
          'https://www.yarwoodleather.com/wp-content/uploads/2016/12/Yarwood-Leather-Style-Bright-Orange-01-scaled.jpg',
      },
      {
        questionText: 'gray',
        questionImage:
          'https://www.elorahomehardware.ca/cdn/shop/products/A2A9AE_800x.png?v=1608051103',
      },
    ],
  },
  {
    id: 2,
    name: 'fruit',
    noOfQuestions: 5,
    questions: [
      {
        questionText: 'apple',
        questionImage:
          'https://icons.iconarchive.com/icons/iconarchive/flat-fruit-soft/512/Apple-Red-Flat-icon.png',
      },
      {
        questionText: 'banana',
        questionImage:
          'https://www.iconarchive.com/download/i142058/iconarchive/fruit-soft-illustration/Banana.1024.png',
      },
      {
        questionText: 'pear',
        questionImage:
          'https://www.iconarchive.com/download/i109820/alex-t/fresh-fruit/pear.1024.png',
      },
      {
        questionText: 'orange',
        questionImage:
          'https://icons.iconarchive.com/icons/iconarchive/flat-fruit-soft/512/Orange-Open-Flat-icon.png',
      },
      {
        questionText: 'watermelon',
        questionImage:
          'https://www.iconarchive.com/download/i142101/iconarchive/fruit-soft-illustration/Watermelon-Piece.1024.png',
      },
    ],
  },
  {
    id: 3,
    name: 'animal',
    noOfQuestions: 5,
    questions: [
      {
        questionText: 'dog',
        questionImage:
          'https://icons.iconarchive.com/icons/iconarchive/cute-animal/512/Cute-Dog-icon.png',
      },
      {
        questionText: 'cat',
        questionImage:
          'https://icons.iconarchive.com/icons/google/noto-emoji-animals-nature/512/22221-cat-icon.png',
      },
      {
        questionText: 'bird',
        questionImage:
          'https://icons.iconarchive.com/icons/femfoyou/angry-birds/512/angry-bird-black-icon.png',
      },
      {
        questionText: 'lion',
        questionImage:
          'https://icons.iconarchive.com/icons/iconarchive/childrens-book-animals/512/Lion-icon.png',
      },
      {
        questionText: 'elephant',
        questionImage:
          'https://icons.iconarchive.com/icons/iconarchive/cute-animal/512/Cute-Elephant-icon.png',
      },
    ],
  },
];
