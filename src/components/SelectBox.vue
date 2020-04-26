<template>
  <q-select
    v-model="model"
    :label="label"
    option-value="id"
    option-label="name"
    :options="items"
    @filter="filterFn"
    @filter-abort="abortFilterFn"
    @input="$emit('setValue')"
    style="width: 250px"
    :clearable="clearable"
  >
    <template v-slot:no-option>
      <q-item>
        <q-item-section class="text-grey">No Options</q-item-section>
      </q-item>
    </template>
  </q-select>
</template>

<script>
import { mapActions, mapState } from "vuex";
export default {
  name: "SelectBox",
  props: {
    label: {
      type: String
    },
    url: {
      type: String,
      required: true
    },
    clearable: {
      type: Boolean
    }
  },
  data() {
    return {
      model: null,
      options: null
    };
  },
  methods: {
    ...mapActions("resource", {
      getItemList: "getItemList"
    }),

    /**** */
    filterFn(val, update, abort) {
      if (this.options !== null) {
        // already loaded
        update();
        return;
      }

     setTimeout(() => {
        update(() => {
        this.getItemList({ url: this.url }).then(() => {
          this.options = this.items;
          console.log("SelectBox Update");
        });
      });
     },500)
    },

    abortFilterFn() {
      console.log("delayed filter aborted");
    }
    /**** */
  },
  computed: {
    items() {
      return this.$store.state.resource[this.url];
    }
    // ...mapState({
    //   items: state => state.resource[this.url]
    // })
  }
};
</script>