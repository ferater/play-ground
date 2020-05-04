<template>
  <q-page padding>
    <dynamic-table
      :columns="columns"
      :data="users"
      @refresh="getItemList({ url })"
      :icon="icon"
      :url="url"
      :name="name"
    />
  </q-page>
</template>

<script>
import DynamicTable from "../components/DynamicTable";
import { mapActions, mapState } from "vuex";
export default {
  name: "PageUsers",
  components: {
    DynamicTable
  },
  data() {
    return {
      url: this.$route.path.substring(1),
      name: this.$t("users.user"),
      icon: "people",
      /*** Tablo */
      tableTitle: "Kullanıcılar",
      columns: [
        {
          name: "name",
          required: true,
          label: "Adı Soyadı",
          align: "left",
          field: row => row.name,
          format: val => `${val}`,
          sortable: true
        },
        {
          name: "email",
          align: "left",
          label: "E-Posta Adresi",
          field: "email",
          sortable: true
        },
        {
          name: "slef",
          align: "left",
          label: "Bağlantı",
          field: row => row.links.self,
          sortable: true
        }
      ]
    };
  },
  methods: {
    ...mapActions("resource", {
      getItemList: "getItemList"
    })
  },
  computed: {
    ...mapState({
      users: state => state.resource.users
    })
  },
  created() {
    this.getItemList({ url: this.url });
  }
};
</script>
<style lang="stylus"></style>
