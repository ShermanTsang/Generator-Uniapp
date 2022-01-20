<template>
  <view class="<%= className %>"></view>
</template>

<script lang="ts">
import Vue from 'vue';

interface DataType extends Partial<Code.BaseDataType> {
  config: {};
  data: {};
  state: {};
}

export default Vue.extend({
  name: '<%= componentName %>',
  data(): DataType {
    return {
      config: {},
      data: {},
      state: {}
    };
  },
  methods: {},
  computed: {},
  onLoad() {
  },
  onPullDownRefresh() {
    Promise.all([]).then(() => uni.stopPullDownRefresh());
  },
  onReachBottom() {
  }
});
</script>

<style lang="scss" scoped>
.<%= className %> {
}
</style>
