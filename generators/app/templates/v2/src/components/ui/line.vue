<template>
    <view :style="lineStyles" :class="lineClasses" />
</template>

<script lang="ts">
import Vue from 'vue';

type DataType = Partial<Code.BaseDataType>;

export default Vue.extend({
    props: {
        height: {
            type: String,
            default: '1rpx'
        },
        color: {
            type: String,
            default: 'gray-100',
            required: false
        },
        yGap: {
            type: [Number, String],
            default: 0,
            required: false
        },
        xGap: {
            type: Number,
            default: 0,
            required: false
        }
    },
    data(): DataType {
        return {};
    },
    computed: {
        lineClasses(): string {
            const classes: string[] = ['w-full'];
            if (this.color && this.$utility.getColorValueType(this.color) === 'tailwindColorName') {
                classes.push(this.color.includes('bg-') ? this.color : `bg-${this.color}`);
            }
            if (this.xGap) {
                classes.push(`mx-${this.xGap}`);
            }
            if (this.yGap) {
                classes.push(`my-${this.yGap}`);
            }
            return classes.join(' ');
        },
        lineStyles(): string {
            const styles: string[] = [`height: ${this.height}`];
            if (this.color && this.$utility.getColorValueType(this.color) === 'rawCssColorValue') {
                styles.push(`background-color: ${this.color}`);
            }
            return styles.join(';');
        }
    }
});
</script>

<style lang="scss"></style>
