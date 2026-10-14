<script lang="ts">
  import type { PageProps } from "@keycloakify/svelte/login/pages/PageProps";
  import { kcSanitize } from "keycloakify/lib/kcSanitize";
  import { getKcClsx } from "keycloakify/login/lib/kcClsx";
  import type { KcContext } from "../KcContext";
  import type { I18n } from "../i18n";

  const {
    Template,
    kcContext,
    i18n,
    doUseDefaultCss,
    classes
  }: PageProps<Extract<KcContext, { pageId: "login-reset-password.ftl" }>, I18n> = $props();

  const { kcClsx } = $derived(
    getKcClsx({
      doUseDefaultCss,
      classes
    })
  );

  const { url, realm, auth, messagesPerField } = $derived(kcContext);

  const { msg, msgStr } = $derived($i18n);
</script>

<Template
  {kcContext}
  {i18n}
  {doUseDefaultCss}
  {classes}
  displayInfo={true}
  displayMessage={!messagesPerField.existsError('username')}
>
  {#snippet headerNode()}
    {@render msg('emailForgotTitle')()}
  {/snippet}
  {#snippet infoNode()}
    {#if realm.duplicateEmailsAllowed}
      {@render msg('emailInstructionUsername')()}
    {:else}
      {@render msg('emailInstruction')()}
    {/if}
  {/snippet}
  <form
    id="kc-reset-password-form"
    class={kcClsx('kcFormClass')}
    action={url.loginAction}
    method="post"
  >
    <div class={kcClsx('kcFormGroupClass')}>
      <div class={kcClsx('kcLabelWrapperClass')}>
        <label
          for="username"
          class={kcClsx('kcLabelClass')}
        >
          {#if !realm.loginWithEmailAllowed}
            {@render msg('username')()}
          {:else if !realm.registrationEmailAsUsername}
            {@render msg('usernameOrEmail')()}
          {:else}
            {@render msg('email')()}
          {/if}
        </label>
      </div>
      <div class={kcClsx('kcInputWrapperClass')}>
        <!-- svelte-ignore a11y_autofocus -->
        <input
          type="text"
          id="username"
          name="username"
          class="input w-full"
          autofocus
          value={auth.attemptedUsername ?? ''}
          aria-invalid={messagesPerField.existsError('username')}
        />
        {#if messagesPerField.existsError('username')}
          <div class="alert alert-error alert-soft mt-2">
            <span
              id="input-error-username"
              class={kcClsx('kcInputErrorMessageClass')}
              aria-live="polite">{@html kcSanitize(messagesPerField.get('username'))}</span>
          </div>
        {/if}
      </div>
    </div>
    <div class={kcClsx('kcFormGroupClass', 'kcFormSettingClass')}>

      <div
        id="kc-form-buttons"
        class="flex justify-between mt-3"
      >
        <div class="w-[49%]">
          <a href={url.loginUrl} class="btn btn-outline btn-primary w-full">{@render msg('backToLogin')()}</a>
        </div>

        <div class="w-[49%]">
          <button
            class="btn btn-primary w-full"
            type="submit"
          >{msgStr('doSubmit')}</button>
        </div>
      </div>

    </div>
  </form>
</Template>
