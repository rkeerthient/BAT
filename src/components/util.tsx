// TODO: modify to account for facets and filters
export const setPathAndQueryParams = (
  name: string,
  value: any,
  path?: string
) => {
  const pathname = window.location.pathname;
  const queryParams = new URLSearchParams(window.location.search);

  queryParams.set("query", value);

  if (pathname.includes("")) {
    history.pushState(null, "", `${path ?? ""}?` + queryParams.toString());
  } else {
    window.location.href = `?query=${value}`;
  }
};

export const removeQueryParam = (name: string) => {
  const queryParams = new URLSearchParams(window.location.search);
  // Set new or modify existing parameter value.
  queryParams.delete(name);
  // OR do a push to history
  history.pushState({}, document.title, window.location.pathname);
};
