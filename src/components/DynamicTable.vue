<template>
  <div>
    <div class="actions-bar">
      <div v-if="selected.length == 0" class="add">
        <q-btn
          v-if="$q.screen.gt.xs"
          :label="name"
          :loading="btnLoading"
          dense
          no-caps
          no-wrap
          rounded
          class="q-py-xs q-px-sm"
          color="brand"
          icon="add_circle"
        >
          <q-tooltip :offset="[5, 5]" content-class="bg-amber text-black shadow-4">
            {{ $t('dynamicTable.addToolTip', {item: name}) }}
          </q-tooltip>
        </q-btn>
      </div>
      <div v-else class="actions">
        <q-btn
          :label="$t('dynamicTable.detail')"
          class="q-py-xs q-px-sm"
          color="brand"
          dense
          icon="remove_red_eye"
          no-caps
          no-wrap
          rounded
          v-if="$q.screen.gt.xs"
        >
          <q-tooltip :offset="[5, 5]" content-class="bg-amber text-black shadow-4">
            {{ $t('dynamicTable.detailToolTip', {item: name}) }}
          </q-tooltip>
        </q-btn>
        <q-btn
          :label="$t('dynamicTable.edit')"
          class="q-py-xs q-px-sm q-ml-sm"
          color="secondary"
          dense
          icon="edit"
          no-caps
          no-wrap
          rounded
          v-if="$q.screen.gt.xs"
        >
          <q-tooltip :offset="[5, 5]" content-class="bg-amber text-black shadow-4">
            {{ $t('dynamicTable.editToolTip', {item: name}) }}
          </q-tooltip>
        </q-btn>
        <q-btn
          :label="$t('dynamicTable.delete')"
          class="q-py-xs q-px-sm q-ml-sm"
          color="secondary"
          dense
          icon="delete"
          no-caps
          no-wrap
          rounded
          v-if="$q.screen.gt.xs"
        >
          <q-tooltip :offset="[5, 5]" content-class="bg-amber text-black shadow-4">
            {{ $t('dynamicTable.deleteToolTip', {item: name}) }}
          </q-tooltip>
        </q-btn>
      </div>
      <q-space/>
      <q-input
        class="GPL__toolbar-input"
        dense
        placeholder="Ara"
        rounded
        standout="bg-grey-3"
        v-if="$q.screen.gt.xs"
        v-model="search"
      >
        <template v-slot:append>
          <q-icon name="search" v-if="search === ''"/>
          <q-icon @click="search = ''" class="cursor-pointer" name="clear" v-else/>
        </template>
      </q-input>
    </div>
    <q-card>
      <q-toolbar>
        <q-toolbar-title class="card-table-title">
          <q-icon :name="icon"></q-icon>
          <span style="margin-left:5px">{{ $t(url + '.' + url) }}</span>
        </q-toolbar-title>
        <!--       <q-space />-->
        <!--      <q-btn flat round dense icon="add_circle" class="benim" />-->
      </q-toolbar>
      <q-table
        :columns="columns"
        :data="data"
        :filter="filter"
        :pagination.sync="pagination"
        :selected.sync="selected"
        @selection="selectRow"
        :row-key="row => row.data.id"
        selection="single"
      >
        <template v-slot:body="props">
          <q-tr
            :class="'cursor-pointer'"
            :props="props"
            @click.native="props.selected = !props.selected"
          >
            <q-td auto-width>
              <q-checkbox color="deep-orange" v-if="selectionCheckBox" v-model="props.selected"/>
            </q-td>
            <q-td :key="col.name" :props="props" v-for="col in props.cols">
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
  </div>
</template>

<script>
  import {mapActions} from "vuex";

  export default {
    name: "DynamicTable",
    props: {
      name: {
        type: String
      },
      icon: {
        type: String
      },
      url: {
        type: String,
        default: "TableTitle"
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
        btnLoading: false,
        search: '',
        selected: [],
        pagination: {rowsPerPage: 10, page: 1},
        createMenu: [
          {icon: "photo_album", text: "Album"},
          {icon: "people", text: "Shared Album"},
          {icon: "movie", text: "Movie"},
          {icon: "library_books", text: "Animation"},
          {icon: "dashboard", text: "Collage"},
          {icon: "book", text: "Photo book"}
        ]
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
