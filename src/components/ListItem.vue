<template>
<div>
  <div class="actions-bar" :class="{ column: !$q.screen.gt.xs }">
    <!-- Arama -->
    <q-input class="GPL__toolbar-input" :style="!$q.screen.gt.xs ? 'width:80vw' : ''" dense rounded standout="bg-grey-3" placeholder="Ara" v-model="search">
      <template v-slot:append>
        <q-icon name="search" v-if="search === ''" />
        <q-icon @click="search = ''" class="cursor-pointer" name="clear" v-else />
      </template>
    </q-input>
    <q-space />
    <div v-if="!resourceForm" class="add">
      <q-btn v-if="$q.screen.gt.xs" :label="name" :loading="btnLoading" dense no-caps no-wrap rounded class="q-py-xs q-px-sm" color="brand" icon="add_circle" @click="showResourceForm">
        <q-tooltip :offset="[5, 5]" content-class="bg-amber text-black shadow-4">{{ $t("dynamicTable.addToolTip", { item: name }) }}</q-tooltip>
      </q-btn>
    </div>
  </div>
  <q-card style="background:#f7f7f7">
    <q-toolbar>
      <q-toolbar-title class="card-table-title">
        <q-icon :name="icon"></q-icon>
        <span style="margin-left:5px">{{ $t(url + "." + url) }}</span>
      </q-toolbar-title>
      <span class="text-h5 doc-token q-mt-xs" style="margin-left:26%">Ürünler</span>
      <q-space />
      <q-btn flat round dense size="10px" icon="las la-sync-alt" :loading="isLoading" @click="$emit('refresh')">
        <!--  <template v-slot:loading>
                        <q-spinner-tail
                          color="black"
                          size="12px"
                        />
                  </template>-->
        <q-tooltip :offset="[5, 5]" content-class="bg-amber text-black shadow-4">{{ $t("dynamicTable.refreshToolTip") }}</q-tooltip>
      </q-btn>
      <q-btn round flat dense size="10px" :icon="expanded ? 'las la-angle-up' : 'las la-angle-down'" @click="expanded = !expanded" />
    </q-toolbar>
    <!-- Tree -->
    <q-slide-transition>
      <div v-show="expanded">
        <q-splitter v-model="splitterModel" style="width:60vw;height: 90vh">
          <template v-slot:before>


            <div class="q-pa-md tree">
              <q-tree :nodes="nodeData" node-key="id" label-key="name" accordion :filter="search" selected-color="primary" :selected.sync="selected" default-expand-all>
                <template v-slot:default-header="prop">
                  <div :id="prop.node.name" class="row items-center tree-item">
                    <div :id="prop.node.id">{{ prop.node.name }}</div>
                    <q-space />
                    <q-btn @click.prevent.stop size="12px" flat dense round icon="las la-angle-down" class="item-button">
                      <q-menu transition-show="jump-down" transition-hide="jump-up" anchor="bottom middle" @before-hide="cancelEditDelete">
                        <q-list style="max-width: 60px">
                          <q-item clickable @click="showResourceForm(prop.node.name)">
                            <q-item-section>
                              <q-icon name="las la-pen" size="25px" />
                            </q-item-section>
                          </q-item>
                          <q-separator />
                          <q-item clickable v-if="!prop.node.children">
                            <q-item-section>
                              <q-icon v-if="!sureToDelete" name="las la-trash" size="25px" @click="sureToDelete = !sureToDelete" />
                              <q-icon v-else name="las la-exclamation-circle" color="red-5" size="25px" @click="deleteThis(prop.node.id)" class="shake-horizontal" />
                            </q-item-section>
                          </q-item>
                          <q-item disable v-else>
                            <q-item-section>
                              <q-icon name="las la-trash" size="25px">
                                <q-tooltip :offset="[15, 15]" content-class="bg-amber text-black shadow-4">Bu kategori, alt kategorilere sahip
                                  olduğundan silinemez!</q-tooltip>
                              </q-icon>
                            </q-item-section>
                          </q-item>
                        </q-list>
                      </q-menu>
                    </q-btn>
                  </div>
                </template>
              </q-tree>
            </div>
          </template>

          <template v-slot:after>
            <q-tab-panels :value="selected" animated transition-prev="jump-up" transition-next="jump-up">
              <q-tab-panel :name="selected" v-if="selected && relations.length >= 1">
                <q-list bordered>
                  <q-item v-for="item in relations" :key="item.id">
                    <q-item-section>
                      <q-item-label lines="1">
                        <span class="text-weight-medium">{{
                            item.name
                          }}</span>
                      </q-item-label>
                      <q-item-label caption lines="1">{{
                          item.note | readMore(75, "...")
                        }}</q-item-label>
                    </q-item-section>
                    <q-item-section side>
                      <div class="text-grey-8 q-gutter-xs">
                        <!-- <q-btn class="gt-xs" size="12px" flat dense round icon="delete" />
                                  <q-btn class="gt-xs" size="12px" flat dense round icon="done" />-->
                        <q-btn size="12px" flat dense round icon="las la-chevron-circle-down">
                          <q-menu transition-show="flip-right" transition-hide="flip-left">
                            <q-list style="min-width: 100px">
                              <q-item clickable>
                                <q-item-section>Having fun</q-item-section>
                              </q-item>
                              <q-item clickable>
                                <q-item-section>Crazy for transitions</q-item-section>
                              </q-item>
                              <q-separator />
                              <q-item clickable>
                                <q-item-section>Mind blown</q-item-section>
                              </q-item>
                            </q-list>
                          </q-menu>
                        </q-btn>
                      </div>
                    </q-item-section>
                  </q-item>
                </q-list>
              </q-tab-panel>
            </q-tab-panels>
          </template>
        </q-splitter>
        <!-- <q-separator /> -->
      </div>
    </q-slide-transition>
  </q-card>
</div>
</template>

<script>
import {
  mapActions,
  mapState
} from "vuex";
import {
  ValidationObserver
} from "vee-validate";
export default {
  name: "TreeList",
  components: {
    // ValidationObserver
  },
  props: {
    name: {
      type: String
    },
    icon: {
      type: String
    },
    items: {
      type: [Object, Array],
      required: true
    },
    url: {
      type: String,
      required: true
    },
    relation: {
      type: String
    }
  },
  data() {
    return {
      formData: {},
      edit: false,
      search: "",
      formTitle: this.$t("dynamicTable.addToolTip", {
        item: this.name
      }),
      splitterModel: 35,
      selected: null,
      expanded: true,
      sureToDelete: false,
      editFormOpen: false
    };
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
    relations() {
      return this.$store.state.resource[this.url + this.relation];
    },
    nodeData() {
      let a = [].concat(this.items);
      let b = [];
      a.forEach(element => {
        if (element.parent_id == null) {
          b.push(element);
        }
      });
      return b;
    },
    /** Seçilen İtem var mı diye bak */
    isItemSelected() {
      if (this.selected !== null) {
        return true;
      }
      return false;
    }
  },
  methods: {
    ...mapActions("resource", {
      setFormFormProps: "setFormFormProps",
      setFormFormProps: "setFormFormProps",
      storeItem: "storeItem",
      updateItem: "updateItem",
      deleteItem: "deleteItem",
      getItemWithRelation: "getItemWithRelation"
    }),

    test() {
      alert("test");
    },
    /** ?tem Ekle/D?zenle Form i?erii?ini al ve a?, */
    showResourceForm(id) {
      let formDiv = document.getElementById(id);
      let formLabel = document.getElementById(id);
      formLabel.classList.add('hide-label');
      formDiv.classList.toggle('edit-list-item');
      this.edit=true
    },
    // showResourceForm(node) {
    //   this.formData = Object.assign(this.formData, node);
    //   this.setFormFormProps({
    //     jsonName: this.url
    //   });
    //   this.edit = true;
    // },

    /** ?tem Ekle/D?zenle Formunu Kapat ve Temizle */
    hideResourceForm() {
      this.setResourceForm(false);
    },

    /** Formu G?nder */
    handleSubmit() {
      if (this.formData.id !== undefined) {
        console.log(this.formData);
        this.updateItem({
          url: this.url,
          data: {
            id: this.formData.id,
            name: this.formData.name
          }
        }).then(() => {
          this.edit = false;
        });
      } else {
        this.storeItem({
          url: this.url,
          data: this.formData
        });
        this.edit = false;
      }
    },

    /** Edit delete menu kapanınca */
    cancelEditDelete() {
      this.sureToDelete = false;
    },

    /** Seçilen İtemi Sil */
    deleteThis(id) {
      this.deleteItem({
        url: this.url,
        id: id
      }).then(res => {
        this.sureToDelete = false;
        this.search = "";
        console.log("deleteSelectedItem(DynamicTable, Then)");
      });
    }
  },
  watch: {
    selected() {
      if (this.selected !== null) {
        this.getItemWithRelation({
          url: this.url,
          id: this.selected,
          relation: this.relation
        });
      }
      console.log("item selected:", this.selected);
    },
    resourceForm: function() {
      if (!this.resourceForm) {
        this.formData = Object.assign({});
        console.log("hideResourceForm : Form temizlendi...");
      }
    }
  },
  created() {}
};
</script>

<style lang="stylus">
  .edit-list-item
    height: 200px
  .hide-label
    visibility: hidden;
</style>
