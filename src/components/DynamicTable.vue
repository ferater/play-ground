<template>
  <div>
    <div class="actions-bar" :class="{'column': !$q.screen.gt.xs}">
      <!-- Arama -->
      <q-input
        class="GPL__toolbar-input"
        :style="!$q.screen.gt.xs ? 'width:80vw' : ''"
        dense
        rounded
        standout="bg-grey-3"
        placeholder="Ara"
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
        v-if="$q.screen.gt.xs"
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
        v-if="$q.screen.gt.xs"
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
      <div v-if="!isItemSelected && ! resourceForm" class="add">
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
      <div v-if="isItemSelected && ! resourceForm" class="actions">
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
        <q-space />
        <q-btn
          flat
          round
          dense
          size="10px"
          icon="las la-sync-alt"
          :loading="isLoading"
          @click="$emit('refresh')"
        >
          <!--  <template v-slot:loading>
        <q-spinner-tail
          color="black"
          size="12px"
        />
          </template>-->
          <q-tooltip
            :offset="[5, 5]"
            content-class="bg-amber text-black shadow-4"
          >{{ $t("dynamicTable.refreshToolTip", { item: name }) }}</q-tooltip>
        </q-btn>
        <q-btn
          round
          flat
          dense
          size="10px"
          :icon="expanded ? 'las la-angle-up' : 'las la-angle-down'"
          @click="expanded = !expanded"
        />
      </q-toolbar>
      <!-- Dinamik Tablo -->
      <q-slide-transition>
        <q-table
          v-show="expanded"
          :columns="columns"
          :data="data"
          :filter="search"
          :pagination.sync="pagination"
          :selected.sync="selected"
          row-key="id"
          :separator="separator"
          :visible-columns="visibleColumns"
          selection="single"
        >
          <!-- <template v-slot:top-right>
        <q-icon name="las la-sync-alt" />
          </template>-->
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
      </q-slide-transition>
    </q-card>
    <span v-if="isItemSelected">Selected : {{ isItemSelected }} {{ selected[0] }}</span>
    <!-- Resource Form -->
    <ValidationObserver v-slot="{ invalid }">
      <q-dialog position="top" v-model="resourceForm" @escape-key="hideResourceForm">
        <q-card class="resource-form" :style="formProps.style">
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
              class="column inline q-pl-md"
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
                  :error="invalid && validated || formErrors.length >= 1 && Object.keys(formErrors[0]).includes(field.name)"
                  :error-message="formErrors.length >= 1 && Object.keys(formErrors[0]).includes(field.name) ? formErrors[0][field.name][0] : errors[0]"
                  v-model="formData[field.name]"
                  dense
                  square
                >
                  <!-- <template v-slot:prepend>
                    <q-icon :name="field.icon" />
                  </template>-->
                </q-input>
              </ValidationProvider>
            </div>
            <q-separator />
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
                name: selected[0].name
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
    <select-box
      clearable
      :label="name"
      :url="url"
    />
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import { ValidationObserver } from "vee-validate";
import SelectBox from 'components/SelectBox'

export default {
  name: "DynamicTable",
  components: {
    ValidationObserver, SelectBox
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
      confirm: false,
      expanded: true,
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
      setResourceForm: "setResourceForm",
      storeItem: "storeItem",
      updateItem: "updateItem",
      deleteItem: "deleteItem"
    }),

    /** İtem Ekle/Düzenle Form içeriiğini al ve aç, */
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
    },

    /** İtem Ekle/Düzenle Formunu Kapat ve Temizle */
    hideResourceForm() {
      this.setResourceForm(false);
    },

    /** Formu Gönder */
    handleSubmit() {
      if (this.formData.id !== undefined) {
        this.updateItem({ url: this.url, data: this.formData }).then(() => {
          this.selected = [];
        });
      } else {
        this.storeItem({ url: this.url, data: this.formData });
      }
    },

    /** Silme işlemi onay göster */
    showDeletePopup() {
      this.confirm = true;
    },

    /** Seçilen İtemi Sil */
    deleteSelectedItem() {
      this.deleteItem({ url: this.url, id: this.selected[0].id }).then(
        res => {
          this.selected = [];
          this.search = "";
          this.confirm = false;
          console.log("deleteSelectedItem(DynamicTable, Then)");
        }
      );
    }
  },
  computed: {
    ...mapState({
      formProps: state => state.resource.formProps,
      resourceForm: state => state.resource.resourceForm,
      isLoading: state => state.resource.isLoading,
      btnLoading: state => state.resource.btnLoading,
      formErrors: state => state.resource.formErrors
    }),

    resourceForm: {
      get() {
        return this.$store.state.resource.resourceForm;
      },
      set() {
        this.hideResourceForm();
      }
    },

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

<style lang="stylus" scoped></style>
