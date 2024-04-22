<script setup>
import {useStore} from "vuex";
import {useRouter} from "vue-router";
import {computed, onMounted, ref} from "vue";

const store = useStore();
const router = useRouter();

const userId = computed(() => router.currentRoute.value.params.id);
const isEditing = computed(() => !!userId.value);

const form = ref({
  name: '',
  email: '',
  password: '',
  password_confirmation: ''
});

const error = ref({});
const loading = ref(false);

const fetchUser = async () => {
  try {
    loading.value = true;

    await store.dispatch('usersStore/fetchUser', userId.value);
    const currentUser = store.getters['usersStore/currentUser'];

    Object.assign(form.value, currentUser);

  } catch (error) {
    console.error('Error fetching user:', error);
  } finally {
    loading.value = false;
  }
};

const updateUser = async () => {
  try {
    loading.value = true;

    const payload = {...form.value};

    if (!payload.password) delete payload.password;
    if (!payload.password_confirmation) delete payload.password_confirmation;

    await store.dispatch('usersStore/updateUser', {payload, id: userId.value});

  } catch (e) {
    error.value = e.response.data.errors;
  } finally {
    loading.value = false;
  }
}

const createUser = async () => {
  try {

    loading.value = true;
    const payload = {...form.value};

    await store.dispatch('usersStore/createUser', payload);

  } catch (e) {
    error.value = e.response.data.errors;
  } finally {
    loading.value = false;
  }
}

onMounted(() => {
  if (isEditing.value) {
    fetchUser();
  }
});
</script>

<template>
  <div>
    <v-card :loading="loading">
      <v-card-title>
        {{ isEditing ? 'Редактировать' : 'Создать' }} пользователя
      </v-card-title>

      <v-card-text>
        <v-form>
          <v-text-field
              autofocus
              label="Ф.И.О"
              v-model="form.name"
              :error-messages="error.name"
          />

          <v-text-field
              label="Email"
              v-model="form.email"
              :error-messages="error.email"
          />

          <v-text-field
              type="password"
              label="Пароль"
              v-model="form.password"
              :error-messages="error.password"
          />

          <v-text-field
              type="password"
              label="Подтверждение пароля"
              v-model="form.password_confirmation"
              :error-messages="error.password_confirmation"
          />
        </v-form>

      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
            variant="tonal"
            color="primary"
            @click.prevent="isEditing ? updateUser() : createUser()"
            :disabled="loading"
        >
          {{ isEditing ? 'Обновть' : 'Создать' }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>
