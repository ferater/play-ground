<template>
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
      :data="data"
      :columns="columns"
      :filter="filter"
      :pagination.sync="pagination"
      :selected.sync="selected"
      @selection="selectRow"
      row-key="name"
      selection="single"
    >
      <template v-slot:body="props">
        <q-tr
          :props="props.data"
          :class="'cursor-pointer'"
          @click.native="props.selected = !props.selected"
        >
          <q-td auto-width>
            <q-checkbox v-if="selectionCheckBox" v-model="props.selected" color="deep-orange" />
          </q-td>
          <q-td v-for="col in props.cols" :key="col.name" :props="props">
           <span v-if="col.value.length > 30">
              {{ col.value | readMore(25, '...') | uppercaseFirst }}
            </span>
            <span v-else>
              {{ col.value | uppercaseFirst }}
            </span>
          </q-td>
        </q-tr>
      </template>
    </q-table>
  </q-card>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "DynamicTable",
  props: {
    icon: {
      type: String
    },
    tableTitle: {
      type: String
    },
    filter: {
      type: String
    },
    data: {
      type: [Object, Array],
      required: true
    },
    columns: {
      type: [Object, Array],
      required: true
    }
  },
  data() {
    return {
      selectionCheckBox: false,
      selected: [],
      pagination: { rowsPerPage: 10, page: 1 }
    };
  },
  methods: {
    ...mapActions("resource", {
      selectItem: "selectItem"
    }),
    selectRow(row) {
      this.selectItem({
        url: this.url,
        selectedItem: row.rows[0].data,
        selected: row.added
      });
    }
  }
};
</script>
