<template>
    <view class="py-6">
        <view v-if="icon" class="text-center">
            <ui-icon :name="icon" size="48px" :color="iconColor" />
        </view>
        <view class="mt-4 text-sm text-gray-600 text-center">
            {{ text }}
        </view>
        <view v-if="description" class="text-gray-400 text-xs leading-5 mt-4">
            {{ description }}
        </view>
        <slot></slot>
    </view>
</template>

<script lang="ts">
import Vue from 'vue';

type DataType = Partial<Code.BaseDataType>;

export default Vue.extend({
    name: 'UiTip',
    props: {
        icon: {
            type: String,
            default: '',
            required: false
        },
        iconColor: {
            type: String,
            default: '',
            required: false
        },
        text: {
            type: String,
            default: '',
            required: true
        },
        description: {
            type: String,
            default: '',
            required: true
        }
    },
    data(): DataType {
        return {};
    },
    methods: {}
});
</script>

<style lang="scss"></style>
