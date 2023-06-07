<template>
  <CardComponent id="card_profile" :header="$t('profile.header')">
    <div class="d-flex flex-column justify-content-between">
      <div class="mb-3">
        <h5 class="card-title">{{ user.name }}</h5>
        <button
          class="btn btn-primary mb-2 me-2"
          data-bs-target="#modal_profile"
          data-bs-toggle="modal"
          type="button"
        >
          {{ $t('profile.button.profile') }}
        </button>
      </div>

      <CardComponent :header="$t('profile.option.title')" nobody>
        <ul class="list-group list-group-flush">
          <li class="list-group-item">
            <a href="" @click.prevent="get_all_user_data">{{
                $t('profile.option.get_user_data')
              }}</a>
          </li>
          <li class="list-group-item">
            <a
              data-bs-target="#modal_delete_account"
              data-bs-toggle="modal"
              href=""
              style="color: red"
              @click.prevent=""
            >{{ $t('profile.option.delete_account') }}</a
            >
          </li>
        </ul>
      </CardComponent>
    </div>
  </CardComponent>

  <!-- Modal: Change Profile -->
  <ModalComponent id="modal_profile" :title="$t('profile.button.profile')">
    <FormComponent :submit="update_profile" class="d-flex flex-column">
      <NameComponent />
      <SubmitComponent class="mt-3" inner_text="Update" />
    </FormComponent>
  </ModalComponent>

  <!-- Modal: Delete Account -->
  <ModalComponent id="modal_delete_account" :title="$t('profile.option.delete_account')">
    <p style="color: red">{{ $t('profile.form.delete_account.desc') }}</p>
    <br />
    <FormComponent :submit="delete_account" class="d-flex flex-column justify-content-around">
      <SubmitComponent inner_text="Delete" class="btn btn-danger form-submit" />
    </FormComponent>
  </ModalComponent>
</template>

<script lang="ts">
import ModalComponent from '@/components/ModalComponent.vue'
import SubmitComponent from '@/components/form/SubmitComponent.vue'
import { defineComponent, ref } from 'vue'
import CardComponent from '@/components/CardComponent.vue'
import FormComponent from '@/components/form/FormComponent.vue'
import gql from 'graphql-tag'
import { log_out, mutation, query } from '@/util/graphql'
import NameComponent from "@/components/form/NameComponent.vue";
import type { UserModel } from "@/types/models/user.model";

export default defineComponent({
  name: 'ProfileComponent',
  components: {
    NameComponent,
    FormComponent,
    CardComponent,
    SubmitComponent,
    ModalComponent
  },
  methods: {
    update_profile(e: Event, data: FormData) {
      this.update_user({
        user_data: {
          name: data.get('name') as string,
        }
      }).then(() => {
        this.fetch_user()
        const form = e.target as HTMLFormElement
        form.setAttribute('data-bs-dismiss', 'modal')
        form.click()
        form.removeAttribute('data-bs-dismiss')
      })
    },
    delete_account(e: Event) {
      this.delete_user().then(() => {
        log_out()
        const form = e.target as HTMLFormElement
        form.setAttribute('data-bs-dismiss', 'modal')
        form.click()
        form.removeAttribute('data-bs-dismiss')
        this.$router.push('/')
      })
    },
    fetch_user() {
      query(gql`
        query user {
          user {
             id
             name
             username
          }
        }
      `).then((data) => {
        this.user = data.user as UserModel
      })
    },
    get_all_user_data(e: Event) {
      query(gql`
        query {
          user {
            id
            name
            username
            challenge
            password
            server_id
            verified
            pw_reset
          }
        }
      `).then((data) => {
        const json = JSON.stringify(data)
        const blob = new Blob([json], { type: 'application/json' })
        const url = URL.createObjectURL(blob)
        const link = document.createElement('a')
        link.href = url
        link.download = 'user_data.json'
        link.click()
        URL.revokeObjectURL(url)
        link.remove()
      })
    }
  },
  mounted() {
    this.fetch_user()
  },
  setup() {
    const user = ref<UserModel>({
      id: -1,
      name: '‎',
      username: '‎'
    })

    const update_user = mutation(gql`
      mutation update_user($user_data: UserUpdateInputModel!) {
        user_update(user_update_input_data: $user_data) {
          id
        }
      }
    `)

    const delete_user = mutation(gql`
      mutation delete_user {
        user_delete {
          id
        }
      }
    `)

    return {
      user,
      update_user,
      delete_user
    }
  }
})
</script>

<style scoped>
#card_profile {
  width: min(500px, 90vw);
  margin: 20px auto;
}

p {
  margin: 0;
}
</style>
