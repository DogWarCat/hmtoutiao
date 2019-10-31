<template>
  <div class="container-welcome">
    <el-card class="box-card">
      <my-bread>首页</my-bread>
    </el-card>
    <img src="../../assets/welcome.jpg" class="img-Welcome" />
  </div>
</template>

<script>
export default {
  methods: {
    article () {
      this.$axios
        .get('articles')
        .then(res => {
          console.log(res.data)
        })
        .catch(() => console.log('error'))
    }
  },
  created () {
    this.article()
  }
}
</script>

<style>
.img-Welcome {
  display: block;
  margin: 0 auto;
}
</style>
