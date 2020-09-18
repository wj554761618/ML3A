<template xmlns:el-col="http://www.w3.org/1999/html">
  <div class="dashboard-container">
    <div class="organization panel">
      <div class="name">组织机构</div>
      <organization-select/>
    </div>
    <!--监控点总数，监控在线率等-->
    <div class="bar-group">
      <el-row :gutter="20">
        <el-col :span="6" v-for="(item, index) in ringBarData" >
          <div class="bar-item panel">
            <div class="bar-header">
              <div class="title">
                <div class="dot"></div>
                <div class="text">{{item.Name}}</div>
              </div>
              <div class="description">
                {{item.Name}}={{item.dataItem.join('+')}}
              </div>
            </div>
            <div class="bar-content">
              <ring-pie-bar :barData="item" :index="index" v-if="item"/>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
    <!--资源运行情况统计-->
    <div class="resource-run-content panel">
      <div class="dot"></div>
      <resource-run-bar :resourceRunData="resourceRunData" v-if="resourceRunData"/>
    </div>
    <!--资源类型，异常占比-->
    <el-row :gutter="20"  class="moitor-type-abnormal">
      <el-col :span="12">
        <div class="moitor-type-statistic panel">
          <div class="dot"></div>
            <monitor-type-bar/>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="abnormal-statistic panel">
          <div class="title">
            <div class="dot"></div>
            <div class="text">异常占比</div>
          </div>
          <div class="radio-group">
            <el-radio v-model="abnormalDate" label="1">今天</el-radio>
            <el-radio v-model="abnormalDate" label="2">一周</el-radio>
            <el-radio v-model="abnormalDate" label="3">一个月</el-radio>
          </div>
          <el-row class="abnormal-bar" :gutter="20">
            <el-col :span="12">
              <abnormal-rate-bar/>
              <div class="total">
                <span style="margin-right: 10px;font-size: 14px">异常总数</span>
                <span style="font-family: PingFangZhonghei;font-size: 15px">434353534</span>
              </div>
            </el-col>
            <el-col :span="12">
              <abnormal-rate-bar/>
              <div class="total">
                <span style="margin-right: 10px;font-size: 14px">异常总数</span>
                <span style="font-family: PingFangZhonghei;font-size: 15px">434353534</span>
              </div>
            </el-col>
          </el-row>
        </div>
      </el-col>
    </el-row>
    <!--监控服务器对接平台监控统计-->
    <div class="monitor-server-plat-table panel">
      <div class="title">
        <div class="dot"></div>
        <div class="text">监控服务器对接平台监控统计</div>
      </div>
      <monitor-stastic-table/>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import OrganizationSelect from '@/components/OrganizationSelect';
import RingPieBar from './components/RingPieBar';//环形饼图
import ResourceRunBar from './components/ResourceRunBar';//树状图
import MonitorTypeBar from './components/MonitorTypeBar';//横向树状图
import AbnormalRateBar from './components/AbnormalRateBar';//饼图
import MonitorStasticTable from './components/MonitorStasticTable';
import { getTotalAndRate,getResourceRunStatisticData} from '@/api/common';
export default {
  name: 'Overview',
  data(){
    return{
      ringBarData:[],
      resourceRunData:null,
      abnormalDate:'1'
    }
  },
  components: {
    OrganizationSelect,
    RingPieBar,
    ResourceRunBar,
    MonitorTypeBar,
    AbnormalRateBar,
    MonitorStasticTable
  },
  computed: {
    ...mapGetters([
      'name'
    ])
  },
  created(){
    this.getTotalAndRateData()
    this.getResourceRunData()
  },
  methods:{
    //转化环形饼图的数据
    getTotalAndRateData(){
      getTotalAndRate().then((data)=>{
        data.data.forEach((item,index)=>{
          let dataItem=item.Value;
          item.dataItem=[];
          if(item.Name==="监控点总数"){
            item.innerName=item.Name.substring(item.Name.length-2)
          }else {
            item.innerName=item.Name.substring(item.Name.length-3)
          }
          dataItem.map((v)=>{
            item.dataItem.push(v.name)
            if(item.Name!=="监控点总数"){
              v.value=v.value.replace("%","")
            }
          return v
          })
        })
        this.ringBarData=data.data;
      })
    },
    //获取并转化资源运行统计的数据
    getResourceRunData(){
      getResourceRunStatisticData().then((data)=>{
        let category=[];
        let onlineData = [];
        let imageRateData = [];
        let recordRateData = [];
        data.data.forEach((item,index)=>{
          let onlineRate=item.Online.replace('%','');
          let imageRate=item.Image.replace('%','');
          let recordRate=item.Video.replace('%','');
          category.push(item.Name);
          onlineData.push(parseFloat(onlineRate));
          imageRateData.push(parseFloat(imageRate));
          recordRateData.push(parseFloat(recordRate));
        })
        this.resourceRunData={
          category:category,
          onlineData:onlineData,
          imageRateData:imageRateData,
          recordRateData:recordRateData
        }
        console.log(this.resourceRunData)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  .dashboard-container{
    & .panel{
      padding: 18px 20px 0 20px;
      background: #fff;
      position: relative;
    }
    .title{
      position: relative;
      padding-left: 10px;
      .text{
        font-size: 18px;
      }
      .dot{
        position: absolute;
        width: 4px;
        height: 4px;
        background: linear-gradient(128deg, #04B6D1 0%, #14D2B8 100%);
        border-radius: 5px;
        left: 0;
        top: 8px;
      }
    }

    & .organization{
      height: 60px;
      line-height: 60px;
      display: flex;
      padding-top: 0;

      & .name{
        margin-right: 17px;
      }
    }
    & .bar-group{
      margin-top: 20px;
      & .panel{
        padding: 0;
      }
      & .bar-item{

        & .bar-header{
          padding:18px 20px 0 20px;
        }

        & .description{
          margin-top: 13px;
          width: fit-content;
          height: 30px;
          padding: 0 10px;
          background: #F7F8F9;
          font-size: 12px;
          color: #999999;
          line-height: 30px;
        }
        & .bar-content{
          position: relative;
          width: 100%;
          background: #fff;
        }
      }
    }
    & .resource-run-content{
      height: 426px;
      margin-top: 20px;
      & .dot{
        position: absolute;
        width: 4px;
        height: 4px;
        background: linear-gradient(128deg, #04B6D1 0%, #14D2B8 100%);
        border-radius: 5px;
        left: 20px;
        top: 28px;
        z-index: 10000;
      }
    }
    & .moitor-type-abnormal {
      margin-top: 20px;
      .panel{
        height: 400px;
      }
      & .moitor-type-statistic .dot{
        position: absolute;
        width: 4px;
        height: 4px;
        background: linear-gradient(128deg, #04B6D1 0%, #14D2B8 100%);
        border-radius: 5px;
        left: 20px;
        top: 28px;
        z-index: 10000;
      }
      & .radio-group{
        position: absolute;
        right: 20px;
        top: 18px;
      }
      & .abnormal-bar{
        height: 320px;
        .el-col{
          height: 100%;
          .total{
            color: #282D32;
            text-align: center;
          }
        }
      }
    }
    & .monitor-server-plat-table{
      margin-top: 20px;
      min-height: 500px;
      padding: 0;
      .title{
        padding: 18px 20px 30px;
        .dot{
          left: 20px;
          top: 25px;
        }
        .text{
          padding-left: 10px;
        }
      }
    }
  }
</style>
