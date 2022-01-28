<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
    mpType: 'app',
    globalData: {
        appName: '学拓帮'
    },
    methods: {
        checkAuth() {
            if (!this.$ewsedu().Auth.hasLogin) {
                uni.redirectTo({
                    url: 'pages/auth/index'
                });
            } else {
                // TODO 刷新用户和身份
            }
        }
    },
    onLaunch() {
        this.$logger(uni.getSystemInfoSync(), 'SystemInfo');
        this.checkAuth();
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
