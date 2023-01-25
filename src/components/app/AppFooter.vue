<template>
    <div class="app-navbar  w-full h-30 p-5 bg-black shadow-xl">
        <div class="flex items-center justify-center">
            <router-link to="/" class="px-5 text-white">Home </router-link>
            <router-link to="/live" class="px-5 text-white">Live </router-link>
        </div>
        <div class="text-center text-white p-5">
            <small>Copyright 2023</small>
        </div>
    </div>
</template>

<script>
export default {
    name: 'AppFooter'
}
</script>