import { Router } from "express";
import { claimPoints, createUser, getAllUsersData, getClaimHistory } from "../controllers/user.controller";

const userRouter = Router();

userRouter.post('/claim-points', claimPoints)

userRouter.get('/get-users', getAllUsersData)

userRouter.post('/create-user', createUser)

userRouter.get('/get-claim-history', getClaimHistory)

export default userRouter;