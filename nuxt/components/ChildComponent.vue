<template>
  <div>
    <h1>子コンポーネント</h1>
  </div>
</template>

<script>
export default defineNuxtComponent({
  name: 'ChildComponent', // コンポーネントの名前
  components: {
    // 他のコンポーネントを登録
  },
  props: {
    // プロパティを定義
  },
  data() {
    // レスポンシブなデータを返す
    return {
      // データを定義
    }
  },
  computed: {
    // 計算プロパティを定義
  },
  watch: {
    // ウォッチャを定義
  },
  methods: {
    // メソッドを定義
  },
  beforeCreate() {
    // フック: インスタンスが作成される前
  },
  created() {
    // フック: インスタンスが作成された後
  },
  beforeMount() {
    // フック: マウントする前
  },
  mounted() {
    // フック: マウントした後
  },
  beforeUpdate() {
    // フック: 更新する前
  },
  updated() {
    // フック: 更新した後
  },
  beforeDestroy() {
    // フック: 破棄する前
  },
  destroyed() {
    // フック: 破棄した後
  },
  render(h) {
    // レンダリング関数を定義
  },
})
</script>

<style scoped>
/* ここにスタイルを書く */
</style>
