export const initialThemeScript = `
(function () {
  try {
    var url = new URL(window.location.href);
    var t = url.searchParams.get("theme") || localStorage.getItem("st-theme") || "editorial";
    var m = url.searchParams.get("mode") || localStorage.getItem("st-mode");
    if (!m) m = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    document.documentElement.setAttribute("data-theme", t);
    document.documentElement.setAttribute("data-mode", m);
  } catch (e) {}
})();
`;
