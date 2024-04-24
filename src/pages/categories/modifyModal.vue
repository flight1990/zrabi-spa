<script setup>
import {computed, reactive, ref, watch} from "vue";
import {useStore} from "vuex";

const props = defineProps({
  category: {
    type: Object,
  }
});

const store = useStore();

const dialog = ref(false);

const isEditing = computed(() => props.category);

const form = reactive({
  title: ''
});

watch(() => dialog.value, (val) => {
  if (val) {
    error.value = {};
    form.title = props.category?.title ?? '';
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

    await store.dispatch("categoriesStore/createCategory", form);

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

    await store.dispatch("categoriesStore/updateCategory", {payload: form, id: props.category.id});

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
    <v-btn icon variant="text" @click="openHandler" v-if="isEditing">
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
          {{ isEditing ? 'Редактировать' : 'Создать' }} категорию
        </v-card-title>

        <v-card-text>
          <v-text-field
              label="Название"
              v-model="form.title"
              :error-messages="error.title"
          />
        </v-card-text>

        <template v-slot:actions>
          <v-spacer></v-spacer>

          <v-btn @click="closeHadler">Отмена</v-btn>

          <v-btn
              @click="isEditing ? updateCategory() : createCategory()"
              :disabled="loading"
          >
            {{ isEditing ? 'Обновить' : 'Создать' }}
          </v-btn>
        </template>
      </v-card>
    </v-dialog>
  </div>
</template>