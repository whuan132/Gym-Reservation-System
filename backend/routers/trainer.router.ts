import { Router } from "express";
import { checkToken } from "../middlewares/auth.middleware";
import {
  addReviewByTrainerId,
  addTrainer,
  deleteReviewByTrainerIdById,
  deleteTrainerById,
  getReviewsByTrainerId,
  getTrainers,
  updateReviewByTrainerIdById,
  updateTrainerById,
} from "../controllers/trainer.controller";
import { checkAdmin } from "../middlewares/admin.middleware";

const router = Router();

router.use(checkToken);
router.route("/").get(getTrainers).post(checkAdmin, addTrainer);
router
  .route("/:trainer_id")
  .patch(checkAdmin, updateTrainerById)
  .delete(checkAdmin, deleteTrainerById);

router
  .route("/:trainer_id/reviews")
  .get(getReviewsByTrainerId)
  .post(addReviewByTrainerId);
router
  .route("/:trainer_id/reviews/:review_id")
  .patch(updateReviewByTrainerIdById)
  .delete(deleteReviewByTrainerIdById);

export default router;
