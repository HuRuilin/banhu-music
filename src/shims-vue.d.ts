/* eslint-disable */
declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

declare module 'good-storage'

declare type Person ={
  name:string;
  age:number;
  sex?:string;
}

declare module '*.png';
