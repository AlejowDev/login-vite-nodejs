//frontend/src/services/userService.js

import API from "./api";

export const registerUser = async (userData) => {
    const response = await API.post("/api/users/register", userData);
    return response.data;
};
