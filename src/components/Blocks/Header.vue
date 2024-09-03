<script setup lang="ts">
import Coins from '@/assets/images/coins.svg?component'
import Curency from "@/components/Widgets/Curency.vue";
</script>

<template>
  <header class="header">
    <div class="wrap">
      <div class="left">
        <div class="logo">
          <RouterLink to="/">
            <Coins/>
          </RouterLink>

          <span>Конвертор</span>
        </div>
      </div>
      <div class="right">
        <nav>
          <RouterLink to="/">Главная</RouterLink>
          <RouterLink to="/convert">Конвертация</RouterLink>
        </nav>
        <Curency/>

      </div>
    </div>
  </header>
</template>

<style scoped lang="scss">
.header {
  display: flex;
  flex-direction: row;
  align-items: center;

  background: $lg-light;

  .wrap {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding: 12px 5px;
    @include container;

    .left, .right {
      display: flex;
      flex-direction: row;
      align-items: center;
      gap: 12px;
    }
  }

  .logo {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 12px;

    span {
      @include typo-1;
      color: $text-color;

    }

    svg {
      width: 50px;
      height: 50px;
      stroke: $primary-color;
    }
  }

  nav {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 20px;

    a {
      @include link;
    }
  }
}
</style>