<script setup>
import {ref} from "vue";

const dialog = ref(false);

const emits = defineEmits(['modal:confirmed', 'modal:canceled', 'modal:opened']);

const openHandler = () => {
  dialog.value = true;
  emits('modal:opened');
}

const cancelHandler = () => {
  dialog.value = false;
  emits('modal:canceled');
}

const confirmHandler = () => {
  dialog.value = false;
  emits('modal:confirmed');
}

</script>

<template>
  <div>
    <v-btn @click="openHandler" icon variant="text">
      <v-icon>mdi-trash-can-outline</v-icon>
    </v-btn>

    <v-dialog
        v-model="dialog"
        width="auto"
    >
      <v-card
          max-width="650"
          prepend-icon="mdi-trash-can-outline"
          text="Вы уверены, что хотите удалить запись из базы данных?"
          title="Внимание!"
      >
        <template v-slot:actions>
          <v-spacer></v-spacer>

          <v-btn @click="cancelHandler">Отмена</v-btn>
          <v-btn @click="confirmHandler">Ok</v-btn>
        </template>
      </v-card>
    </v-dialog>
  </div>
</template>