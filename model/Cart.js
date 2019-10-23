module.exports = function Cart(sessionCart) {
    this.items = sessionCart.items || {};//store cake detail
    this.totalQty = sessionCart.totalQty || 0;
    this.totalPrice = sessionCart.totalPrice || 0;

    //ADD ITEM DETAIL IN TO CART OBJECT 
    this.add = function (item, id) {
        var storedItem = this.items[id];//grouping item detail of same data  /1
        if (!storedItem) {
            // storedItem = this.items[id] = { item: item, giftitem: giftitem, qty: 0, totalPrice: 0 }
            storedItem = this.items[id] = { item: item, qty: 0, totalPrice: 0 }
        }
        storedItem.qty++;
        storedItem.totalPrice = storedItem.item.cake_price * storedItem.qty;
        this.totalQty++;
        // this.totalPrice += storedItem.item.cake_price + storedItem.giftitem.gift_price;
        this.totalPrice += storedItem.item.cake_price;
    }

    //REDUCE ITEM OR CAKE PRODUCT DETAIL BY ONE IN CART
    this.reduceByOne = function (id) {
        this.items[id].qty--;
        this.items[id].price -= this.items[id].item.cake_price
        this.totalQty--;
        this.items[id].totalPrice -= this.items[id].item.cake_price;
        this.totalPrice -= this.items[id].item.cake_price
        if (this.items[id].qty <= 0) {
            delete this.items[id];
        }
    };

    //REMOVE ALL ITEM OR CAKE FROM CART AS MUCH THE QUANTITY GIVEN
    this.removeItem = function (id) {
        this.totalQty -= this.items[id].qty;
        this.totalPrice -= this.items[id].totalPrice
        delete this.items[id];

    };

    //GENERATE ITEM INTO ARRAY FORM
    this.generateArray = function () {
        var arr = [];
        for (const id in this.items) {
            arr.push(this.items[id])
        }
        return arr;
    }
}; 