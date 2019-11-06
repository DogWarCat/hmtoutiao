<template>
  <div class="container-fans">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <my-bread>粉丝管理</my-bread>
      </div>
      <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
        <el-tab-pane label="粉丝列表" name="fansList">
          <div class="image_list">
            <div class="image_item" v-for="(item,index) in fansData" :key="index">
              <el-avatar :size="80" :src="item.photo" style="margin-top:20px"></el-avatar>
              <p>{{item.name}}</p>
              <el-button type="primary" plain size="mini">+关注</el-button>
            </div>
          </div>
          <el-pagination
            background
            layout="prev, pager, next"
            :total="total"
            :current-page="reqParams.page"
            :page-size="reqParams.per_page"
            @current-change="Page"
            @prev-click="Page"
            @next-click="Page"
          ></el-pagination>
        </el-tab-pane>
        <el-tab-pane label="粉丝画像" name="fansImage">
          <div ref="dom" style="width: 600px;height:400px;"></div>
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<script>
import echarts from 'echarts'
export default {
  data () {
    return {
      // tags默认选中
      activeName: 'fansImage',
      //   粉丝列表请求参数
      reqParams: {
        // 每页显示条目个数
        per_page: 20,
        // 当前页数
        page: 1
      },
      //   粉丝总数
      total: 0,
      // 粉丝列表返回数据
      fansData: []
    }
  },
  methods: {
    handleClick (tab, event) {
      console.log(tab, event)
    },
    async getImageList () {
      //   console.log(this.reqParams.page)
      const {
        data: { data }
      } = await this.$axios.get('/followers', { params: this.reqParams })
      //   console.log(data)
      this.fansData = data.results
      this.total = data.total_count
    },
    async Page (newPage) {
      //   console.log(newPage)
      this.reqParams.page = newPage
      this.getImageList()
    }
  },
  created () {
    this.getImageList()
  },
  // 注意：获取dom需要在dom渲染完毕后,所以写在mounted中
  mounted () {
    const dom = this.$refs.dom
    const myEchart = echarts.init(dom)
    // 柱状图数据
    const option = {
      color: ['#3398DB'],
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          // 坐标轴指示器，坐标轴触发有效
          type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
        }
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      xAxis: [
        {
          type: 'category',
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
          axisTick: {
            alignWithLabel: true
          }
        }
      ],
      yAxis: [
        {
          type: 'value'
        }
      ],
      series: [
        {
          name: '直接访问',
          type: 'bar',
          barWidth: '60%',
          data: [10, 52, 200, 334, 390, 330, 220]
        }
      ]
    }
    myEchart.setOption(option)
  }
}
</script>

<style lang="less" scoped>
.image_list {
  .image_item {
    width: 140px;
    height: 190px;
    border: 1px dashed #ccc;
    text-align: center;
    font-size: 13px;
    display: inline-block;
    margin-right: 20px;
    margin-bottom: 20px;
  }
}
</style>
