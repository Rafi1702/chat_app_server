interface User {
    id: number,
    username: string,
    password: string,
    name?: string | null,
    imageUrl?: string | null,
}

interface UserRepository {
    findUsers: () => Promise<User[]>,
    findUserById: (id: number) => Promise<User | null | undefined>,
    findUserByUserName: (username: string) => Promise<User | null | undefined>,
    createUser: (user: User) => Promise<number>,
    updateUser: (user: User) => Promise<User | undefined>,
}



export {
    UserRepository,
    User
}