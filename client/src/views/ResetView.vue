<template>
  <h1>{{ $t('reset.title') }}</h1>

  <FormComponent :submit="submit">
    <PasswordComponent type="double" label="Enter new Password" />
    <SubmitComponent />
  </FormComponent>
</template>

<script lang="ts">
import PasswordComponent from "@/components/form/PasswordComponent.vue";
import SubmitComponent from "@/components/form/SubmitComponent.vue";
import FormComponent from "@/components/form/FormComponent.vue";
import router from "@/router/router";
import { defineComponent, ref } from "vue";
import gql from "graphql-tag";
import { mutation } from "@/util/graphql";
import { store } from "@/util/store";

export default defineComponent({
  name: "ResetView",
  components: { FormComponent, SubmitComponent, PasswordComponent },
  methods: {
    submit(e: SubmitEvent, form_data: FormData) {
      this.pw_reset({ challenge: this.challenge, password: form_data.get("password") as string })
        .then(() => {
          store.show_alert("success", this.$t("reset.success") as string);
          router.push("/login");
        });
    }
  },
  mounted() {
    this.challenge = this.$router.currentRoute.value.params.challenge as string
  },
  setup() {
    const challenge = ref<String>();
    const pw_reset = mutation(gql`
      mutation pw_reset($challenge: String!, $password: String!) {
        auth_user_pw_reset(user_pw_reset_input_data: { challenge: $challenge, password: $password }) {
          id
        }
      }
    `);

    return {
      challenge,
      pw_reset
    };
  }
});
</script>

<style scoped>

</style>