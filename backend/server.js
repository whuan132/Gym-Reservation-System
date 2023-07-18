"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const ErrorResponse_1 = __importDefault(require("./types/ErrorResponse"));
const morgan_1 = __importDefault(require("morgan"));
const dotenv_1 = __importDefault(require("dotenv"));
const mongoose_1 = __importDefault(require("mongoose"));
const auth_router_1 = __importDefault(require("./routers/auth.router"));
const gym_class_router_1 = __importDefault(require("./routers/gym-class.router"));
const trainer_router_1 = __importDefault(require("./routers/trainer.router"));
const customer_router_1 = __importDefault(require("./routers/customer.router"));
const user_router_1 = __importDefault(require("./routers/user.router"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT || 3000;
// connect MongoDB
(function () {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            if (process.env.DB_SERVER_URL) {
                yield mongoose_1.default.connect(process.env.DB_SERVER_URL);
                console.log(`DB server connected successfully`);
            }
            else {
                console.log(`DB Server URL not found`);
                process.exit(1);
            }
        }
        catch (error) {
            console.log(error);
            process.exit(0);
        }
    });
})();
app.use((0, cors_1.default)());
app.use((0, morgan_1.default)("dev"));
app.use(express_1.default.json());
// routes
app.use("/auth", auth_router_1.default);
app.use("/classes", gym_class_router_1.default);
app.use("/trainers", trainer_router_1.default);
app.use("/customer", customer_router_1.default);
app.use("/users", user_router_1.default);
// Catch all unhandled requests
app.all("*", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () { return next(new ErrorResponse_1.default(`Route not found`, 404)); }));
// error handler
app.use((error, req, res) => {
    res.status(error.status || 500).json({ success: false, data: error.message });
});
app.listen(port, () => console.log(`Server is listening on ${port}`));
