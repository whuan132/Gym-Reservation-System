import { Router } from "express";
import { checkToken } from "../middlewares/auth.middleware";
import {
  deleteUserById,
  getUserById,
  getUsers,
  updateUserById,
} from "../controllers/user.controller";
import { checkAdmin } from "../middlewares/admin.middleware";

const router = Router();

router.use(checkToken);
router.route("/").get(getUsers);
router
  .route("/:user_id")
  .get(getUserById)
  .patch(checkAdmin, updateUserById)
  .delete(checkAdmin, deleteUserById);

export default router;
