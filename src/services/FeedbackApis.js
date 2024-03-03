import axiosConfig from "../axiosConfig";

export const CreateFeedback = async (data) => {
    try {
        const response = await axiosConfig.post("/api/create-feedback", data);
        return response.data;
    } catch (error) {
        throw error
    }
};

export const AllFeedback = async () => {
    try {
        const response = await axiosConfig.get("/api/all-feedback");
        return response.data;
    } catch (error) {
        throw error
    }
};