const buttonDelete = document.querySelectorAll("[button-delete]");

if (buttonDelete.length > 0) {
  const formDelete = document.querySelector("#form-delete-image");
  const path = formDelete.getAttribute("data-path");

  buttonDelete.forEach(button => {
    button.addEventListener("click", () => {
      const isConfirm = confirm("Bạn có chắc muốn xóa ảnh này?");
      
      if (isConfirm) {
        const imageUrl = button.getAttribute("data-url"); // Lấy URL của ảnh cần xóa
        const action = `${path}?_method=DELETE`; // Đặt URL của form với phương thức DELETE
        formDelete.action = action;

        // Tạo input ẩn chứa imageUrl
        const inputImageUrl = document.createElement("input");
        inputImageUrl.type = "hidden";
        inputImageUrl.name = "imageUrl";
        inputImageUrl.value = imageUrl;

        formDelete.appendChild(inputImageUrl);

        formDelete.submit(); // Gửi form để thực hiện yêu cầu DELETE
      }
    });
  });
}

// Show Alert

const showAlert = document.querySelector("[show-alert]");
if(showAlert) {
    const time = parseInt(showAlert.getAttribute("data-time"));
    const closeAlert = showAlert.querySelector("[close-alert]")

    setTimeout(() => {
        showAlert.classList.add("alert-hidden")
    }, time);

    closeAlert.addEventListener("click", () => {
      showAlert.classList.add("alert-hidden")
    })
}

//End Show Alert

