import { Router } from "express";
import { checkToken } from "../middlewares/auth.middleware";
import { getReservations } from "../controllers/customer.controller";

const router = Router();

router.use(checkToken);
router.route("/reservations").get(getReservations);

export default router;
