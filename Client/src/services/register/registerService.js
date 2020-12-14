import http from "../httpService";
import { apiUrl } from "../../config.json";

const apiEndpoint = apiUrl + "/register";

export const registerNewApplicant = (data,progress) => {
    return http.post(apiEndpoint, data,progress);
};
