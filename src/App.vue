<template>
  <div id="app" class="font-mono">
    <AppNavbar />
    <main>
      <router-view/>
    </main>
    <AppFooter />
  </div>
</template>

<script>
import AppNavbar from './components/app/AppNavbar.vue';
import AppFooter from './components/app/AppFooter.vue';

export default {
  name: 'App',
  components: { AppNavbar, AppFooter }
}
</script>
<style>

</style>
