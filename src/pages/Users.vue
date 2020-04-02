<template>
  <q-page padding>
    <q-table
      title="Kullanıcılar"
      :data="items"
      :columns="columns"
      :filter="filter"
      row-key="name"
      selection="single"
      :selected.sync="selected"
    >
      <template v-slot:top>
        <div>
          <!-- <q-btn
          dense
          icon="add_circle"
          size="14px"
          color="white"
          text-color="primary"
          label="...Oluştur"
          @click="addItem"
        >
        <q-tooltip
            content-class="bg-amber text-black shadow-4"
            :offset="[5, 5]"
          >
            {{ $t('dynamicTable.addToolTip') }}
          </q-tooltip>
          </q-btn>-->
        </div>
        <q-space />
        <q-input  v-if="!$q.screen.gt.xs" borderless dense debounce="300" v-model="filter" placeholder="Search">
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>
      </template>
    </q-table>

    <div v-if="selected.length > 0" class="q-mt-md">Selected: {{ JSON.stringify(selected) }}</div>
  </q-page>
</template>

<script>
import { mapActions, mapState } from "vuex";
export default {
  name: "PageUsers",
  data() {
    return {
      url: "users",
      /*** Tablo */
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
          name: "username",
          align: "left",
          label: "Kullanıcı Adı",
          field: "username",
          sortable: true
        },
        {
          name: "email",
          align: "left",
          label: "E-Posta",
          field: "email",
          sortable: true
        }
      ]
    };
  },
  methods: {
    ...mapActions("resource", {
      getItemList: "getItemList"
    }),
    addItem() {
      alert("Yeni ...");
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
