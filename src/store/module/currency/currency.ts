import type {RootState} from "@/store";
import type {Commit, Module} from "vuex";

export interface CurrencyState {
    activeCurrency: string
    currencies: { name: string, value: Number }[] | [] // на всякий сулчай предпочту сохранить (для остальных  языков etc)
    doublesCurrencies: { name: string, value: Number, doubles: string }[] | []
}

const state: CurrencyState = {
    activeCurrency: '',
    currencies: [],
    doublesCurrencies: []

}
const mutations = {
    setCurrency(state: CurrencyState, payload: string) {
        state.activeCurrency = payload
    },
    setAllCurrencies(state: CurrencyState, payload: { name: string, value: Number }[]) {
        state.currencies = payload
    },
    setInitialCurrency(state: CurrencyState, payload: string) {
        //Да, очень жидкая логика искать по строке , но других  апи в спободном доступе я не нашел , возможно они отдпют сразу к кодом  текущего языка
        const initial = state.currencies.find((item) => item.name[1].toLowerCase().includes(payload.toLowerCase()))
        const filtered = state.currencies.filter((key) => key.name.split('-')[1].toLowerCase().includes(payload.toLowerCase()))
        state.activeCurrency = initial?.name.split('-')[1].toLocaleUpperCase() || 'RUB'
        state.doublesCurrencies = filtered.map((key) => ({
            name: key.name.split('-')[0],
            value: key.value,
            doubles: key.name
        }))
    },
    refreshCurrency(state: CurrencyState, payload: string) {
        if(payload){
            state.activeCurrency = payload
        }

        const filtered = state.currencies.filter((key) => key.name.split('-')[1].toLowerCase().includes(payload.toLowerCase()))
        state.doublesCurrencies = filtered.map((key) => ({
            name: key.name.split('-')[0],
            value: key.value,
            doubles: key.name
        }))
    }
}
const actions = {

    setCurrency({commit}: Commit, payload: string) {
        commit('setCurrency', payload)
    },
    setAllCurrencies({commit}: Commit, payload: string[]) {
        commit('setAllCurrencies', payload)
    },
    setInitialCurrency({commit}: Commit, payload: string) {
        commit('setInitialCurrency', payload)

    },
    refreshCurrency({commit}: Commit, payload: string) {
        commit('refreshCurrency', payload)
    }
}

const getters = {
    getCurrency(state: CurrencyState) {
        return state.activeCurrency
    },
    getCurrencyList(state: CurrencyState) {
        return state.doublesCurrencies
    }
}

export const CurrencyStore: Module<CurrencyState, RootState> = {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}