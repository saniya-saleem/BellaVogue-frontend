import API from "./api";


export const adminLogin = (data) =>
  API.post("admin/login/", data);


export const getAdminDashboard = () =>
  API.get("admin/dashboard/");


export const getAllUsers = () =>
  API.get("admin/users/");

export const getUserById = (id) =>
  API.get(`admin/users/${id}/`);

export const toggleUserStatus = (id) =>
  API.patch(`admin/users/${id}/status/`);


export const getAllProducts = (category) =>
  API.get("admin/products/", {
    params: category ? { category } : {},
  });

export const createProduct = (data) =>
  API.post("admin/products/", data);

export const updateProduct = (id, data) =>
  API.put(`admin/products/${id}/`, data);

export const deleteProduct = (id) =>
  API.delete(`admin/products/${id}/`);


export const getAllOrders = () =>
  API.get("admin/orders/");

export const getOrderDetails = (id) =>
  API.get(`admin/orders/${id}/`);

export const updateOrderStatus = (id, status) =>
  API.patch(`admin/orders/${id}/`, { status });

export const getUserOrders = (id) =>
  API.get(`admin/users/${id}/orders/`);

