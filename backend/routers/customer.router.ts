import { Router } from "express";
import { checkToken } from "../middlewares/auth.middleware";
import {
  addReservation,
  deleteReservationByGymClassId,
  getReservations,
} from "../controllers/customer.controller";

const router = Router();

router.use(checkToken);
router.route("/reservations").get(getReservations);
router.route("/reservations/:gymclass_id").post(addReservation);
router
  .route("/reservations/:gymClass_id")
  .delete(deleteReservationByGymClassId);

export default router;
