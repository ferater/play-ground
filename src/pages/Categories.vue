<template>
  <q-page padding>
    <lis-item
      :items="categories"
      :name="name"
      :url="url"
      :relation="relation"
      :icon="icon"
      @refresh="getItemList({ url })"
    />
  </q-page>
</template>

<script>
import { mapActions, mapState } from "vuex";
import LisItem from "components/ListItem";

export default {
  name: "PageCategory",
  components: {
    LisItem
  },
  data() {
    return {
      url: this.$route.path.substring(1),
      relation: 'products',
      name: this.$t("categories.category"),
      icon: "las la-dragon"
    };
  },
  methods: {
    ...mapActions("resource", {
      getItemList: "getItemList"
    })
  },
  computed: {
    ...mapState({
      categories: state => state.resource.categories
    }),
    resourceForm: {
      get() {
        return this.$store.state.resource.resourceForm;
      },
      set() {
        this.hideResourceForm();
      }
    }
  },
  created() {
    this.getItemList({ url: this.url });
  }
};
</script>
