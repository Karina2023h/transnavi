const pages = [
  "Egypt.html",
  "ukraine.html",
  "china.html",
  "kazakhstan.html",
  "usa.html",
];

function openSearchModal() {
  document.getElementById("searchModal").style.display = "flex";
  document.getElementById("citySearchInput").value = "";
  document.getElementById("citySearchInput").focus();
}

async function performCitySearch() {
  const query = document
    .getElementById("citySearchInput")
    .value.trim()
    .toUpperCase();
  if (!query) return;

  for (const page of pages) {
    try {
      const res = await fetch(page);
      const html = await res.text();
      const keywordsMatch = html.match(
        /<meta\s+name=["']keywords["']\s+content=["']([^"']+)["']/i
      );

      if (keywordsMatch) {
        const keywords = keywordsMatch[1]
          .split(",")
          .map((k) => k.trim().toUpperCase());
        if (keywords.includes(query)) {
          window.location.href = page;
          return;
        }
      }
    } catch (err) {
      console.error(`Не вдалося завантажити ${page}:`, err);
    }
  }

  alert("Нічого не знайдено.");
}

document.addEventListener("DOMContentLoaded", () => {
  document
    .querySelector(".search-icon i")
    ?.addEventListener("click", openSearchModal);
});

window.addEventListener("keydown", function (e) {
  if (e.key === "Escape")
    document.getElementById("searchModal").style.display = "none";
  if (
    e.key === "Enter" &&
    document.getElementById("searchModal").style.display === "flex"
  ) {
    performCitySearch();
  }
});

window.addEventListener("click", function (e) {
  const modal = document.getElementById("searchModal");
  if (e.target === modal) modal.style.display = "none";
});
