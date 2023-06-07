<template class="content">
  <h1>{{ $t("login.title") }}</h1>

  <FormComponent :submit="submit">
    <EmailComponent />
    <PasswordComponent type="single" />
    <router-link class="mb-3" to="/reset/">{{ $t("login.forgot_password") }}?</router-link>
    <SubmitComponent />
  </FormComponent>
</template>

<script lang="ts">
import FormComponent from "@/components/form/FormComponent.vue";
import EmailComponent from "@/components/form/EmailComponent.vue";
import PasswordComponent from "@/components/form/PasswordComponent.vue";
import { defineComponent } from "vue";
import SubmitComponent from "@/components/form/SubmitComponent.vue";
import { log_in, mutation } from "@/util/graphql";
import gql from "graphql-tag";
import { store } from "@/util/store";

export default defineComponent({
  components: { SubmitComponent, FormComponent, EmailComponent, PasswordComponent },
  methods: {
    submit(e: SubmitEvent, form_data: FormData) {
      log_in(form_data.get("username") as string, form_data.get("password") as string)
        .then((logged_in: boolean) => {
          if (logged_in) {
            this.$router.push("/");
          }
        });
    }
  },
  mounted() {
    const challenge = this.$router.currentRoute.value.params.challenge;
    if (challenge) {
      this.verify({ challenge })
        .then(() => {
            store.show_alert("success", this.$t("login.verified"));
        })
    }
  },
  setup() {
    const verify = mutation(gql`
      mutation verify($challenge: String!) {
        auth_verify(challenge: $challenge) {
          id
          challenge
        }
      }
    `);

    return { verify };
  }

});
</script>

<style scoped>

</style>
