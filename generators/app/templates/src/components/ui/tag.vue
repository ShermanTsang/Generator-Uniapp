<template>
    <view v-if="show" :class="tagClasses" :style="tagStyles" @tap="$emit('click')">
        <ui-icon v-if="icon" :name="icon" :size="size" :color="color"></ui-icon>
        <slot></slot>
    </view>
</template>

<script lang="ts">
import Vue from 'vue';

type DataType = Partial<Code.BaseDataType>;

export default Vue.extend({
    props: {
        isShow: {
            type: [Boolean, String],
            default: 'unset',
            required: false
        },
        color: {
            type: String,
            default: '#666',
            required: false
        },
        size: {
            type: String,
            default: '',
            required: false
        },
        icon: {
            type: String,
            default: '',
            required: false
        },
        showBorder: {
            type: Boolean,
            default: false,
            required: false
        },
        withImage: {
            type: Boolean,
            default: false,
            required: false
        },
        rounded: {
            type: [String, Boolean],
            default: false,
            required: false
        }
    },
    data(): DataType {
        return {};
    },
    computed: {
        show(): boolean {
            if (this.isShow === 'unset' || this.isShow === null) {
                return true;
            }
            if (!this.isShow) {
                return false;
            }
            return Boolean(this.isShow);
        },
        tagClasses(): string {
            const classes: string[] = [`inline-flex px-2 rounded mx-1 text-xs flex-row items-center justify-between overflow-hidden`];
            if (this.color && this.$utility.getColorValueType(this.color) === 'tailwindColorName') {
                classes.push(this.color.includes('text-') ? this.color : `text-${this.color}`);
                classes.push(`bg-opacity-10 bg-${this.color}`);
                this.showBorder && classes.push(`border-1 border-current`);
            }
            if (this.withImage) {
                classes.push('pl-0');
            }
            if (this.size && this.$utility.getSizeValueType(this.size) === 'tailwindSizeName') {
                classes.push(this.size.includes('text-') ? this.size : `text-${this.size}`);
            }
            if (this.rounded) {
                classes.push(`rounded-${this.rounded}`);
            }
            return classes.join(' ');
        },
        tagStyles(): string {
            const styles: string[] = [`border: 1px solid transparent`];
            if (this.color && this.$utility.getColorValueType(this.color) === 'rawCssColorValue') {
                styles.push(`color: ${this.color}`);
                styles.push(`background-color: rgba(${this.$utility.getColorValueFromHexToRgba(this.color)},.1)`);
                styles.push(`border-color: rgba(${this.$utility.getColorValueFromHexToRgba(this.color)},.2)`);
            }
            if (this.size && this.$utility.getSizeValueType(this.size) === 'rawHtmlSizeValue') {
                styles.push(`font-size: ${this.size} !important`);
            }
            return styles.join(';');
        }
    }
});
</script>

<style lang="scss"></style>
