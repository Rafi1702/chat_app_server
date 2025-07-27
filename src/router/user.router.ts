import { Router } from 'express'
import { userController } from '../controller/user.controller'
import { userServiceImpl } from '../service/user.service'
import { userRepositoryImpl } from '../repository/user.repository'
import { dbClient } from '../config/connection'

const router = Router()

const userRepository = userRepositoryImpl(dbClient);
const userService = userServiceImpl(userRepository);
const userHandler = userController(userService);

router.get('/user', userHandler.findAllUsers)
router.get('/user/:id', userHandler.findUserById)


export default router