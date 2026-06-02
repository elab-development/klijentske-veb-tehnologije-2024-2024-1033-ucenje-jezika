import { checkIfUserExistsByUsername, User } from '../models/User';

export const useLoggedInUser = () => {
  const username = localStorage.getItem('user');
  let user: User | undefined = undefined;
  if (username) {
    user = checkIfUserExistsByUsername(username);
  }
  return { loggedInUser: user };
};
