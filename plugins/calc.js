inject('newCalcSalePrice', (from, to) => {
    if (!(from && to)) return 0;
    let from_currency = context.store.state.stock.all.find(v => {
        return v.currency_id == from.id && v.ref_currency_id == 1
    });
    let to_currency = context.store.state.stock.all.find(v => {
        return v.currency_id == to.id && v.ref_currency_id == 1
    });

    if (from.id == to.id) {
        return 1;
    }
    else if (to.id == 1) {
        if (from_currency) {

            return (1 / from_currency.start_selling_price).toFixed(7);
        }
    } else if (from.id == 1) {
        if (to_currency) {

            return (to_currency.start_selling_price);
        }
    } else {
        let converter = context.store.state.stock.all.find(v => {
            return v.currency_id == from.id && v.ref_currency_id == to.id
        });
        if (converter) {
            return converter.start_selling_price;
        }
        if (to_currency && from_currency) {

            return ((1 / from_currency.start_selling_price) * to_currency.start_selling_price).toFixed(7);
        }
    }


});
inject('newCalcBuyPrice', (from, to) => {
    if (!(from && to)) return 0;
    let from_currency = context.store.state.stock.all.find(v => {
        return v.currency_id == from.id && v.ref_currency_id == 1
    });
    let to_currency = context.store.state.stock.all.find(v => {
        return v.currency_id == to.id && v.ref_currency_id == 1
    });

    if (from.id == to.id) {
        return 1;
    } else if (to.id == 1) {
        if (from_currency) {
            return (1 / from_currency.start_purchasing_price).toFixed(7);
        }
    } else if (from.id == 1) {
        if (to_currency) {

            return (to_currency.start_purchasing_price);
        }
    } else {

        let converter = context.store.state.stock.all.find(v => {
            return v.currency_id == from.id && v.ref_currency_id == to.id
        });

        if (converter) {
            return converter.start_purchasing_price;
        }
        if (to_currency && from_currency) {
            return ((1 / from_currency.start_purchasing_price) * to_currency.start_purchasing_price).toFixed(7);
        }
    }

});