<script setup>

import {ref} from "vue";

const drawer = ref(null);

</script>

<template>
  <v-layout>
    <v-navigation-drawer v-model="drawer">

      <v-list-item title="Admin" subtitle="vladimirborisiuk@gmail.com"></v-list-item>

      <v-divider></v-divider>

      <v-list nav>
        <v-list-item
            prepend-icon="mdi-monitor-dashboard"
            title="Главная"
            :to="{ name: 'dashboard' }"
        />
        <v-list-item
            prepend-icon="mdi-account-multiple"
            title="Пользователи"
            :to="{ name: 'users.index' }"
        />
        <v-list-item
            prepend-icon="mdi-file-document-multiple"
            title="Страницы"
            :to="{ name: 'pages.index' }"
        />
        <v-list-item
            prepend-icon="mdi-tag-multiple"
            title="Теги"
            :to="{ name: 'tags.index' }"
        />
      </v-list>
    </v-navigation-drawer>

    <v-app-bar>
      <v-app-bar-nav-icon variant="text" @click.stop="drawer = !drawer"></v-app-bar-nav-icon>

      <v-app-bar-title>SPA</v-app-bar-title>

      <v-spacer></v-spacer>

      <v-btn icon size="small">
        <v-icon>mdi-dots-vertical</v-icon>
      </v-btn>

      <v-btn icon size="small">
        <v-icon>mdi-logout</v-icon>
      </v-btn>
    </v-app-bar>

    <v-container>
      <v-main>
        <router-view></router-view>
      </v-main>
    </v-container>
  </v-layout>
</template>