<script lang="ts">
import Vue from "vue";

export default Vue.extend({
    mpType: 'app',
    globalData: {
        appName: 'myApp'
    },
    methods: {
    },
    onLaunch() {
        this.$logger(uni.getSystemInfoSync(), 'SystemInfo');
    }
});
</script>

<style lang="scss">
@import 'uview-ui/index.scss';
@import 'assets/styles/global';
@import 'assets/styles/extend';
@import 'assets/styles/iconfont.css';

@tailwind utilities;
</style>
