<template>
    <view v-if="name" :class="iconClasses" :style="iconStyles" />
</template>

<script lang="ts">
import Vue from 'vue';

type DataType = Partial<Code.BaseDataType>;

export default Vue.extend({
    props: {
        name: {
            type: String,
            default: '',
            required: true
        },
        color: {
            type: String,
            default: '',
            required: false
        },
        size: {
            type: String,
            default: '',
            required: false
        }
    },
    data(): DataType {
        return {};
    },
    computed: {
        iconClasses(): string {
            const classes: string[] = [`iconfont icon-${this.name} inline`];
            if (this.color && this.$utility.getColorValueType(this.color) === 'tailwindColorName') {
                classes.push(this.color.includes('text-') ? this.color : `text-${this.color}`);
            }
            if (this.size && this.$utility.getSizeValueType(this.size) === 'tailwindSizeName') {
                classes.push(this.size.includes('text-') ? this.size : `text-${this.size}`);
            }
            return classes.join(' ');
        },
        iconStyles(): string {
            const styles: string[] = [];
            if (this.color && this.$utility.getColorValueType(this.color) === 'rawCssColorValue') {
                styles.push(`color: ${this.color}`);
            }
            if (this.size && this.$utility.getSizeValueType(this.size) === 'rawHtmlSizeValue') {
                styles.push(`font-size: ${this.size}`);
            }
            return styles.join(';');
        }
    }
});
</script>

<style lang="scss"></style>
