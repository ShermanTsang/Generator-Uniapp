<template>
    <u-grid :border="false" :col="3" align="left">
        <u-grid-item v-for="(url, index) in list" :key="url" @tap="toPreviewImg(index, list)">
            <ui-image width="140px" height="140px" :src="url" :click-to-preview="false" />
        </u-grid-item>
    </u-grid>
</template>

<script lang="ts">
type DataType = Partial<Code.BaseDataType>;
export default {
    props: {
        list: {
            default: () => {
                return [];
            },
            type: Array
        }
    },
    data(): DataType {
        return {};
    },
    methods: {
        toPreviewImg(current: number, urls: string[]) {
            uni.previewImage({
                current,
                urls
            });
        }
    }
};
</script>

<style lang="scss"></style>
