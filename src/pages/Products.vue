<template>
  <q-page padding>
    <dynamic-table :columns="columns" :data="products" @refresh="getItemList({ url })" :icon="icon" :url="url" :name="name" />
  </q-page>
</template>

<script>
import DynamicTable from "../components/DynamicTable";
import { mapActions, mapState } from "vuex";

export default {
  name: "PageProduct",
  components: {
    DynamicTable
  },
  data() {
    return {
      url: this.$route.path.substring(1),
      name: this.$t("products.product"),
      icon: "donut_large",
      /*** Tablo */
      columns: [
        {
          name: "code",
          required: true,
          label: "Ürün Kodu",
          align: "left",
          field: row => row.data.code,
          format: val => `${val}`,
          sortable: true,
          disable: true
        },
        {
          name: "barcode",
          align: "left",
          label: "Barkod Numarası",
          field: row => row.data.barcode,
          sortable: true
        },
        {
          name: "name",
          align: "left",
          label: "Ürün Adı",
          field: row => row.data.name,
          sortable: true
        },
        {
          name: "shelf_life",
          align: "left",
          label: "Raf Ömrü",
          field: row => row.data.shelf_life + " Yıl",
          sortable: true
        },
        {
          name: "note",
          align: "left",
          label: "Notlar",
          field: row => row.data.note,
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
      products: state => state.resource.products
    })
  },
  created() {
    this.getItemList({ url: this.url });
  }
};
</script>
