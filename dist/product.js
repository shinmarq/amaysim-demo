"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Product {
    constructor() {
        this.promoCode = "I<3AMAYSIM";
        this.products = [
            {
                code: "ult_small",
                name: "Unlimited 1GB",
                price: 24.9,
                promo_price: 49.8
            },
            { code: "ult_medium", name: "Unlimited 2GB", price: 29.9 },
            {
                code: "ult_large",
                name: "Unlimited 5GB",
                price: 44.9,
                promo_price: 39.9
            },
            { code: "1gb", name: "1 GB Data-pack", price: 9.9 }
        ];
        this.prices = [];
        this.myCart = {};
    }
    processItems(data, promoCode = "") {
        if (data.item1.item === this.products[0].name) {
            data.item1.qty === 3
                ? this.prices.push(this.products[0].promo_price)
                : this.prices.push(this.products[0].price * data.item1.qty);
        }
        else {
            if (data.item1.item === this.products[2].name) {
                data.item1.qty > 3
                    ? this.prices.push(this.products[2].promo_price * data.item1.qty)
                    : this.prices.push(this.products[2].price * data.item1.qty);
            }
            else {
                this.products.forEach((item) => {
                    if (data.item1.item === item.name) {
                        this.prices.push(item.price * data.item1.qty);
                    }
                });
            }
        }
        if (data.item2.item === this.products[0].name) {
            data.item2.qty === 3
                ? this.prices.push(this.products[0].promo_price)
                : this.prices.push(this.products[0].price * data.item2.qty);
        }
        else {
            if (data.item2.item === this.products[2].name) {
                data.item2.qty >= 3
                    ? this.prices.push(this.products[2].promo_price * data.item2.qty)
                    : this.prices.push(this.products[2].price * data.item2.qty);
            }
            else {
                this.products.forEach((item) => {
                    if (data.item2.item === item.name) {
                        this.prices.push(item.price * data.item2.qty);
                    }
                });
            }
        }
        return this.result(data, promoCode);
    }
    result(data, promoCode) {
        this.myCart.itemsAdded = `${data.item1.qty} x ${data.item1.item} ${data.item2.qty} x ${data.item2.item}`;
        this.myCart.items = `${data.item1.qty} x ${data.item1.item} & ${data.item2.qty} x ${data.item2.item} ${data.item1.item === this.products[1].name
            ? "& " + data.item1.qty + " x " + this.products[3].name
            : ""} ${data.item2.item === this.products[1].name
            ? "& " + data.item2.qty + " x " + this.products[3].name
            : ""}`;
        let total = this.prices[0] + this.prices[1];
        this.myCart.total =
            promoCode === this.promoCode ? total - 0.1 * total : total;
        this.prices = [];
        return this.myCart;
    }
    validateItems(body) {
        let found1 = this.products.some((items) => {
            return body.item1["item"] === items.name;
        });
        let found2 = this.products.some((items) => {
            return body.item2["item"] === items.name;
        });
        if (!body["item1"])
            throw new Error("Missing parameter, item1 is required");
        if (!body["item2"])
            throw new Error("Missing parameter, item2 is required");
        if (!body.item1["item"])
            throw new Error("Missing parameter, item in item1 is required");
        if (!body.item2["item"])
            throw new Error("Missing parameter, item in item2 is required");
        if (!body.item1["qty"])
            throw new Error("Missing parameter, qty in item1 is required");
        if (!body.item2["qty"])
            throw new Error("Missing parameter, qty in item2 is required");
        if (!found1)
            throw new Error("item1 does not exist, Please try again");
        if (!found2)
            throw new Error("item2 does not exist, Please try again");
    }
}
exports.Product = Product;
//# sourceMappingURL=product.js.map