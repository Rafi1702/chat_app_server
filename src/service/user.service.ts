import { UserRepository, User } from "../repository/user.repository";

export interface UserService {
  login: (username: string, password: string) => Promise<void>;
  register: (username: string, password: string) => Promise<void>;
  updateProfile: (user: User) => Promise<User>;
  getUsers: () => Promise<User[]>;
  getUserById: (id: number) => Promise<User | null>;
}

export const userServiceImpl = (
  userRepository: UserRepository
): UserService => ({
  login: async function (username: string, password: string): Promise<void> {
    const userRecord = await userRepository.findUserByUserNameAndPassword(
      username,
      password
    );

    if (userRecord == null) throw Error();

    return;
  },
  register: async function (username: string, password: string): Promise<void> {
    const userRecord = await userRepository.findUserByUserNameAndPassword(
      username,
      password
    );

    if (userRecord) throw new Error();

    const user: User = {
      id: 0,
      username: username,
      password: password,
    };

    userRepository.createUser(user);

    return;
  },
  updateProfile: async function (user: User): Promise<User> {
    const userRecord = userRepository.findUserById(user.id);

    if (!userRecord) throw new Error();

    const updatedProfile = await userRepository.updateUser(user);

    if (!updatedProfile) throw new Error();

    return updatedProfile;
  },
  getUsers: async function (): Promise<User[]> {
    return await userRepository.findUsers();
  },
  getUserById: async function (id: number): Promise<User | null> {
    return await userRepository.findUserById(id);
  },
});
