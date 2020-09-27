<template>
    <div class="monitor-access-container">
      <div class="tool-bar">
        <div class="btn primary-btn">批量开始</div>
        <div class="btn export-btn">全部开始</div>
        <div class="btn success-btn">获取状态</div>
      </div>
      <div class="table-content">
        <el-table
          :key="tableKey"
          v-loading="listLoading"
          :data="listData"
          :height="550"
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
          <el-table-column label="监控接入服务器名称" prop="Name" align="center" width="180"></el-table-column>
          <el-table-column label="监控已巡检数量" prop="HasCount" align="center" width="180"></el-table-column>
          <el-table-column label="监控巡检数量" prop="Count" align="center" width="180" ></el-table-column>
          <el-table-column label="巡检间隔(s)" prop="IntervalTime" align="center" width="180"></el-table-column>
          <el-table-column label="巡检结束时间" prop="EndTime" align="center" width="180"></el-table-column>
          <el-table-column label="巡检策略" prop="InspectionStrategy" align="center" width="180"></el-table-column>
          <el-table-column label="状态" width="150px" align="center">
            <template slot-scope="{row}">
              <span>{{formatStatus(row.Status,'id','InspectionStatus').value}}</span>
            </template>
          </el-table-column>
          <el-table-column label="巡检次数" prop="Total" align="center" width="180"></el-table-column>
          <el-table-column label="进度" prop="Progress" align="center" width="180"></el-table-column>
          <el-table-column label="操作" align="center" width="150" class-name="small-padding fixed-width">
            <template slot-scope="{row,$index}">
              <span class="column-btn" title="播放"><svg-icon icon-class="play"></svg-icon></span>
              <span class="column-btn" title="停止"><svg-icon icon-class="report"></svg-icon></span>
              <span class="column-btn" title="获取"><svg-icon icon-class="report"></svg-icon></span>
            </template>
          </el-table-column>
        </el-table>
        <div class="table-bottom">
          <pagination  :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit"/>
        </div>
      </div>
    </div>
</template>

<script>
  import Pagination from '@/components/Pagination';
  import {getByValue} from '@/utils';
    export default {
        name: "",
      components: {
        Pagination
      },
      data() {
        return {
          listQuery:{
            page:1,
            limit:10,
            runStatus:'',
            name:''
          },
          tableKey: 0,
          listLoading:false,
          listData:[
            {
              Name:'出疆协转',
              HasCount:120,
              Count:130,
              IntervalTime:60,
              EndTime:'2020-6-20 12:23:12',
              Status:'0',
              Total:150,
              Progress:'90%'
            }
          ],
          total:0
        };
      },
      methods: {
        formatStatus(row,key,name){
          let obj=getByValue(row,key,name);
          return obj
        },
      }
    }
</script>

<style lang="scss" scoped>
  .monitor-access-container{
    padding-top: 20px;
    .tool-bar{
      margin-bottom: 20px;
    }
  }
</style>
