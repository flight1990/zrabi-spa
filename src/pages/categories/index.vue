<script setup>
import {useStore} from "vuex";
import {computed, onMounted, ref} from "vue";
import ModifyModal from "./components/modifyComponent.vue";
import DraggableComponent from "./components/DraggableComponent.vue";
import {debounce} from "lodash";

const store = useStore();

const loading = ref(false);
const categories = computed(() => store.getters["categoriesStore/categories"]);

const fetchCategories = async () => {
  try {
    loading.value = true;
    await store.dispatch("categoriesStore/fetchCategories");
  } catch (e) {

  } finally {
    loading.value = false;
  }
}

onMounted(async () => await fetchCategories());

const rebuildCategoriesTree = debounce(async (data) => {
  try {

    loading.value = true;
    await store.dispatch("categoriesStore/rebuildCategoriesTree", {data: data});

  } catch (e) {
    console.log(e);
  } finally {
    loading.value = false;
  }
}, 500);

</script>

<template>
  <v-card :loading="loading" :disabled="loading">
    <v-card-title>Категории</v-card-title>

    <v-card-actions>
      <v-spacer></v-spacer>
      <ModifyModal/>
    </v-card-actions>

    <DraggableComponent
        :items="categories"
        @update:sort="rebuildCategoriesTree"
    />
  </v-card>
</template>