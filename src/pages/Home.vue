<script setup lang="ts">
import type {RootState} from "@/store";
import {useStore} from "vuex";
import {computed} from "vue";

const store = useStore<RootState>()
const activeCurrency = computed(()=> store.getters['currency/getCurrency'])
const currencyList = computed(()=> store.getters['currency/getCurrencyList'])

</script>

<template>
<div class="page">
  <div class="wrap">
    <div class="left">
      <h1>Активная валюта {{activeCurrency.toUpperCase()}}</h1>
    </div>
    <div class="right">
      <p> Её курс по отношению  к другим  валютам </p>
      <ul>
        <li v-for="item in currencyList" v-key="item.name">
          <p>{{item.name.toUpperCase()}}: {{item.value}}</p>
        </li>
      </ul>
    </div>
  </div>

</div>
</template>

<style scoped>

.page{
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  @include container;
}

.wrap{
  display: flex;
  flex-direction: column;
  align-items: flex-start;


  ul{
   list-style: none;
    padding: 0;
  }
}

</style>