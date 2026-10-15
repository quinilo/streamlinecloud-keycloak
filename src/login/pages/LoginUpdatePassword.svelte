<script lang="ts">
  import LogoutOtherSessions from '../components/LogoutOtherSessions.svelte';
  import PasswordWrapper from '../components/PasswordWrapper.svelte';
  import type { PageProps } from '@keycloakify/svelte/login/pages/PageProps';
  import { kcSanitize } from 'keycloakify/lib/kcSanitize';
  import { getKcClsx } from 'keycloakify/login/lib/kcClsx';
  import type { I18n } from '../i18n';
  import type { KcContext } from '../KcContext';

  const {
    Template,
    kcContext,
    i18n,
    doUseDefaultCss,
    classes,
  }: PageProps<Extract<KcContext, { pageId: 'login-update-password.ftl' }>, I18n> = $props();

  const { kcClsx } = $derived(
    getKcClsx({
      doUseDefaultCss,
      classes,
    }),
  );

  const { msg, msgStr } = $derived($i18n);

  const { url, messagesPerField, isAppInitiatedAction } = $derived(kcContext);
</script>

<Template
  {kcContext}
  {i18n}
  {doUseDefaultCss}
  {classes}
  displayMessage={!messagesPerField.existsError('password', 'password-confirm')}
>
  {#snippet headerNode()}
    {@render msg('updatePasswordTitle')()}
  {/snippet}
  <form
    id="kc-passwd-update-form"
    class={kcClsx('kcFormClass')}
    action={url.loginAction}
    method="post"
  >
    <div class={kcClsx('kcFormGroupClass')}>
      <div class={kcClsx('kcLabelWrapperClass')}>
        <label
          for="password-new"
          class={kcClsx('kcLabelClass')}
        >
          {@render msg('passwordNew')()}
        </label>
      </div>
      <div class={kcClsx('kcInputWrapperClass')}>
        <PasswordWrapper
          {kcClsx}
          {i18n}
          passwordInputId="password-new"
        >
          <!-- svelte-ignore a11y_autofocus -->
          <input
            type="password"
            id="password-new"
            name="password-new"
            class="w-full"
            autofocus
            autocomplete="new-password"
            aria-invalid={messagesPerField.existsError('password', 'password-confirm')}
          />
        </PasswordWrapper>

        {#if messagesPerField.existsError('password')}
          <div class="alert alert-error alert-soft mt-1">
            <span
              id="input-error-password"
              class={kcClsx('kcInputErrorMessageClass')}
              aria-live="polite">{@html kcSanitize(messagesPerField.get('password'))}</span
            >
          </div>
        {/if}
      </div>
    </div>

    <div class={kcClsx('kcFormGroupClass')}>
      <div class={kcClsx('kcLabelWrapperClass')}>
        <label
          for="password-confirm"
          class={kcClsx('kcLabelClass')}
        >
          {@render msg('passwordConfirm')()}
        </label>
      </div>
      <div class={kcClsx('kcInputWrapperClass')}>
        <PasswordWrapper
          {kcClsx}
          {i18n}
          passwordInputId="password-confirm"
        >
          <!-- svelte-ignore a11y_autofocus -->
          <input
            type="password"
            id="password-confirm"
            name="password-confirm"
            class="input w-full"
            autofocus
            autocomplete="new-password"
            aria-invalid={messagesPerField.existsError('password', 'password-confirm')}
          />
        </PasswordWrapper>

        {#if messagesPerField.existsError('password-confirm')}
          <div class="alert alert-error alert-soft mt-1">
            <span
              id="input-error-password-confirm"
              class={kcClsx('kcInputErrorMessageClass')}
              aria-live="polite">{@html kcSanitize(messagesPerField.get('password-confirm'))}</span
            >
          </div>
        {/if}
      </div>
    </div>
    <div class={kcClsx('kcFormGroupClass')}>
      <LogoutOtherSessions
        {kcClsx}
        {i18n}
      />
      <div
        id="kc-form-buttons"
        class={kcClsx('kcFormButtonsClass')}
      >
        <input
          class="btn btn-primary w-full"
          type="submit"
          value={msgStr('doSubmit')}
        />
        {#if isAppInitiatedAction}
          <button
            class={kcClsx('kcButtonClass', 'kcButtonDefaultClass', 'kcButtonLargeClass')}
            type="submit"
            name="cancel-aia"
            value="true"
          >
            {@render msg('doCancel')()}
          </button>
        {/if}
      </div>
    </div>
  </form>
</Template>
