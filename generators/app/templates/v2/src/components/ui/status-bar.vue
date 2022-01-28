<template>
    <view :style="{ height: statusBarHeight }" class="status-bar">
        <slot />
    </view>
</template>

<script lang="ts">
import Vue from 'vue';

type DataType = Partial<Code.BaseDataType>;

export default Vue.extend({
    name: 'UiStatusBar',
    data() {
        return {
            statusBarHeight: '20px'
        };
    },
    mounted() {
        this.statusBarHeight = uni.getSystemInfoSync().statusBarHeight + 'px';
    }
});
</script>

<style lang="scss" scoped>
.status-bar {
    // width: 750rpx;
    height: 20px;
    // height: var(--status-bar-height);
}
</style>
