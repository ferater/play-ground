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
          label: "Ürün kodu",
          align: "left",
          field: row => row.code,
          format: val => `${val}`,
          sortable: true
        },
        {
          name: "barcode",
          align: "left",
          label: "Ürün Barkodu",
          field: "barcode",
          sortable: true
        },
        {
          name: "self_life",
          align: "left",
          label: "Raf Ömrü",
          field: row => row.shelf_life + " Yıl",
          sortable: true
        },
        {
          name: "note",
          align: "left",
          label: "Notlar",
          field: "note",
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
      products: state => state.resource.products
    })
  },
  created() {
    this.getItemList({ url: this.url });
  }
};
</script>
