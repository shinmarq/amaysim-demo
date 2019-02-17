"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const restify = __importStar(require("restify"));
const product_1 = require("./product");
let PORT = 3000;
const server = restify.createServer();
const product = new product_1.Product();
server.get("/", (req, res, next) => __awaiter(this, void 0, void 0, function* () {
    res.send(200, { message: "amaysim-demo" });
    next();
}));
server.post("/api/cart/:promoCode", (req, res, next) => __awaiter(this, void 0, void 0, function* () {
    try {
        product.validateItems(req.body);
        let result = product.processItems(req.body, req.params["promoCode"]);
        res.send(200, {
            message: "success",
            data: {
                itemsAdded: result.itemsAdded,
                total: `$${parseFloat(result.total).toFixed(2)}`,
                cartItems: result.items
            }
        });
        next();
    }
    catch (e) {
        console.log(e.message);
        res.send(500, { error: e.message });
        next();
    }
}));
server.use(restify.plugins.acceptParser(server.acceptable));
server.use(restify.plugins.queryParser());
server.use(restify.plugins.jsonp());
server.use(restify.plugins.bodyParser());
server.use(restify.plugins.fullResponse());
server.listen(PORT, () => {
    console.log(`Server started: ${server.name}`);
    console.log(`Listening on port: ${PORT}`);
});
//# sourceMappingURL=app.js.map