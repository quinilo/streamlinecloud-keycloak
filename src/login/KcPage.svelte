<script lang="ts">
  import Template from "./Template.svelte";
  import UserProfileFormFields from "./components/UserProfileFormFields.svelte";
  import type { KcContext } from "keycloakify/login/KcContext";
  import type { ClassKey } from "keycloakify/login/lib/kcClsx";
  import { untrack, type Component } from "svelte";
  import { useI18n } from "./i18n";
  import "../app.css";

  const { kcContext }: { kcContext: KcContext } = $props();

  const { i18n } = useI18n({
    kcContext: untrack(() => kcContext)
  });

  const classes = {} satisfies { [key in ClassKey]?: string };
  const doMakeUserConfirmPassword = true;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const page = async (): Promise<{ default?: Component<any> }> => {
    switch (kcContext.pageId) {
      case "login.ftl":
        return import("./pages/Login.svelte");
      case "login-reset-password.ftl":
        return import("./pages/LoginResetPassword.svelte");
      case "register.ftl":
        return import("./pages/Register.svelte");
      case "logout-confirm.ftl":
        return import("./pages/LogoutConfirm.svelte");
      case "login-verify-email.ftl":
        return import("./pages/LoginVerifyEmail.svelte");
      case "login-update-profile.ftl":
        return import("./pages/LoginUpdateProfile.svelte");
      case "login-update-password.ftl":
        return import("./pages/LoginUpdatePassword.svelte");

      default:
        return import("@keycloakify/svelte/login/DefaultPage.svelte");
    }
  };
</script>

{#await page() then { default: Page }}
  <Page
    {kcContext}
    {i18n}
    {classes}
    {Template}
    {UserProfileFormFields}
    doUseDefaultCss={false}
    {doMakeUserConfirmPassword}
  ></Page>
{/await}
