import { Router } from "express";
import { checkToken } from "../middlewares/auth.middleware";
import {
  addClass,
  addReservationByClassId,
  addReviewByClassId,
  addTrainerByClassId,
  deleteClassById,
  deleteReservationByClassIdById,
  deleteReviewByClassIdById,
  deleteTrainerByClassIdById,
  getClassById,
  getClasses,
  getReservationsByClassId,
  getReviewsByClassId,
  getTrainersByClassId,
  updateClassById,
  updateReviewByClassIdById,
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
  .get(getTrainersByClassId)
  .post(checkAdmin, addTrainerByClassId);
router
  .route("/:class_id/trainers/:trainer_id")
  .delete(checkAdmin, deleteTrainerByClassIdById);

router
  .route("/:class_id/reviews")
  .get(getReviewsByClassId)
  .post(addReviewByClassId);
router
  .route("/:class_id/reviews/:review_id")
  .patch(updateReviewByClassIdById)
  .delete(deleteReviewByClassIdById);

router
  .route("/:class_id/reservations")
  .get(getReservationsByClassId)
  .post(addReservationByClassId);
router
  .route("/:class_id/reservations/:reservation_id")
  .delete(deleteReservationByClassIdById);

export default router;
