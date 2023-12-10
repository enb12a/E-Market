import { PRODUCTSLISTSUCCESS, PRODUCTSLOADING, PRODUCTSTFAILED } from "../actions/types";

const intialState = {
    loading: false,
    products: [
        {
            createdAt: "0000-00-00T00:00:00.000Z",
            name: "No Name",
            image: null,
            price: "0",
            description: "No Description",
            model: "No Model",
            brand: "No Brand",
            id: Number,
        }
    ],
    error: null,

}

export const productsReducer = (state = intialState, action: any) => {
    switch (action.type) {
        case PRODUCTSLOADING:
            return {
                ...state,
                loading: true,
                error: null,
                products: [
                    {
                        createdAt: "0000-00-00T00:00:00.000Z",
                        name: "No Name",
                        image: null,
                        price: "0",
                        description: "No Description",
                        model: "No Model",
                        brand: "No Brand",
                        id: Number,
                    }
                ],

            };
        case PRODUCTSLISTSUCCESS:
            return {
                ...state,
                loading: false,
                error: null,
                products: action.payload
                // createdAt: action.payload.createdAt,
                // name: action.payload.name,
                // image:  action.payload.image,
                // price:action.payload.price,
                // description: action.payload.description,
                // model:  action.payload.model,
                // brand: action.payload.brand,
                // id: action.payload.id,
            };

        case PRODUCTSTFAILED:
            return {
                ...state,
                loading: false,
                error: action.payload,
                products: [
                    {
                        createdAt: "0000-00-00T00:00:00.000Z",
                        name: "No Name",
                        image: null,
                        price: "0",
                        description: "No Description",
                        model: "No Model",
                        brand: "No Brand",
                        id: Number,
                    }
                ],


            }
        default:
            return state;
    }
}