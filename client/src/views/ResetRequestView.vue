<template>
  <h1>{{ $t('reset_request.title') }}</h1>

  <FormComponent :submit="submit">
    <EmailComponent />
    <SubmitComponent />
  </FormComponent>
</template>

<script lang="ts">
import EmailComponent from "@/components/form/EmailComponent.vue";
import FormComponent from "@/components/form/FormComponent.vue";
import { defineComponent } from "vue";
import { mutation } from "@/util/graphql";
import gql from "graphql-tag";
import { store } from "@/util/store";
import SubmitComponent from "@/components/form/SubmitComponent.vue";

export default defineComponent({
  name: "ResetRequestView",
  components: { SubmitComponent, FormComponent, EmailComponent },
  methods: {
    submit(e: SubmitEvent, form_data: FormData) {
      this.pw_reset_request({ username: form_data.get("username") as string })
        .then(() => {
          store.show_alert("success", this.$t("reset_request.success"))
          this.$router.push("/login")
        });
    }
  },
  setup() {
    const pw_reset_request = mutation(gql`
      mutation pw_reset_request($username: String!) {
        auth_user_pw_reset_request(username: $username)
      }
    `);

    return {
      pw_reset_request
    };
  }
});
</script>

<style scoped>

</style>