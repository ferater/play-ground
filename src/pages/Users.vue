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
        row-key="id"
        selection="single"
        :selected.sync="selected"
      ></q-table>
    </q-card>
    <div v-if="selected.length > 0" class="q-mt-md">Selected: {{ JSON.stringify(selected) }}</div>
  </q-page>
</template>

<script>
import { mapActions, mapState } from "vuex";
export default {
  name: "PageUsers",
  data() {
    return {
      /*** Tablo */
      tableTitle: "Kullanıcılar",
      filter: "",
      selected: [],
      columns: [
        {
          name: "name",
          required: true,
          label: "Ad Soyad",
          align: "left",
          field: row => row.name,
          format: val => `${val}`,
          sortable: true
        },
        {
          name: "email",
          align: "left",
          label: "E-Posta",
          field: "email",
          sortable: true
        },
        {
          name: "address",
          align: "left",
          label: "Bağlantı",
          field: row => row.address.street,
          sortable: true
        }
      ]
    };
  },
  methods: {
    ...mapActions("resource", {
      getItemList: "getItemList"
    }),
  },
  computed: {
    ...mapState({
      items: state => state.resource.items,
      fields: state => state.resource.fields
    })
  },
  created() {
    this.getItemList({ url: this.$route.path });
  }
};
</script>

<style lang="stylus"></style>
