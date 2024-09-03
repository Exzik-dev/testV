<script setup lang="ts">


import type {defineComponent} from "vue";

interface Props {
  className?: string,
  icon?: ReturnType<typeof defineComponent>;
}

const props = defineProps<Props>()

</script>

<template>
  <button :class="className">
    <slot>

    </slot>
    <component :is="icon"></component>
  </button>
</template>

<style scoped lang="scss">
button {
  cursor: pointer;
  padding: 12px 10px;
  border: none;
  font-weight: 600;
  font-size: 14px;
  position: relative;
  background: $primary-color;
  display: inline-block;
  border-radius: $border-radius;
  letter-spacing: 0.5px;
  line-height: 14px;

  svg{
    width: 20px;
    height: 20px;
  }

  &.line{
    background: $lg-light;

    svg{
      fill: $text-color;
    }
  }

}

</style>