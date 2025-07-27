/*
    SERVICE LAYER TEST
*/

import { userServiceImpl } from "../src/service/user.service";
import { User, UserRepository } from "../src/repository/user.repository";

class UserFakeRepositoryImpl implements UserRepository {
  fakes: User[] = [
    {
      id: 1,
      username: "Rafi",
      password: "BLABLA",
    },
    {
      id: 2,
      username: "Fake",
      password: "BLABLA2",
    },
  ];

  findUsers = async (): Promise<User[]> => {
    return this.fakes;
  };

  findUserById = async (id: number): Promise<User | null> => {
    const user = this.fakes.find((value) => value.id === id);

    if (!user) return null;

    return user;
  };

  findUserByUserNameAndPassword = async (
    username: string,
    password: string
  ): Promise<User | null> => {
    const user = this.fakes.find(
      (value) => value.username === username && value.password == password
    );

    if (!user) return null;

    return user;
  };

  createUser = async (user: User): Promise<number> => {
    return this.fakes.push(user);
  };

  updateUser = async (user: User): Promise<User | undefined> => {
    this.fakes = this.fakes.map((value) => {
      if (value.id == user.id) {
        return {
          id: user.id,
          username: user.username,
          password: user.password,
          name: user.displayName,
          imageUrl: user.imageUrl,
        };
      }
      return value;
    });
    return this.fakes.find((value) => value.id);
  };
}

describe("User Service Test", () => {
  const userRepository = new UserFakeRepositoryImpl();
  const userService = userServiceImpl(userRepository);

  describe("login", () => {
    it("should return error when user is not found", async () => {
      await expect(userService.login("SIAKKKKKK", "")).rejects.toThrow(
        new Error()
      );
    });

    it("should return nothing when user is found", async () => {
      await expect(
        userService.login("Rafi", "BLABLA")
      ).resolves.toBeUndefined();
    });
  });

  describe("register", () => {
    it("should return error when user is found", async () => {
      const user: User = {
        id: 1,
        username: "Rafi",
        password: "BLABLA",
      };

      await expect(
        userService.register(user.username, user.password)
      ).rejects.toThrow(new Error());
    });

    it("should create user when user is not found and return nothing", async () => {
      const logSpy = jest.spyOn(userRepository, "createUser");

      const user: User = {
        id: 191919,
        username: "EADWADAWDAWD",
        password: "sdsadad",
      };
      const result = await userService.register(user.username, user.password);

      expect(logSpy).toHaveBeenCalled();

      expect(result).toBeUndefined();
    });
  });
});
