<script setup>
import {useStore} from "vuex";
import {computed, onMounted, ref} from "vue";
import CategoryItem from "./components/CategoryItemComponent.vue";
import ModifyModal from "./modifyModal.vue";
import Draggable from "vuedraggable";

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

const rebuildCategoriesTree = async () => {
  try {

    loading.value = true;
    await store.dispatch("categoriesStore/rebuildCategoriesTree", {data: categories.value});

  } catch (e) {
    console.log(e);
  } finally {
    loading.value = false;
  }
}

onMounted(async () => {
  await fetchCategories();
});

</script>

<template>
  <div>
    <v-card :loading="loading">
      <v-card-title>Категории</v-card-title>

      <v-card-actions>
        <v-spacer></v-spacer>
        <ModifyModal/>
      </v-card-actions>

      <v-card-text class="pt-4">
        <draggable
            :list="categories"
            class="dragArea"
            :group="{ name: 'categories' }"
            item-key="id"
            handle=".handle"
            @sort="rebuildCategoriesTree"
        >
          <template #item="{ element }">
            <CategoryItem
                :key="element.id"
                :category="element"
            />

          </template>
        </draggable>
      </v-card-text>
    </v-card>
  </div>
</template>

<style scoped>
.dragArea {
  min-height: 50px;
  padding: 10px;
  outline: 1px dashed;
}
</style>