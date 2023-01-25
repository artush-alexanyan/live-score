<template>
    <div class="app-home h-screen">
        <div class="relative bg-[url('../assets/seria-a.jpg')] h-full bg-center bg-no-repeat w-full bg-cover"></div>  
        <div class="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 h-1/2 md:w-1/2 w-full text-white p-8">
            <h1 class="text-center text-3xl">
                Welcome to Seria A
            </h1>
            <p class="text-center py-5 md:text-lg text-xs">Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore accusamus, delectus saepe reiciendis enim,  blanditiis illum beatae!</p>
            <div class="py-10 text-center">
                <router-link class="md:px-10 px-2 md:py-4 py-2 bg-blue-700 hover:bg-blue-900" to="/live">
                    Explore games
                </router-link>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'AppHome'
}
</script>