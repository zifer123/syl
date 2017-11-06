<template>
  <div>
    <mavonEditor v-model="val"></mavonEditor>
  </div>
</template>

<script>
  import { mavonEditor } from 'mavon-editor'
  import 'mavon-editor/dist/css/index.css'
  export default {
    data() {
      return {
        val: ''
      }
    },
    components: {
      mavonEditor
    }
  }
</script>
