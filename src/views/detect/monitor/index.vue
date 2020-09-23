<template>
  <div class="monitor-detect-container">
    <div class="search panel">
      <div class="organization">
        <label>组织机构</label>
        <organization-select/>
      </div>
      <div class="status">
        <label>运行状态</label>
        <el-select v-model="listQuery.runStatus" clearable placeholder="请选择" @change="">
          <el-option
            v-for="item in runStatusList"
            :key="item.id"
            :label="item.name"
            :value="item.id">
          </el-option>
        </el-select>
      </div>
      <div class="name">
        <label>监控名称</label>
        <el-input v-model="listQuery.name" placeholder="请输入名称"></el-input>
      </div>
      <div class="btn search-btn">查询</div>
    </div>
    <div class="tool-bar">
      <div class="btn primary-btn">一键上报</div>
      <div class="btn export-btn">导出</div>
    </div>
    <div style="width: 100%">
      <el-table
        :key="tableKey"
        v-loading="listLoading"
        :data="listData"
        fit
        highlight-current-row
        style="width: 100%;"
      >
        <el-table-column
          type="selection"
          width="55">
        </el-table-column>
        <el-table-column
          type="index" label="序号" width="50">
        </el-table-column>
        <el-table-column label="操作" align="center" width="150" class-name="small-padding fixed-width">
          <template slot-scope="{row,$index}">
            <span class="column-btn" title="预览"><svg-icon icon-class="preview"></svg-icon></span>
            <span class="column-btn" title="上报"><svg-icon icon-class="report"></svg-icon></span>
          </template>
        </el-table-column>
        <el-table-column label="监控名称" prop="Name" align="center" width="180" class-name="monitor-name"></el-table-column>
        <el-table-column label="在线状态" width="150px" align="center">
          <template slot-scope="{row}">
            <span>{{ row.OnlineStatus}}</span>
          </template>
        </el-table-column>
        <el-table-column label="质量状态" width="150px" align="center">
          <template slot-scope="{row}">
            <span>{{ row.QualityStatus}}</span>
          </template>
        </el-table-column>
        <el-table-column label="录制状态" width="150px" align="center">
          <template slot-scope="{row}">
            <span>{{ row.RecordStatus}}</span>
          </template>
        </el-table-column>
        <el-table-column label="县市区级" prop="Area" width="150px" align="center">
        </el-table-column>
        <el-table-column label="视频质量诊断时间" width="150px" align="center">
          <template slot-scope="{row}">
            <span>{{ row.VideoQualityDiagnosisTime }}</span>
          </template>
        </el-table-column>
        <el-table-column label="状态变更时间" width="150px" align="center">
          <template slot-scope="{row}">
            <span>{{ row.StatusChangeTime }}</span>
          </template>
        </el-table-column>
        <el-table-column label="离线时长" prop="OfflineTime" width="100px" align="center">
        </el-table-column>
        <!--<el-table-column label="码流时延(ms)" width="120px">
          <template slot-scope="{row}">
            <span class="streamDelay-tag one">{{ row.StreamDelay[0]}}</span>
            <span class="streamDelay-tag two">{{ row.StreamDelay[1]}}</span>
            <span class="streamDelay-tag three">{{ row.StreamDelay[2]}}</span>
          </template>
        </el-table-column>-->
      </el-table>
    </div>

    <div class="table-bottom">
      <div class="legend">
        <ul>
          <li>图例：</li>
          <li class="item"><span class="icon"></span>信令时延</li>
          <li class="item"><span class="icon"></span>视频流时延</li>
          <li class="item"><span class="icon"></span>关键帧时延</li>
        </ul>
      </div>
      <pagination  :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />
    </div>
  </div>
</template>

<script>
import OrganizationSelect from '@/components/OrganizationSelect';
import { getMonitorDetectList} from '@/api/common';
import Pagination from '@/components/Pagination'

export default {
  name: 'Overview',
  components: {
    OrganizationSelect,
    Pagination
  },
  data(){
    return{
      tableKey: 0,
      listLoading:false,
      listData:null,
      total:0,
      listQuery:{
        page:1,
        limit:10,
        runStatus:'',
        name:''
      },
      runStatusList:[
        {
          id:'1',
          name:'正常'
        },
        {
          id:'2',
          name:'视频异常'
        },
        {
          id:'3',
          name:'不在线'
        },
        {
          id:'4',
          name:'未配置'
        }
      ]
    }
  },
  created() {
    this.getList()
  },
  methods:{
    getList() {
      this.listLoading = true
      getMonitorDetectList(this.listQuery).then(response => {
        this.listData = response.data.items
        this.total = response.data.total

        // Just to simulate the time of the request
        setTimeout(() => {
          this.listLoading = false
        }, 1 * 1000)
      })
    },
  }
}
</script>

<style lang="scss" scoped>
  @import "~@/styles/variables.scss";

.monitor-detect-container {
  .search {
    display: flex;
    padding-top: 0;
    padding-bottom: 0;
    height: 60px;
    line-height: 60px;
    justify-content: space-between;
    .organization{
      display: flex;
    }
    label{
      margin-right: 10px;
      font-size: 13px;
      font-weight: normal;
      color: $mainTextColor;
    }
    .name{
      display: flex;
    }
  }
  .tool-bar{
    display: flex;
    margin:20px 0 15px;
    .btn{
      margin-right: 20px;
    }
  }
  .streamDelay-tag{
    padding:0 10px;
    height: 20px;
    line-height: 20px;
    display: inline-block;
    color: #fff;
    margin-right: 5px;
    &.one{
      background: #1A5E70;
    }
    &.two{
      background: #0F839F;
    }
    &.three{
      background: #06B3B6;
    }
  }
  .column-btn{
    margin: 0 8px;
    display: inline-block;
    cursor: pointer;
    .svg-icon{
      width: 16px;
    }
  }
  & .table-bottom{
    height: 80px;
    line-height: 80px;
    padding: 0 20px;
    background: #fff;
    display: flex;
    justify-content: space-between;
  }
  & .table-bottom li{
    float: left;
    margin-right: 20px;
    font-size: 12px;
    .icon {
      width: 20px;
      height: 8px;
      display: inline-block;
      margin-right: 10px;
      border-radius: 2px;
    }
    &:nth-child(2){
      .icon{
        background: #1A5E70;
      }
    }
    &:nth-child(3){
      .icon{
        background: #0F839F;
      }
    }
    &:nth-child(4){
      .icon{
        background: #06B3B6;
      }
    }
  }
}
</style>
<style lang="scss" >
  @import "~@/styles/variables.scss";
  .monitor-detect-container .el-table td.monitor-name .cell{
    color:$menuActiveText!important;
  }
</style>
