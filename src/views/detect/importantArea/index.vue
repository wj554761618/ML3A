<template>
  <div class="important-area-container">
    <div class="search panel">
      <div class="left">
        <div class="status">
          <label>运行状态</label>
          <el-select v-model="listQuery.runStatus" clearable placeholder="请选择" @change="">
            <el-option
              v-for="item in runStatusList"
              :key="item.id"
              :label="item.value"
              :value="item.id">
            </el-option>
          </el-select>
        </div>
        <div class="name">
          <label>监控名称</label>
          <el-input v-model="listQuery.name" placeholder="请输入名称"></el-input>
        </div>
      </div>
      <div class="btn search-btn">查询</div>
    </div>
    <div class="tool-bar">
      <div class="btn primary-btn">一键上报</div>
      <div class="btn export-btn">导出</div>
    </div>
    <div class="content-wrapper">
      <div id="tree">
        <div class="title"><div class="content"><svg-icon icon-class="dot"></svg-icon>重点区域</div></div>
        <el-tree :data="areaList" node-key="AreaCode" :props="defaultProps" highlight-current></el-tree>
      </div>
      <div class="table-content">
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
            width="65"
            align="center">
          </el-table-column>
          <el-table-column
            type="index" label="序号" width="50" align="center">
          </el-table-column>
          <el-table-column label="操作" align="center" width="150" class-name="small-padding fixed-width">
            <template slot-scope="{row,$index}">
              <span class="column-btn" title="预览"><svg-icon icon-class="preview"></svg-icon></span>
              <span class="column-btn" title="上报"><svg-icon icon-class="report"></svg-icon></span>
            </template>
          </el-table-column>
          <el-table-column label="监控名称" prop="Name" align="center" width="180" class-name="monitor-name"></el-table-column>
          <el-table-column label="在线状态" width="150px">
            <template slot-scope="{row}">
              <span class="icon-text"><svg-icon icon-class="dot" :style="formatStatus(row.OnlineStatus,'id','OnlineStatus').attr"></svg-icon>{{formatStatus(row.OnlineStatus,'id','OnlineStatus').value}}</span>
            </template>
          </el-table-column>
          <el-table-column label="质量状态" width="150px">
            <template slot-scope="{row}">
              <span class="icon-text"><svg-icon :icon-class="formatStatus(row.QualityStatus,'id','QualityStatus').attr.icon" ></svg-icon>{{formatStatus(row.QualityStatus,'id','QualityStatus').value}}</span>
            </template>
          </el-table-column>
          <el-table-column label="录制状态" width="150px">
            <template slot-scope="{row}">
              <span class="icon-text"><svg-icon icon-class="dot" :style="formatStatus(row.OnlineStatus,'id','OnlineStatus').attr"></svg-icon>{{formatStatus(row.RecordStatus,'id','RecordStatus').value}}</span>
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
              <span>{{ row.StatusChangeTime| parseTime('{y}-{m}-{d} {h}:{i}')  }}</span>
            </template>
          </el-table-column>
        </el-table>
        <div class="table-bottom">
          <pagination  :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { getAreaTreeList,getMonitorDetectList} from '@/api/common';
import {getObjectValueByName} from '@/utils';
import Pagination from '@/components/Pagination';
import {getByValue} from '@/utils';

export default {
  name: 'ImportantArea',
  components: {
    Pagination
  },
  data(){
    return{
      runStatusList:getObjectValueByName("RunStatus"),
      areaList:null,
      listQuery:{
        page:1,
        limit:10,
        runStatus:'',
        name:''
      },
      tableKey: 0,
      listLoading:false,
      listData:null,
      total:0,
      defaultProps: {
        children: 'children',
        label: 'Name'
      }
    }
  },
  created() {
    this.getAreaTreeData();
    this.getList();
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
    formatStatus(row,key,name){
      let obj=getByValue(row,key,name);
      return obj
    },
    getAreaTreeData(){
      getAreaTreeList().then((data)=>{
        this.areaList=data.data
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "~@/styles/variables.scss";
  .important-area-container {
    .search {
      display: flex;
      padding-top: 0;
      padding-bottom: 0;
      height: 60px;
      line-height: 60px;
      justify-content: space-between;
      .left{
        display: flex;
      }
      .status{
        margin-right: 40px;
      }
      label{
        margin-right: 10px;
        font-size: 13px;
        font-weight: normal;
        color: $mainTextColor;
        font-family: PingFangZhongHei;
      }
      .name{
        display: flex;
      }
    }
    .tool-bar{
      display: flex;
      margin:20px 0 15px;
    }
    .content-wrapper{
      display: flex;
      .table-content{
        width: calc(100vw - 188px - 250px);
      }
    }
    #tree{
      width: 250px;
      background: #fff;
      box-shadow: 5px 0px 13px -2px rgba(92, 111, 167, 0.14);
      z-index: 1000;
      .title{
        padding:0 10px;
        margin-bottom: 10px;
        .content{
          height: 40px;
          line-height: 40px;
          border-bottom: 1px solid #EDEDED;
          font-family: PingFangZhongHei;
          font-size: 13px;
        }
        svg-icon{
          color: $main;
        }
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
      justify-content: flex-end;
    }
  }
  .hideSidebar .important-area-container .table-content{
    width: calc(100vw - 304px);
  }
  .el-tree{
    height: 100%;
    overflow-y: auto;
  }
</style>
