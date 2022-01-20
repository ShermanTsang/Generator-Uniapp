import Vue from 'vue';

Vue.mixin({
    methods: {
        useMethod(method): void {
            if (!method) {
                return;
            }

            if (Array.isArray(method)) {
                method.forEach((item) => {
                    // @ts-ignore
                    this.executeMethod(item);
                });
            }

            if (Object.prototype.toString.call(method) === '[object Object]') {
                // @ts-ignore
                this.executeMethod(method);
            }
        },
        executeMethod(methodItem) {
            const { name: methodName, args = [], fallback = undefined }: Plugin.Mixin.UseMethodItem = methodItem;
            if (!methodName) {
                return;
            }
            if (methodName in this) {
                //@ts-ignore
                this[methodName].apply(this, [...args]);
                return;
            }
            if (fallback) {
                const { name: fallbackMethodName, args: fallbackArgs = [] } = fallback;
                if (fallbackMethodName) {
                    try {
                        // @ts-ignore
                        this[fallbackMethodName].apply(this, [...fallbackArgs]);
                        return;
                    } catch (e) {
                        this.$logger(`[ UseMethod ] No method ${methodName}() and fallback ${fallbackMethodName}() on instance.`);
                        return;
                    }
                }
            }
            this.$logger(`[ UseMethod ] No method ${methodName}() on instance.`);
        },
        toast(text: string): void {
            this.$toast(text);
        },
        setState(type: keyof Code.BaseDataType, fieldName: string, value: any): void {
            // @ts-ignore
            this.$set(this[type], fieldName, value);
        },
        getState(type: keyof Code.BaseDataType, fieldName: string, value: any): void {
            // @ts-ignore
            this.$set(this[type], fieldName, value);
        },
        gotoPage(path: string, params: object = {}) {
            this.$uView.route({ url: path, params });
        },
        gotoTab(path: string) {
            this.$uView.route({ url: path, type: 'switchTab' });
        },
        gotoBack(delta = 1) {
            this.$uView.route({ delta, type: 'back' });
        }
    }
});
