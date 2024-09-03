import {$api} from "@/http/api";


export const getAllCurrencies = async () => {
    const res = await $api.get('/api/currency')
    return Object.entries(res.data).map(([key, value]) => ({name: key, value}));
}
