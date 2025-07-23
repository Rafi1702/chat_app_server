import { UserRepository, User } from "../repository/user.repository"




interface UserService {
    login: (username: string) => Promise<void>,
    register: (user: User) => Promise<void>,
    updateProfile: (user: User) => Promise<User>,
}


export class UserServiceImpl implements UserService {
    private userRepository: UserRepository;
    constructor(userRepository: UserRepository) {
        this.userRepository = userRepository
    }

    login = async (username: string) => {

        const userRecord = await this.userRepository.findUserByUserName(username)

        if (!userRecord) throw Error()

        return
    }
    register = async (user: User) => {
        const userRecord = await this.userRepository.findUserByUserName(user.username)

        if (userRecord) throw new Error()

        this.userRepository.createUser(user)

        return
    }

    updateProfile = async (user: User): Promise<User> => {
        const userRecord = this.userRepository.findUserById(user.id)

        if (!userRecord) throw new Error()

        const updatedProfile = await this.userRepository.updateUser(user)

        if (!updatedProfile) throw new Error()

        return updatedProfile
    }
}

