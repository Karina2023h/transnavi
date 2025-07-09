const searchIcon = document.querySelector(".search-icon");
const searchForm = document.getElementById("searchForm");
const searchInput = document.getElementById("citySearchInput");
const submitBtn = document.getElementById("submitSearch");

function toggleSearchForm() {
  if (searchForm.style.display === "none" || searchForm.style.display === "") {
    searchForm.style.display = "inline-flex";
    searchInput.focus();
  } else {
    searchForm.style.display = "none";
  }
}

searchIcon.addEventListener("click", toggleSearchForm);

// Пошук по кліку на іконку всередині форми
submitBtn.addEventListener("click", (e) => {
  e.preventDefault();
  performSiteSearch();
});

// Пошук по Enter в інпуті
searchInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    e.preventDefault();
    performSiteSearch();
  }
});

function performSiteSearch() {
  const queryRaw = searchInput.value.trim().toLowerCase();
  if (!queryRaw) {
    alert("Please enter a search query");
    return;
  }
  // Тут твій код пошуку, наприклад:
  alert("Searching for: " + queryRaw);
}
