// Filter

function filterRooms() {
  const selectedFacilities = [...document.querySelectorAll('input[name="facility"]:checked')].map(checkbox => checkbox.id);
  const selectedFeatures = [...document.querySelectorAll('input[name="feature"]:checked')].map(checkbox => checkbox.id);

  const inputAdult = document.querySelector("input[name='adult']");
  const inputChildren = document.querySelector("input[name='children']");
  
  const checkinDate = document.querySelector("#checkin");
  const checkoutDate = document.querySelector("#checkout");

  // Tạo chuỗi truy vấn từ các ID đã chọn
  const params = new URLSearchParams();
  
  selectedFacilities.forEach(id => {
    params.append('facility', id);
  });
  
  selectedFeatures.forEach(id => {
    params.append('feature', id);
  });

  if(inputAdult && inputAdult.value > 0) {
    params.append('adult', inputAdult.value);
  }
  if(inputChildren && inputChildren.value > 0) {
    params.append('children', inputChildren.value);
  }

  if(checkinDate && checkinDate.value) {
    params.append('checkin', checkinDate.value);
  }

  if(checkoutDate &&checkoutDate.value) {
    params.append('checkout', checkoutDate.value);
  }
  // Chuyển hướng tới URL mới với các tham số truy vấn
  window.location.href = `/rooms?${params.toString()}`;
}

// Script để điền lại giá trị từ query vào các input khi trang được load lại
document.addEventListener("DOMContentLoaded", function() {
  const params = new URLSearchParams(window.location.search);

  const inputAdult = document.querySelector("input[name='adult']");
  const inputChildren = document.querySelector("input[name='children']");

  const checkinDate = document.querySelector("#checkin");
  const checkoutDate = document.querySelector("#checkout");

  if (inputAdult && params.get('adult')) {
    inputAdult.value = params.get('adult'); // Điền lại giá trị adult từ query
  }
  
  if (inputChildren && params.get('children')) {
    inputChildren.value = params.get('children'); // Điền lại giá trị children từ query
  }

  if(checkinDate && params.get('checkin')) {
    checkinDate.value = params.get('checkin');
  }

  if(checkoutDate && params.get('checkout')) {
    checkoutDate.value = params.get('checkout');
  }
});

// End Filter