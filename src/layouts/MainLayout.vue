<template>
  <q-layout class="bg-grey-1" view="lHh Lpr fff">
    <q-header class="text-grey-8 app-toolbar" height-hint="80">
      <q-toolbar class="GPL__toolbar">
        <q-btn
          @click="leftDrawerOpen = !leftDrawerOpen"
          aria-label="Menu"
          class="q-mx-md"
          dense
          flat
          icon="dashboard"
          round
        />

        <!-- <q-toolbar-title v-if="$q.screen.gt.sm" shrink class="row items-center no-wrap">
          <img src="https://cdn.quasar.dev/img/layout-gallery/logo-google.svg" />
          <span class="q-ml-sm">Otomasyon</span>
        </q-toolbar-title> -->

<!--        <q-input-->
<!--          class="GPL__toolbar-input"-->
<!--          dense-->
<!--          placeholder="Ara"-->
<!--          rounded-->
<!--          standout="bg-grey-3"-->
<!--          v-if="$q.screen.gt.xs"-->
<!--          v-model="search"-->
<!--        >-->
<!--          <template v-slot:append>-->
<!--            <q-icon name="search" v-if="search === ''"/>-->
<!--            <q-icon @click="search = ''" class="cursor-pointer" name="clear" v-else/>-->
<!--          </template>-->
<!--        </q-input>-->

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
<!--        <div class="q-ml-md scale-up-ver-center">-->
<!--          <q-btn-->
<!--            @click="alert"-->
<!--            class="q-ml-sm q-px-xs"-->
<!--            color="white"-->
<!--            dense-->
<!--            icon="add_circle"-->
<!--            size="14px"-->
<!--            text-color="secondary"-->
<!--          >-->
<!--            <q-tooltip-->
<!--              :offset="[5, 5]"-->
<!--              content-class="bg-amber text-black shadow-4"-->
<!--            >Yeni ... Oluştur-->
<!--            </q-tooltip>-->
<!--          </q-btn>-->
<!--        </div>-->
        <q-space/>

        <div class="q-gutter-sm row items-center no-wrap">
          <q-btn color="text-grey-7" dense flat icon="apps" round>
            <q-tooltip>Google Apps</q-tooltip>
          </q-btn>
          <q-btn color="grey-8" dense flat icon="notifications" round>
            <q-badge color="red" floating text-color="white">2</q-badge>
            <q-tooltip>Notifications</q-tooltip>
          </q-btn>
          <q-btn flat round @click="logOut">
            <q-avatar size="26px">
              <img src="https://cdn.quasar.dev/img/boy-avatar.png"/>
            </q-avatar>
            <q-tooltip>Account</q-tooltip>
          </q-btn>
        </div>
      </q-toolbar>
    </q-header>
    <q-drawer
      :width="200"
      @click="leftDrawerOpen = false"
      behavior="mobile"
      bordered
      v-model="leftDrawerOpen"
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
          <q-item :key="link.text" class="GPL__drawer-item" clickable v-for="link in links1">
            <q-item-section avatar>
              <q-icon :name="link.icon"/>
            </q-item-section>
            <q-item-section>
              <q-item-label>{{ link.text }}</q-item-label>
            </q-item-section>
          </q-item>

          <q-separator class="q-my-md"/>

          <q-item :key="link.text" class="GPL__drawer-item" clickable v-for="link in links2">
            <q-item-section avatar>
              <q-icon :name="link.icon"/>
            </q-item-section>
            <q-item-section>
              <q-item-label>{{ link.text }}</q-item-label>
            </q-item-section>
          </q-item>

          <q-separator class="q-my-md"/>

          <q-item :key="link.text" class="GPL__drawer-item" clickable v-for="link in links3">
            <q-item-section avatar>
              <q-icon :name="link.icon"/>
            </q-item-section>
            <q-item-section>
              <q-item-label>{{ link.text }}</q-item-label>
            </q-item-section>
          </q-item>

          <q-separator class="q-my-md"/>

          <q-item class="GPL__drawer-item GPL__drawer-item--storage" clickable>
            <q-item-section avatar>
              <q-icon name="cloud"/>
            </q-item-section>
            <q-item-section top>
              <q-item-label>Storage</q-item-label>
              <q-linear-progress :value="storage" class="q-my-sm"/>
              <q-item-label caption>2.6 GB of 15 GB</q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </q-scroll-area>
    </q-drawer>

    <q-page-container class="GPL__page-container">
      <router-view/>

      <!--  Sidenav    -->
      <div class="sidenav" v-if="$q.screen.gt.sm && !leftDrawerOpen"
      >
        <ul class="list-unstyled">
          <li :class="{active: $route.path == route.path}" :key="route.path" v-for="route in routes[1].children">
            <router-link :to="{name: route.name}" tag="a">
              <q-icon :name="route.meta.icon"/>
              {{ $t('routes.' + route.meta.label) }}
            </router-link>
          </li>
        </ul>
      </div>
    </q-page-container>

    <!-- Form dialog -->
<!--    <q-dialog @escape-key="cleanResourceForm" position="right" v-model="resourceDialog">-->
<!--      <q-card class="resource-form">-->
<!--        <q-toolbar>-->
<!--          <q-toolbar-title class="card-form-title">{{ $t("resourceForm." + fields.title) }}</q-toolbar-title>-->
<!--          &lt;!&ndash; <q-space />-->
<!--          <q-btn flat round dense icon="close" v-close-popup />&ndash;&gt;-->
<!--        </q-toolbar>-->
<!--        <q-card-section class>-->
<!--&lt;!&ndash;          <template v-if="fields.selects">&ndash;&gt;-->
<!--&lt;!&ndash;            <select-box&ndash;&gt;-->
<!--&lt;!&ndash;              :clearable="select.clearable"&ndash;&gt;-->
<!--&lt;!&ndash;              :key="select.name"&ndash;&gt;-->
<!--&lt;!&ndash;              :label="select.label"&ndash;&gt;-->
<!--&lt;!&ndash;              :url="select.name"&ndash;&gt;-->
<!--&lt;!&ndash;              v-for="select in fields.selects"&ndash;&gt;-->
<!--&lt;!&ndash;            />&ndash;&gt;-->
<!--&lt;!&ndash;          </template>&ndash;&gt;-->
<!--          <q-input-->
<!--            :autofocus="field.autofocus"-->
<!--            :clearable="field.clearable"-->
<!--            :disable="btnLoading"-->
<!--            :key="field.name"-->
<!--            :label="field.label"-->
<!--            :type="field.type"-->
<!--            bottom-slots-->
<!--            square-->
<!--            v-for="field in fields.form"-->
<!--            v-model="data[field.name]"-->
<!--          >-->
<!--            <template v-slot:prepend>-->
<!--              <q-icon :name="field.icon"/>-->
<!--            </template>-->
<!--          </q-input>-->
<!--        </q-card-section>-->
<!--        <q-separator/>-->
<!--        <q-card-actions align="right">-->
<!--          <q-btn-->
<!--            :disable="btnLoading"-->
<!--            @click.prevent="cleanResourceForm"-->
<!--            color="primary"-->
<!--            label="İptal"-->
<!--          />-->
<!--          <q-btn-->
<!--            :loading="btnLoading"-->
<!--            @click.prevent="handleSubmit"-->
<!--            color="primary"-->
<!--            label="Kaydet"-->
<!--          />-->
<!--        </q-card-actions>-->
<!--      </q-card>-->
<!--    </q-dialog>-->
    <!-- /Form dialog -->

    <!-- Silme onay -->
<!--    <q-dialog persistent v-model="confirm">-->
<!--      <q-card>-->
<!--        <q-card-section class="row items-center">-->
<!--          <q-avatar color="negative" icon="priority_high" text-color="white"/>-->
<!--          <span class="q-ml-sm">-->
<!--            Seçilen ürün-->
<!--            <b>-->
<!--              <i>-->
<!--                <u>{{ selectedItem.name }}</u>-->
<!--              </i>-->
<!--            </b>-->
<!--            silinecek, bu işlem geri alınamaz!-->
<!--          </span>-->
<!--        </q-card-section>-->
<!--        <q-card-actions align="right">-->
<!--          <q-btn :disable="btnLoading" color="secondary" flat label="İptal" v-close-popup/>-->
<!--          <q-btn-->
<!--            :loading="btnLoading"-->
<!--            @click="deleteSelectedItem"-->
<!--            color="negative"-->
<!--            flat-->
<!--            label="Onaylıyorum"-->
<!--          />-->
<!--        </q-card-actions>-->
<!--      </q-card>-->
<!--    </q-dialog>-->
    <!-- /silme onay -->
  </q-layout>
</template>

<script>
  import routes from "../router/routes";
  import { mapActions } from 'vuex';
  export default {
    name: "GooglePhotosLayout",
    data() {
      return {
        routes,
        // resourceDialog: false,
        leftDrawerOpen: false,
        search: "",
        storage: 0.26,
        links1: [
          {icon: "photo", text: "Photos"},
          {icon: "photo_album", text: "Albums"},
          {icon: "assistant", text: "Assistant"},
          {icon: "people", text: "Sharing"},
          {icon: "book", text: "Photo books"}
        ],
        links2: [
          {icon: "archive", text: "Archive"},
          {icon: "delete", text: "Trash"}
        ],
        links3: [
          {icon: "settings", text: "Settings"},
          {icon: "help", text: "Help & Feedback"},
          {icon: "get_app", text: "App Downloads"}
        ],
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
      ...mapActions('auth', {
        logOut: 'logOut'
      })
    }
  }
</script>
