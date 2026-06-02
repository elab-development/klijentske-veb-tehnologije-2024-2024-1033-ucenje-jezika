import { User, Member } from './Member';

const user1: User = {
  id: 1,
  name: 'John Doe',
  email: 'johndoe@gmail.com',
};

const user2: User = {
  id: 1,
  name: 'Jane Doe',
  email: 'janedoe@gmail.com',
};

const user3: User = {
  id: 1,
  name: 'Mike Doe',
  email: 'mikedoe@gmail.com',
};

const user4: User = {
  id: 1,
  name: 'Anna Doe',
  email: 'annadoe@gmail.com',
};

export const membersArray: Member[] = [
  {
    user: user1,
    job: 'Web Developer',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit.Praesent urna diam, maximus ut ullamcorper quis, placerat ideros. Duis semper justo sed condimentum rutrum. Nunc tristiquepurus turpis. Maecenas vulputate.',
    image: 'image1',
  },
  {
    user: user2,
    job: 'Web Developer',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit.Praesent urna diam, maximus ut ullamcorper quis, placerat ideros. Duis semper justo sed condimentum rutrum. Nunc tristiquepurus turpis. Maecenas vulputate.',
    image: 'image2',
  },
  {
    user: user3,
    job: 'Web Developer',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit.Praesent urna diam, maximus ut ullamcorper quis, placerat ideros. Duis semper justo sed condimentum rutrum. Nunc tristiquepurus turpis. Maecenas vulputate.',
    image: 'image3',
  },
  {
    user: user4,
    job: 'Web Developer',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit.Praesent urna diam, maximus ut ullamcorper quis, placerat ideros. Duis semper justo sed condimentum rutrum. Nunc tristiquepurus turpis. Maecenas vulputate.',
    image: 'image1',
  },
];
