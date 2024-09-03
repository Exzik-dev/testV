import * as currencyService from './currencyService'

export type APIServiceType = {
    currencyService: typeof currencyService;
};

export default {
    currencyService
} as APIServiceType
