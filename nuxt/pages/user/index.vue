<template>
  <div>
    <h1>User</h1>
    <v-text-field v-model="name" label="Name"></v-text-field>
    <v-btn @click="create">Create</v-btn>
    <ul>
      <li v-for="user in users" :key="user.id">
        {{ user.id }} : {{ user.name }}
      </li>
    </ul>
  </div>
</template>

<script>
import { API } from 'aws-amplify'
import { createUser } from '~/src/graphql/mutations'
import { listUsers } from '~/src/graphql/queries'
import { onCreateUser } from '~/src/graphql/subscriptions'

export default {
  data() {
    return {
      name: '',
      users: [],
    }
  },
  created() {
    this.getUsers()
    this.subscribe()
  },
  methods: {
    async create() {
      const { name } = this
      if (!name) {
        return false
      }
      const user = { name }
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
}
</script>
