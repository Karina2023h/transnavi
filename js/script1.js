function showTab(tabId) {
  // Сховати всі таби
  const contents = document.querySelectorAll(".tab-content");
  contents.forEach((content) => content.classList.remove("active"));

  // Зняти active з усіх кнопок
  const buttons = document.querySelectorAll(".tab-button");
  buttons.forEach((btn) => btn.classList.remove("active"));

  // Показати вибраний таб
  document.getElementById(tabId).classList.add("active");

  // Активувати відповідну кнопку
  const button = Array.from(buttons).find(
    (btn) => btn.textContent.toLowerCase() === tabId
  );
  if (button) button.classList.add("active");
}
