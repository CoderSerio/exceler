// 如果最上面的内容不是export或者import
// 那么这个文件将被当做一个TS全局脚本而不是模块
// 也就会导致declare global失效
// 所以这里加上一些无意义的export
export {}
declare global {
  interface Window {
    electron: {
      ipcRenderer: any;
      store: {
        get: (key: string) => any;
        set: (key: string, value: string) => void;
      }
    }
  }
}
