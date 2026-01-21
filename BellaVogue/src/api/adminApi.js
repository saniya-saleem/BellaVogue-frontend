import API from "./api";


export const adminLogin = (data) =>
  API.post("/api/admin/login/", data);


export const getAdminDashboard = () =>
  API.get("/api/admin/dashboard/");


export const getAllUsers = () =>
  API.get("/api/admin/users/");

export const getUserById = (id) =>
  API.get(`/api/admin/users/${id}/`);

export const toggleUserStatus = (id) =>
  API.patch(`/api/admin/users/${id}/status/`);


export const getAllProducts = (category) =>
  API.get("/api/admin/products/", {
    params: category ? { category } : {},
  });

export const createProduct = (data) =>
  API.post("/api/admin/products/", data);

export const updateProduct = (id, data) =>
  API.put(`/api/admin/products/${id}/`, data);

export const deleteProduct = (id) =>
  API.delete(`/api/admin/products/${id}/`);


export const getAllOrders = () =>
  API.get("/api/admin/orders/");

export const getOrderDetails = (id) =>
  API.get(`/api/admin/orders/${id}/`);

export const updateOrderStatus = (id, status) =>
  API.patch(`/api/admin/orders/${id}/`, { status });

export const getUserOrders = (id) =>
  API.get(`/api/admin/users/${id}/orders/`);

