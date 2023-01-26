<template>
    <div class="match-details h-screen">
        <div v-if="!loading">
            <div class="bg-gray-100 flex items-center justify-center">
                <h1 class="text-2xl py-3">Match details </h1>
            </div>

            <div class="flex items-center justify-between p-5 mx-auto md:w-3/4 border-b border--gray-100">
                <h2 class="md:text-3xl">
                    {{ currentMatch.away_name }}
                </h2>
                <div class="score-details grid justify-items-center">
                    <span> {{ currentMatch.rawdate }} </span>
                    <div class="match-score flex items-center md:text-[5rem] font-bold">
                        <span class="my-2">
                            {{ currentMatch.away_score }}
                        </span>
                        <span>-</span>
                        <span class="my-2">
                           {{ currentMatch.home_score }}
                        </span>                    
                    </div>
                    <span class="uppercase"> {{ currentMatch.time }} </span>
                </div>
                <h2 class="md:text-3xl">
                    {{ currentMatch.home_name }}
                </h2>            
            </div>
            <div class="flex items-center justify-between py-5 mx-auto md:w-3/4 border-b border-b-gray-100">
                <ul class="flex items-center md:justify-start justify-center w-full">
                    <li 
                        class="mx-1 rounded border border-gray-300 md:px-3 md:py-2 p-2 cursor-pointer" 
                        :class="currentTab === index ? 'bg-slate-900 text-white' : ''"
                        v-for="(tab, index) in tabs" 
                        :key="index"
                        @click="changeTab(index)"
                    >
                        {{ tab }} 
                    </li>
                </ul>
            </div> 
            <div class="lineups flex justify-between md:w-3/4 mx-auto p-5" v-show="currentTab === 1">
                <ul>
                    <li v-for="(home_player, index) in currentMatch.away_lineups" :key="index">
                        {{ index + 1 }})  {{ home_player }}
                    </li>
                </ul>
                <ul>
                    <li v-for="(away_player, index) in currentMatch.home_lineups" :key="index">
                        {{ index + 1 }})  {{ away_player }}
                    </li>
                </ul>            
            </div>  
            <div class="benchs flex justify-between md:w-3/4 mx-auto p-5" v-show="currentTab === 2">
                <ul>
                    <li v-for="(home_player, index) in currentMatch.away_bench" :key="index">
                        {{ index + 1 }})  {{ home_player }}
                    </li>
                </ul>
                <ul>
                    <li v-for="(away_player, index) in currentMatch.home_bench" :key="index">
                        {{ index + 1 }})  {{ away_player }}
                    </li>
                </ul>            
            </div>  
            <div 
                class="overall md:w-3/4 mx-auto h-[28rem]" 
                :class="getEventsLen ? 'overflow-scroll overflow-x-hidden' : ''" 
                v-show="currentTab === 0"
            >
                <div v-if="getEventsLen">
                    <ul>
                        <li class="p-3 border" v-for="(event, index) in currentMatch.events" :key="index">
                            <span class="text-blue-700 text-lg">
                                {{ event.type === 'ST' ? 'Game Started!' : '' }} 
                            </span>
                            <span class="text-red-700 text-lg">
                                {{ event.type === 'F' ? 'Game Finished' : '' }} 
                            </span>                    

                            {{ event.type === 'G' ? '⚽' : '' }} 
                            {{ event.type === 'PEN' ? '🥅' : '' }} 
                            {{ event.type === 'YC' ? '🟨' : '' }}

                            <small>
                                {{ event.type === 'GG' ? `Goalkeeper: ${event.details}` : '' }}
                            </small>
                            
                            {{ event.player }}
                            <strong>
                                {{ event.minute }}'
                            </strong>
                            <small>
                                {{ event.in }} {{ event.type === 'S' ? '🔄' : '' }} {{ event.out }}
                            </small>
                        </li>
                    </ul>
                </div>
                <div v-else>
                    <p class="text-center text-2xl text-green-500 py-10">
                        No evets to show! <br>
                        The match is not started yet!
                    </p>
                </div>
            </div>        
            <div class="overall md:w-3/4 mx-auto p-8 h-[28rem]" v-show="currentTab === 3">
                <ul>
                    <li 
                        class="flex items-center py-4" 
                        v-for="(bookmaker, index) in getOdds" 
                        :key="index"
                    >
                        <img 
                            class="h-6 rounded" 
                            :src="bookmaker.image" 
                            alt="bookMakerImage"
                        >
                        <h4 class="md:text-xl text-sm mx-4 hidden md:block">
                            {{ bookmaker.id }}
                        </h4>
                        <ul class="flex">
                            <li 
                                class="flex" 
                                :class="odd.name === '2' ? 'order-last': ''" 
                                v-for="(odd, index) in bookmaker.odds" :key="index"
                            >
                                <span class="px-2 py-1 m-1 rounded border border-gray-200">
                                    <small class="text-gray-500 font-bold">
                                    {{ odd.type }}
                                    </small>  
                                    <span class="text-blue-500">
                                    {{ odd.value }}
                                    </span>
                                </span>
                            </li>
                        </ul>
                    </li>
                </ul>
            </div>                       
        </div>
        <div class="flex items-center justify-center text-4xl  w-full h-screen" v-else>
            Wait⚽⚽⚽
        </div>        
    </div>
</template>

<script>
import BASE_URL from '@/base-url/URL'

export default {
    name: 'MatchDetails',
    mixins: [ BASE_URL ],
    data: () => ({
        currentMatch: [],
        tabs: ['Overall','Lineups', 'Benchs', 'Odds'],
        currentTab: 0,
        loading: false
    }),
    computed: {
        getOdds () {
            return this.currentMatch.odds_info.odds[0].bookmakers
        },
        getEventsLen () {
            return this.currentMatch.events.length
        }
    },
    methods: {
        getCurrentMatch () {
            this.loading = true
            BASE_URL.get('livescores/').then(res => {
                let scores = res.data.scores
                scores.map(match => {
                    if(this.$route.params.id === match.away_name + '_' + match.home_name){
                        this.currentMatch = match
                        setTimeout(() => {this.loading = false}, 1000)
                    }
                })
            })
        }, 
        changeTab(index) {
            this.currentTab = index
        }       
    },
    beforeRouteEnter(to, from, next) {
        next(vm => {
            vm.getCurrentMatch()
        })
    }
}

</script>