<template>
    <view class="navbar">
        <view :class="{ 'navbar--fixed': fixed }" class="navbar__main">
            <ui-status-bar v-if="statusBar" />
            <view :style="{ color: color }" class="navbar__main__header navbar__main__view">
                <view class="navbar__main__header-btns navbar__main__header-btns-left navbar__main__view" @tap="onClickLeft">
                    <view v-if="leftIcon" class="navbar__main__view">
                        <ui-icon :color="color" :name="leftIcon" size="24" class="mr-2" />
                    </view>
                    <view v-if="leftText.length" :class="{ 'navbar-btn-icon-left': !leftIcon }" class="navbar-btn-text navbar__main__view">
                        <text :style="{ color: color }" class="tracking-wider">{{ leftText }}</text>
                    </view>
                    <slot name="left" />
                </view>
                <view class="navbar__main__header-container navbar__main__view" @tap="onClickTitle">
                    <view v-if="title.length" class="navbar__main__header-container-inner navbar__main__view">
                        <text class="navbar-text" :style="{ color: color }">{{ title }}</text>
                    </view>
                    <!-- 标题插槽 -->
                    <slot />
                </view>
                <view :class="title.length ? 'navbar__main__header-btns-right' : ''" class="navbar__main__header-btns navbar__main__view" @tap="onClickRight">
                    <view v-if="rightIcon" class="navbar__main__view navbar__main__header-btns-right">
                        <ui-icon :color="color" :name="rightIcon" size="24" class="ml-2" />
                    </view>
                    <!-- 优先显示图标 -->
                    <view v-if="rightText.length && !rightIcon" class="navbar-btn-text navbar__main__view">
                        <text>{{ rightText }}</text>
                    </view>
                    <slot name="right" />
                </view>
            </view>
        </view>
        <view v-if="fixed" class="navbar__placeholder">
            <ui-status-bar v-if="statusBar" />
            <view class="navbar__placeholder-view" />
        </view>
    </view>
</template>

<script lang="ts">
import Vue from 'vue';

type DataType = Partial<Code.BaseDataType>;

export default Vue.extend({
    name: 'UiNavBar',
    props: {
        title: {
            type: String,
            default: ''
        },
        leftText: {
            type: String,
            default: ''
        },
        rightText: {
            type: String,
            default: ''
        },
        leftIcon: {
            type: String,
            default: null
        },
        rightIcon: {
            type: String,
            default: null
        },
        fixed: {
            type: [Boolean, String],
            default: false
        },
        color: {
            type: String,
            default: 'rgba(255,255,255,.8)'
        },
        statusBar: {
            type: [Boolean, String],
            default: false
        }
    },
    mounted() {
        if (uni.report && this.title !== '') {
            uni.report('title', this.title);
        }
    },
    methods: {
        onClickLeft() {
            this.$emit('clickLeft');
        },
        onClickRight() {
            this.$emit('clickRight');
        },
        onClickTitle() {
            this.$emit('clickTitle');
        }
    }
});
</script>

<style lang="scss" scoped>
$nav-height: 44px;

.navbar {
    &-text {
        /* #ifdef APP-PLUS */
        font-size: 34 rpx;
        /* #endif */
        /* #ifndef APP-PLUS */
        font-size: 16px;
        /* #endif */
    }

    &__main {
        position: relative;
        background: linear-gradient(135deg, rgba(52, 141, 230, 0.98), rgba(110, 218, 251, 0.99));
        box-shadow: 0 2px 8px 2px rgba(0, 0, 0, 0.05);
        overflow: hidden;
        padding: 0 10px;

        &__view {
            /* #ifndef APP-NVUE */
            display: flex;
            /* #endif */
            align-items: center;
            flex-direction: row;
            // background-color: #FFFFFF;
        }

        &__header {
            padding: 0 10px;
            /* #ifndef APP-NVUE */
            display: flex;
            /* #endif */
            flex-direction: row;
            height: $nav-height;
            line-height: $nav-height;
            font-size: 16px;
            // background-color: #ffffff;
        }

        &__header-btns {
            /* #ifndef APP-NVUE */
            display: flex;
            /* #endif */
            flex-wrap: nowrap;
            width: 120 rpx;
            // padding: 0 6px;
            justify-main: center;
            align-items: center;
            /* #ifdef H5 */
            cursor: pointer;
            /* #endif */
        }

        &__header-btns-left {
            /* #ifndef APP-NVUE */
            display: flex;
            /* #endif */
            width: 120 rpx;
            justify-main: flex-start;
        }

        &__header-btns-right {
            /* #ifndef APP-NVUE */
            display: flex;
            /* #endif */
            width: 150 rpx;
            padding-right: 30 rpx;
            justify-main: flex-end;
        }

        &__header-container {
            flex: 1;
        }

        &__header-container-inner {
            /* #ifndef APP-NVUE */
            display: flex;
            /* #endif */
            flex: 1;
            align-items: center;
            justify-main: center;
            font-size: 12px;
        }
    }

    &__placeholder-view {
        height: $nav-height;
    }

    &--fixed {
        position: fixed;
        z-index: 998;
        /* #ifdef H5 */
        left: var(--window-left);
        right: var(--window-right);
        /* #endif */
        /* #ifndef H5 */
        left: 0;
        right: 0;
        /* #endif */
    }
}
</style>
