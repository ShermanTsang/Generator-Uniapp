<template>
  <view>{{state.text}}</view>
</template>

<script lang="ts">
import Vue from "vue";

interface DataType extends Partial<Code.BaseDataType> {
  state: {
    text: string
  };
  data: {
  };
}

export default Vue.extend({
  components: {},
  data(): DataType {
    return {
      state: {
        text: 'HelloWorld'
      },
      data: {
      }
    };
  },
  computed: {
  },
  watch: {
  },
  mounted() {
  },
  methods: {}
});
</script>

<style lang="scss"></style>
