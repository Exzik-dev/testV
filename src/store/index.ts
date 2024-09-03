import {createStore} from "vuex";
import type {CurrencyState} from "@/store/module/currency/currency";
import {CurrencyStore} from "@/store/module/currency/currency";


export interface RootState {
    currency: CurrencyState;
}

const store = createStore<RootState>({
    modules: {
        currency:CurrencyStore
    }
})
export default store