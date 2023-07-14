import { Router } from "express";
import { checkToken } from "../middlewares/auth.middleware";
import {
  addReview,
  addTrainer,
  deleteReviewById,
  deleteTrainerById,
  getReviews,
  getTrainers,
  updateReviewById,
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

router.route("/:trainer_id/reviews").get(getReviews).post(addReview);
router
  .route("/:trainer_id/reviews/:review_id")
  .patch(updateReviewById)
  .delete(deleteReviewById);

export default router;
