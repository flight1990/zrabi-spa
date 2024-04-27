<script setup>
import {reactive, ref, toRefs, watch} from "vue";
import {useStore} from "vuex";

const props = defineProps({
  category: {
    type: Object,
  }
});

const {category} = toRefs(props);

const store = useStore();
const dialog = ref(false);

const payload = reactive({
  title: null
});

watch(() => dialog.value, (val) => {
  if (val) {
    error.value = {};
    payload.title = category.value?.title ?? null;
  }
});

const error = ref({});
const loading = ref(false);

const openHandler = () => {
  dialog.value = true;
}

const closeHadler = () => {
  dialog.value = false;
}

const createCategory = async () => {
  try {
    loading.value = true;
    await store.dispatch("categoriesStore/createCategory", payload);

    closeHadler();
  } catch (e) {
    error.value = e.response.data.errors;
  } finally {
    loading.value = false;
  }
}

const updateCategory = async () => {
  try {
    loading.value = true;
    await store.dispatch("categoriesStore/updateCategory", {payload: payload, id: category.value.id});

    closeHadler();
  } catch (e) {
    error.value = e.response.data.errors;
  } finally {
    loading.value = false;
  }
}

</script>

<template>
  <div>
    <v-btn icon variant="text" @click="openHandler" v-if="category">
      <v-icon>mdi-pencil</v-icon>
    </v-btn>

    <v-btn @click="openHandler" color="primary" variant="tonal" v-else>
      Создать
    </v-btn>

    <v-dialog
        v-model="dialog"
        width="auto"
    >
      <v-card width="400" :loading="loading">
        <v-card-title>
          {{ category ? 'Редактировать' : 'Создать' }} категорию
        </v-card-title>

        <v-card-text>
          <v-text-field
              autofocus
              label="Название"
              v-model="payload.title"
              :error-messages="error.title"
          />
        </v-card-text>

        <template v-slot:actions>
          <v-spacer></v-spacer>

          <v-btn @click="closeHadler">Отмена</v-btn>

          <v-btn
              @click="category ? updateCategory() : createCategory()"
              :disabled="loading"
          >
            {{ category ? 'Обновить' : 'Создать' }}
          </v-btn>
        </template>
      </v-card>
    </v-dialog>
  </div>
</template>