<script setup>
import {useStore} from "vuex";
import {useRouter} from "vue-router";
import {computed, onMounted, reactive, ref} from "vue";

const store = useStore();
const router = useRouter();

const id = computed(() => router.currentRoute.value.params.id);
const current = computed(() => store.getters["servicesStore/currentService"]);
const categories = computed(() => store.getters["categoriesStore/flattenedCategories"]);

const payload = reactive({
  title: null,
  content: null,
  price: null,
  category_id: 1,
  is_active: false
});

const error = ref({});
const loading = ref(false);

const fetchService = async () => {
  try {
    loading.value = true;

    await store.dispatch('servicesStore/fetchService', id.value);
    Object.assign(payload, current.value);

  } catch (e) {
    console.error(e);
  } finally {
    loading.value = false;
  }
};

const updateService = async () => {
  try {
    loading.value = true;
    await store.dispatch('servicesStore/updateService', {payload, id: id.value});
  } catch (e) {
    error.value = e.response.data.errors;
  } finally {
    loading.value = false;
  }
}

const createService = async () => {
  try {

    loading.value = true;
    await store.dispatch('servicesStore/createService', payload);

  } catch (e) {
    error.value = e.response.data.errors;
  } finally {
    loading.value = false;
  }
}

onMounted(() => {
  if (id.value) fetchService();
  store.dispatch("categoriesStore/fetchCategories");
});
</script>

<template>
  <v-card :loading="loading" :disabled="loading">
    <v-card-title>
      {{ id ? 'Редактировать' : 'Создать' }} услугу
    </v-card-title>

    <v-card-text>

      <v-text-field
          autofocus
          label="Название"
          v-model="payload.title"
          :error-messages="error.title"
      />

      <v-select
        label="Категория"
        :items="categories"
        item-title="title"
        item-value="id"
        v-model="payload.category_id"
      />

      <v-textarea
          label="Содержимое"
          v-model="payload.content"
          :error-messages="error.content"
      />

      <v-text-field
          label="Цена"
          v-model="payload.price"
          :error-messages="error.price"
      />

      <v-switch
          label="Услуга активна"
          v-model="payload.is_active"
      />
    </v-card-text>

    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn
          variant="tonal"
          color="primary"
          @click.prevent="id ? updateService() : createService()"
          :disabled="loading"
      >
        {{ id ? 'Обновить' : 'Создать' }}
      </v-btn>
    </v-card-actions>
  </v-card>
</template>
