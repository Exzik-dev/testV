import axios from "axios";

export const $api = axios.create({
    baseURL: 'https://status.neuralgeneration.com',

})