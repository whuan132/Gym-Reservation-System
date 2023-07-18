"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const user_controller_1 = require("../controllers/user.controller");
const admin_middleware_1 = require("../middlewares/admin.middleware");
const router = (0, express_1.Router)();
router.use(auth_middleware_1.checkToken);
router.route("/").get(user_controller_1.getUsers);
router
    .route("/:user_id")
    .get(user_controller_1.getUserById)
    .patch(admin_middleware_1.checkAdmin, user_controller_1.updateUserById)
    .delete(admin_middleware_1.checkAdmin, user_controller_1.deleteUserById);
exports.default = router;
