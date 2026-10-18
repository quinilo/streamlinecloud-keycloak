<script lang="ts">
  import { useInitialize } from '@keycloakify/svelte/account/Template.useInitialize';
  import type { TemplateProps } from '@keycloakify/svelte/account/TemplateProps';
  import { useSetClassName } from '@keycloakify/svelte/tools/useSetClassName';
  import { getKcClsx } from 'keycloakify/account/lib/kcClsx';
  import { clsx } from 'keycloakify/tools/clsx';
  import { onMount, untrack } from 'svelte';
  import type { I18n } from './i18n';
  import type { KcContext } from './KcContext';
  import { kcSanitize } from 'keycloakify/lib/kcSanitize';
  import logoUrl from '../assets/streamlinecloud-logo.png';

  const { kcContext, i18n, doUseDefaultCss, active, classes, children }: TemplateProps<KcContext, I18n> = $props();
  const { kcClsx } = $derived(getKcClsx({ doUseDefaultCss, classes }));

  const { msg, msgStr, currentLanguage, enabledLanguages } = $derived($i18n);

  const { url, features, realm, message, referrer } = $derived(kcContext);

  onMount(() => {
    document.title = msgStr('accountManagementTitle');
  });

  useSetClassName({
    qualifiedName: 'html',
    className: untrack(() => kcClsx('kcHtmlClass')),
  });

  useSetClassName({
    qualifiedName: 'body',
    className: clsx(
      'admin-console',
      'user',
      untrack(() => kcClsx('kcBodyClass')),
    ),
  });

  const { isReadyToRender } = useInitialize({
    kcContext: untrack(() => kcContext),
    doUseDefaultCss: untrack(() => doUseDefaultCss),
  });
</script>

{#if $isReadyToRender}
  <div class="drawer lg:drawer-open">
    <input
      id="my-drawer-4"
      type="checkbox"
      class="drawer-toggle inline"
    />
    <div class="drawer-content">
      <!-- Navbar -->
      <nav class="navbar w-full bg-base-300">
        <label
          for="my-drawer-4"
          aria-label="open sidebar"
          class="btn btn-square btn-ghost drawer-button"
        >
          <!-- Sidebar toggle icon -->
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            stroke-linejoin="round"
            stroke-linecap="round"
            stroke-width="2"
            fill="none"
            stroke="currentColor"
            class="my-1.5 inline-block size-4"
            ><path d="M4 4m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z"></path><path
              d="M9 4v16"
            ></path><path d="M14 10l2 2l-2 2"></path></svg
          >
        </label>

        <div class="flex justify-between w-full">
          <div class="flex">
            <img
              src={logoUrl}
              alt="StreamlineCloud Logo"
              class="max-w-[40px]"
            />
            <h1 class="my-auto mx-2">Account Dashboard</h1>
          </div>

          <ul class="flex">
            {#if enabledLanguages.length}
              <div class="dropdown dropdown-end my-auto mx-2">
                <div
                  tabindex="0"
                  role="button"
                  class="m-2"
                >
                  {currentLanguage.label}
                </div>
                <ul
                  tabindex="-1"
                  class="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm"
                >
                  {#each enabledLanguages as { label, href, languageTag } (languageTag)}
                    <li class="kc-dropdown-item">
                      <a {href}>{label}</a>
                    </li>
                  {/each}
                </ul>
              </div>
            {/if}
            {#if referrer?.url}
              <li>
                <a
                  href={referrer.url}
                  id="referrer"
                >
                  {@render msg('backTo', referrer.name)()}
                </a>
              </li>
            {/if}
            <li>
              <a
                href={url.getLogoutUrl()}
                class="btn btn-soft btn-primary">{@render msg('doSignOut')()}</a
              >
            </li>
          </ul>
        </div>
      </nav>
      <div class="p-3">
        {@render children?.()}
      </div>
    </div>

    <div class="drawer-side is-drawer-close:overflow-visible">
      <label
        for="my-drawer-4"
        aria-label="close sidebar"
        class="drawer-overlay"
      ></label>
      <div class="flex min-h-full flex-col items-start bg-base-200 is-drawer-close:w-14 is-drawer-open:w-64">
        <!-- Sidebar content here -->
        <ul class="menu w-full grow">
          <!-- List item -->

          <li class={clsx(active === 'account' && 'active')}>
            <a
              href={url.accountUrl}
              class="is-drawer-close:tooltip is-drawer-close:tooltip-right"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                class="bi bi-person-circle"
                viewBox="0 0 16 16"
              >
                <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0" />
                <path
                  fill-rule="evenodd"
                  d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1"
                />
              </svg>
              <span class="is-drawer-close:hidden">{@render msg('account')()}</span></a
            >
          </li>
          <!--
          {#if features.passwordUpdateSupported}
            <li class={clsx(active === 'password' && 'active')}>
              <a
                href={url.passwordUrl}
                class="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                ><svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  class="bi bi-lock-fill"
                  viewBox="0 0 16 16"
                >
                  <path
                    fill-rule="evenodd"
                    d="M8 0a4 4 0 0 1 4 4v2.05a2.5 2.5 0 0 1 2 2.45v5a2.5 2.5 0 0 1-2.5 2.5h-7A2.5 2.5 0 0 1 2 13.5v-5a2.5 2.5 0 0 1 2-2.45V4a4 4 0 0 1 4-4m0 1a3 3 0 0 0-3 3v2h6V4a3 3 0 0 0-3-3"
                  />
                </svg><span class="is-drawer-close:hidden">{@render msg('password')()}</span></a
              >
            </li>
          {/if}
          -->
          <li class={clsx(active === 'totp' && 'active')}>
            <a
              href={url.totpUrl}
              class="is-drawer-close:tooltip is-drawer-close:tooltip-right"
              ><svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                class="bi bi-fingerprint"
                viewBox="0 0 16 16"
              >
                <path
                  d="M8.06 6.5a.5.5 0 0 1 .5.5v.776a11.5 11.5 0 0 1-.552 3.519l-1.331 4.14a.5.5 0 0 1-.952-.305l1.33-4.141a10.5 10.5 0 0 0 .504-3.213V7a.5.5 0 0 1 .5-.5Z"
                />
                <path
                  d="M6.06 7a2 2 0 1 1 4 0 .5.5 0 1 1-1 0 1 1 0 1 0-2 0v.332q0 .613-.066 1.221A.5.5 0 0 1 6 8.447q.06-.555.06-1.115zm3.509 1a.5.5 0 0 1 .487.513 11.5 11.5 0 0 1-.587 3.339l-1.266 3.8a.5.5 0 0 1-.949-.317l1.267-3.8a10.5 10.5 0 0 0 .535-3.048A.5.5 0 0 1 9.569 8m-3.356 2.115a.5.5 0 0 1 .33.626L5.24 14.939a.5.5 0 1 1-.955-.296l1.303-4.199a.5.5 0 0 1 .625-.329"
                />
                <path
                  d="M4.759 5.833A3.501 3.501 0 0 1 11.559 7a.5.5 0 0 1-1 0 2.5 2.5 0 0 0-4.857-.833.5.5 0 1 1-.943-.334m.3 1.67a.5.5 0 0 1 .449.546 10.7 10.7 0 0 1-.4 2.031l-1.222 4.072a.5.5 0 1 1-.958-.287L4.15 9.793a9.7 9.7 0 0 0 .363-1.842.5.5 0 0 1 .546-.449Zm6 .647a.5.5 0 0 1 .5.5c0 1.28-.213 2.552-.632 3.762l-1.09 3.145a.5.5 0 0 1-.944-.327l1.089-3.145c.382-1.105.578-2.266.578-3.435a.5.5 0 0 1 .5-.5Z"
                />
                <path
                  d="M3.902 4.222a5 5 0 0 1 5.202-2.113.5.5 0 0 1-.208.979 4 4 0 0 0-4.163 1.69.5.5 0 0 1-.831-.556m6.72-.955a.5.5 0 0 1 .705-.052A4.99 4.99 0 0 1 13.059 7v1.5a.5.5 0 1 1-1 0V7a3.99 3.99 0 0 0-1.386-3.028.5.5 0 0 1-.051-.705M3.68 5.842a.5.5 0 0 1 .422.568q-.044.289-.044.59c0 .71-.1 1.417-.298 2.1l-1.14 3.923a.5.5 0 1 1-.96-.279L2.8 8.821A6.5 6.5 0 0 0 3.058 7q0-.375.054-.736a.5.5 0 0 1 .568-.422m8.882 3.66a.5.5 0 0 1 .456.54c-.084 1-.298 1.986-.64 2.934l-.744 2.068a.5.5 0 0 1-.941-.338l.745-2.07a10.5 10.5 0 0 0 .584-2.678.5.5 0 0 1 .54-.456"
                />
                <path
                  d="M4.81 1.37A6.5 6.5 0 0 1 14.56 7a.5.5 0 1 1-1 0 5.5 5.5 0 0 0-8.25-4.765.5.5 0 0 1-.5-.865m-.89 1.257a.5.5 0 0 1 .04.706A5.48 5.48 0 0 0 2.56 7a.5.5 0 0 1-1 0c0-1.664.626-3.184 1.655-4.333a.5.5 0 0 1 .706-.04ZM1.915 8.02a.5.5 0 0 1 .346.616l-.779 2.767a.5.5 0 1 1-.962-.27l.778-2.767a.5.5 0 0 1 .617-.346m12.15.481a.5.5 0 0 1 .49.51c-.03 1.499-.161 3.025-.727 4.533l-.07.187a.5.5 0 0 1-.936-.351l.07-.187c.506-1.35.634-2.74.663-4.202a.5.5 0 0 1 .51-.49"
                />
              </svg><span class="is-drawer-close:hidden">{@render msg('authenticator')()}</span></a
            >
          </li>
          {#if features.identityFederation}
            <li class={clsx(active === 'social' && 'active')}>
              <a
                href={url.socialUrl}
                class="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                ><svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  class="bi bi-people-fill"
                  viewBox="0 0 16 16"
                >
                  <path
                    d="M7 14s-1 0-1-1 1-4 5-4 5 3 5 4-1 1-1 1zm4-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6m-5.784 6A2.24 2.24 0 0 1 5 13c0-1.355.68-2.75 1.936-3.72A6.3 6.3 0 0 0 5 9c-4 0-5 3-5 4s1 1 1 1zM4.5 8a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5"
                  />
                </svg><span class="is-drawer-close:hidden">{@render msg('federatedIdentity')()}</span></a
              >
            </li>
          {/if}
          <li class={clsx(active === 'sessions' && 'active')}>
            <a
              href={url.sessionsUrl}
              class="is-drawer-close:tooltip is-drawer-close:tooltip-right"
              ><svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                class="bi bi-person-lines-fill"
                viewBox="0 0 16 16"
              >
                <path
                  d="M6 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m-5 6s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zM11 3.5a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1h-4a.5.5 0 0 1-.5-.5m.5 2.5a.5.5 0 0 0 0 1h4a.5.5 0 0 0 0-1zm2 3a.5.5 0 0 0 0 1h2a.5.5 0 0 0 0-1zm0 3a.5.5 0 0 0 0 1h2a.5.5 0 0 0 0-1z"
                />
              </svg><span class="is-drawer-close:hidden">{@render msg('sessions')()}</span></a
            >
          </li>
          <li class={clsx(active === 'applications' && 'active')}>
            <a
              href={url.applicationsUrl}
              class="is-drawer-close:tooltip is-drawer-close:tooltip-right"
              ><svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                class="bi bi-terminal"
                viewBox="0 0 16 16"
              >
                <path
                  d="M6 9a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 0 1h-3A.5.5 0 0 1 6 9M3.854 4.146a.5.5 0 1 0-.708.708L4.793 6.5 3.146 8.146a.5.5 0 1 0 .708.708l2-2a.5.5 0 0 0 0-.708z"
                />
                <path
                  d="M2 1a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2zm12 1a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1z"
                />
              </svg><span class="is-drawer-close:hidden">{@render msg('applications')()}</span></a
            >
          </li>
          {#if features.log}
            <li class={clsx(active === 'log' && 'active')}>
              <a
                href={url.logUrl}
                class="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                ><svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  class="bi bi-list-check"
                  viewBox="0 0 16 16"
                >
                  <path
                    fill-rule="evenodd"
                    d="M5 11.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5M3.854 2.146a.5.5 0 0 1 0 .708l-1.5 1.5a.5.5 0 0 1-.708 0l-.5-.5a.5.5 0 1 1 .708-.708L2 3.293l1.146-1.147a.5.5 0 0 1 .708 0m0 4a.5.5 0 0 1 0 .708l-1.5 1.5a.5.5 0 0 1-.708 0l-.5-.5a.5.5 0 1 1 .708-.708L2 7.293l1.146-1.147a.5.5 0 0 1 .708 0m0 4a.5.5 0 0 1 0 .708l-1.5 1.5a.5.5 0 0 1-.708 0l-.5-.5a.5.5 0 0 1 .708-.708l.146.147 1.146-1.147a.5.5 0 0 1 .708 0"
                  />
                </svg><span class="is-drawer-close:hidden">{@render msg('log')()}</span></a
              >
            </li>
          {/if}
          {#if realm.userManagedAccessAllowed && features.authorization}
            <li class={clsx(active === 'authorization' && 'active')}>
              <a
                href={url.resourceUrl}
                class="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                ><svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  class="bi bi-database-fill"
                  viewBox="0 0 16 16"
                >
                  <path
                    d="M3.904 1.777C4.978 1.289 6.427 1 8 1s3.022.289 4.096.777C13.125 2.245 14 2.993 14 4s-.875 1.755-1.904 2.223C11.022 6.711 9.573 7 8 7s-3.022-.289-4.096-.777C2.875 5.755 2 5.007 2 4s.875-1.755 1.904-2.223"
                  />
                  <path
                    d="M2 6.161V7c0 1.007.875 1.755 1.904 2.223C4.978 9.71 6.427 10 8 10s3.022-.289 4.096-.777C13.125 8.755 14 8.007 14 7v-.839c-.457.432-1.004.751-1.49.972C11.278 7.693 9.682 8 8 8s-3.278-.307-4.51-.867c-.486-.22-1.033-.54-1.49-.972"
                  />
                  <path
                    d="M2 9.161V10c0 1.007.875 1.755 1.904 2.223C4.978 12.711 6.427 13 8 13s3.022-.289 4.096-.777C13.125 11.755 14 11.007 14 10v-.839c-.457.432-1.004.751-1.49.972-1.232.56-2.828.867-4.51.867s-3.278-.307-4.51-.867c-.486-.22-1.033-.54-1.49-.972"
                  />
                  <path
                    d="M2 12.161V13c0 1.007.875 1.755 1.904 2.223C4.978 15.711 6.427 16 8 16s3.022-.289 4.096-.777C13.125 14.755 14 14.007 14 13v-.839c-.457.432-1.004.751-1.49.972-1.232.56-2.828.867-4.51.867s-3.278-.307-4.51-.867c-.486-.22-1.033-.54-1.49-.972"
                  />
                </svg><span class="is-drawer-close:hidden">{@render msg('myResources')()}</span></a
              >
            </li>
          {/if}
        </ul>
      </div>
    </div>
  </div>

  <div class="container">
    <div class="bs-sidebar col-sm-3">
      <ul></ul>
    </div>

    <div class="col-sm-9 content-area">
      {#if message !== undefined}
        <div class={clsx('alert', `alert-${message.type}`)}>
          {#if message.type === 'success'}<span class="pficon pficon-ok"></span>{/if}
          {#if message.type === 'error'}<span class="pficon pficon-error-circle-o"></span>{/if}
          <span class="kc-feedback-text">{@html kcSanitize(message.summary)}</span>
        </div>
      {/if}
    </div>
  </div>
{/if}
