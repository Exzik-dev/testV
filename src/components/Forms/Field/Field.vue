<script setup lang="ts">

import {computed, ref, watch} from "vue";

interface Props {
  value: string | number,
  inputType: 'text' | 'number',
  className?: string
  min?:number
}

const props = defineProps<Props>()
const error = ref<Boolean>(false)
const errorMessage = ref<string>('')
const inputType = computed(() => props.inputType || 'number')
const inputValue = ref(props.value)
const emit = defineEmits(['input','update:value'])

watch(() => props.value, (newValue) => {
  inputValue.value = newValue;
});

const numberValidate = (e: Event) => {
  const input = e.target as HTMLInputElement;
  if (/^\d*$/.test(input.value)) {
    inputValue.value = input.value;
    error.value = false
    errorMessage.value = '';
  } else {
    error.value = true
    errorMessage.value = 'Пожалуйста, введите только числа.';
  }
}
const textValidate = (e: Event) => {
  const input = e.target as HTMLInputElement;
  if (/^[a-zA-Z]*$/.test(input.value)) {
    inputValue.value = input.value;
    errorMessage.value = '';
  } else {
    errorMessage.value = 'Пожалуйста, введите только буквы.';
  }
}

const onInput = (e: Event) => {
  emit('input', e)
  const input = e.target as HTMLInputElement;
  inputValue.value = (e.target as HTMLInputElement).value
  emit('update:value', input.value);
}

const validate = {
  'number': numberValidate,
  'text': textValidate
}



</script>

<template>
  <input @keyup="(e) => validate[inputType](e)" :type="inputType" v-model="inputValue"  :min="min" @input="onInput">
  <p v-if="error">{{errorMessage}}</p>
</template>

<style scoped lang="scss">
input{
  background: $lg-light;
  padding: 10px;
  border-radius: $border-radius;
  @include font-1;
  outline: none;
  border: none;
  color:$text-color;




  &[type="number"]{
    -moz-appearance: textfield;
    -webkit-appearance: none;

    &::-webkit-outer-spin-button,
    &::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }
  }
}

</style>