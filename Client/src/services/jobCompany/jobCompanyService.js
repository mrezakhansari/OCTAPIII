import http from "../httpService";
import { apiUrl } from "../../config.json";

const apiEndpoint = apiUrl + "/jobCompany";

export const getActivePaths = () => {
    let data=5;
    return http.post(apiEndpoint + "/getactivepaths");
};
