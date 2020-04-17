<template>
  <div>
    <div class="actions-bar">
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
          <q-icon name="search" v-if="search === ''" />
          <q-icon @click="search = ''" class="cursor-pointer" name="clear" v-else />
        </template>
      </q-input>
      <q-space />
      <div v-if="!isItemSelected" class="add">
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
          @click="toggleResourceForm"
        >
          <q-tooltip
            :offset="[5, 5]"
            content-class="bg-amber text-black shadow-4"
          >{{ $t('dynamicTable.addToolTip', {item: name}) }}</q-tooltip>
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
          <q-tooltip
            :offset="[5, 5]"
            content-class="bg-amber text-black shadow-4"
          >{{ $t('dynamicTable.detailToolTip', {item: name}) }}</q-tooltip>
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
          <q-tooltip
            :offset="[5, 5]"
            content-class="bg-amber text-black shadow-4"
          >{{ $t('dynamicTable.editToolTip', {item: name}) }}</q-tooltip>
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
          @click="showDeletePopup"
        >
          <q-tooltip
            :offset="[5, 5]"
            content-class="bg-amber text-black shadow-4"
          >{{ $t('dynamicTable.deleteToolTip', {item: name}) }}</q-tooltip>
        </q-btn>
      </div>
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
        :filter="search"
        :pagination.sync="pagination"
        :selected.sync="selected"
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
              <q-checkbox color="deep-orange" v-if="selectionCheckBox" v-model="props.selected" />
            </q-td>
            <q-td :key="col.name" :props="props" v-for="col in props.cols">
              <span
                v-if="col.value.length > 30"
              >{{ col.value | readMore(25, '...') | uppercaseFirst }}</span>
              <span v-else>{{ col.value | uppercaseFirst }}</span>
            </q-td>
          </q-tr>
        </template>
      </q-table>
    </q-card>
    <span>Selected : {{isItemSelected}}</span>
    <!-- Resource Form -->
    <q-dialog position="right" class="resource-form-full-height" v-model="resourceForm"> 
       <q-card class="resource-form resource-form-full-height"> 
         <q-toolbar> 
           <q-toolbar-title class="card-form-title">Title</q-toolbar-title> 
<!--             <q-space /> 
           <q-btn flat round dense icon="close" v-close-popup />  -->
         </q-toolbar> 
         <q-card-section class> 
           <q-input 
             :autofocus="field.autofocus" 
             :clearable="field.clearable" 
             :disable="btnLoading" 
             :key="field.name" 
             :label="field.label" 
             :type="field.type" 
             bottom-slots 
             square 
             v-for="field in fields.form" 
             v-model="data[field.name]" 
           > 
             <template v-slot:prepend> 
               <q-icon :name="field.icon"/> 
             </template> 
           </q-input> 
         </q-card-section> 
         <q-separator/> 
         <q-card-actions align="right"> 
           <q-btn 
             :disable="btnLoading" 
             color="primary" 
             label="İptal" 
             v-close-popup
           /> 
           <q-btn 
             :loading="btnLoading" 
             color="primary" 
             label="Kaydet" 
           /> 
         </q-card-actions> 
       </q-card> 
     </q-dialog> 
    <!-- Delete Confirm -->
    <q-dialog v-if="selected.length == 1" v-model="confirm" persistent>
      <q-card>
        <q-card-section class="row items-center">
          <q-icon name="error_outline" size="35px" color="negative" text-color="white" />
          <span
            class="q-ml-sm"
            v-html="$t('dynamicTable.deleteConfirm', {item: name, name: selected[0].data.name})"
          />
        </q-card-section>
        <q-card-actions align="right">
          <q-btn flat label="İptal" color="primary" v-close-popup />
          <q-btn flat label="Sİl" color="negative" @click="deleteSelectedItem" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import { mapActions } from "vuex";

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
      fields: [],
      selectionCheckBox: false,
      resourceForm: false,
      btnLoading: false,
      confirm: false,
      search: "",
      selected: [],
      pagination: { rowsPerPage: 10, page: 1 },
      createMenu: [
        { icon: "photo_album", text: "Album" },
        { icon: "people", text: "Shared Album" },
        { icon: "movie", text: "Movie" },
        { icon: "library_books", text: "Animation" },
        { icon: "dashboard", text: "Collage" },
        { icon: "book", text: "Photo book" }
      ]
    };
  },
  methods: {
    ...mapActions("resource", {
      deleteItem: "deleteItem"
    }),

    /** İtem Ekle/Düzenle Formunu Aç */
    toggleResourceForm() {
     this.resourceForm = true;
    },

    /** Silme işlemi onay göster */
    showDeletePopup() {
      this.confirm = true;
    },

    /** Seçilen İtemi Sil */
    deleteSelectedItem() {
      this.deleteItem({ url: this.url, id: this.selected[0].data.id }).then(
        res => {
          this.selected = [];
          this.search = "";
          this.confirm = false;
          console.log("deleteSelectedItem(DynamicTable, Then): Silme Başarılı");
        }
      );
    }
  },
  computed: {
    /** Seçilen İtem var mı diye bak */
    isItemSelected() {
      if (this.selected.length > 0) {
        return true;
      } else {
        return false;
      }
    }
  }
};
</script>
