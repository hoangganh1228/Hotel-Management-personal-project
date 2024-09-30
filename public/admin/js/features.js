// Delete Button

const buttonDelete = document.querySelectorAll("[button-delete-features]");

if(buttonDelete.length > 0) {
  const formDelete = document.querySelector("#form-delete-features");
  const path =  formDelete.getAttribute("data-path");
  
  buttonDelete.forEach(button => {
    button.addEventListener("click", () => {
      const isConfirm = confirm("Bạn có chắc muốn xóa sản phẩm này?");
      
      if(isConfirm) {
        const id = button.getAttribute("data-id");

        const action = `${path}/${id}?_method=DELETE`;
        formDelete.action = action;

        formDelete.submit();
        
      }
    })
  })
}


// Delete Button