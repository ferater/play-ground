<template>
  <q-layout view="lHh Lpr fff" class="bg-grey-1">
    <q-header class="text-grey-8 app-toolbar" height-hint="80">
      <q-toolbar class="GPL__toolbar">
        <q-btn
          flat
          dense
          round
          @click="leftDrawerOpen = !leftDrawerOpen"
          aria-label="Menu"
          icon="menu"
          class="q-mx-md"
        />

        <!-- <q-toolbar-title v-if="$q.screen.gt.sm" shrink class="row items-center no-wrap">
          <img src="https://cdn.quasar.dev/img/layout-gallery/logo-google.svg" />
          <span class="q-ml-sm">Otomasyon</span>
        </q-toolbar-title> -->

        <q-input
          v-if="$q.screen.gt.xs"
          class="GPL__toolbar-input"
          dense
          rounded
          standout="bg-grey-3"
          v-model="search"
          placeholder="Ara"
        >
          <template v-slot:append>
            <q-icon v-if="search === ''" name="search" />
            <q-icon v-else name="clear" class="cursor-pointer" @click="search = ''" />
          </template>
        </q-input>

        <!-- <q-btn
            v-if="$q.screen.gt.xs"
            flat
            dense
            no-wrap
            color="primary"
            icon="add"
            no-caps
            label="Create"
            class="q-ml-sm q-px-md"
          >
            <q-menu anchor="top right" self="top right">
              <q-list class="text-grey-8" style="min-width: 100px">
                <q-item aria-hidden="true">
                  <q-item-section
                    class="text-uppercase text-grey-7"
                    style="font-size: 0.7rem"
                  >Create New</q-item-section>
                </q-item>
                <q-item
                  v-for="menu in createMenu"
                  :key="menu.text"
                  clickable
                  v-close-popup
                  aria-hidden="true"
                >
                  <q-item-section avatar>
                    <q-icon :name="menu.icon" />
                  </q-item-section>
                  <q-item-section>{{ menu.text }}</q-item-section>
                </q-item>
              </q-list>
            </q-menu>
        </q-btn>-->
        <div v-if="isEmptyObject(selectedItem)" class="q-ml-md scale-up-ver-center">
          <q-btn
            dense
            icon="add_circle"
            size="14px"
            color="white"
            text-color="secondary"
            class="q-ml-sm q-px-xs"
            @click="showResourceForm($route.path)"
          >
            <q-tooltip
              content-class="bg-amber text-black shadow-4"
              :offset="[5, 5]"
            >Yeni ... Oluştur</q-tooltip>
          </q-btn>
        </div>
        <div v-if="!isEmptyObject(selectedItem)" class="q-ml-md scale-up-center">
          <q-btn
            class="q-px-xs q-mx-xs"
            dense
            color="white"
            text-color="deep-orange"
            icon="remove_red_eye"
          >
            <q-tooltip content-class="bg-amber text-black shadow-4" :offset="[5, 5]">Detayları Gör</q-tooltip>
          </q-btn>
          <q-btn
            class="q-px-xs q-mx-xs"
            dense
            color="white"
            text-color="deep-orange"
            icon="edit"
            @click="showEditForm"
          >
            <q-tooltip content-class="bg-amber text-black shadow-4" :offset="[5, 5]">Düzenle</q-tooltip>
          </q-btn>
          <q-btn
            class="q-px-xs q-mx-xs"
            dense
            color="white"
            text-color="deep-orange"
            icon="delete"
            @click="showDeleteConfirmPopup"
          >
            <q-tooltip content-class="bg-amber text-black shadow-4" :offset="[5, 5]">Sil</q-tooltip>
          </q-btn>
        </div>
        <q-space />

        <div class="q-gutter-sm row items-center no-wrap">
          <q-btn round dense flat color="text-grey-7" icon="apps">
            <q-tooltip>Google Apps</q-tooltip>
          </q-btn>
          <q-btn round dense flat color="grey-8" icon="notifications">
            <q-badge color="red" text-color="white" floating>2</q-badge>
            <q-tooltip>Notifications</q-tooltip>
          </q-btn>
          <q-btn round flat>
            <q-avatar size="26px">
              <img src="https://cdn.quasar.dev/img/boy-avatar.png" />
            </q-avatar>
            <q-tooltip>Account</q-tooltip>
          </q-btn>
        </div>
      </q-toolbar>
    </q-header>
    <q-drawer
      v-model="leftDrawerOpen"
      behavior="mobile"
      bordered
      @click="leftDrawerOpen = false"
      :width="200"
    >
      <q-scroll-area class="fit">
        <q-toolbar class="GPL__toolbar">
          <q-toolbar-title class="row items-center text-grey-8">
            <img
              class="q-pl-md"
              src="https://www.gstatic.com/images/branding/googlelogo/svg/googlelogo_clr_74x24px.svg"
            />
            <span class="q-ml-sm">Photos</span>
          </q-toolbar-title>
        </q-toolbar>

        <q-list padding>
          <q-item v-for="link in links1" :key="link.text" clickable class="GPL__drawer-item">
            <q-item-section avatar>
              <q-icon :name="link.icon" />
            </q-item-section>
            <q-item-section>
              <q-item-label>{{ link.text }}</q-item-label>
            </q-item-section>
          </q-item>

          <q-separator class="q-my-md" />

          <q-item v-for="link in links2" :key="link.text" clickable class="GPL__drawer-item">
            <q-item-section avatar>
              <q-icon :name="link.icon" />
            </q-item-section>
            <q-item-section>
              <q-item-label>{{ link.text }}</q-item-label>
            </q-item-section>
          </q-item>

          <q-separator class="q-my-md" />

          <q-item v-for="link in links3" :key="link.text" clickable class="GPL__drawer-item">
            <q-item-section avatar>
              <q-icon :name="link.icon" />
            </q-item-section>
            <q-item-section>
              <q-item-label>{{ link.text }}</q-item-label>
            </q-item-section>
          </q-item>

          <q-separator class="q-my-md" />

          <q-item clickable class="GPL__drawer-item GPL__drawer-item--storage">
            <q-item-section avatar>
              <q-icon name="cloud" />
            </q-item-section>
            <q-item-section top>
              <q-item-label>Storage</q-item-label>
              <q-linear-progress :value="storage" class="q-my-sm" />
              <q-item-label caption>2.6 GB of 15 GB</q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </q-scroll-area>
    </q-drawer>

    <q-page-container class="GPL__page-container">
      <router-view />

      <q-page-sticky
        v-if="$q.screen.gt.sm && !leftDrawerOpen"
        expand
        position="left"
        class="buttons-left"
      >
        <ul class="list-unstyled">
          <li class="active">
            <a href="#">
              <q-icon name="people" />
              Deneme
            </a>
          </li>
        </ul>
        <!-- <div class="column">
          <div
            v-for="route in routes[1].children"
            :key="route.path"
            class="q-px-sm"
            :class="{active: $route.path == route.path}"
            style="border-bottom: 1px solid #f3f3f3"
          >
            <q-btn
              :to="{ name: route.name }"
              round
              flat
              color="primary"
              stack
              no-caps
              size="26px"
              class="GPL__side-btn"
            >
              <q-icon size="22px" class="GPL__side-btn__icon" :name="route.meta.icon" />
              <div class="GPL__side-btn__label">{{ $t("routes." + route.meta.label) }}</div>
            </q-btn>
          </div>
        </div>-->
      </q-page-sticky>
    </q-page-container>

    <!-- Form dialog -->
    <q-dialog v-model="resourceDialog" position="right" @escape-key="cleanResourceForm">
      <q-card class="resource-form">
        <q-toolbar>
          <q-toolbar-title class="card-form-title">{{ $t("resourceForm." + fields.title) }}</q-toolbar-title>
          <!-- <q-space />
          <q-btn flat round dense icon="close" v-close-popup />-->
        </q-toolbar>
        <q-card-section class>
          <template v-if="fields.selects">
            <select-box
              v-for="select in fields.selects"
              :key="select.name"
              :url="select.name"
              :label="select.label"
              :clearable="select.clearable"
            />
          </template>
          <q-input
            square
            bottom-slots
            v-for="field in fields.form"
            v-model="data[field.name]"
            :key="field.name"
            :type="field.type"
            :label="field.label"
            :disable="btnLoading"
            :autofocus="field.autofocus"
            :clearable="field.clearable"
          >
            <template v-slot:prepend>
              <q-icon :name="field.icon" />
            </template>
          </q-input>
        </q-card-section>
        <q-separator />
        <q-card-actions align="right">
          <q-btn
            @click.prevent="cleanResourceForm"
            color="primary"
            label="İptal"
            :disable="btnLoading"
          />
          <q-btn
            @click.prevent="handleSubmit"
            color="primary"
            label="Kaydet"
            :loading="btnLoading"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
    <!-- /Form dialog -->

    <!-- Silme onay -->
    <q-dialog v-model="confirm" persistent>
      <q-card>
        <q-card-section class="row items-center">
          <q-avatar icon="priority_high" color="negative" text-color="white" />
          <span class="q-ml-sm">
            Seçilen ürün
            <b>
              <i>
                <u>{{ selectedItem.name }}</u>
              </i>
            </b>
            silinecek, bu işlem geri alınamaz!
          </span>
        </q-card-section>
        <q-card-actions align="right">
          <q-btn flat label="İptal" :disable="btnLoading" color="secondary" v-close-popup />
          <q-btn
            flat
            label="Onaylıyorum"
            color="negative"
            @click="deleteSelectedItem"
            :loading="btnLoading"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
    <!-- /silme onay -->
  </q-layout>
</template>

<script>
import routes from "../router/routes";
import { mapActions, mapState } from "vuex";
import SelectBox from "../components/SelectBox";
export default {
  name: "GooglePhotosLayout",
  components: {
    SelectBox
  },
  data() {
    return {
      confirm: false,
      btnLoading: false,
      data: {},
      routes,
      // resourceDialog: false,
      leftDrawerOpen: false,
      search: "",
      storage: 0.26,
      links1: [
        { icon: "photo", text: "Photos" },
        { icon: "photo_album", text: "Albums" },
        { icon: "assistant", text: "Assistant" },
        { icon: "people", text: "Sharing" },
        { icon: "book", text: "Photo books" }
      ],
      links2: [
        { icon: "archive", text: "Archive" },
        { icon: "delete", text: "Trash" }
      ],
      links3: [
        { icon: "settings", text: "Settings" },
        { icon: "help", text: "Help & Feedback" },
        { icon: "get_app", text: "App Downloads" }
      ],
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
      showResourceForm: "showResourceForm",
      toggleResourceForm: "toggleResourceForm",
      storeItem: "storeItem",
      updateItem: "updateItem",
      deleteItem: "deleteItem"
    }),

    /*** Düzenle Formu Aç */
    showEditForm() {
      this.showResourceForm(this.$route.path);
      Object.assign(this.data, this.selectedItem);
    },
    /*** /Düzenle Formu Aç */

    /*** Resource Form Temizle*/
    cleanResourceForm() {
      this.toggleResourceForm(false);
      this.data = Object.assign({});
      console.log("cleanResourceForm: Form Temizlendi");
    },
    /*** /Resource Form Temizle*/

    /*** Form Gönder */
    handleSubmit() {
      if (this.data.id) {
        this.btnLoading = true;
        this.updateItem({ url: this.$route.path, data: this.data })
          .then(() => {
            setTimeout(() => {
              this.btnLoading = false;
              this.showNotify(this.notifyMessage, this.notifyType);
              this.cleanResourceForm();
            }, 500);
          })
          .catch(err => {
            setTimeout(() => {
              this.btnLoading = false;
              this.showNotify(
                [err.response.status + ": ", err.response.statusText],
                "negative"
              );
              this.cleanResourceForm();
            }, 500);
            console.log("handleSubmit(catch): ", err.response);
          });
      } else {
        this.btnLoading = true;
        this.storeItem({ url: this.$route.path, data: this.data })
          .then(() => {
            setTimeout(() => {
              this.btnLoading = false;
              this.showNotify(this.notifyMessage, this.notifyType);
              this.cleanResourceForm();
            }, 500);
          })
          .catch(err => {
            setTimeout(() => {
              this.btnLoading = false;
              this.showNotify(
                [err.response.status + ": ", err.response.statusText],
                "negative"
              );
              this.cleanResourceForm();
            }, 500);
            console.log("handleSubmit(catch): ", err.response);
          });
      }
    },
    /*** /Form Gönder */

    /*** Seçilen İtemi Sil */
    deleteSelectedItem() {
      this.btnLoading = true;
      this.deleteItem({ url: this.$route.path, id: this.selectedItem.id }).then(
        () => {
          setTimeout(() => {
            this.btnLoading = false;
            this.hideConfirmPopup();
            this.showNotify(this.notifyMessage, this.notifyType);
          }, 500);
          console.log("deleteSelectedItem: Silindi iştee");
        }
      );
    },
    showDeleteConfirmPopup() {
      this.confirm = true;
    },
    hideConfirmPopup() {
      this.confirm = false;
    },
    /*** Seçilen İtemi Sil */

    /*** Mesaj Göster */
    showNotify(message, type, label = "Tamam") {
      this.$q.notify({
        message: message,
        type: type,
        actions: [
          {
            label: label,
            color: "white",
            handler: () => {}
          }
        ]
      });
    },
    /*** /Mesaj Göster */

    /*** Obje Dolu mu diye bak...(Dışarı Taşınacak) */
    isEmptyObject(object) {
      if (Object.keys(object).length == 0) {
        return true;
      }
      return false;
    }
    /*** /Obje Dolu mu diye bak */
  },
  computed: {
    ...mapState({
      fields: state => state.resource.fields,
      selectedItem: state => state.resource.selectedItem,
      resourceDialog: state => state.resource.resourceDialog,
      notifyMessage: state => state.resource.notifyMessage,
      notifyType: state => state.resource.notifyType
    })
  }
  // mounted() {},
};
</script>
