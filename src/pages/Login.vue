<template>
  <q-page
    class="
      bg-light-white
      window-height window-width
      row
      justify-center
      items-center
    "
  >
    <div class="column">
      <div class="row">
        <q-card square bordered class="q-pa-lg shadow-1">
          <h5 class="text-h5 text-center q-my-md">Calculadora de costos</h5>

          <q-form
            :autofocus="true"
            class="q-gutter-sm"
            @submit.prevent="submitForm"
          >
            <q-card-section>
              <q-input
                v-model="formData.email"
                square
                filled
                type="email"
                lazy-rules
                class="q-gutter-sm"
                label="Email"
                :rules="[
                  (val) => (val && val.length > 0) || 'Ingrese un email',
                ]"
              >
                <template #prepend> <q-icon name="person" /> </template>
              </q-input>

              <q-input
                v-model="formData.password"
                square
                filled
                :type="isPwd ? 'password' : 'text'"
                label="Contraseña"
                class="q-gutter-sm"
                lazy-rules
                :rules="[
                  (val) => (val && val.length > 0) || 'Ingrese un password',
                ]"
              >
                <template #prepend> <q-icon name="lock" /> </template>
                <template v-slot:append>
                  <q-icon
                    :name="isPwd ? 'visibility_off' : 'visibility'"
                    class="cursor-pointer"
                    @click="isPwd = !isPwd"
                  />
                </template>
              </q-input>
            </q-card-section>
            <q-card-actions>
              <p v-show="error" class="text-negative text-center">
                {{ error?.message }}
              </p>
              <q-btn
                unelevated
                color="primary"
                size="lg"
                class="full-width q-m a-xs"
                label="Ingresar"
                type="submit"
                :disable="loading"
                :loading="loading"
              >
                <template #loading>
                  <div class="row">
                    <q-spinner color="white" class="q-mr-md" />
                    Ingresando
                  </div>
                </template>
              </q-btn>
              <q-btn
                @click="loginUserWithGoogle"
                unelevated
                color="red"
                size="lg"
                class="full-width q-ma-xs"
                :disable="loading"
                :loading="loading"
                label="Ingresar con Google"
                icon="mail"
              >
                <template #loading>
                  <div class="row">
                    <q-spinner color="white" class="q-mr-md" />
                    Ingresando
                  </div>
                </template>
              </q-btn>
            </q-card-actions>
          </q-form>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script setup="store">
import { ref, computed } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

const formData = ref({ email: "", password: "" });
const store = useStore();
const route = useRouter();
const loggedIn = computed(() => store.state.auth.loggedIn);
const error = computed(() => store.state.auth.error);
const loading = computed(() => store.state.auth.loading);

const submitForm = () =>
  store.dispatch("auth/loginUserWithEmail", {
    email: formData.value.email,
    password: formData.value.password,
  });
const loginUserWithGoogle = () => store.dispatch("auth/loginUserWithGoogle");

const isPwd = ref(true);

if (loggedIn.value) {
  route.push("/");
}
</script>
