"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const mongoose_1 = __importDefault(require("mongoose"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT || 5000;
app.use((0, cors_1.default)());
// app.use('/products', productsRoutes);
// app.use('/categories', categoriesRoute);
// app.use('/products', usersRoute);
mongoose_1.default.connect(process.env.MONGODB_URL || '')
    .then(() => app.listen(port, () => console.log(`Server running on port: http://localhost:${port}`)))
    .catch((error) => console.log(`${error} did not connect`));
