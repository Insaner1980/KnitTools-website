function initCardTable(table: HTMLTableElement) {
  if (table.dataset.mobileCardsInitialized === "true") return;

  const headers = [...table.querySelectorAll<HTMLTableCellElement>("thead th")]
    .map((header) => header.textContent?.trim() ?? "")
    .filter(Boolean);

  if (headers.length === 0) return;

  table.querySelectorAll<HTMLTableRowElement>("tbody tr").forEach((row) => {
    [...row.cells].forEach((cell, index) => {
      const label = headers[index];
      if (label) cell.dataset.mobileLabel = label;
    });
  });

  table.dataset.mobileCardsInitialized = "true";
  table.classList.add("is-mobile-card-ready");
}

export function initResponsiveTableControls() {
  document
    .querySelectorAll<HTMLTableElement>('[data-mobile-table="cards"]')
    .forEach(initCardTable);
}
