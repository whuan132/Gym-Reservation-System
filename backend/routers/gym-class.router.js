"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const gym_class_controller_1 = require("../controllers/gym-class.controller");
const admin_middleware_1 = require("../middlewares/admin.middleware");
const router = (0, express_1.Router)();
router.use(auth_middleware_1.checkToken);
router.route("/").get(gym_class_controller_1.getClasses).post(admin_middleware_1.checkAdmin, gym_class_controller_1.addClass);
router
    .route("/:class_id")
    .get(gym_class_controller_1.getClassById)
    .patch(admin_middleware_1.checkAdmin, gym_class_controller_1.updateClassById)
    .delete(admin_middleware_1.checkAdmin, gym_class_controller_1.deleteClassById);
router
    .route("/:class_id/trainers")
    .get(gym_class_controller_1.getTrainersByClassId)
    .post(admin_middleware_1.checkAdmin, gym_class_controller_1.addTrainerByClassId);
router
    .route("/:class_id/trainers/:trainer_id")
    .delete(admin_middleware_1.checkAdmin, gym_class_controller_1.deleteTrainerByClassIdById);
router
    .route("/:class_id/reviews")
    .get(gym_class_controller_1.getReviewsByClassId)
    .post(gym_class_controller_1.addReviewByClassId);
router
    .route("/:class_id/reviews/:review_id")
    .patch(gym_class_controller_1.updateReviewByClassIdById)
    .delete(gym_class_controller_1.deleteReviewByClassIdById);
router
    .route("/:class_id/reservations")
    .get(gym_class_controller_1.getReservationsByClassId)
    .post(gym_class_controller_1.addReservationByClassId);
router
    .route("/:class_id/reservations/:reservation_id")
    .delete(gym_class_controller_1.deleteReservationByClassIdById);
exports.default = router;
