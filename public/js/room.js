// Filter

function filterRooms() {
  const selectedFacilities = [...document.querySelectorAll('input[name="facility"]:checked')].map(checkbox => checkbox.id);
  const selectedFeatures = [...document.querySelectorAll('input[name="feature"]:checked')].map(checkbox => checkbox.id);

  // Tạo chuỗi truy vấn từ các ID đã chọn
  const params = new URLSearchParams();
  
  selectedFacilities.forEach(id => {
    params.append('facility', id);
  });
  
  selectedFeatures.forEach(id => {
    params.append('feature', id);
  });
  // Chuyển hướng tới URL mới với các tham số truy vấn
  window.location.href = `/rooms?${params.toString()}`;
}

// End Filter