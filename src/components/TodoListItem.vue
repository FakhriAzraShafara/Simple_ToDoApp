<!-- eslint-disable no-unused-vars -->
<!-- eslint-disable no-unused-vars -->
<!-- eslint-disable no-unused-vars -->
<!-- eslint-disable no-unused-vars -->
<!-- eslint-disable vue/no-unused-vars -->
<template>
  <div>
    <div
      class="wrapper"
      :class="{ completed: item.completed }"
      v-for="(item, index) in g$list"
      :key="item.id"
    >
      <div>
        <p>{{ item.title }}</p>
        <p class="desc">{{ item.description }}</p>
      </div>
      <div class="btn-wrapper">
        <button
          class="btn"
          :class="{ success: !item.completed, info: item.completed }"
          @click="editTodo(item)"
        >
          {{ item.completed ? 'Undone' : 'Done' }}
        </button>
        <button class="btn" @click="deleteTodo(item.id)">Delete</button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'pinia'
import d$todo from '@/stores/dashboard/todo'

export default {
  name: 'TodoListItem',
  data() {
    return {
      editedItem: {
        id: '',
        title: '',
        description: '',
        completed: false
      },
      isModalEditVisible: false,
      confirmationVisible: false,
      deleteItemId: null,
      deleteItemTitle: ''
    }
  },
  computed: {
    ...mapState(d$todo, ['g$list'])
  },
  methods: {
    showModal(item) {
      this.editedItem = { ...item }
      this.isModalEditVisible = true
    },
    showConfirmation(itemId, title) {
      this.confirmationVisible = true
      this.deleteItemId = itemId
      this.deleteItemTitle = title
    },
    closeModal() {
      this.isModalEditVisible = false
    },
    closeModal2() {
      this.confirmationVisible = false
    },
    async updateList() {
      try {
        const updatedItem = { ...this.editedItem }
        delete updatedItem.id

        // Periksa apakah deskripsi tidak kosong
        if (!updatedItem.description) {
          throw new Error('Description is required.')
        }

        await this.a$update(this.editedItem.id, updatedItem)

        // Perbarui daftar tugas secara lokal dengan tugas yang diperbarui
        const index = this.g$list.findIndex((item) => item.id === this.editedItem.id)
        if (index !== -1) {
          this.g$list[index] = { ...this.g$list[index], ...updatedItem }
        }

        this.closeModal()

        // Perbarui data tabel secara otomatis setelah operasi pembaruan berhasil
        await this.getList()
      } catch (e) {
        console.error(e)
      }
    },

    async deleteItem() {
      try {
        await this.a$delete(this.deleteItemId)

        // Hapus item dari daftar tugas secara lokal
        this.g$list = this.g$list.filter((item) => item.id !== this.deleteItemId)

        // Perbarui data tabel secara otomatis setelah operasi penghapusan berhasil
        await this.getList()

        this.closeModal2()
      } catch (e) {
        console.error(e)
      }
    },

    ...mapActions(d$todo, ['a$list', 'a$update', 'a$delete']),
    async getList() {
      try {
        await this.a$list()
      } catch (e) {
        console.error('methods getList error', e)
      }
    },
    toggleSwitch() {
      this.editedItem.completed = !this.editedItem.completed
    }
  },
  async created() {
    await this.getList()
  }
}
</script>

<style scoped>
.wrapper {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  border: 1px solid gray;
  padding: 3px 6px;
  margin: 3px 0;
  border-radius: 8px;
  min-width: 38rem;
  transition: ease 1s;
}

.completed p {
  text-decoration: line-through;
}

.wrapper:hover {
  transform: translateX(20px);
}

.desc {
  font-size: small;
}

.success {
  background-color: greenyellow;
}

.info {
  background-color: cornflowerblue;
}

.btn-wrapper {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}
</style>
