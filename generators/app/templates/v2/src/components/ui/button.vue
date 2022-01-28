<template>
    <view class="button block rounded text-white px-3 py-2 my-4 text-sm tracking-wider text-center flex flex-row justify-center items-center" @tap="$emit('click')">
        <ui-icon v-if="icon" :name="icon" class="mr-1"></ui-icon>
        <slot></slot>
    </view>
</template>

<script lang="ts">
import Vue from 'vue';

type DataType = Partial<Code.BaseDataType>;

export default Vue.extend({
    name: 'UiButton',
    props: {
        icon: {
            type: String,
            default: '',
            required: false
        }
    },
    data(): DataType {
        return {};
    },
    methods: {}
});
</script>

<style lang="scss">
$prefix: 'button';

.#{$prefix} {
    box-shadow: 2px 2px 8px rgba(110, 185, 251, 0.5);
    background: linear-gradient(135deg, rgb(52, 141, 230), rgba(110, 206, 251, 0.8));
}
</style>
