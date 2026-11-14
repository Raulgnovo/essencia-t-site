const svg = (inner: string, extra = ""): string =>
  `<svg class="icon" ${extra} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">${inner}</svg>`;

export const icons = {
  instagram: svg(
    `<rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.2" cy="6.8" r="0.6" fill="currentColor"/>`,
  ),
  whatsapp: svg(
    `<path d="M3 21l1.7-5.1A8.5 8.5 0 1 1 8.3 19.4L3 21z"/><path d="M9 8.5c0 3.2 3.3 6.5 6.5 6.5l1.2-1.4-2.2-1.2-1 .8c-.9-.3-2-1.4-2.3-2.3l.8-1-1.2-2.2L9 8.5z" fill="currentColor" stroke="none"/>`,
  ),
  menu: svg(`<path d="M4 8h16M4 16h16"/>`),
  close: svg(`<path d="M6 6l12 12M18 6L6 18"/>`),
  arrow: svg(`<path d="M5 12h14M13 6l6 6-6 6"/>`),
  search: svg(`<circle cx="11" cy="11" r="6.5"/><path d="M16 16l4.5 4.5"/>`),
  chevron: svg(`<path d="M6 9l6 6 6-6"/>`),
  pin: svg(`<path d="M12 21s-6.5-5.6-6.5-11a6.5 6.5 0 0 1 13 0c0 5.4-6.5 11-6.5 11z"/><circle cx="12" cy="10" r="2.3"/>`),
  package: svg(
    `<path d="M3.5 7.5L12 3l8.5 4.5v9L12 21l-8.5-4.5v-9z"/><path d="M3.5 7.5L12 12l8.5-4.5M12 12v9"/>`,
  ),
  gift: svg(
    `<rect x="3.5" y="8.5" width="17" height="4" rx="1"/><path d="M5 12.5V20h14v-7.5M12 8.5V20"/><path d="M12 8.5C10 8.5 7.5 8 7.5 6a2 2 0 0 1 3.4-1.4L12 8.5zm0 0c2 0 4.5-.5 4.5-2.5a2 2 0 0 0-3.4-1.4L12 8.5z"/>`,
  ),
} as const;
