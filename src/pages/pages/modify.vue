<script setup>
import {useStore} from "vuex";
import {useRouter} from "vue-router";
import {computed, onMounted, ref} from "vue";

const store = useStore();
const router = useRouter();

const pageId = computed(() => router.currentRoute.value.params.id);
const isEditing = computed(() => !!pageId.value);

const form = ref({
  title: '',
  content: '',
});

const error = ref({});
const loading = ref(false);

const fetchPage = async () => {
  try {
    loading.value = true;

    await store.dispatch('pagesStore/fetchPage', pageId.value);
    const currentPage = store.getters['pagesStore/currentPage'];

    Object.assign(form.value, currentPage);

  } catch (error) {
    console.error('Error fetching page:', error);
  } finally {
    loading.value = false;
  }
};

const updatePage = async () => {
  try {
    loading.value = true;

    const payload = {...form.value};

    await store.dispatch('pagesStore/updatePage', {payload, id: pageId.value});

  } catch (e) {
    error.value = e.response.data.errors;
  } finally {
    loading.value = false;
  }
}

const createPage = async () => {
  try {

    loading.value = true;
    const payload = {...form.value};

    await store.dispatch('pagesStore/createPage', payload);

  } catch (e) {
    error.value = e.response.data.errors;
  } finally {
    loading.value = false;
  }
}

onMounted(() => {
  if (isEditing.value) {
    fetchPage();
  }
});
</script>

<template>
  <div>
    <v-card :loading="loading">
      <v-card-title>
        {{ isEditing ? 'Редактировать' : 'Создать' }} страницу
      </v-card-title>

      <v-card-text>
        <v-form>
          <v-text-field
              label="Название"
              v-model="form.title"
              :error-messages="error.title"
          />

          <v-textarea
              label="Содержимое"
              v-model="form.content"
              :error-messages="error.content"
          />
        </v-form>
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
            variant="tonal"
            color="primary"
            @click.prevent="isEditing ? updatePage() : createPage()"
            :disabled="loading"
        >
          {{ isEditing ? 'Обновить' : 'Создать' }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>
