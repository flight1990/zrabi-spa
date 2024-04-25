<script setup>
import {useStore} from "vuex";
import ModifyModal from "../modifyModal.vue";
import DeleteConfirmation from "../../../components/common/DeleteConfirmationComponent.vue";

const props = defineProps({
  category: {
    type: Object,
    required: true
  },
  deph: {
    type: Number,
    default: 1
  }
});

const store = useStore();

const deleteCategory = async (id) => {
  try {
    await store.dispatch("categoriesStore/deleteCategory", id);
  } catch (e) {
    console.log(e);
  }
}

</script>

<template>
  <div>
    <v-card variant="outlined" elevation="2" color="primary" rounded="0">
      <div class="d-flex align-center justify-space-between">

        <div class="d-flex align-center">
          <v-icon class="handle cursor-grab mr-4" size="large">mdi-drag</v-icon>
          <div>
            <div>
              <b>{{ props.category.title }}</b>
            </div>
            <div>
              <small>{{ props.category.slug }}</small>
            </div>
          </div>
        </div>

        <div class="d-md-flex align-center">
          <ModifyModal
              :category="category"
          />
          <DeleteConfirmation
              @modal:confirmed="deleteCategory(props.category.id)"
          />
        </div>
      </div>
    </v-card>
  </div>
</template>