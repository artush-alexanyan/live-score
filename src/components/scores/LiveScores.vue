<template>
    <div class="live-scores bg--800">
        <h1 class="text-center flex items-center justify-center text-2xl pt-5">
            Live Scores
            <span class="h-4 w-4 bg-red-600 rounded-full ml-3"></span>
        </h1>
        <div class="mx-auto p-5 md:w-3/4" v-if="!loading">
            <ul class="py-10">
                <li 
                    class="flex items-center justify-between py-6 px-3 bg-white my-[0.125rem] border-b border-b-gray-300" 
                    v-for="(match, index) in liveScores" 
                    :key="index"
                    @click="viewMatch(match, index)"
                >
                    <div class="flex items-center">
                        <div class="minutes ml-5">
                            <span class="text-red-600 font-bold">
                                {{  match.time  }}
                            </span>
                        </div>
                        <div class="teams mx-7">
                            <p class="text-sm"> {{ match.away_name  }} </p>
                            <p class="text-sm"> {{ match.home_name  }} </p>
                        </div>                        
                    </div>
                    <div class="teams-score text-red-600 font-bold flex items-center mx-2">
                        <div>
                            <p class="text-sm"> {{ match.away_score  }} </p>
                            <p class="text-sm"> {{ match.home_score  }} </p>                            
                        </div>
                        <router-link 
                            :to="`/match-deatails/${ match.away_name + '_' + match.home_name }`" 
                            class="md:text-lg text-xs text-white md:p-3 p-2 ml-8 bg-blue-600"
                        >
                            View
                        </router-link>
                    </div>                    
                </li>
            </ul>            
        </div>
        <div class="flex items-center justify-center text-4xl  w-full h-screen" v-else>
            Wait⚽⚽⚽
        </div>
    </div>
</template>

<script>
import BASE_URL from '@/base-url/URL';

export default {
    name: 'LiveScores',
    mixins: [ BASE_URL ],
    data: () => ({
        liveScores: '',
        loading: false
    }),
    methods: {
        getLiveScores () {
            this.loading = true
            BASE_URL.get('livescores/').then(res => {
                console.log(res.data)
                let result = res.data
                this.liveScores = result.scores
                setTimeout(() => {this.loading = false}, 1000)
            })
            .catch(err => console.log(err))
        },
        viewMatch(match, index) {
            console.log(index)
            console.log(match, 'Match')
        }        
    },
    mounted(){
        this.getLiveScores()
    }
}
</script>