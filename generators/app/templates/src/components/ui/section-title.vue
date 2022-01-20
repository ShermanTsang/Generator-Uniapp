<template>
    <view class="flex flex-row justify-between items-center" :style="{ margin: `${yGap}rpx ${xGap}rpx` }">
        <view :class="sectionTitleClasses">
            <slot></slot>
        </view>
        <slot name="right"></slot>
    </view>
</template>

<script lang="ts">
import Vue from 'vue';

type DataType = Partial<Code.BaseDataType>;

export default Vue.extend({
    props: {
        xGap: {
            type: [String, Number],
            default: 40,
            required: false
        },
        yGap: {
            type: [String, Number],
            default: 30,
            required: false
        },
        theme: {
            type: String,
            default: 'simple',
            required: false
        }
    },
    data(): DataType {
        return {};
    },
    computed: {
        sectionTitleClasses() {
            const classes = ['tracking-wide'];
            if (this.theme === 'simple') {
                classes.push('text-base text-gray-900');
            }
            if (this.theme === 'feature') {
                classes.push('text-xs inline-block pl-4 py-1 pr-2 text-xs rounded-r bg-gradient-to-tl from-transparent to-blue-100 text-blue-400');
            }
            return classes;
        }
    }
});
</script>

<style lang="scss"></style>
