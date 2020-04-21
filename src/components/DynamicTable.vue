<template>
  <div>
    <div class="actions-bar">
      <!-- Arama -->
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
      <!--  -->
      <!-- Stun göster/gizle -->
      <q-select
        v-model="visibleColumns"
        :options="columns"
        :display-value="$t('dynamicTable.columns')"
        multiple
        emit-value
        map-options
        borderless
        dense
        options-dense
        color="secondary"
        class="q-mx-lg"
      >
        <template v-slot:option="scope">
          <q-item v-bind="scope.itemProps">
            <q-item-section>
              <q-item-label>{{ scope.opt.label }}</q-item-label>
            </q-item-section>
            <q-item-section side>
              <q-toggle v-model="visibleColumns" :val="scope.opt.name" color="secondary" />
            </q-item-section>
          </q-item>
        </template>
      </q-select>
      <!-- seperator select -->
      <q-select
        v-model="separator"
        :options="separatorOptions"
        :display-value="$t('dynamicTable.borders')"
        multiple
        emit-value
        map-options
        borderless
        dense
        options-dense
        color="secondary"
      >
        <template v-slot:option="scope">
          <q-item v-bind="scope.itemProps">
            <q-item-section>
              <q-item-label v-html="scope.opt.label"></q-item-label>
            </q-item-section>
            <q-item-section side>
              <q-radio v-model="separator" :val="scope.opt.value" color="secondary" />
            </q-item-section>
          </q-item>
        </template>
      </q-select>
      <q-space />
      <!-- Ekle Butonu -->
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
          @click="showResourceForm"
        >
          <q-tooltip
            :offset="[5, 5]"
            content-class="bg-amber text-black shadow-4"
          >{{ $t("dynamicTable.addToolTip", { item: name }) }}</q-tooltip>
        </q-btn>
      </div>
      <!-- Göster Düzenle  Sil Butonları -->
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
          >{{ $t("dynamicTable.detailToolTip", { item: name }) }}</q-tooltip>
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
          @click="showResourceForm"
        >
          <q-tooltip
            :offset="[5, 5]"
            content-class="bg-amber text-black shadow-4"
          >{{ $t("dynamicTable.editToolTip", { item: name }) }}</q-tooltip>
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
          >{{ $t("dynamicTable.deleteToolTip", { item: name }) }}</q-tooltip>
        </q-btn>
      </div>
    </div>
    <q-card>
      <q-toolbar>
        <q-toolbar-title class="card-table-title">
          <q-icon :name="icon"></q-icon>
          <span style="margin-left:5px">{{ $t(url + "." + url) }}</span>
        </q-toolbar-title>
        <!--       <q-space />-->
        <!--      <q-btn flat round dense icon="add_circle" class="benim" />-->
      </q-toolbar>
      <!-- Dinamik Tablo -->
      <q-table
        :columns="columns"
        :data="data"
        :filter="search"
        :pagination.sync="pagination"
        :selected.sync="selected"
        :row-key="row => row.data.id"
        :separator="separator"
        :visible-columns="visibleColumns"
        selection="single"
      >
        <!-- Tablo TR -->
        <template v-slot:body="props">
          <q-tr
            :class="'cursor-pointer'"
            :props="props"
            @click.native="props.selected = !props.selected"
          >
            <!-- Tablo TD -->
            <q-td auto-width>
              <q-checkbox color="deep-orange" v-if="selectionCheckBox" v-model="props.selected" />
            </q-td>
            <q-td :key="col.name" :props="props" v-for="col in props.cols">
              <span v-if="col.value.length > 30">
                {{
                col.value | readMore(25, "...") | uppercaseFirst
                }}
              </span>
              <span v-else>{{ col.value }}</span>
            </q-td>
          </q-tr>
        </template>
      </q-table>
    </q-card>
    <span v-if="isItemSelected">Selected : {{ isItemSelected }} {{ selected[0].data }}</span>
    <!-- Resource Form -->
    <ValidationObserver v-slot="{ invalid }">
      <q-dialog position="top" v-model="resourceForm" @escape-key="hideResourceForm">
        <q-card class="resource-form resource-form-full-height" :style="formProps.style">
          <q-toolbar>
            <q-toolbar-title class="card-form-title">
              {{
              formTitle
              }}
            </q-toolbar-title>
          </q-toolbar>
          <q-card-section>
            <div
              v-for="field in formProps.fields"
              :key="field.name"
              :style="field.style"
              class="column inline"
            >
              <ValidationProvider
                :rules="field.rules"
                :name="field.label"
                :bails="false"
                v-slot="{ errors, invalid, validated }"
              >
                <q-input
                  :autofocus="field.autofocus"
                  :clearable="field.clearable"
                  :disable="btnLoading"
                  :label="field.label"
                  :type="field.type"
                  :autogrow="field.autogrow"
                  :error="invalid && validated"
                  :error-message="errors[0]"
                  bottom-slots
                  square
                  v-model="formData[field.name]"
                >
                  <!-- <template v-slot:prepend>
              <q-icon :name="field.icon" />
                  </template>-->
                </q-input>
              </ValidationProvider>
              <!-- <span v-if="errors.has('name')">{{ errors.first('name') }}</span> -->
            </div>
          </q-card-section>
          <!--  <q-separator /> -->
          <q-card-actions align="right">
            <q-btn
              :disable="btnLoading"
              color="primary"
              label="İptal"
              @click.prevent="hideResourceForm"
            />
            <q-btn
              :loading="btnLoading"
              color="primary"
              label="Kaydet"
              :disabled="invalid"
              @click.prevent="handleSubmit"
            />
          </q-card-actions>
        </q-card>
      </q-dialog>
    </ValidationObserver>
    <!-- Delete Confirm -->
    <q-dialog v-if="isItemSelected" v-model="confirm" persistent>
      <q-card>
        <q-card-section class="row items-center">
          <q-icon name="error_outline" size="35px" color="negative" text-color="white" />
          <span
            class="q-ml-sm"
            v-html="
              $t('dynamicTable.deleteConfirm', {
                item: name,
                name: selected[0].data.name
              })
            "
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
import { mapActions, mapState } from "vuex";
import { ValidationObserver } from "vee-validate";

export default {
  name: "DynamicTable",
  components: {
    ValidationObserver
  },
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
      // fields: [],
      formData: {},
      selectionCheckBox: false,
      formTitle: this.$t("dynamicTable.addToolTip", { item: this.name }),
      resourceForm: false,
      btnLoading: false,
      confirm: false,
      search: "",
      selected: [],
      pagination: { rowsPerPage: 10, page: 1 },
      visibleColumns: [],
      separator: "horizontal",
      separatorOptions: [
        { label: this.$t("dynamicTable.horizontal"), value: "horizontal" },
        { label: this.$t("dynamicTable.vertical"), value: "vertical" },
        { label: this.$t("dynamicTable.cell"), value: "cell" },
        { label: this.$t("dynamicTable.none"), value: "none" }
      ]
    };
  },
  methods: {
    ...mapActions("resource", {
      setFormFormProps: "setFormFormProps",
      storeItem: "storeItem",
      updateItem: "updateItem",
      deleteItem: "deleteItem"
    }),

    /** İtem Ekle/Düzenle Formunu Aç */
    showResourceForm() {
      if (this.isItemSelected) {
        this.formTitle = this.$t("dynamicTable.editToolTip", {
          item: this.name
        });
        this.formData = Object.assign(this.formData, this.selected[0].data);
      } else {
        this.formTitle = this.$t("dynamicTable.addToolTip", {
          item: this.name
        });
      }
      this.setFormFormProps({ jsonName: this.url });
      this.resourceForm = true;
    },

    /** İtem Ekle/Düzenle Formunu Kapat ve Temizle */
    hideResourceForm() {
      this.resourceForm = false;
    },

    /** Formu Gönder */
    handleSubmit() {
      if (this.formData.id !== undefined) {
        this.updateItem({ url: this.url, data: this.formData }).then(() => {
          console.log(
            "handleSubmit (DynamicTable, Update, Then) :",
            this.formData
          );
          this.selected = [];
          this.hideResourceForm();
        });
      } else {
        this.storeItem({ url: this.url, data: this.formData }).then(() => {
          console.log("handleSubmit (DynamicTable, Store) :", this.formData);
          this.hideResourceForm();
        });
      }
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
    ...mapState({
      formProps: state => state.resource.formProps
    }),
    /** Seçilen İtem var mı diye bak */
    isItemSelected() {
      if (this.selected.length > 0) {
        return true;
      } else {
        return false;
      }
    }
  },
  mounted() {
    this.visibleColumns = this.columns.map(v => {
      if (v.hideonload) {
        return;
      }
      return v.name;
    });
  },
  watch: {
    resourceForm: function() {
      if (!this.resourceForm) {
        this.formData = Object.assign({});
        console.log("hideResourceForm : Form temizlendi...");
      }
    }
  }
};
</script>
