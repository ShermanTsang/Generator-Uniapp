<template>
    <u--image :show-loading="true" :lazy-load="true" :src="src" :radius="radius" :width="width" :height="height" :mode="mode" @tap="clickImage">
        <ui-tag slot="error" color="yellow-500">图像加载失败</ui-tag>
    </u--image>
</template>

<script lang="ts">
import Vue from 'vue';

type DataType = Partial<Code.BaseDataType>;

export default Vue.extend({
    props: {
        src: {
            type: String,
            default: ''
        },
        height: {
            type: String,
            default: '200rpx'
        },
        width: {
            type: String,
            default: '200rpx'
        },
        radius: {
            type: String,
            default: ''
        },
        clickToPreview: {
            type: Boolean,
            default: true
        },
        mode: {
            type: String,
            default: 'aspectFill'
        }
    },
    data(): DataType {
        return {};
    },
    computed: {},
    methods: {
        clickImage() {
            if (this.clickToPreview) {
                uni.previewImage({ current: 0, urls: [this.src] });
            }
            this.$emit('click');
        }
    }
});
</script>

<style lang="scss"></style>
