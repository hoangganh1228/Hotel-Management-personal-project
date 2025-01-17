// Change Status

const buttonChangeStatus = document.querySelectorAll("[button-change-status]");

if (buttonChangeStatus) {
  buttonChangeStatus.forEach(button => {
    button.addEventListener("click", () => {
      const currentStatus = button.getAttribute("data-status");
      const id = button.getAttribute("data-id");

      // Xác định trạng thái mới để gửi lên server
      const newStatus = currentStatus === "active" ? "inactive" : "active";

      const link = `rooms/change-status/${newStatus}/${id}`;

      const options = {
        method: "PATCH"
      };

      fetch(link, options)
        .then(res => res.json())
        .then(data => {
          if (data.code === 200) {
            button.classList.toggle("badge-success", data.status === "active");
            button.classList.toggle("badge-danger", data.status === "inactive");
            button.textContent = data.status === "active" ? "Hoạt động" : "Dừng hoạt động";
            button.setAttribute("data-status", data.status); // Cập nhật lại trạng thái mới trên giao diện
          } else {
            console.error("Cập nhật trạng thái thất bại");
          }
        })
        .catch(error => console.error("Lỗi:", error));
    });
  });
}

// End Change Status

// Checkbox Multi

const checkboxMulti = document.querySelector("[checkbox-multi]");
if(checkboxMulti) {
  // console.log(checkboxMulti);
  const inputCheckAll = checkboxMulti.querySelector("input[name='checkall']");
  const inputsId = checkboxMulti.querySelectorAll("input[name='id']")
  // console.log(inputsId);
  inputCheckAll.addEventListener("click", () => {
    if(inputCheckAll.checked) {
      inputsId.forEach(input => {
        input.checked = true
      })
    } else {
      inputsId.forEach(input => {
        input.checked = false;
      }) 
    }
  })

  inputsId.forEach(input => {
    input.addEventListener("click", () => {
        const countChecked = checkboxMulti.querySelectorAll(
            "input[name='id']:checked"
        ).length;
        // console.log(countChecked);

        if(countChecked == inputsId.length) {
          inputCheckAll.checked = true;
        }
        else {
          inputCheckAll.checked = false;
        }
      })
  })
}
// End Checkbox Multi

// Form Change Multi
const formChangeMulti = document.querySelector("[form-change-multi]");
console.log(formChangeMulti);

if(formChangeMulti) {
  formChangeMulti.addEventListener("submit", (e) => {
    e.preventDefault();

    const checkboxMulti = document.querySelector("[checkbox-multi]");
    const inputChecked = checkboxMulti.querySelectorAll(
        "input[name='id']:checked"
    );
    
    const typeChange = e.target.elements.type.value;

    if(typeChange == "delete-all") {
      const isConfirm = confirm("Bạn có chắc muốn xóa những sản phẩm này?");

      if(!isConfirm)  {
        return;
      }
    }

    if(inputChecked.length > 0) {
      let ids = [];
      const inputIds = formChangeMulti.querySelector("input[name='ids']")

      

      inputChecked.forEach(input => {
        const id = input.value;
        if(typeChange == "change-position") {
          const position = input.closest("tr").querySelector("input[name='position']").value;
          
          ids.push(`${id}-${position}`);
        } else {
          ids.push(id);
        }
      })

      inputIds.value = ids.join(", ")

      formChangeMulti.submit();
    }
    else {
      alert("Vui lòng chọn ít nhất một bản ghi!")
    }
  })
}
// End Form Change Multi




// Upload Image

const uploadImage = document.querySelector("[upload-image]");

if (uploadImage) {
  const uploadImageInput = document.querySelector("[upload-image-input]");
  const uploadImagePreviewContainer = document.querySelector("[upload-image-preview-container]");

  uploadImageInput.addEventListener("change", (e) => {
    uploadImagePreviewContainer.innerHTML = '';
    console.log(e.target.files);
    
    const files = Array.from(e.target.files); // Chuyển tệp thành mảng để xử lý
    console.log(files);
    
    if (files.length > 0) {
      files.forEach((file, index) => {
        // Tạo container cho mỗi ảnh và nút "x"
        const imgContainer = document.createElement("div");
        imgContainer.classList.add("image-container");

        // Tạo phần tử img để xem trước ảnh
        const imgElement = document.createElement("img");
        imgElement.src = URL.createObjectURL(file);
        imgElement.classList.add("image-preview");

        // Tạo nút "x" để xóa ảnh
        const removeButton = document.createElement("span");
        removeButton.textContent = "x";
        removeButton.classList.add("remove-image");
        removeButton.onclick = () => {
          imgContainer.remove(); // Xóa ảnh khỏi phần xem trước
          files.splice(index, 1); // Xóa tệp khỏi mảng `files`

          // Tạo lại danh sách tệp mới mà không có ảnh bị xóa
          const dataTransfer = new DataTransfer();
          files.forEach((remainingFile) => {
            dataTransfer.items.add(remainingFile);
          });
          uploadImageInput.files = dataTransfer.files; // Cập nhật lại input files
        };

        // Thêm ảnh và nút "x" vào container
        imgContainer.appendChild(imgElement);
        imgContainer.appendChild(removeButton);

        // Thêm container vào phần preview container
        uploadImagePreviewContainer.appendChild(imgContainer);
      });
    }
  });

  const removeButton =  document.querySelectorAll("[remove-image]");
  
  if(removeButton.length > 0) {
    const formDelete = document.querySelector("#form-delete-image");
    const path = formDelete.getAttribute("data-path");

    removeButton.forEach(button => {
      button.addEventListener("click", () => {
        const imageUrl = button.getAttribute("data-image-url");
        const roomId = button.getAttribute("data-room-id");
        
        const action = `${path}?_method=DELETE`;
        formDelete.action = action;
        
        const inputImageUrl = document.createElement("input");
        inputImageUrl.type = "hidden";
        inputImageUrl.name = "imageUrl";
        inputImageUrl.value = imageUrl;

        formDelete.appendChild(inputImageUrl);

        const inputRoomId = document.createElement("input");
        inputRoomId.type = "hidden";
        inputRoomId.name = "roomId";
        inputRoomId.value = roomId;

        formDelete.appendChild(inputRoomId);

        formDelete.submit();
      })
    })

  }

}



// End Upload Image
