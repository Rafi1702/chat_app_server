import { Request, Response } from 'express'
import { UserService } from '../service/user.service'
import { User } from '../repository/user.repository'
import { createBaseResponse, createPaginatedResponse } from './base.response'



type PublicUserDto = Omit<User, 'username' | 'password'>

export const userController = (userService: UserService) => ({
    findAllUsers: async (req: Request, res: Response) => {
        try {
            const users: PublicUserDto[] = await userService.getUsers()

            if (!users.length) {
                return res.status(400).send(createBaseResponse<null>(
                    'error',
                    'User Not Found',
                    null
                ))
            }

            return res.status(200).send(createPaginatedResponse<PublicUserDto>(
                'success',
                'Success Fetch All Users',
                users,
                { limit: 0, offset: 0, }))
        } catch (e) {
            return res.status(500).send({ message: e })
        }
    },
    findUserById: async (req: Request, res: Response) => {
        const id: number = parseInt(req.params.id)
        try {
            const user = await userService.getUserById(id)

            if (user == null) return res.status(400).send(createBaseResponse<null>('error', 'User Not Found', null))
            
            const userDto: PublicUserDto = {
                id: user.id,
                displayName: user.displayName,
                imageUrl: user.imageUrl,
            }
            return res.status(200).send(createBaseResponse<PublicUserDto>('success', 'User Founded', userDto))
        } catch (e) { }
    }
})



