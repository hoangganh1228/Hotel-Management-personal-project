// Upload Image
const uploadImage =  document.querySelector("[upload-image]");
if(uploadImage) {
    const uploadImageInput = document.querySelector("[upload-image-input]")
    const uploadImagePreview = document.querySelector("[upload-image-preview]")
    uploadImageInput.addEventListener("change", (e) => {
        const file = e.target.files[0];
        if(file) {
            uploadImagePreview.src = URL.createObjectURL(file)
        }
    })
}
// End Upload Image

const buttonChangeStatus = document.querySelectorAll("[button-change-status]");
console.log(buttonChangeStatus);

if(buttonChangeStatus) {
  buttonChangeStatus.forEach(button => {
    button.addEventListener("click", () => {
      const currentStatus = button.getAttribute("data-status");
      const id = button.getAttribute("data-id");

      const newStatus = currentStatus == "active" ? "inactive" : "active"; 
      
      const link = `accounts/change-status/${newStatus}/${id}`;

      const options = {
        method: "PATCH"
      }

      fetch(link, options)
        .then(res => res.json())
        .then(data => {
          if(data.code === 200) {
            button.classList.toggle("badge-success", data.status === "active");
            button.classList.toggle("badge-danger", data.status === "inactive");
            button.textContent = data.status === "active" ? "Hoạt động" : "Dừng hoạt động";
            button.setAttribute("data-status", data.status); 
          } else {
            console.error("Cập nhật trạng thái thất bại");
          }
        })
        .catch(error => console.error("Lỗi:", error));
      
    })
  })
}
