<template>
    <view class="avatar shadow" :style="avatarStyles">
        <view v-if="url">
            <img :src="url" class="avatar__image" />
        </view>
        <view v-else-if="text" class="w-full h-full flex flex-row justify-center items-center text-white" :style="textAvatarStyles">
            {{ text.length > 1 ? text[text.length - 1] : text }}
        </view>
        <view v-else>
            <ui-icon name="user" :size="`${Math.round(size / 1.8)}px`"></ui-icon>
        </view>
    </view>
</template>

<script lang="ts">
import Vue from 'vue';

type DataType = Partial<Code.BaseDataType>;

export default Vue.extend({
    name: 'UiAvatar',
    props: {
        url: {
            type: String,
            default: '',
            required: true
        },
        size: {
            type: Number,
            default: 64,
            required: false
        },
        text: {
            type: String,
            default: '',
            required: false
        },
        rounded: {
            type: Boolean,
            default: true,
            required: false
        }
    },
    data(): DataType {
        return {};
    },
    computed: {
        textAvatarStyles(): string {
            const [fromColor, toColor] = [this.$utility.generateRandomColorValue(), this.$utility.generateRandomColorValue()];
            const styles: string[] = [`background: linear-gradient(to bottom right, ${fromColor} 20%, ${toColor} 100%)`, 'opacity: 0.6'];
            return styles.join(';');
        },
        avatarStyles(): string {
            const styles: string[] = [];
            if (this.rounded) {
                styles.push('border-radius: 100%');
            }
            if (this.size) {
                styles.push(`width: ${this.size}px;height: ${this.size}px`);
            }
            return styles.join(';');
        }
    }
});
</script>

<style lang="scss">
$prefix: 'avatar';

.#{$prefix} {
    object-fit: cover;
    display: flex;
    flex-flow: row nowrap;
    justify-content: center;
    align-items: center;
    overflow: hidden;

    &__image {
        width: 100%;
        height: 100%;
    }
}
</style>
