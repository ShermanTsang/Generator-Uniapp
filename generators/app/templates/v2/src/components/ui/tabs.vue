<template>
    <view class="tabs flex flex-row flex-wrap items-center justify-between">
        <view
            v-for="(item, index) in list"
            :key="item.key"
            :class="[`${activeTabKey === item.key ? activeColorClass + ' tabs__item--active' : inactiveColorClass} pb-1 ${index + 1 !== list.length && 'mr-4'}`]"
            style="font-size: 15px"
            @tap.stop="clickItem(item)"
        >
            <view v-if="item.icon" class="mr-1 inline">
                <ui-icon :color="iconColor" :name="item.icon" />
            </view>
            {{ item.text }}
            <ui-tag v-if="item.tag" color="blue-300" rounded="full">{{ item.tag }}</ui-tag>
        </view>
    </view>
</template>

<script lang="ts">
import Vue from "vue";

interface DataType extends Partial<Code.BaseDataType> {
    state: {
        activeTabKey: string;
    };
}

export default Vue.extend({
    name: 'UiTabs',
    props: {
        list: {
            type: Array,
            default: () => [],
            required: true
        },
        activeTab: {
            type: String,
            default: '',
            required: false
        },
        autoSetDefaultValue: {
            type: Boolean,
            default: true,
            required: false
        },
        defaultTabKey: {
            type: String,
            default: '',
            required: false
        },
        activeColorClass: {
            type: String,
            default: 'text-gray-800',
            required: false
        },
        inactiveColorClass: {
            type: String,
            default: 'text-gray-400',
            required: false
        },
        iconColor: {
            type: String,
            default: 'gray-400',
            required: false
        }
    },
    data(): DataType {
        return {
            state: {
                activeTabKey: ''
            }
        };
    },
    computed: {
        activeTabKey(): string {
            if (!this.activeTab && this.autoSetDefaultValue) {
                const list = this.list as Business.Component.TabItem[];
                return list[0].key;
            }
            return this.activeTab;
        }
    },
    mounted() {
        if (this.defaultTabKey) {
            this.$emit('update:activeTab', this.defaultTabKey);
        }
    },
    methods: {
        clickItem(item: Business.Component.TabItem) {
            this.state.activeTabKey = item.key;
            this.$emit('click', item);
            this.$emit('update:activeTab', item.value || item.key);
        }
    }
});
</script>

<style lang="scss">
.tabs {
    &__item--active {
        position: relative;

        &:after {
            content: '';
            position: absolute;
            bottom: 0;
            background-color: rgba(16, 129, 252, 0.6);
            height: 2px;
            left: 0;
            right: 0;
        }
    }
}
</style>
