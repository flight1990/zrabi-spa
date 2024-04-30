<script setup>
import {useStore} from "vuex";
import ModifyModal from "./modifyComponent.vue";
import DeleteConfirmation from "../../../components/common/DeleteConfirmationComponent.vue";
import {toRefs} from "vue";

const props = defineProps({
  category: {
    type: Object,
    required: true
  }
});

const {category} = toRefs(props);
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
  <v-card variant="outlined" elevation="2" color="primary" rounded="0">
    <div class="d-flex align-center justify-space-between">

      <div class="d-flex align-center">
        <v-icon class="handle cursor-grab mr-4" size="large">mdi-drag</v-icon>
        <div>
          <div>
            <b>{{ category.title }}</b>
          </div>
          <div>
            <small>{{ category.slug }}</small>
          </div>
        </div>
      </div>

      <div class="d-md-flex align-center">
        <ModifyModal
            :category="category"
        />
        <DeleteConfirmation
            @modal:confirmed="deleteCategory(category.id)"
        />
      </div>
    </div>
  </v-card>
</template>