<script setup>
import Draggable from "vuedraggable";
import CategoryItem from "./CategoryItemComponent.vue"
import {useStore} from "vuex";
import {toRefs} from "vue";

const store = useStore();

const props = defineProps({
  items: {
    type: Array,
    required: true
  }
});

const {items} = toRefs(props);
const emits = defineEmits(['update:sort']);

const sortHandler = () => {
  emits('update:sort', items.value);
}

</script>

<template>
  <div>
    <draggable
        class="dragArea"
        :list="items"
        :group="{ name: 'categories', direction: 'vertical'}"
        item-key="id"
        handle=".handle"
        @sort="sortHandler"
    >
      <template #item="{ element }">
        <div>
          <CategoryItem
              :key="element.id"
              :category="element"
          />
          <div>
            <DraggableComponent
                :items="element.children"
                @update:sort="sortHandler"
            />
          </div>
        </div>
      </template>
    </draggable>
  </div>
</template>

<style scoped>
.dragArea {
  min-height: 10px;
  margin: 10px 0 10px 20px;
  padding: 5px;
  outline: 1px dashed;
}
</style>