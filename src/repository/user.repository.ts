import { DbClient } from "../config/connection";

interface User {
  id: number;
  displayName?: string;
  username: string;
  password: string;
  imageUrl?: string;
}

interface UserRepository {
  findUsers: () => Promise<User[]>;
  findUserById: (id: number) => Promise<User | null>;
  findUserByUserNameAndPassword: (
    username: string,
    password: string
  ) => Promise<User | null>;
  createUser: (user: User) => Promise<number>;
  updateUser: (user: User) => Promise<User | undefined>;
}

const userRepositoryImpl = (pool: DbClient): UserRepository => ({
  findUsers: async (): Promise<User[]> => {
    const [data, _] = await pool.query("SELECT id, displayName FROM users");

    const mappedData: User[] = data.map((user: any) => ({
      id: user.id,
      displayName: user.displayName,
    }));

    return mappedData;
  },
  findUserById: async function (id: number): Promise<User | null> {
    const [data, _] = await pool.query(
      `SELECT id, displayName FROM users WHERE id = ?`,
      [id]
    );

    if (!data || !data.length) return null;

    const mappedData: User = {
      id: data[0].id,
      displayName: data[0].displayName,
      username: "",
      password: "",
    };

    return mappedData;
  },
  findUserByUserNameAndPassword: async function (
    username: string,
    password: string
  ): Promise<User | null> {
    const [data, _] = await pool.query(
      `SELECT id, displayName FROM users WHERE username = ? AND password = ?`,
      [username, password]
    );

    if (!data || !data.length) return null;

    const mappedData: User = {
      id: data[0].id,
      displayName: data[0].displayName,
      username: "",
      password: "",
    };

    return mappedData;
  },
  createUser: function (user: User): Promise<number> {
    throw new Error("Function not implemented.");
  },
  updateUser: function (user: User): Promise<User | undefined> {
    throw new Error("Function not implemented.");
  },
});

export { UserRepository, userRepositoryImpl, User };
