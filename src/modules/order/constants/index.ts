export const QUERY_KEY = {
    ORDER: {
        KEY: 'ORDER',
        GET_ORDER_LIST: 'GET_ORDER_LIST',
    },
};

export const orderQuerykeys = {
    all: [QUERY_KEY.ORDER.KEY],
    getList: [QUERY_KEY.ORDER.KEY, QUERY_KEY.ORDER.GET_ORDER_LIST],
};
