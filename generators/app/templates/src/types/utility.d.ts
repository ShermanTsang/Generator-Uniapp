declare namespace Utility {
    export type AnyObject = Record<string | number | symbol, any>;
    export type ValueOf<T> = T[keyof T];
}
