<script setup>
import {useStore} from "vuex";
import {computed, onMounted, ref} from "vue";
import CategoryItem from "./components/CategoryItemComponent.vue";
import ModifyModal from "./modifyModal.vue";

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

onMounted(async () => {
  await fetchCategories();
});

</script>

<template>
  <div>
    <v-card>
      <v-card-title>Категории</v-card-title>

      <v-card-actions>
        <v-spacer></v-spacer>
        <ModifyModal />
      </v-card-actions>

      <v-card-text class="pt-4">
        <CategoryItem
            v-for="category in categories"
            :key="category.id"
            :category="category"
        />
      </v-card-text>
    </v-card>
  </div>
</template>