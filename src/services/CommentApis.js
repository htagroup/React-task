import axiosConfig from "../axiosConfig";

export const CreateComments = async (data) => {
    try {
        const response = await axiosConfig.post("/api/comments", data);
        return response.data;
    } catch (error) {
        throw error
    }
};