import http from "../httpService";
import { apiUrl } from "../../config.json";

const apiEndpoint = apiUrl + "/jobCompany";

export const getActivePaths = () => {
    return http.post(apiEndpoint + "/getactivepaths");
};
