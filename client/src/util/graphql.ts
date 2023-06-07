import { useMutation, useQuery } from "@vue/apollo-composable";
import { store } from "@/util/store";
import type { ApolloError } from "@apollo/client/errors";
import type { DocumentNode } from "graphql/language";
import gql from "graphql-tag";
import { get_locale } from "@/main";

function on_error(e: ApolloError) {
  const error_code = e.graphQLErrors[0].extensions.code as string;
  if (error_code === "WARNING") {
    store.show_alert("warning", e.message);

  } else if (error_code === "INFO") {
    store.show_alert("info", e.message);

  } else if (error_code === "SUCCESS") {
    store.show_alert("success", e.message);

  } else if (error_code === "UNAUTHENTICATED") {
    log_out();
    store.show_alert("warning", "You have been logged out.");

  } else if (error_code === "DANGER") {
    store.show_alert("danger", e.message);
    console.error(e);

  } else {
    store.show_alert("danger", "An unknown error occurred.");
    console.log(e)
  }
}

export async function query(query: DocumentNode, variables?: any | null): Promise<any> {
  return new Promise((resolve, reject) => {
    const { onError, onResult } = useQuery(query, variables, {
      context: {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("barrier_token")}`,
          "accept-language": get_locale()
        }
      },
      fetchPolicy: "network-only"
    });
    onError((e) => {
      on_error(e);
      reject(e);
    });
    onResult((r) => {
      resolve(r.data);
    });
  });
}

export function mutation(mutation: DocumentNode) {
  const { mutate, onError } = useMutation(mutation);
  onError(on_error);
  return (vars?: any) =>
    mutate(vars, {
      context: {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("barrier_token")}`,
          "accept-language": get_locale()
        }
      },
      fetchPolicy: "network-only"
    });
}

export async function log_in(username: string, password: string) {
  const data = await query(gql`
      query sign_in($username: String!, $password: String!)  {
          auth_sign_in(username: $username, password: $password) {
              barrier_token
          }
      }
    `, {
      username, password
    }
  );
  if (data.auth_sign_in.barrier_token !== null) {
    localStorage.setItem("barrier_token", data.auth_sign_in.barrier_token);
    store.logged_in = true;
    return true;
  }
  return false;
}

export async function register(username: string, password: string, name: string): Promise<boolean> {
  const register = await mutation(gql`
    mutation register($username: String!, $password: String!, $name: String!) {
        auth_register(user_input_data: {username: $username, password: $password, name: $name}) {
            id
        }
    }
  `)
  const res = await register({
    username, password, name
  })
  return !!res?.data.id;
}

export function log_out() {
  localStorage.removeItem("barrier_token");
  store.logged_in = false;
}
