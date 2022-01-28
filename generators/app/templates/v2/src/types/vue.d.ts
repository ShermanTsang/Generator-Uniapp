import Vue from 'vue';

declare module '*.vue' {
    export default Vue;
}

declare module 'vue/types/vue' {
    import { Store } from 'vuex';

    export interface Vue {
        $store: Store;
        $api: Plugin.Api.RequestWrapper;
        $logger: Plugin.Logger.PrintToConsole;
        $toast: Plugin.Toast.Show;
        $utility: Record<string, function>;
        $ewsedu: Plugin.Ewsedu.GetHelper;
        $time: Plugin.Time.Wrapper;
        $uView: any;
        $setting: Plugin.Setting.Query;
    }
}
