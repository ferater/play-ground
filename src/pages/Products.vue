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
      url: this.$route.path,
      /*** Tablo */
      tableTitle: "Ürünler",
      columns: [
        {
          name: "name",
          required: true,
          label: "Ürün Adı",
          align: "left",
          field: row => row.name,
          format: val => `${val}`,
          sortable: true
        },
        {
          name: "code",
          align: "left",
          label: "Ürün Kodu",
          field: "code",
          sortable: true
        },
        {
          name: "price",
          align: "left",
          label: "Ürün Fiyatı",
          field: "price",
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
      items: state => state.resource.items
    })
  },
  created() {
    this.getItemList({ url: this.url });
  }
};
</script>
<style lang="stylus"></style>
