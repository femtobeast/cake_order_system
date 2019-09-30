module.exports = function Cart(sessionCart) {
    this.items = sessionCart.items ||{};//store cake detail
    this.totalQty = sessionCart.totalQty||0;
    this.totalPrice = sessionCart.totalPrice||0;

    this.add = function (item, id) {
        var storedItem = this.items[id];//grouping item detail of same data
        if (!storedItem) {
            storedItem = this.items[id] = { item: item, qty: 0, cake_price: 0 }
        }
        storedItem.qty++;
        storedItem.cake_price = storedItem.item.cake_price * storedItem.qty;
        this.totalQty++;
        this.totalPrice += storedItem.item.cake_price;
    }

    this.generateArray = function(){
        var arr=[];
        for (const id in this.items) {
            arr.push(this.items[id])
        }
        return arr;
    }
}; 