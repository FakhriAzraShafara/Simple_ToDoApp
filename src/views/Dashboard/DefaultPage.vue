<template>
  <div class="py-4 container-fluid">
    <div class="row">
      <div class="col-12">
        <button class="btn-primary rounded px-5 py-19 mb-3" type="button" @click="showModal">
          Add
        </button>
        <Modal v-show="isModalAddVisible" @close="closeModal">
          <template v-slot:header>ToDo MODAL</template>
          <template v-slot:body>
            <div class="mt-3">
              <form v-on:submit.prevent="submitAddList">
                <div class="form-group">
                  <label for="title">Title:</label>
                  <input type="text" class="form-control" id="title" v-model="input.title" />
                </div>
                <div class="form-group">
                  <label for="category">Category:</label>
                  <input type="text" class="form-control" id="category" v-model="input.category" />
                </div>
                <div class="form-group">
                  <label for="description">Description:</label>
                  <textarea
                    type="text"
                    class="form-control"
                    id="description"
                    v-model="input.description"
                  ></textarea>
                </div>
                <div class="text-center mt-4">
                  <button class="btn btn-primary px-6 fs-5" type="submit">Save</button>
                </div>
              </form>
            </div>
          </template>
        </Modal>
        <!-- ini tempat data -->
        <div>
          <TodoListItem :todo="item" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'pinia'
import d$todo from '@/stores/dashboard/todo'
import Modal from '@/components/Modal.vue'
import TodoListItem from '@/components/TodoListItem.vue'

export default {
  name: 'TodoList',
  components: {
    Modal,
    TodoListItem
  },
  data: () => ({
    input: {
      title: '',
      description: '',
      category: ''
    },
    isModalAddVisible: false
  }),
  methods: {
    showModal() {
      this.isModalAddVisible = true
    },
    closeModal() {
      this.isModalAddVisible = false
    },
    ...mapActions(d$todo, ['a$list', 'a$add']),
    async submitAddList() {
      try {
        await this.a$add({ ...this.input })
        await this.a$list()
        this.isModalAddVisible = false
        this.input.title = ''
        this.input.description = ''
        this.input.category = ''
      } catch (e) {
        console.error(e)
      }
    }
  }
}
</script>

<style scoped>
/* Add your CSS styling here */

.py-4 {
  padding-top: 1rem;
  padding-bottom: 1rem;
}

.container-fluid {
  width: 100%;
  padding-right: 15px;
  padding-left: 15px;
  margin-right: auto;
  margin-left: auto;
}

.row {
  display: flex;
  flex-wrap: wrap;
  margin-right: -15px;
  margin-left: -15px;
}

.col-12 {
  flex-basis: 0;
  flex-grow: 1;
  max-width: 100%;
}

.btn-primary {
  color: #fff;
  background-color: #007bff;
  border-color: #007bff;
  border-radius: 0.25rem;
  padding-left: 1.25rem;
  padding-right: 1.25rem;
  padding-top: 0.75rem;
  padding-bottom: 0.75rem;
  margin-bottom: 0.75rem;
  cursor: pointer;
}

.rounded {
  border-radius: 0.25rem;
}

.px-5 {
  padding-left: 1.25rem;
  padding-right: 1.25rem;
}

.py-19 {
  padding-top: 0.475rem;
  padding-bottom: 0.475rem;
}

.mb-3 {
  margin-bottom: 0.75rem;
}

.text-center {
  text-align: center;
}

.form-control {
  display: block;
  width: 100%;
  padding: 0.375rem 0.75rem;
  font-size: 1rem;
  line-height: 1.5;
  color: #495057;
  background-color: #fff;
  background-clip: padding-box;
  border: 1px solid #ced4da;
  border-radius: 0.25rem;
  transition:
    border-color 0.15s ease-in-out,
    box-shadow 0.15s ease-in-out;
}

.mt-3 {
  margin-top: 0.75rem;
}

.mt-4 {
  margin-top: 1rem;
}

.px-6 {
  padding-left: 1.5rem;
  padding-right: 1.5rem;
}

.fs-5 {
  font-size: 1.25rem;
}

/* Add additional styling here as needed */
</style>
