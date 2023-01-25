<template>
    <div class="ratings hcreen bg--800">
        <h1 class="text-center flex items-center justify-center text- text-2xl pt-5">
            Injuries
        </h1>
        <div class="" v-for="(team, index) in teams" :key="index">
            <div class="w-full text-center text-lg text-white py-4 px-2 md:mx-3 bg-slate-500">{{ team }}</div>
            
            <ul class="grid lg:grid-cols-2 grid-cols-1 gap-8 p-4 text-">           
                <li  
                    class="border border-gray-100 shadow-xs md:p-7 p-3 flex items-center justify-between w-full" 
                    v-for="(player, index) in injuries" 
                    :key="index" 
                    v-show="team === player.team"
                >
                    <div class="md:flex grid justify-items-center items-center">
                        <img 
                            class="h-16 w-16 rounded-full" 
                            src="../assets/person-icon.jpg" 
                            alt="PlayerPlaceholder"
                        >    
                        <div class="p-2 mx-3">
                            <h2 class="text-purple-900 md:text-lg py-1">
                                <strong class="text-black">Player:</strong> 
                                {{ player.name }} 
                            </h2>
                            <h2 class="text-green-600 py-1">
                                <strong class="text-black">Team:</strong> 
                                {{ player.team }} 
                            </h2>
                        </div>                
                    </div>
                    <div class="text-sm">
                        <p class="italic text-xs py-1 text-red-600">
                            <strong class="text-black">Injury:</strong> 
                            {{ player.reason  }}
                        </p>
                        <p class="text-xs py-1 text-green-600 font-serif">
                            <strong class="text-black">Back to board:</strong> 
                            {{ player.back  }}
                        </p>
                    
                        <div class="flex items-center">
                            <p class="text-sm text-blue-600 mr-4">{{ player.severity }}/10</p>
                            <div class="flex md:w-40 w-20 md:h-5 h-3 items-center bg-slate-100 my-5 ">
                            <div 
                                class="range md:h-5 h-3 md:w-4 w-2 p-0 m-0" 
                                :class="player.severity === 10 ? 'bg-green-400' :  player.severity < 5 ? 'bg-red-400' : 'bg-yellow-400'" 
                                v-for="(range, index) in player.severity" 
                                :key="index"
                            >
                            </div>
                            </div>                        
                        </div>
                    </div>
                </li>
            </ul>            
        </div>         
    </div>
</template>

<script>
import BASE_URL from '@/base-url/URL';

export default {
    name: 'AppInjuries',
    mixins: [ BASE_URL ],
    data: () => ({
        injuries: [],
        teams: []
    }),
    computed: {

    },
    methods: {
        getRatings () {
            BASE_URL.get('injuries/').then(({ data }) => {
                let injury = data.players
                let teams = []
                this.injuries = injury
                injury.map(item => {
                    teams.push(item.team)
                })
                this.teams = teams.filter((item, index) => teams.indexOf(item) === index)

            })
            .catch(err => console.log(err))
        }
    },
    mounted () {
        this.getRatings()
    }
}
</script>