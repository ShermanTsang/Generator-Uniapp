<template>
    <view class="my-2">
        <view v-for="(item, index) in list" :key="index">
            <view :class="[itemClasses]">
                <view class="text-sm text-gray-400">{{ item.text }}</view>
                <view class="text-sm text-gray-800 ml-2">
                    {{ item.value }}
                </view>
            </view>
        </view>
    </view>
</template>

<script lang="ts">
import Vue from 'vue';

type DataType = Partial<Code.BaseDataType>;

export default Vue.extend({
    props: {
        list: {
            type: Array,
            default: () => []
        },
        justify: {
            type: String,
            default: 'start'
        }
    },
    data(): DataType {
        return {};
    },
    computed: {
        itemClasses() {
            const classes = ['flex flex-row mb-2'];
            if (this.justify) {
                classes.push(`justify-${this.justify}`);
            }
            return classes;
        }
    }
});
</script>

<style lang="scss"></style>
