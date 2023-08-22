import { activeOrder, showModal } from "../actions"

const initialState = {
    orders: [
        {
            "id": 1,
            "year": 2020,
            "№": 20,
            "customer": "ЭПК",
            "products": [
              {
                "id": 1,
                "id_Order": 1,
                "name": "Корпус А100.ШК.06.04.025.УШ",
                "quantity": 1,
                "ingener": "Насейкин П.",
                "supplier": "Иванов А",
                "installationOfCabinets": "собрано",
                "brigade": 4,
                "shipment": "отгружено"
              },
              {
                "id": 2,
                "id_Order": 1,
                "name": "Корпус А100.ШК.10.06.025.УМ",
                "quantity": 1,
                "ingener": "Насейкин П.",
                "supplier": "Иванов А",
                "installationOfCabinets": "собрано",
                "brigade": 4,
                "shipment": "отгружено"
              },
              {
                "id": 3,
                "id_Order": 1,
                "name": "Корпус А100.ШК.08.06.02.УШ",
                "quantity": 4,
                "ingener": "Насейкин П.",
                "supplier": "Иванов А",
                "installationOfCabinets": "собрано",
                "brigade": 4,
                "shipment": "отгружено"
              },
              {
                "id": 4,
                "id_Order": 1,
                "name": "Корпус БЭЗ А102.ШК.02.025.01",
                "quantity": 28,
                "ingener": "Насейкин П.",
                "supplier": "Иванов А",
                "installationOfCabinets": "собрано",
                "brigade": 4,
                "shipment": "отгружено"
              }
            ],
            "launchDate": "2023-07-05",
            "dateOfShipment": "2023-07-05",
            "responsibleManager": "Иванов А.Н."
          },
          {
            "id": "8ef12c4b-2cdb-47ff-929b-90a8a8d19bfc",
            "year": "2023",
            "№": 21,
            "customer": "gbretbh",
            "products": [],
            "launchDate": "75373",
            "dateOfShipment": "tykyu",
            "responsibleManager": "yklyky"
          },
          {
            "id": "324ea538-8cfd-4485-8a25-0e6026800541",
            "year": "fdgnbfg",
            "№": 22,
            "customer": "fnhfn",
            "products": [],
            "launchDate": "nnfrn",
            "dateOfShipment": "nttntn",
            "responsibleManager": "tyntyn"
          },
          {
            "id": "efd886bf-5ea4-44bf-a3bf-afb6732406f9",
            "year": "rthrthrth",
            "№": 23,
            "customer": "rhthrthrh",
            "products": [],
            "launchDate": "rthrthrthhrt",
            "dateOfShipment": "hrthrt",
            "responsibleManager": "rthrthrh"
          },
          {
            "id": "5c235dd3-82ae-425b-aa8b-9adc50b8c338",
            "year": "2023",
            "№": 24,
            "customer": "gegege",
            "products": [],
            "launchDate": "2023-08-07",
            "dateOfShipment": "2023-08-13",
            "responsibleManager": "gergergegee"
          }
    ],
    ordersLoadingStatus: 'idle',
    filters: [2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023],
    filtersLoadingStatus: 'idle',
    filteredOrders: [],
    activeFilterName: 'all',
    showModal: false,
    activeOrder: {
        'id': 0,
        '№': 0
        },
    activeProduct : {
    }
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'ORDERS_FETCHING':
            return {
                ...state,
                ordersLoadingStatus: 'loading'
            }
        case 'ORDERS_FETCHED':
            return {
                ...state,
                orders: action.payload
                // ,
                // filteredOrders: state.activeFilterName === 'all' ? 
                //                 action.payload :
                //                 action.payload.filter(item => item.year === state.activeFilterName),
                // ordersLoadingStatus: 'idle'
            }
        case 'ORDERS_FETCHING_ERROR':
            return {
                ...state,
                ordersLoadingStatus: 'error'
            }
        case 'SHOW_MODAL':
            return {
                ...state,
                showModal: !state.showModal
            }
        case 'ACTIVE_ORDER':
            return {
                ...state,
                activeOrder: action.payload
            }
        case 'ACTIVE_PRODUCT':
            return {
                ...state,
                activeProduct: action.payload
            }
        case 'ORDER_FORM_ADD':
            const newOrderListAdd = [...state.orders, action.payload]
            return {
                ...state,
                orders: newOrderListAdd,
                filteredHeroes: state.activeFilterName === 'all' ? 
                    newOrderListAdd :
                    newOrderListAdd.filter(item => item.year === state.activeFilterName)
            }
        case 'PRODUCT_FORM_ADD':
            const newProductAdd = state.orders.map(item => {
                if ( action.payload['id_Order'] === item['id']) {
                    item['products'].push(action.payload);
                    return item;
                } else {
                    return item;
                } 
            })
            return {
                ...state,
                orders: newProductAdd
                // ,
                // filteredHeroes: state.activeFilterName === 'all' ? 
                //     newOrderListAdd :
                //     newOrderListAdd.filter(item => item.year === state.activeFilterName)
            }
        case 'PRODUCT_FORM_UPDATE':
            const updateProduct = state.orders.map((item, i) => {
                if ( action.payload['id_Order'] === item['id']) {
                    const updateProducts = item['products'].map((el, n) => {
                        if (el['id'] === action.payload['id']) {
                            return el = action.payload;
                        } else {
                            return el;
                        }
                    })
                    item['products'] = updateProducts;
                    return item;
                } else {
                    return item;
                } 
            })
            console.log(updateProduct);
            return {
                ...state,
                orders: updateProduct
            }
        // case 'FILTERS_FETCHING':
        //     return {
        //         ...state,
        //         filtersLoadingStatus: 'loading'
        //     }
        // case 'FILTERS_FETCHED':
        //     return {
        //         ...state,
        //         filters: action.payload,
        //         filtersLoadingStatus: 'idle'
        //     }
        // case 'FILTERS_FETCHED_ERROR':
        //     return {
        //         ...state,
        //         filtersLoadingStatus: 'error'
        //     }
        // case 'ACTIVE_FILTER_CHANGED':
        //     return {
        //         ...state,
        //         activeFilterName: action.payload,
        //         filteredOrders: action.payload === 'all' ? 
        //                         state.orders :
        //                         state.orders.filter(item => item.year === action.payload)
        //     }
        // case 'ORDER_DELETED':
        //     const newOrderListDel = state.orders.filter(item => item.id !== action.payload);
        //     console.log(newOrderListDel);
        //     return {
        //         ...state,
        //         orders: newOrderListAdd,
        //         filteredOrders: state.activeFilterName === 'all' ? 
        //             newOrderListDel :
        //             newOrderListDel.filter(item => item.year === state.activeFilterName)
        //     }
        default: return state
    }
}

export default reducer;