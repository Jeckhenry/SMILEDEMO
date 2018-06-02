<template>
    <div>
        <div class="floor">
         <div class="floorone-title">
            {{floortitle}}
         </div>
         <div class="floor-normaly">
            <div class="floor-one">
              <img :src="floorData0.image" width="100%" alt="">
            </div>
            <div>
              <div class="floor-two">
                  <img :src="floorData1.image" width="100%" alt="">
              </div>
              <div>
                  <img :src="floorData2.image" width="100%" alt="">
              </div>
            </div>
         </div>
         <div class="floor-rule">
            <div v-for="(image,index) in floorData.slice(3)" :key="index">
                <img :src="image.image" width="100%" alt="">
            </div>
         </div>
       </div>
    </div>
</template>

<script>
    export default {
        props:['floorData','floortitle'],
        data(){
            return{
                floorData0:{},
                floorData1:{},
                floorData2:{},
            }
        },
        created(){
            
        },
        watch:{
            floorData:function(val){
                console.log(this.floorData);
                this.floorData0 = this.floorData[0];
                this.floorData1 = this.floorData[1];
                this.floorData2 = this.floorData[2];
            }
        }
    }
</script>

<style scoped>
.floorone-title{
  font-size: 14px;
  text-align: center;
  height: 1.8rem;
  line-height: 1.8rem;
}
.floor-normaly{
  display:flex;
  flex-direction: row;
  background-color: #ffffff;
  border-bottom: 1px solid #ddd;
}
.floor-normaly>div{
  width: 50%;
  box-sizing: border-box;
}
.floor-one{
  border-right: 1px solid #dddddd;
}
.floor-two{
  border-bottom: 1px solid #dddddd;
}
.floor-rule{
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  background-color: #ffffff;
}
.floor-rule div{
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  width: 50%;
  border-bottom: 1px solid #dddddd;
}
.floor-rule div:nth-child(odd){
  border-right: 1px solid #dddddd;
}
</style>