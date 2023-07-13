import { Router } from "express";
import { signin, signup, updatePassword } from "../controllers/auth.controller";
import { checkToken } from "../middlewares/auth.middleware";

const router = Router();

router.post("/signin", signin);
router.post("/signup", signup);
router.patch("/password", checkToken, updatePassword);

export default router;
