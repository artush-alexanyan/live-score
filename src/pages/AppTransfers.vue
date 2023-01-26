<template>
    <div class="transfers">
        <h1 class="text-2xl py-5 text-center">Transfers</h1>  

        <div class="pagination_wrapper mt-10 flex justify-center items-center">
            <ul class="flex items-center">
                <li 
                    class="mx-1 border border-gray-300 rounded cursor-pointer flex items-center px-2 py-1" 
                    :class="page > 0 ? 'text-white bg-blue-600 border-0' : ''"
                    @click="page > 0 ? page-- : page"
                >
                    <font-awesome-icon icon="fa-solid fa-chevron-left" />
                    <font-awesome-icon icon="fa-solid fa-chevron-left" />
                </li>
                <li 
                    class="mx-1 px-2 border border-gray-300 rounded cursor-pointer" 
                    :class="index === page ? 'text-white bg-blue-600 font-bold' : 'text-gray-700'"
                    v-for="(pages, index) in getPerPage" 
                    :key="pages"
                    @click="changePage(pages, index)"
                    v-show="pages > showFromStart && pages <= showFromStart + 5"
                > 
                    {{ pages }} 
                </li>     
                <li 
                    class="mx-1 border border-gray-300 rounded cursor-pointer flex items-center px-2 py-1" 
                    :class="page < getPerPage - 1 ? 'text-white bg-blue-600 border-0' : ''"
                    @click="page <= getPerPage - 1 ? page++ : page"
                >
                    <font-awesome-icon icon="fa-solid fa-chevron-right" />
                    <font-awesome-icon icon="fa-solid fa-chevron-right" />
                </li>
            </ul>
        </div>

        <div class="flex items-center justify-center my-5">
            <div class="inp_wrapper border p-1">
                <label class="mx-2">Jump to page</label> <br>   
                <input 
                    type="number" 
                    class="border border-gray-400 rounded-0 outline-0 w-full" 
                    @input="goToPage()" 
                    min="0"
                    :max="getPerPage"
                >                
            </div>
        </div>        

     
        <div class="py-5 my-10" v-if="!loading">
            <ul class="grid xl:grid-cols-3 lg:grid-cols-2 grid-cols-1 gap-4">               
                <li 
                    class="border border-gray-100"
                    v-for="(transfer, index) in returnCurrentPageItems"
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
    components: {  },
    data: () => ({
        transfers: [],
        loading: false,
        perPage: 10,
        page: 0,
    }),
    computed: {
        getPerPage () {
            return Math.ceil(this.transfers.length / this.perPage)
        },
        returnCurrentPageItems () {
            return this.transfers.slice(this.page * this.perPage, this.page * this.perPage + this.perPage)
        },
        showFromStart () {
            return this.page <= this.perPage / 2 ? 0 : this.page 
        }
    },
    methods: {
        getTransfers () {
            this.loading = true
            BASE_URL.get('transfers/').then(({ data }) => {
                this.transfers = data.transfers
                setTimeout(() => {this.loading = false}, 10)
            })
            .catch(err => console.log(err))
        },
        changePage (pages, index) {
            console.log('pages', pages)
            this.page = index
        }, 
        goToPage (){
            this.page = Number(event.target.value - 1)
            if(Number(event.target.value - 1) < this.getPerPage || Number(event.target.value - 1) < 0) {
                this.page = Number(event.target.value - 1)
            }
            else{
                alert(`'Value must be less than ' ${this.getPerPage} ' and grater than 0'`)
                this.page = 0
            }
        }       
    },
    mounted () {
        this.getTransfers()
    }
}
</script>