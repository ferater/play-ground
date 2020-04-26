<template>
  <q-page padding>
    <lis-item
      :items="categories"
      :url="url"
      :icon="icon"
      :name="name"
      @refresh="getItemList({ url })"
    />
    <q-separator />
    <q-separator />
    <q-separator />
    <q-separator />
    <q-separator />
    <q-separator />
    <q-separator />
    {{categories}}
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
