<template>
  <el-table
    :data="tableData"
    stripe
    style="width: 100%">
    <el-table-column
      prop="Name"
      label="监控接入服务器名称"
      min-width="25%">
    </el-table-column>
    <el-table-column
      prop="PlatName"
      label="对接平台名称"
      min-width="25%">
    </el-table-column>
    <el-table-column
      prop="Online"
      label="监控在线率"
      min-width="25%">
    </el-table-column>
    <el-table-column
      prop="Available"
      label="监控可用率"
      min-width="25%">
    </el-table-column>
  </el-table>
</template>

<script>
    export default {
        name: "MonitorStasticTable",
      data() {
        return {
          tableData: [{
            Name: '新疆建设兵团_协转99',
            PlatName: '下级平台1',
            Online:'25%',
            Available:'30%'
          }, {
            Name: '新疆建设兵团_协转99',
            PlatName: '下级平台2',
            Online:'35%',
            Available:'30%'
          },  {
            Name: '新疆建设兵团_协转49',
            PlatName: '下级平台3',
            Online:'35%',
            Available:'30%'
          }, {
            Name: '新疆建设兵团_协转123',
            PlatName: '下级平台4',
            Online:'35%',
            Available:'30%'
          },{
              Name: '新疆建设兵团_协转123',
              PlatName: '下级平台4',
              Online:'35%',
              Available:'30%'
            },
            {
              Name: '新疆建设兵团_协转96',
              PlatName: '下级平台3',
              Online:'35%',
              Available:'30%'
            },
            {
              Name: '新疆建设兵团_协转96',
              PlatName: '下级平台2',
              Online:'35%',
              Available:'35%'
            }
          ]
        }
      }
    }
</script>

<style scoped>

</style>
