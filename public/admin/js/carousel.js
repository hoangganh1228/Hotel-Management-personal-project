function rem_image(imageUrl) {
  const link = `/admin/carousel/delete?imageUrl=${encodeURIComponent(imageUrl)}`;
  const options = {
    method: "DELETE",
    headers: {
      'Content-Type': 'application/json'
    }
  };

  fetch(link, options)
    .then(res => res.json())
    .then(data => {
      if (data.success) {
        alert("Xóa ảnh thành công!");
        location.reload(); 
      } else {
        alert("Xóa ảnh thất bại!");
      }
    })
    .catch(error => console.error("Lỗi khi xóa ảnh:", error));
}
