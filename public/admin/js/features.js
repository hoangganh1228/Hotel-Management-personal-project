// Delete Button

const buttonDelete = document.querySelectorAll("[button-delete-features]");

if(buttonDelete.length > 0) {
  
  buttonDelete.forEach(button => {
    button.addEventListener("click", () => {
      const isConfirm = confirm("Bạn có chắc muốn xóa sản phẩm này?");
      if(isConfirm) {
        const id = button.getAttribute("data-id");
        const link = `rooms-features/delete/${id}`;
        const options = {
          method: "DELETE"
        }

        fetch(link, options) 
          .then(res => res.json())
          .then(data => {
            if(data && data.code === 200) {
              const row = button.closest("tr");
              if(row) {
                row.remove();
              } else {
                alert('Xóa sản phẩm thất bại!');
              }
            }
          })
          .catch(error => {
            console.error('Error:', error);
            // alert('Có lỗi xảy ra khi xóa sản phẩm!');
          });
        
        
      }
    })
  })
}


// Delete Button