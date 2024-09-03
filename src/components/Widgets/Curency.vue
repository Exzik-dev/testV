<script setup lang="ts">
import DropDown from "@/components/Forms/DropDown/DropDown.vue";
import services from "@/services";
import {computed, onBeforeMount, reactive, watch, watchEffect} from "vue";
import {useStore} from "vuex";
import type {RootState} from "@/store";

const store = useStore<RootState>()

const activeCurrency = computed(() => store.getters['currency/getCurrency'])
const listOfCurrencies = computed(() => store.getters['currency/getCurrencyList'])

const getAllCurrencies = async () => {
  const data = await services.currencyService.getAllCurrencies()
  await store.dispatch('currency/setAllCurrencies', data)
  let lang = navigator.language || navigator?.userLanguage;
  const langCode = lang.split('-')[1];
  await store.dispatch('currency/setInitialCurrency',langCode)
}

const updateCurrency = (value: string) => {

  store.dispatch('currency/refreshCurrency', value)
}

onBeforeMount(() => getAllCurrencies())
</script>

<template>
  <DropDown :active-option="activeCurrency" :options="listOfCurrencies.map(item => item.name)"
            @change="updateCurrency"/>
</template>

<style scoped lang="scss">

</style>