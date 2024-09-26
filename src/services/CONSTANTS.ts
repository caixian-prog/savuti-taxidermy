// export const BASE_URL = "http://195.179.227.33/savuti-taxidermy";
// export const BASE_URL = "http://localhost/savuti-taxidermy";
export const BASE_URL = process.env.REACT_APP_API_URL;

// user apis
export const urlUserMe = BASE_URL + "/api/user/me";
export const urlUserLogin = BASE_URL + "/api/user/login";
export const urlUserRegister = BASE_URL + "/api/user/register";

export const urlGetUserList = BASE_URL + "/api/user/get";
export const urlGetUserById = BASE_URL + "/api/user/get_by_id";
export const urlChangeUserPassword = BASE_URL + "/api/user/change_password";
export const urlDeleteUser = BASE_URL + "/api/user/delete";

// customer apis
export const urlGetCustomers = BASE_URL + "/api/customer/get";
export const urlGetCustomerById = BASE_URL + "/api/customer/get_by_id";
export const urlCreateCustomer = BASE_URL + "/api/customer/create";
export const urlUpdateCustomer = BASE_URL + "/api/customer/update";
export const urlDeleteCustomer = BASE_URL + "/api/customer/delete";

// outfitter apis
export const urlGetOutfitters = BASE_URL + "/api/outfitter/get";
export const urlGetOutfitterById = BASE_URL + "/api/outfitter/get_by_id";
export const urlCreateOutfitter = BASE_URL + "/api/outfitter/create";
export const urlUpdateOutfitter = BASE_URL + "/api/outfitter/update";
export const urlDeleteOutfitter = BASE_URL + "/api/outfitter/delete";

// freight agent apis
export const urlGetAgents = BASE_URL + "/api/agent/get";
export const urlGetAgentById = BASE_URL + "/api/agent/get_by_id";
export const urlCreateAgent = BASE_URL + "/api/agent/create";
export const urlUpdateAgent = BASE_URL + "/api/agent/update";
export const urlDeleteAgent = BASE_URL + "/api/agent/delete";

// order apis
export const urlGetOrderList = BASE_URL + "/api/order/get";
export const urlGetOrderById = BASE_URL + "/api/order/get_by_id";
export const urlGetItemsOfOrder = BASE_URL + "/api/order/get_items";
export const urlCreateOrder = BASE_URL + "/api/order/create";
export const urlUpdateOrder = BASE_URL + "/api/order/update";
export const urlCreateOrderItem = BASE_URL + "/api/order/create_item";
export const urlUpdateOrderItem = BASE_URL + "/api/order/update_item";
export const urlDeleteOrderItem = BASE_URL + "/api/order/delete_item";

export const urlGetSpecieList = BASE_URL + "/api/order/get_species";
export const urlAddSpecie = BASE_URL + "/api/order/add_specie";

export const urlCreatePdf = BASE_URL + "/api/order/create_pdf";

// search order apis
export const urlSearchOrders = BASE_URL + "/api/order/search";

// report apis
export const urlGetReports = BASE_URL + "/api/report/get";
