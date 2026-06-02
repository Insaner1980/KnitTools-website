const WAITLIST_ENDPOINT = "https://api.finnvek.com/subscribe";
const WAITLIST_TIMEOUT_MS = 10000;

const DEFAULT_SENDING_TEXT = "Sending...";
const DEFAULT_GENERIC_ERROR = "Something went wrong. Please try again.";
const DEFAULT_NETWORK_ERROR = "Network error. Please check your connection.";

function setHidden(element: HTMLElement | null, hidden: boolean) {
  if (!element) return;
  element.hidden = hidden;
  element.style.display = hidden ? "none" : "block";
  element.setAttribute("aria-hidden", hidden ? "true" : "false");
}

function initWaitlistSignup(form: HTMLFormElement) {
  if (form.dataset.waitlistInitialized === "true") return;
  form.dataset.waitlistInitialized = "true";

  const content = form.querySelector<HTMLElement>(
    "[data-content], #waitlist-row, .waitlist-row",
  );
  const success = form.querySelector<HTMLElement>(
    "[data-success], #waitlist-success, .waitlist-success",
  );
  const errorEl = form.querySelector<HTMLElement>(
    "[data-error], #waitlist-error, .waitlist-error",
  );
  const button = form.querySelector<HTMLButtonElement>('button[type="submit"]');
  const emailInput = form.querySelector<HTMLInputElement>(
    'input[type="email"]',
  );
  const honeypot = form.querySelector<HTMLInputElement>(
    'input[name="website"]',
  );
  const originalButtonText = button?.textContent ?? "";
  const sendingText = form.dataset.sendingText || DEFAULT_SENDING_TEXT;
  const genericError = form.dataset.genericError || DEFAULT_GENERIC_ERROR;
  const networkError = form.dataset.networkError || DEFAULT_NETWORK_ERROR;
  const source = form.dataset.source || "knittools";
  const feedbackIds = [success?.id, errorEl?.id].filter((id): id is string =>
    Boolean(id),
  );

  if (emailInput && feedbackIds.length > 0) {
    const describedBy = new Set(
      (emailInput.getAttribute("aria-describedby") || "")
        .split(/\s+/)
        .filter(Boolean),
    );
    feedbackIds.forEach((id) => describedBy.add(id));
    emailInput.setAttribute("aria-describedby", [...describedBy].join(" "));
  }

  const showSuccess = () => {
    if (content) content.style.display = "none";
    setHidden(errorEl, true);
    if (errorEl) errorEl.textContent = "";
    if (emailInput) emailInput.removeAttribute("aria-invalid");
    setHidden(success, false);
  };

  const showError = (message: string) => {
    if (button) {
      button.disabled = false;
      button.textContent = originalButtonText;
    }
    if (emailInput) emailInput.setAttribute("aria-invalid", "true");
    if (errorEl) {
      errorEl.textContent = message;
      setHidden(errorEl, false);
    }
  };

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    if (!form.reportValidity()) return;

    if (button) {
      button.disabled = true;
      button.textContent = sendingText;
    }
    if (errorEl) {
      errorEl.textContent = "";
      setHidden(errorEl, true);
    }
    if (emailInput) emailInput.removeAttribute("aria-invalid");

    const controller = new AbortController();
    const timeoutId = window.setTimeout(() => {
      controller.abort();
    }, WAITLIST_TIMEOUT_MS);

    try {
      const response = await fetch(WAITLIST_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        signal: controller.signal,
        body: JSON.stringify({
          email: emailInput ? emailInput.value.trim() : "",
          source,
          website: honeypot ? honeypot.value : "",
        }),
      });
      const data = await response.json().catch(() => ({}));
      if (response.ok && data.success) {
        showSuccess();
      } else {
        showError(data.error || genericError);
      }
    } catch {
      showError(networkError);
    } finally {
      window.clearTimeout(timeoutId);
    }
  });
}

export function initWaitlistSignups() {
  document
    .querySelectorAll<HTMLFormElement>("form[data-waitlist-signup]")
    .forEach(initWaitlistSignup);
}
