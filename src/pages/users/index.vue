<script setup>
import {useStore} from 'vuex';
import {computed, onMounted, ref} from "vue";
import DeleteConfirmation from "../../components/common/DeleteConfirmationComponent.vue";

const store = useStore();

const headers = [
  {title: 'ID', key: 'id', sortable: false, align: 'center'},
  {title: 'Ф.И.О', key: 'name', sortable: false},
  {title: 'Email', key: 'email', sortable: false},
  {title: 'Операции', key: 'actions', sortable: false},
];

const loading = ref(false);
const users = computed(() => store.getters["usersStore/users"]);
const total = computed(() => store.getters["usersStore/total"]);
const params = computed(() => store.getters["usersStore/params"]);

const fetchUsers = async () => {
  try {
    loading.value = true;
    await store.dispatch('usersStore/fetchUsers', params.value);
  } catch (e) {
    console.error(e);
  } finally {
    loading.value = false;
  }
};

const deleteUser = async (id) => {
  try {
    await store.dispatch('usersStore/deleteUser', id);
  } catch (error) {
    console.error('Error deleting users:', error);
  }
}

const pageUpdateHandler = (event) => {
  params.value.page = event;
  fetchUsers();
}

const limitUpdateHandler = (event) => {
  params.value.limit = event;
  fetchUsers();
}

onMounted(async () => await fetchUsers());

</script>

<template>
  <v-card>
    <v-card-title>Пользоватeли</v-card-title>

    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn color="primary" variant="tonal" :to="{ name: 'users.create' }">Создать</v-btn>
    </v-card-actions>

    <v-data-table-server
        :headers="headers"
        :loading="loading"
        :items="users"
        :items-length="total"
        :page="params.page"
        :items-per-page="params.limit"
        @update:page="pageUpdateHandler"
        @update:itemsPerPage="limitUpdateHandler"
    >
      <template v-slot:item.actions="{ item }">
        <div class="d-md-flex align-center">
          <v-btn variant="text" icon fab :to="{ name: 'users.edit', params: { id: item.id } }">
            <v-icon>mdi-pencil</v-icon>
          </v-btn>

          <DeleteConfirmation
              @modal:confirmed="deleteUser(item.id)"
          />
        </div>
      </template>
    </v-data-table-server>
  </v-card>
</template>