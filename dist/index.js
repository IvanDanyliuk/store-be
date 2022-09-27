"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const mongoose_1 = __importDefault(require("mongoose"));
const products_1 = __importDefault(require("./routes/products"));
const categories_1 = __importDefault(require("./routes/categories"));
const shipping_1 = __importDefault(require("./routes/shipping"));
const users_1 = __importDefault(require("./routes/users"));
const body_parser_1 = __importDefault(require("body-parser"));
const stripe_1 = __importDefault(require("stripe"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT || 5000;
const stripe = new stripe_1.default(process.env.SECRET_KEY, { apiVersion: '2022-08-01', typescript: true });
app.use((0, cors_1.default)());
app.use(body_parser_1.default.json({ limit: '30mb' }));
app.use(body_parser_1.default.urlencoded({ limit: '30mb' }));
app.use('/products', products_1.default);
app.use('/categories', categories_1.default);
app.use('/shipping', shipping_1.default);
app.use('/user', users_1.default);
mongoose_1.default.connect(process.env.CONNECTION_URL)
    .then(() => app.listen(port, () => console.log(`Server running on port: http://localhost:${port}`)))
    .catch((error) => console.log(`${error} did not connect`));
