import * as httpRequest from "../utils/httpRequest";

export const getAllUser = async () => {
    try {
        const res = await httpRequest.get("/");

        return res;
    } catch (error) {
        console.log(error);
    }
};

export const getUser = async (searchValue) => {
    try {
        const res = await httpRequest.get("/search/", {
            params: {
                searchValue,
            },
        });

        return res;
    } catch (error) {
        console.log(error);
    }
};

export const updateUser = async (data) => {
    try {
        const res = await httpRequest.post("/update/", {
            data,
        });

        return res;
    } catch (error) {
        console.log(error.response);
    }
};
