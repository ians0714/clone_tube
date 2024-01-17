import express from "express";
import { deleteUser, edit, logout, see } from "../controllers/userController";

const userRouter = express.Router();

userRouter.get(":id", see);
userRouter.get("/edit", edit);
userRouter.get("/delete", deleteUser);
userRouter.get("/logout", logout);

export default userRouter;
