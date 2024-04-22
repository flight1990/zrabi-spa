<script setup>
import {computed, onMounted, ref, watch} from "vue";
import {useStore} from "vuex";
import {useRouter} from "vue-router";

const dialog = ref(false);

const store = useStore();
const router = useRouter();

const props = defineProps({
  tag: {
    type: Object,
    required: false
  }
});

const types = [
  {title: 'Категории', value: 'category'},
  {title: 'Услуги', value: 'service'},
];

const isEditing = computed(() => props.tag);

const form = ref({
  title: '',
  type: 'category'
});

watch(() => dialog.value, (val) => {
  if (val) {
    error.value = {};
    form.value.title = props.tag?.title ?? '';
    form.value.type = props.tag?.type ?? 'category';
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

const updateTag = async () => {
  try {
    loading.value = true;

    const payload = {...form.value};

    await store.dispatch('tagsStore/updateTag', {payload, id: props.tag.id});

    closeHadler();

  } catch (e) {
    error.value = e.response.data.errors;
  } finally {
    loading.value = false;
  }
}

const createTag = async () => {
  try {
    loading.value = true;

    const payload = {...form.value};

    await store.dispatch('tagsStore/createTag', payload);

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
          {{ isEditing ? 'Редактировать' : 'Создать' }} тег
        </v-card-title>

        <v-card-text>
          <v-select
              label="Тип"
              :items="types"
              item-title="title"
              item-value="value"
              v-model="form.type"
              :error-messages="error.type"
          />

          <v-text-field
              v-model="form.title"
              :error-messages="error.title"
          />
        </v-card-text>

        <template v-slot:actions>
          <v-spacer></v-spacer>

          <v-btn @click="closeHadler">Отмена</v-btn>

          <v-btn
              @click="isEditing ? updateTag() : createTag()"
              :disabled="loading"
          >
            {{ isEditing ? 'Обновить' : 'Создать' }}
          </v-btn>
        </template>
      </v-card>
    </v-dialog>
  </div>
</template>