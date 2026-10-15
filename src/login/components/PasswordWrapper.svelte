<script lang="ts">
  import { useReducer } from '@keycloakify/svelte/tools/useReducer';
  import type { KcClsx } from 'keycloakify/login/lib/kcClsx';
  import { assert } from 'keycloakify/tools/assert';
  import { onMount, type Snippet } from 'svelte';
  import type { I18n } from '../i18n';
  import type { Readable } from 'svelte/store';

  const props: {
    kcClsx: KcClsx;
    i18n: Readable<I18n>;
    passwordInputId: string;
    tabindex?: number;
    children: Snippet;
  } = $props();
  const { kcClsx, i18n, passwordInputId, tabindex, children } = $derived(props);

  const { msgStr } = $derived($i18n);

  const [isPasswordRevealed, toggleIsPasswordRevealed] = useReducer<boolean, boolean>(
    (isPasswordRevealed: boolean) => !isPasswordRevealed,
    false,
  );
  onMount(() => {
    const unsubscribe = isPasswordRevealed.subscribe(($isPasswordRevealed) => {
      const passwordInputElement: HTMLInputElement = document.getElementById(passwordInputId) as HTMLInputElement;

      assert(passwordInputElement instanceof HTMLInputElement);
      passwordInputElement.type = $isPasswordRevealed ? 'text' : 'password';
    });
    return () => unsubscribe();
  });
</script>

<label class="input w-full">
  {@render children?.()}

  <button
    type="button"
    aria-label={msgStr($isPasswordRevealed ? 'hidePassword' : 'showPassword')}
    aria-controls={passwordInputId}
    onclick={() => toggleIsPasswordRevealed($isPasswordRevealed)}
    class="absolute inset-y-0 inset-e-0 flex items-center z-20 px-3 cursor-pointer text-muted-foreground rounded-e-md focus:outline-hidden focus:text-primary-focus"
  >
    <svg
      class="shrink-0 size-3.5"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    >
      {#if $isPasswordRevealed}
        <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24" />
        <path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68" />
        <path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61" />
        <line
          x1="2"
          x2="22"
          y1="2"
          y2="22"
        />
      {:else}
        <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
        <circle
          cx="12"
          cy="12"
          r="3"
        />
      {/if}
    </svg>
  </button>
</label>
