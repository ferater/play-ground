<template>
  <q-layout view="lHh Lpr fff" class="bg-grey-1">
    <div class="myhead">
      <q-header class="text-grey-8 my-header" height-hint="64">
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

          <q-toolbar-title v-if="$q.screen.gt.sm" shrink class="row items-center no-wrap">
            <img src="https://cdn.quasar.dev/img/layout-gallery/logo-google.svg" />
            <span class="q-ml-sm">Photos</span>
          </q-toolbar-title>

          <q-space />

          <q-input
            v-if="$q.screen.gt.xs"
            class="GPL__toolbar-input"
            dense
            standout="bg-primary"
            v-model="search"
            placeholder="Search"
          >
            <template v-slot:prepend>
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

          <q-btn
            v-if="$q.screen.gt.xs"
            flat
            dense
            no-wrap
            color="primary"
            icon="add_circle"
            no-caps
            label="Yeni ..."
            class="q-ml-sm q-px-md"
            @click="resourceItem"
          />

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
    </div>

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
        <div class="fit q-pt-xl q-px-sm column">
          <q-btn
            v-for="route in routes[1].children"
            :key="route.path"
            :to="{ name: route.name }"
            round
            flat
            color="primary"
            stack
            no-caps
            size="26px"
            class="GPL__side-btn"
          >
            <q-icon size="22px" :name="route.meta.icon" />
            <div class="GPL__side-btn__label">{{ $t('routes.' + route.meta.label) }}</div>
          </q-btn>
        </div>
      </q-page-sticky>
    </q-page-container>

    <q-dialog v-model="resourceDialog" position="right">
      <q-card class="resource-form">
        <q-toolbar>
          <q-toolbar-title class="resource-dialog-title">
            Yeni Kullanıcı Oluştur
          </q-toolbar-title>
          <!-- <q-space />
          <q-btn flat round dense icon="close" v-close-popup /> -->
        </q-toolbar>
        <q-card-section class="">
          <q-input
            square
            clearable
            bottom-slots
            v-for="field in fields"
            :key="field.name"
            :type="field.type"
            :label="field.label"
          >
            <template v-slot:prepend>
              <q-icon :name="field.icon" />
            </template>
          </q-input>
        </q-card-section>

        <q-separator />

        <q-card-actions align="right">
          <q-btn flat color="primary" label="İptal" />
          <q-btn @click.prevent="handleSubmit" color="primary" label="Kaydet" />
         
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-layout>
</template>

<script>
import routes from "../router/routes";
import { mapActions, mapState } from "vuex";
export default {
  name: "GooglePhotosLayout",
  data() {
    return {
      routes,
      leftDrawerOpen: false,
      resourceDialog: true,
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
      addItem: "addItem"
    }),
    resourceItem() {
      this.addItem("/users")
        .then(res => {
          this.resourceDialog = true;
          console.log("resourceDialog : Dialog opened");
        })
        .catch(err => {
          console.log(err);
        });
    },
    handleSubmit() {
      console.log('handleSubmit');
      // this.addItemDialog = false;
    }
  },
  computed: {
    ...mapState({
      fields: state => state.resource.fields,
      addItemDialog: state => state.resource.addItemDialog
    })
  }
  // mounted() {}
};
</script>

<style lang="stylus">
.myhead {
  position: fixed;
  top: 0;
  right: 0;
  left: 95px;
  height: 83px;
  background-color: #fafafaf2;
  z-index: 9;
}

.my-header {
  top: 20px;
  right: 15px;
  left: 190px;
  box-shadow: 0 4px 2px 0 rgba(0, 0, 0, 0.12);
  border-radius: 5px;
  background-color: #fff;
}

.buttons-left {
  top: 50% !important;
  transform: translateY(-50%) !important;
  height: 330px;
  border-radius: 0 5px 5px 0;
  background-color: #fff;
  box-shadow: 0 12px 20px -10px rgba(76,175,80,.28),0 4px 20px 0 rgba(0,0,0,.12),0 7px 8px -5px rgba(76,175,80,.2)
  transition: all 0.1s ease;
}

.resource-form
  width 350px

.q-dialog__inner > div
  overflow visible

.resource-dialog-title
  position: absolute;
  top: -15px;
  width: 70%;
  height: 50px;
  border-radius: 3px;
  box-shadow: 0 4px 5px 0 #4ebb5a99;
  background: $baslik
  display: flex;
  justify-content: center;
  align-items: center;
  color #fff

.GPL {
  &__page-container {
    padding-top: 90px !important;
  }

  &__toolbar {
    height: 64px;
  }

  &__toolbar-input {
    width: 35%;
  }

  &__drawer-item {
    line-height: 24px;
    border-radius: 0 24px 24px 0;
    margin-right: 12px;

    .q-item__section--avatar {
      padding-left: 12px;

      .q-icon {
        color: #5f6368;
      }
    }

    .q-item__label:not(.q-item__label--caption) {
      color: #3c4043;
      letter-spacing: 0.01785714em;
      font-size: 0.875rem;
      font-weight: 500;
      line-height: 1.25rem;
    }

    &--storage {
      border-radius: 0;
      margin-right: 0;
      padding-top: 24px;
      padding-bottom: 24px;
    }
  }

  &__side-btn {
    &__label {
      font-size: 12px;
      line-height: 24px;
      letter-spacing: 0.01785714em;
      font-weight: 500;
    }
  }

  @media (min-width: 1024px) {
    &__page-container {
      padding-top: 90px;
      padding-left: 176px;
    }
  }
}

@media (max-width: 1023px) {
  .myhead {
    position: fixed;
    top: 0;
    right: 0;
    left: 0;
    height: 83px;
    background-color: #fafafaf2;
    z-index: 9;
  }

  .my-header {
    top: 20px;
    right: 15px;
    left: 15px;
    box-shadow: 0 4px 2px 0 rgba(0, 0, 0, 0.12);
    border-radius: 5px;
    background-color: #fff;
    transition: all 0.5s ease;
  }
}
</style>