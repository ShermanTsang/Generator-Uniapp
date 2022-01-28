<template>
    <view class="header-blocker"></view>
</template>

<script lang="ts">
import Vue from 'vue';

type DataType = Partial<Code.BaseDataType>;

export default Vue.extend({
    data(): DataType {
        return {};
    }
});
</script>

<style lang="scss">
$prefix: 'header-blocker';

.#{$prefix} {
    height: var(--status-bar-height);
    width: 100%;
    padding-top: 30px;
}
</style>
