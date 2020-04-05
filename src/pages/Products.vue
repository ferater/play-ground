<template>
  <q-page padding>
    <q-card>
      <q-toolbar>
        <q-toolbar-title class="card-form-title">
          <q-icon name="people"></q-icon>
          <span style="margin-left:5px">{{ tableTitle }}</span>
        </q-toolbar-title>
        <!-- <q-space />
        <q-btn flat round dense icon="close" v-close-popup />-->
      </q-toolbar>
      <q-table
        :data="items"
        :columns="columns"
        :filter="filter"
        :pagination.sync="pagination"
        :selected.sync="selected"
        @selection="selectRow"
        row-key="id"
        selection="single"
      >
        <template v-slot:body="props">
          <q-tr
            :props="props"
            :class="'cursor-pointer'"
            @click.native="props.selected = !props.selected"
          >
            <q-td auto-width>
              <q-checkbox v-if="selectionCheckBox" v-model="props.selected" color="deep-orange" />
            </q-td>
            <q-td v-for="col in props.cols" :key="col.name" :props="props">
              <span>{{ col.value }}</span>
            </q-td>
          </q-tr>
        </template>
      </q-table>
    </q-card>
    <div v-if="selected.length > 0" class="q-mt-md">Selected: {{ JSON.stringify(selected) }}</div>
  </q-page>
</template>

<script>
import { mapActions, mapState } from "vuex";
export default {
  name: "PageProducts",
  data() {
    return {
      url: this.$route.path,
      /*** Tablo */
      tableTitle: "Ürünler",
      filter: "",
      selectionCheckBox: false,
      selected: [],
      pagination: { rowsPerPage: 10, page: 1 },
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
      getItemList: "getItemList",
      selectItem: "selectItem"
    }),
    selectRow(row) {
      this.selectItem({url: this.url, selectedItem: row.rows[0], selected: row.added})
    }
  },
  computed: {
    ...mapState({
      items: state => state.resource.items,
      fields: state => state.resource.fields
    })
  },
  created() {
    this.getItemList({ url: this.url });
  }
};
</script>

<style lang="stylus"></style>
