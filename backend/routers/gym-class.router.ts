import { Router } from "express";
import { checkToken } from "../middlewares/auth.middleware";
import {
  addClass,
  addReview,
  addTrainer,
  deleteClassById,
  deleteReviewById,
  deleteTrainerById,
  getClassById,
  getClasses,
  getReviews,
  getTrainers,
  updateClassById,
  updateReviewById,
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

router
  .route("/:class_id/trainers")
  .get(getTrainers)
  .post(checkAdmin, addTrainer);
router
  .route("/:class_id/trainers/:trainer_id")
  .delete(checkAdmin, deleteTrainerById);

router.route("/:class_id/reviews").get(getReviews).post(addReview);
router
  .route("/:class_id/reviews/:review_id")
  .patch(updateReviewById)
  .delete(deleteReviewById);

export default router;
