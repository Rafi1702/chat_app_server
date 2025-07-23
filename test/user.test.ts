/*
    SERVICE LAYER TEST
*/

import { UserServiceImpl } from "../src/service/user.service"
import { User, UserRepository } from "../src/repository/user.repository"

class UserFakeRepositoryImpl implements UserRepository {
    fakes: User[] = [{
        id: 1,
        username: "Rafi",
        password: "BLABLA"
    }, {
        id: 2,
        username: "Fake",
        password: "BLABLA2"

    }]

    findUsers = async (): Promise<User[]> => {
        return this.fakes
    }

    findUserById = async (id: number): Promise<User | null | undefined> => {
        return this.fakes.find(value => value.id === id)
    }

    findUserByUserName = async (username: string) => {
        return this.fakes.find(value => value.username === username)
    };

    createUser = async (user: User): Promise<number> => {
        return this.fakes.push(user)
    }

    updateUser = async (user: User): Promise<User | undefined> => {
        this.fakes = this.fakes.map(value => {
            if (value.id == user.id) {
                return { id: user.id, username: user.username, password: user.password, name: user.name, imageUrl: user.imageUrl }
            }
            return value
        })
        return this.fakes.find(value => value.id)
    }

}


describe('User Service Test', () => {
    const userService = new UserServiceImpl(new UserFakeRepositoryImpl())

    describe('login', () => {
        it('should return error when user is not found', async () => {
            await expect(userService.login("SIAKKKKKK")).rejects.toThrow(new Error())
        })

        it('should return nothing when user is found', async () => {
            await expect(userService.login("Rafi")).resolves.toBeUndefined()
        })
    })

})


