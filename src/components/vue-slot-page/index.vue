<template>
  <page-one>
    <!-- 老版语法（现在还能用） -->
    <!-- <div slot="header" slot-scope="scope">
      <p>头部</p>
      <p style="color:red;">{{scope.page}}</p>
      <p style="color:green;">{{scope.test}}</p>
    </div>
    <div slot="content" slot-scope="scope">
      <p>内容</p>
      <p style="color:blue;">{{scope.test2}}</p>
    </div>-->
    <!-- 最新版语法 -->
    <template v-slot:header="scope">
      <p style="color:red;">{{scope.page}}</p>
      <p style="color:green;">{{scope.test}}</p>
    </template>
  </page-one>
</template>

<script>
import pageOne from '@/components/vue-slot-page/vue-slot'
export default {
  components: {
    pageOne
  }
}
</script>

<style>
</style>
