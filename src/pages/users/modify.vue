<script setup>
import {useStore} from "vuex";
import {useRouter} from "vue-router";
import {computed, onMounted, reactive, ref} from "vue";

const store = useStore();
const router = useRouter();

const id = computed(() => router.currentRoute.value.params.id);
const current = computed(() => store.getters["usersStore/currentUser"]);

const payload = reactive({
  name: null,
  email: null,
  password: null,
  password_confirmation: null
});

const error = ref({});
const loading = ref(false);

const fetchUser = async () => {
  try {
    loading.value = true;

    await store.dispatch('usersStore/fetchUser', id.value);
    Object.assign(payload, current.value);

  } catch (error) {
    console.error('Error fetching user:', error);
  } finally {
    loading.value = false;
  }
};

const updateUser = async () => {
  try {
    loading.value = true;

    if (!payload.password) delete payload.password;
    if (!payload.password_confirmation) delete payload.password_confirmation;

    await store.dispatch('usersStore/updateUser', {payload, id: id.value});

  } catch (e) {
    error.value = e.response.data.errors;
  } finally {
    loading.value = false;
  }
}

const createUser = async () => {
  try {

    loading.value = true;
    await store.dispatch('usersStore/createUser', payload);

  } catch (e) {
    error.value = e.response.data.errors;
  } finally {
    loading.value = false;
  }
}

onMounted(() => {
  if (id.value) fetchUser();
});
</script>

<template>
  <div>
    <v-card :loading="loading">
      <v-card-title>
        {{ id ? 'Редактировать' : 'Создать' }} пользователя
      </v-card-title>

      <v-card-text>
        <v-form>
          <v-text-field
              autofocus
              label="Ф.И.О"
              v-model="payload.name"
              :error-messages="error.name"
          />

          <v-text-field
              label="Email"
              v-model="payload.email"
              :error-messages="error.email"
          />

          <v-text-field
              type="password"
              label="Пароль"
              v-model="payload.password"
              :error-messages="error.password"
          />

          <v-text-field
              type="password"
              label="Подтверждение пароля"
              v-model="payload.password_confirmation"
              :error-messages="error.password_confirmation"
          />
        </v-form>

      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
            variant="tonal"
            color="primary"
            @click.prevent="id ? updateUser() : createUser()"
            :disabled="loading"
        >
          {{ id ? 'Обновть' : 'Создать' }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>
