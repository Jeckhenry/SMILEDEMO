<template>
    <div>
        <swiper :options='swiperOption' class="swiper">
            <swiper-slide class="swiper-slide" v-for="(item,index) in slide" :key="index">
                slide{{item}}
            </swiper-slide>
            <div class="swiper-pagination" slot='pagination'></div>
        </swiper>
    </div>
</template>

<script>
    //竖直方向分页
    import 'swiper/dist/css/swiper.css'
    import {swiper,swiperSlide} from 'vue-awesome-swiper'
    export default {
        data(){
            return{
                slide:[1,2,3,4,5,6],
                swiperOption:{
                    direction: 'vertical',
                    pagination:{
                        el:'.swiper-pagination',
                        clickable:true
                    }
                }
            }
        },
        components:{swiper,swiperSlide}
    }
</script>

<style scoped>
    .swiper{
        height: 7rem;
        overflow: hidden;
        border-top: 1px solid #cccccc;
        border-bottom: 1px solid #cccccc;
    }
    .swiper-slide{
        height: 4rem;
        text-align: center;
        line-height: 4rem;
    }
</style>