<template>
  <q-page padding>
    <dynamic-table :data="items" :columns="columns" :tableTitle="tableTitle" />
  </q-page>
</template>

<script>
import DynamicTable from "../components/DynamicTable";
import { mapActions, mapState } from "vuex";
export default {
  name: "PageProducts",
  components: {
    DynamicTable
  },
  data() {
    return {
      url: this.$route.path.substring(1),
      /*** Tablo */
      tableTitle: "Kullanıcılar",
      columns: [
        {
          name: "name",
          required: true,
          label: "Adı Soyadı",
          align: "left",
          field: row => row.data.name,
          format: val => `${val}`,
          sortable: true
        },
        {
          name: "email",
          align: "left",
          label: "E-Posta Adresi",
          field: row => row.data.email,
          sortable: true
        },
        {
          name: "slef",
          align: "left",
          label: "Bağlantı",
          field: row => row.links.self,
          sortable: true
        },   
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
      items: state => state.resource.users
    })
  },
  created() {
    this.getItemList({ url: this.url });
  }
};
</script>
<style lang="stylus"></style>
