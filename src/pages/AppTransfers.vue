<template>
    <div class="transfers">
        <h1 class="text-2xl py-5 text-center">Transfers</h1>
        <div class="py-5 my-10" v-if="!loading">
            <ul class="grid xl:grid-cols-3 lg:grid-cols-2 grid-cols-1 gap-4">
                <li 
                    class="border border-gray-100"
                    v-for="(transfer, index) in transfers"
                    :key="index"
                >
                    <div class="p-5">
                        <div>
                            <h2 class="text-xl text-blue-700 text-center bg-slate-100 my-3">
                                {{ transfer.name }}
                            </h2>
                            <p class="italic text-gray-500 text-center" v-show="transfer.transfer_type != '-'">
                               Transfer type: {{ transfer.transfer_type }}
                            </p>                            
                        </div>
                        <h2 class="text-green-700 text-center">
                          Transfer date:  {{ transfer.transfer_date }}
                        </h2>                        
                        <div class="flex items-center justify-between w-full px-10 my- bg-slate-50 py-5">
                            <p class="md:text-2xl font-bold text-slate-600"> {{ transfer.old_team }} </p>
                            <div>
                                <font-awesome-icon icon="fa-solid fa-chevron-right" class="text-green-500 font-bold" v-for="(icon, index) in 3" :key="index" />
                            </div>
                            <p class="md:text-2xl font-bold text-slate-600"> {{ transfer.new_team }} </p>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
        <div v-else>
            <div class="flex items-center justify-center text-4xl  w-full h-screen">
                Wait⚽⚽⚽
            </div> 
        </div>
    </div>
</template>

<script>
import BASE_URL from '@/base-url/URL';

export default {
    name: 'AppTransfers',
    mixins: [ BASE_URL ],
    data: () => ({
        transfers: [],
        loading: false
    }),
    methods: {
        getTransfers () {
            this.loading = true
            BASE_URL.get('transfers/').then(({ data }) => {
                this.transfers = data.transfers
                setTimeout(() => {this.loading = false}, 10)
            })
            .catch(err => console.log(err))
        }
    },
    mounted () {
        this.getTransfers()
    }
}
</script>