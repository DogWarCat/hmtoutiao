<template>
  <div class="container-page">
    <p>
      <slot name="header" :page="pageName" test="test"></slot>
    </p>
    <div>
      <slot name="content" test2="内容"></slot>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      pageName: '组建内部数据--头部'
    }
  }
}
</script>

<style>
</style>
