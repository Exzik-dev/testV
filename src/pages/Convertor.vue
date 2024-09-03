<script setup lang="ts">

import Field from "@/components/Forms/Field/Field.vue";
import DropDown from "@/components/Forms/DropDown/DropDown.vue";
import {onMounted, reactive, watch,} from "vue";
import {useStore} from "vuex";
import type {RootState} from "@/store";
import debounce from 'lodash.debounce'
import services from "@/services";

const store = useStore<RootState>()

const data = reactive({
  selectedCurrency: '',
  formatValue: 0,
  rootValue: 1,
  rootCurrency: {},
  currencyList: [],
  loaded: false,
  activeCurrency: ''
})

const getCurrencyList = async (value) => {
  const data = await services.currencyService.getAllCurrencies()
  return data.filter((key) => key.name.split('-')[1].toLowerCase().includes(value.toLowerCase())).map((key) => ({
    name: key.name.split('-')[0],
    value: key.value,
    doubles: key.name
  }))

}


const changeSelectedCurrency =  async (value: string) => {
  data.selectedCurrency = data.currencyList.find(item => item.name === value)
  data.currencyList = await getCurrencyList(value)
  data.formatValue = data.rootValue * data.selectedCurrency.value
}

const changeRootCurrency = async (value: string) => {
  data.rootCurrency = data.currencyList.find(item => item.name === value)
  data.selectedCurrency =  await data.currencyList.find(item => item.name === value)
  data.formatValue = data.rootValue * data.selectedCurrency.value
  console.log(data.formatValue)

}

const calculate = (e: Event) => {
  data.rootValue = e.target.value
  data.formatValue = data.rootValue * data.selectedCurrency.value
}

const debouceCalculate = debounce((e) => calculate(e), 500)

const init = async () => {
  if (!store.getters['currency/getCurrency']) {
    const data = await services.currencyService.getAllCurrencies()
    await store.dispatch('currency/setAllCurrencies', data)
    let lang = navigator.language || navigator?.userLanguage;
    const langCode = lang.split('-')[1];
    await store.dispatch('currency/setInitialCurrency', langCode)
  }
  data.activeCurrency = store.getters['currency/getCurrency']
  data.currencyList = await getCurrencyList(data.activeCurrency)
  data.rootCurrency.name = data.activeCurrency // да, тут не очень хорошо , надо было изначально в стор записывать паривльно
  data.selectedCurrency = data.currencyList[0]
  data.formatValue = data.rootValue * data.selectedCurrency.value
  data.loaded = true
}

onMounted(async () => await init())


</script>

<template>
  <div class="page">
    <div class="wrap" v-if="data.loaded">
      <div class="fieldWrap">
        <Field input-type="number" :value="data.rootValue" min="0" @input="debouceCalculate"/>
        <DropDown :active-option="data.rootCurrency.name .toUpperCase()"
                  :options="data.currencyList.map(item => item.name)"
                  class-name="line"
                  class="leftMargin" @change="changeRootCurrency"/>
      </div>
      <div class="fieldWrap">
        <Field input-type="number" min="0" :value="data.formatValue"/>
        <DropDown :active-option="data.selectedCurrency.name.toUpperCase()"
                  :options="data.currencyList.map(item => item.name)"
                  class-name="line" class="leftMargin" @change="changeSelectedCurrency"/>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">

.page {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  .wrap {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }
}

.fieldWrap {
  display: flex;
  flex-direction: row;

}

.leftMargin {
  margin-left: -15px;
  border-radius: $border-radius;
}

</style>