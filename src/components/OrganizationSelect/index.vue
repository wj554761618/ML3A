<template>
  <div class="area">
    <div class="select-item">
      <el-select v-model="provinceValue" clearable placeholder="请选择" @change="getCityList(provinceValue)">
        <el-option
          v-for="item in provinceList"
          :key="item.AreaCode"
          :label="item.Name"
          :value="item.AreaCode">
        </el-option>
      </el-select>
    </div>
    <div class="select-item">
      <el-select v-model="cityValue" filterable clearable
                 placeholder="请选择" @change="getCountryList(cityValue)">
        <el-option
          v-for="item in cityList"
          :key="item.AreaCode"
          :label="item.Name"
          :value="item.AreaCode"></el-option>
      </el-select>
    </div>
    <div class="select-item">
      <el-select v-model="countryValue" filterable clearable
                 placeholder="请选择" @change="">
        <el-option
          v-for="item in countryList"
          :key="item.AreaCode"
          :label="item.Name"
          :value="item.AreaCode"></el-option>
      </el-select>
    </div>
  </div>
</template>

<script>
  import { getAreaList} from '@/api/common';

  export default {
    name: "OrganizationSelect",
    data(){
        return{
          provinceList:[],
          cityList:[],
          countryList:[],
          provinceValue:'',
          cityValue:'',
          countryValue:''
        }
    },
    created(){
      this.getProvinces()
    },
    methods:{
      getProvinces(){
        let vm=this;
        getAreaList({AreaCode:"0"}).then((data)=>{
            vm.provinceList=data.data;
        })
      },
      getCityList(provinceValue){
        let vm=this;
        vm.cityValue="";
        vm.countryValue="";
        if(!provinceValue){
          return
        }
        getAreaList({AreaCode:provinceValue}).then((data)=>{
          vm.cityList=data.data;
        })
      },
      getCountryList(cityValue){
        let vm=this;
        vm.countryValue="";
        if(!cityValue){
          return
        };
        getAreaList({AreaCode:cityValue}).then((data)=>{
          vm.countryList=data.data;
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
  .area{
    & .select-item{
      float: left;
      margin-right: 20px;
      }
  }
</style>
