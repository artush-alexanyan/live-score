<template>
    <div class="assists">
        <h1 class="text-2xl py-5 text-center">Assists</h1>  
        <div v-if="!loading">
            <ul class="grid grid-cols-1 md:gap-8 gap-4 p-3">
                <li 
                    class="px-4 border border-gray-200 bg-gray-50" 
                    v-for="(assist, index) in assists"
                    :key="index"
                >
                    <div>

                    </div>
                    <div class="flex items-center justify-between text-xl px-16 py-5 font-bold">
                        <h1 class="">
                            {{ assist.home }}
                        </h1>
                        <h1>-</h1>
                        <h1 class="">
                            {{ assist.away }}
                        </h1>
                    </div>
                    <div class="text-center m-8">
                        <button 
                            class="text-white bg-blue-600 px-5 py-2" 
                            @click="showArticle(assist)"
                        >
                            Show articles
                        </button>
                    </div>
                    <div>
                        <ul v-for="(art, index) in article" :key="index">
                            <li 
                                v-show="!loadArticles && assist.article != null && assist.article.api_url === art.url"
                            >  
                                <div class="">
                                    <h2 class="text-2xl text-center py-5">Latest News</h2>
                                    <ul class="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-6">
                                        <li v-for="(late, index) in latest" :key="index">
                                            <div class="latest_news_card">
                                                <img 
                                                    :src="late.image" 
                                                    alt="Avatar"
                                                >
                                                <div class="information">
                                                    <h4>
                                                        <b>{{ late.category }}</b>
                                                    </h4> 
                                                    <p>
                                                        {{ late.title }} 
                                                        <strong>({{ late.date }})</strong> 
                                                    </p> 
                                                </div>
                                                <div class="text-center text-blue-500 hover:underline hover:text-blue-700 my-5">
                                                    <a 
                                                        target="_blank" 
                                                        :href="late.link"
                                                    >
                                                        More
                                                    </a>
                                                </div>
                                            </div>                                            
                                        </li>
                                    </ul>
                                    <ul>
                                        <li v-for="(block, index) in content_block" :key="index">
                                            <div v-html="block.meta.content" class="py-1">

                                            </div>
                                        </li>
                                    </ul>
                                </div>
                                <div class="text-center my-10">
                                    <a 
                                        target="_blank" 
                                        class="hover:bg-white hover:text-black hover:border hover:border-gray-400 text-white text-sm cursor-pointer md:text-lg px-5 py-2 bg-black" 
                                        :href="art.article.link"
                                    >
                                        View more 
                                    </a>                                    
                                </div>
                            </li>
                            <div 
                                class=" py-5 text-center" 
                                v-show="loadArticles && assist.article != null && assist.article.api_url === art.url"
                            >
                                <p>Loading...</p>
                            </div>                             
                        </ul>                        
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
import axios from 'axios';

export default {
    name: 'AppAssists',
    mixins: [ BASE_URL ],
    components: {  },
    data: () => ({
        assists: [],
        loading: false,
        loadArticles: false,
        article: [],
        noArticleBlock: '',
        latest: [],
        content_block: []
    }),
    computed: {

    },
    methods: {
        getData () {
            this.loading = true
            BASE_URL.get('assists/').then(({ data }) => {
                let result = data.assists
                this.assists = result
                setTimeout(() => {this.loading = false}, 1000)
            })
            .catch(err => console.log(err))
        }, 
        showArticle(assist) {
            this.article = []
            if(assist.article != null) {
                this.loadArticles = true
                axios.get(assist.article.api_url).then(({data}) => {
                    let result = data
                    this.article.push({
                        article: result,
                        url: assist.article.api_url
                    })
                    this.content_block = result.content.blocks
                    let url = result.url
                    console.log(url, URL)
                    this.article.map(item => {
                        this.latest = item.article.latest
                    })
                    setTimeout(() => {this.loadArticles = false}, 1000)
                }) 
            }
            else{
                alert('No articles to show!')
            }

        }             
    },
    mounted () {
        this.getData()
    }
}
</script>