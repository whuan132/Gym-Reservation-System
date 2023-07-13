import { Router } from "express";
import { checkToken } from "../middlewares/auth.middleware";
import {
  addClass,
  deleteClassById,
  getClassById,
  getClasses,
  updateClassById,
} from "../controllers/gym-class.controller";
import { checkAdmin } from "../middlewares/admin.middleware";

const router = Router();

router.use(checkToken);
router.route("/").get(getClasses).post(checkAdmin, addClass);
router
  .route("/:class_id")
  .get(getClassById)
  .patch(checkAdmin, updateClassById)
  .delete(checkAdmin, deleteClassById);

export default router;
