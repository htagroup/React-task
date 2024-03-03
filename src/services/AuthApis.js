
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import axiosConfig from "../axiosConfig";

export const logout = (formData) => {
    return axiosConfig.post("/logout", formData);
};

export const RegisterUser = async (data) => {
    try {
        const response = await axiosConfig.post("/api/register", data);
        return response.data;
    } catch (error) {
        throw error
    }
};

export const LoginUser = async (data) => {
    try {
        const response = await axiosConfig.post("/api/login", data);
        if (response.data.status) {
            localStorage.setItem("loggedUser", JSON.stringify(response.data.data));
        }
        return response.data;
    } catch (error) {
        throw error
    }
};

export const fetchUserDetail = createAsyncThunk(
    "auth/fetchUserDetail",
    async () => {
        try {
            const token = JSON.parse(localStorage.getItem("loggedUser"));
            const response = await axios.get(process.env.REACT_APP_API_URL + "/get_user_detail", {
                headers: {
                    'Content-Type': 'application/json',
                    "Accept": "application/json",
                    "Access-Control-Allow-Origin": "*",
                    "Authorization": "Bearer " + token,
                },
            });
            return response.data;
        } catch (error) {
            throw error;
        }
    }
);

const user = JSON.parse(localStorage.getItem("loggedUser"));
const loggedUserInfo = {};

const initialState = user
    ? { isLoggedIn: true, loggedUserInfo }
    : { isLoggedIn: false, loggedUserInfo: null };

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchUserDetail.fulfilled, (state, action) => {
                state.isLoggedIn = true;
                state.loggedUserInfo = action.payload.data;
            })
            .addCase(fetchUserDetail.rejected, (state) => {
                state.isLoggedIn = false;
                state.loggedUserInfo = null;
            });
    },
});

export default authSlice.reducer;
