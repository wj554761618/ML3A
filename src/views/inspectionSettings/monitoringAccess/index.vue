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
          <el-table-column label="监控接入服务器名称" prop="Name" align="center" width="180" class-name="monitor-name"></el-table-column>
          <el-table-column label="监控已巡检数量" prop="Name" align="center" width="180" class-name="monitor-name"></el-table-column>
          <el-table-column label="监控巡检数量" prop="Name" align="center" width="180" class-name="monitor-name"></el-table-column>
          <el-table-column label="巡检间隔(s)" prop="Name" align="center" width="180" class-name="monitor-name"></el-table-column>
          <el-table-column label="巡检结束时间" prop="Name" align="center" width="180" class-name="monitor-name"></el-table-column>
          <el-table-column label="巡检策略" prop="Name" align="center" width="180" class-name="monitor-name"></el-table-column>
          <el-table-column label="状态" width="150px">
            <template slot-scope="{row}">
              <span class="icon-text"><svg-icon icon-class="dot" :style="formatStatus(row.OnlineStatus,'id','OnlineStatus').attr"></svg-icon>{{formatStatus(row.OnlineStatus,'id','OnlineStatus').value}}</span>
            </template>
          </el-table-column>
          <el-table-column label="巡检次数" prop="Name" align="center" width="180" class-name="monitor-name"></el-table-column>
          <el-table-column label="进度" prop="Name" align="center" width="180" class-name="monitor-name"></el-table-column>
          <el-table-column label="操作" align="center" width="150" class-name="small-padding fixed-width">
            <template slot-scope="{row,$index}">
              <span class="column-btn" title="预览"><svg-icon icon-class="preview"></svg-icon></span>
              <span class="column-btn" title="上报"><svg-icon icon-class="report"></svg-icon></span>
            </template>
          </el-table-column>
        </el-table>
        <div class="table-bottom">
          <pagination  :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />
        </div>
      </div>
    </div>
</template>

<script>
    export default {
        name: "",
      data() {
        return {

        };
      },
      methods: {

      }
    }
</script>

<style lang="scss" scoped>
  .monitor-access-container{
    padding-top: 20px;
    .tool-bar{

    }
  }
</style>
