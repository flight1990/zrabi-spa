<script setup>
import {useStore} from 'vuex';
import {computed, onMounted, ref} from "vue";
import DeleteConfirmation from "../../components/common/DeleteConfirmationComponent.vue";

const store = useStore();

const headers = [
  {title: 'ID', key: 'id', sortable: false, align: 'center'},
  {title: 'Названние', key: 'title', sortable: false},
  {title: 'Slug', key: 'slug', sortable: false},
  {title: 'Статус', key: 'is_active', sortable: false, align: 'center'},
  {title: 'Операции', key: 'actions', sortable: false},
];
const loading = ref(false);
const pages = computed(() => store.getters["pagesStore/pages"]);
const total = computed(() => store.getters["pagesStore/total"]);
const params = computed(() => store.getters["pagesStore/params"]);

const fetchPages = async () => {
  try {
    loading.value = true;
    await store.dispatch('pagesStore/fetchPages', params.value);
  } catch (e) {
    console.error(e);
  } finally {
    loading.value = false;
  }
};

const deletePage = async (id) => {
  try {
    await store.dispatch('pagesStore/deletePage', id);
  } catch (e) {
    console.error(e);
  }
}

const pageUpdateHandler = (event) => {
  params.value.page = event;
  fetchPages();
}

const limitUpdateHandler = (event) => {
  params.value.limit = event;
  fetchPages();
}

onMounted(async () => await fetchPages());

</script>

<template>
  <v-card>
    <v-card-title>Страницы</v-card-title>

    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn color="primary" variant="tonal" :to="{ name: 'pages.create' }">Создать</v-btn>
    </v-card-actions>

    <v-data-table-server
        :headers="headers"
        :loading="loading"
        :items="pages"
        :items-length="total"
        :page="params.page"
        :items-per-page="params.limit"
        @update:page="pageUpdateHandler"
        @update:itemsPerPage="limitUpdateHandler"
    >
      <template v-slot:item.is_active="{ item }">
        <v-chip :color="item.is_active ? 'primary' : 'pink'">
          {{ item.is_active ? 'Активна' : 'Не активна' }}
        </v-chip>
      </template>

      <template v-slot:item.actions="{ item }">
        <div class="d-md-flex align-center">
          <v-btn variant="text" icon fab :to="{ name: 'pages.edit', params: { id: item.id } }">
            <v-icon>mdi-pencil</v-icon>
          </v-btn>

          <DeleteConfirmation
              @modal:confirmed="deletePage(item.id)"
          />
        </div>
      </template>
    </v-data-table-server>
  </v-card>
</template>