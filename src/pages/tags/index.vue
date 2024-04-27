<script setup>
import {useStore} from 'vuex';
import {computed, onMounted, ref, watch} from "vue";
import DeleteConfirmation from "../../components/common/DeleteConfirmationComponent.vue";
import ModifyModal from "./components/modifyComponent.vue";

const store = useStore();

const headers = [
  {title: 'ID', key: 'id', sortable: false},
  {title: 'Название', key: 'title', sortable: false},
  {title: 'Slug', key: 'slug', sortable: false},
  {title: 'Операции', key: 'actions', sortable: false},
];

const loading = ref(false);
const tags = computed(() => store.getters["tagsStore/tags"]);
const total = computed(() => store.getters["tagsStore/total"]);
const params = computed(() => store.getters["tagsStore/params"]);

const fetchTags = async () => {
  try {
    loading.value = true;
    await store.dispatch('tagsStore/fetchTags', params);
  } catch (e) {
    console.error('Error fetching tags:', e);
  } finally {
    loading.value = false;
  }
};

const deleteTag = async (id) => {
  try {
    await store.dispatch('tagsStore/deleteTag', id);
  } catch (e) {
    console.error('Error deleting tag:', e);
  }
}

const pageUpdateHandler = (event) => {
  params.value.page = event;
  fetchTags();
}

const limitUpdateHandler = (event) => {
  params.value.limit = event;
  fetchTags();
}

onMounted(async () => {
  await fetchTags();
});

</script>

<template>
  <div>
    <v-card>
      <v-card-title>Теги</v-card-title>

      <v-card-actions>
        <v-spacer></v-spacer>
        <ModifyModal />
      </v-card-actions>

      <v-card-text>
        <v-data-table-server
            :headers="headers"
            :loading="loading"
            :items="tags"
            :items-length="total"
            :page="params.page"
            :items-per-page="params.limit"
            @update:page="pageUpdateHandler"
            @update:itemsPerPage="limitUpdateHandler"
        >
          <template v-slot:item.actions="{ item }">
            <div class="d-md-flex align-center">
              <ModifyModal
                :tag="item"
                :key="item.id"
              />
              <DeleteConfirmation
                  @modal:confirmed="deleteTag(item.id)"
              />
            </div>
          </template>
        </v-data-table-server>
      </v-card-text>
    </v-card>
  </div>
</template>