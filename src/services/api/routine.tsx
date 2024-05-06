import axios from "axios";

export const uploadImage = async(payload:FormData) => {
    return  axios.post(`/upload/image`, payload).then((response) => response.data)
 } 