// src/shims-vue.d.ts

// Tell TS how to handle imports of .vue single‐file components
import type { DefineComponent } from 'vue'

declare module '*.vue' {
  const component: DefineComponent<{}, {}, any>
  export default component
}
