<template>
    <div class="app-navbar">
        <div class="flex items-center h-20 text-white shadow-xl bg-blue-800">
            <router-link to="/" class="px-3">Home </router-link>
            <router-link to="/live" class="text-center flex items-center justify-center px-3">
                Live 
                <span class="h-2 w-2 bg-red-600 rounded-full ml-1"></span>
            </router-link>
            <router-link to="/injuries" class="text-center flex items-center px-3 justify-center">
                Injuries 
            </router-link>    
            <router-link to="/transfers" class="text-center flex items-center px-3 justify-center">
                Transfers 
            </router-link>                        
        </div>
    </div>
</template>

<script>
export default {
    name: 'AppNavbar'
}
</script>