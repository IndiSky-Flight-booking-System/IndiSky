import { myAxios } from "./config";


export const signUp = async (userData) => {
  try {
    const response = await myAxios.post("/user/register", userData);
    return { success: true, data: response.data };
  } catch (error) {
    const message =
      error.response?.data || "Something went wrong while registering!";
    return { success: false, error: message };
  }
};

export const login = async (userData) => {
    try{
        const response = await myAxios.post("/user/login", userData);
        return { success: true, data: response.data };
    }catch (error){
        const message = 
            error.response?.data || "Something went wrong in login !!"
        return { success: false, error: message };
    }
};
