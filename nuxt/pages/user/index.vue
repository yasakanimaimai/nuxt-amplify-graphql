<template>
  <div>
    <h1>User</h1>
    <v-text-field v-model="name" label="Name"></v-text-field>
    <v-btn @click="create">Create</v-btn>

    <h2>users</h2>
    <ul>
      <li v-for="user in users" :key="user.id">
        {{ user.id }} : {{ user.name }}
      </li>
    </ul>

    <h2>asyncUsers</h2>
    <ul>
      <li v-for="user in asyncUsers" :key="user.id">
        {{ user.id }} : {{ user.name }}
      </li>
    </ul>
    <child-component />
  </div>
</template>

<script>
import { API } from 'aws-amplify'
import { createUser } from '~/src/graphql/mutations'
import { listUsers } from '~/src/graphql/queries'
import { onCreateUser } from '~/src/graphql/subscriptions'
import ChildComponent from '~/components/ChildComponent'

export default defineNuxtComponent({
  components: {
    ChildComponent,
  },
  data() {
    return {
      hoge: 'hoge',
      name: '',
      users: [],
    }
  },
  async asyncData() {
    console.log('asyncData: インスタンス生成前')
    const users = await API.graphql({
      query: listUsers,
    })
    return {
      asyncUsers: users.data.listUsers.items,
    }
  },
  async beforeCreate() {
    console.log('beforeCreate: インスタンス生成前')
    // インスタンスが生成されていないので hoge is not defined
    // console.log({ hoge })
  },
  async created() {
    console.log('created: インスタンス生成後 DOMマウント前')
    console.log('マウントしているDOM要素:', this.$el)
    await this.getUsers()
    this.subscribe()
  },
  beforeMount() {
    console.log('マウント直前 DOMはまだ作成されていない')
  },
  mounted() {
    console.log('mounted: DOM生成直後に実行')
    console.log('マウントしているDOM要素:', this.$el)
  },
  methods: {
    async create() {
      const user = { name: this.name }
      await API.graphql({
        query: createUser,
        variables: { input: user },
      })
      this.name = ''
    },
    async getUsers() {
      const users = await API.graphql({
        query: listUsers,
      })
      this.users = users.data.listUsers.items
    },
    subscribe() {
      API.graphql({ query: onCreateUser }).subscribe({
        next: (eventData) => {
          const user = eventData.value.data.onCreateUser
          if (this.users.some((item) => item.name === user.name)) {
            return // remove duplications
          }
          this.users = [...this.users, user]
        },
      })
    },
  },
})
</script>
