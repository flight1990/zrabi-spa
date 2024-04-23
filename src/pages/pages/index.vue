<script setup>
import {useStore} from 'vuex';
import {computed, onMounted, ref, watch} from "vue";
import DeleteConfirmation from "../../components/common/DeleteConfirmationComponent.vue";

const store = useStore();

const headers = [
  {title: 'ID', key: 'id', sortable: false},
  {title: 'Названние', key: 'title', sortable: false},
  {title: 'Slug', key: 'slug', sortable: false},
  {title: 'Операции', key: 'actions', sortable: false},
];
const loading = ref(false);
const pages = computed(() => store.getters["pagesStore/pages"]);
const total = computed(() => store.getters["pagesStore/total"]);
const params = computed(() => store.getters["pagesStore/params"]);

const fetchPages = async () => {
  try {
    loading.value = true;
    await store.dispatch('pagesStore/fetchPages');
  } catch (error) {
    console.error('Error fetching pages:', error);
  } finally {
    loading.value = false;
  }
};

const deletePage = async (id) => {
  try {
    await store.dispatch('pagesStore/deletePage', id);
  } catch (e) {
    console.error('Error deleting users:', e);
  }
}

watch(() => params, async () => {
  await fetchPages();
}, {deep: true});

onMounted(async () => {
  await fetchPages();
});

</script>

<template>
  <div>
    <v-card>
      <v-card-title>Страницы</v-card-title>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary" variant="tonal" :to="{ name: 'pages.create' }">Создать</v-btn>
      </v-card-actions>

      <v-card-text>
        <v-data-table-server
            :headers="headers"
            :loading="loading"
            :items="pages"
            :items-length="total"
            :page="params.page"
            :items-per-page="params.limit"
            @update:page="params.page = $event"
            @update:itemsPerPage="params.limit = $event"
        >
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
      </v-card-text>
    </v-card>
  </div>
</template>