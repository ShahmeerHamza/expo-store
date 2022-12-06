import axios from "axios";
import UserContext from "../context/users/userContext";
import { useContext } from "react";


const baseurl = 'http://ibsons.sty-server.com/api/v1/'

// api's -------------------------
export const SigninApi = `${baseurl}login/user`
export const OrdersApi = `${baseurl}storekeeper/get/requests`
export const acceptOrderRequest = `${baseurl}storekeeper/accept/`
export const StoreKeeperStockApi = `${baseurl}storekeeper/view/stock`;
export const createCustomerApi = `${baseurl}add/customer`;
export const assignedCutomerApi = `${baseurl}my-assigned-customer`;
export const productDetailAdminApi = `${baseurl}all/products`;
export const salesManRequestOrderApi = `${baseurl}request/order`;
export const viewSalesManStock = `${baseurl}view/salesman/stock`;
export const salesManPlaceOrderApi = `${baseurl}place/order`;
export const myOrders = `${baseurl}my-orders`;
export const specificOrder = `${baseurl}orders/`;
export const orderMarkDeliver = `${baseurl}product_order/`
export const ViewAllCustomerApi = `${baseurl}view/all/customer`
export const myHistory = `${baseurl}my-history`;
export const myRequestStockHistory = `${baseurl}my-requests`


// Headers for apis
const headers = {
    headers: {
        'Accept': 'application/json',
        validateStatus: (status) => true,
    },
};

// return error function  ------------
function _error(error) {
    return {
        data: error?.response?.data,
        status: error?.response?.status
    }
}

// return response function  ------------
function _response(response) {
    return {
        data: response.data.data,
        status: response.status
    }
}
// auth api's--------------------------------------------------------
const login = async (data) => {
    try {
        let response = await axios.post(SigninApi, data, headers);
        // return response;
        return _response(response);

    } catch (error) {
        // 
        return _error(error);

    }
}

const logout = async () => {
    const user = useContext(UserContext);

    user.setUserState({
        id: null,
        role_id: null,
        name: null,
        role: null,
        email: null,
        phone: null,
        avatar: null,
        email_verified_at: null,
        settings: [],
        created_at: null,
        updated_at: null
    });

    return user;

}

export const api = {
    login,
    logout,
    _response
}