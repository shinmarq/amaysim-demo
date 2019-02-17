import * as restify from "restify";

import { Product } from "./product";
let PORT = 3000;

const server = restify.createServer();
const product = new Product();

server.get("/", async (req, res, next) => {
  res.send(200, { message: "amaysim-demo" });
  next();
});

server.post("/api/cart/:promoCode", async (req, res, next) => {
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
  } catch (e) {
    console.log(e.message);
    res.send(500, { error: e.message });
    next();
  }
});

server.use(restify.plugins.acceptParser(server.acceptable));
server.use(restify.plugins.queryParser());
server.use(restify.plugins.jsonp());
server.use(restify.plugins.bodyParser());
server.use(restify.plugins.fullResponse());

server.listen(PORT, () => {
  console.log(`Server started: ${server.name}`);
  console.log(`Listening on port: ${PORT}`);
});
