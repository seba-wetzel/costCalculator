<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />
        <q-space />
        <div class="q-gutter-sm row items-center no-wrap">
          <q-btn-dropdown rounded flat>
            <template #label>
              <q-avatar size="26px">
                <img src="default-avatar.jpg" />
              </q-avatar>
            </template>
            <div class="row no-wrap q-pa-md">
              <div class="column items-center">
                <q-btn
                  v-close-popup
                  color="negative"
                  label="Salir"
                  push
                  size="sm"
                  @click="logout"
                />
              </div>
            </div>
          </q-btn-dropdown>
        </div>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above bordered class="bg-grey-1">
      <q-list>
        <q-item-label header class="text-grey-8"> Menu </q-item-label>

        <EssentialLink
          v-for="link in linksList"
          :key="link.title"
          v-bind="link"
        />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { ref, computed } from "vue";
import { useStore } from "vuex";
import EssentialLink from "components/EssentialLink.vue";

const store = useStore();
const logout = () => store.dispatch("auth/logoutUser");
const linksList = [
  {
    title: "Docs",
    caption: "quasar.dev",
    icon: "school",
    link: "https://quasar.dev",
  },
];

const leftDrawerOpen = ref(false);
const loggedIn = computed(() => store.state.auth.loggedIn);
const toggleLeftDrawer = () => {
  leftDrawerOpen.value = !leftDrawerOpen.value;
};
</script>
