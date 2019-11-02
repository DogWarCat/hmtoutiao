<template>
  <el-select :value="value" placeholder="请选择" @change="fn" clearable>
    <el-option v-for="item in channelOptions" :key="item.id" :label="item.name" :value="item.id"></el-option>
  </el-select>
</template>

<script>
export default {
  props: ['value'],
  data () {
    return {
      //   name: 'my-channel',
      channelOptions: [
        {
          id: '',
          name: ''
        }
      ]
    }
  },
  methods: {
    async getChannelOption () {
      const {
        data: { data }
      } = await this.$axios.get('channels')
      this.channelOptions = data.channels
      // console.log(this.channelOptions)
    },
    fn (value) {
      this.$emit('input', value)
    }
  },
  created () {
    this.getChannelOption()
  }
}
</script>

<style>
</style>
