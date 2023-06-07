<template>
  <h1>{{ $t("register.title") }}</h1>

  <FormComponent :submit="submit">
    <NameComponent />
    <EmailComponent />
    <PasswordComponent type="double" />
    <SubmitComponent />
  </FormComponent>
</template>

<script lang="ts">
import FormComponent from "@/components/form/FormComponent.vue";
import NameComponent from "@/components/form/NameComponent.vue";
import EmailComponent from "@/components/form/EmailComponent.vue";
import PasswordComponent from "@/components/form/PasswordComponent.vue";
import SubmitComponent from "@/components/form/SubmitComponent.vue";
import { defineComponent } from "vue";
import { register } from "@/util/graphql";
import { store } from "@/util/store";

export default defineComponent({
  components: { SubmitComponent, FormComponent, NameComponent, EmailComponent, PasswordComponent },
  methods: {
    submit(e: SubmitEvent, form_data: FormData) {
      register(form_data.get("username") as string,
        form_data.get("password") as string,
        form_data.get("name") as string,
      )
        .then(() => {
          store.show_alert("success", this.$t("register.success"));
          this.$router.push("/login");
        });
    }
  },
})
</script>

<style scoped>

</style>
