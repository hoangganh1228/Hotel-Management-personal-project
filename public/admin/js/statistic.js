const startDate = document.querySelector("#start");
const endDate = document.querySelector("#end");

const resetButton = document.querySelector("#reset");

if (startDate && endDate) {
  startDate.addEventListener("change", updateURL);
  endDate.addEventListener("change", updateURL);
}

function updateURL() {
  const start = startDate.value;
  const end = endDate.value;

  const url = new URL(window.location.href);
  if (start) {
    url.searchParams.set("start", start); 
  }
  if (end) {
    url.searchParams.set("end", end); 
  }

  // Tải lại trang với URL mới
  window.location.href = url.toString();
}

resetButton.addEventListener("click", () => {
  const start = startDate.value;
  const end = endDate.value;

  const url = new URL(window.location.href);
  if (start) {
    url.searchParams.delete("start"); 
  }
  if (end) {
    url.searchParams.delete("end"); 
  }

  window.location.href = url.toString();

})