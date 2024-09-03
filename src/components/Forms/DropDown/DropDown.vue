<script setup lang="ts">
import Button from "@/components/Forms/Button/Button.vue";
import Icon from "@/assets/images/down.svg?component";
import {computed, onBeforeUnmount, onMounted, ref} from "vue";

interface Props {
  options: string[]
  activeOption: string
  className?: string
}

const props = defineProps<Props>()
const isOpen = ref<Boolean>(false)
const dropdown = ref<HTMLElement | null>(null);
const menuStyles = ref({});
const activeOption = ref('');
const emit = defineEmits(['change'])


const onClick = (option:string) => {
  activeOption.value = option
  toggleMenu()
  emit('change', option)
}

const updateMenuPosition = () => {
  if (dropdown.value) {
    const rect = dropdown.value.getBoundingClientRect();
    const menuWidth = 200; // Примерная ширина меню
    const spaceRight = window.innerWidth - rect.right;
    const spaceLeft = rect.left;
    menuStyles.value = {
      top: '100%',
      left: spaceLeft < menuWidth ? 'auto' : '0',
      right: spaceRight < menuWidth ? '0' : 'auto'
    };
  }

}

const toggleMenu = () => {
  isOpen.value = !isOpen.value
  if (isOpen.value) {
    updateMenuPosition()
  }
}

</script>

<template>
  <div class="group" ref="dropdown" :class="props.className">
    <div class="label">{{ activeOption.toUpperCase() || props.activeOption.toUpperCase() }}</div>
    <Button :class-name="props.className" :icon="Icon" @click="toggleMenu"/>
    <ul  class="menu" v-if="isOpen" :style="menuStyles">
      <li v-for="option in props.options" :key="option"  @click="onClick(option)">{{ option.toUpperCase() }}</li>
    </ul>
  </div>
</template>

<style scoped lang="scss">

.group {
  position: relative;
  display: inline-flex;
  vertical-align: middle;
  flex-direction: row;
  align-items: center;
  background: $primary-color;

  .label {
    @include font-1;
    flex: 1 1 auto;
    margin-left: 10px;
  }

  .menu {
    position: absolute;
    list-style: none;
    background-color: $text-color;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    z-index: 1000;
    display: flex;
    flex-direction: column;
    width: auto;
    min-width: 100%;
    align-items: flex-start;
    padding: 10px;
    margin: 5px 0;
    border-radius: $border-radius;
    gap: 10px;
    max-height: 200px;
    overflow-x: auto;

    li {
      @include font-1;
      color: $lg-light;
      cursor: pointer;
    }
  }

  &.line {
    background: $lg-light;
    .label{
      color: $text-color;
    }
  }
}


</style>