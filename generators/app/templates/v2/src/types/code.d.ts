declare namespace Code {
  export interface BaseDataType {
    /**
     * 配置参数
     */
    config: object;
    /**
     * 状态变量
     */
    state: object;
    /**
     * 用户输入：表单表格内容、用户签名
     */
    input: object;
    /**
     * 接口数据
     */
    data: object;
  }
}
