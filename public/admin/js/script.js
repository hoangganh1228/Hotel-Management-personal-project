// Button Status
const buttonStatus = document.querySelectorAll("[button-status]");
if(buttonStatus.length > 0) {
  let url = new URL(window.location.href);
  buttonStatus.forEach(button => {
    button.addEventListener("click", () => {
      const status = button.getAttribute("button-status");
      

      if(status) {
        url.searchParams.set("status", status)
      } else {
        url.searchParams.delete("status");
      }

      window.location.href = url.href
    })
  })
}
// Button Status

// Form Search

const formSearch = document.querySelector("#form-search");
if(formSearch) {
  let url = new URL(window.location.href);

  formSearch.addEventListener("submit", (e) => {
    e.preventDefault();
    const keyword = e.target.elements.keyword.value;
    if(keyword) {
      url.searchParams.set("keyword", keyword)
    } else {
      url.searchParams.delete("keyword")
    }

    window.location.href = url.href
  })
}

// End Form Search

// Pagination

const buttonPagination = document.querySelectorAll("[button-pagination]");
if(buttonPagination) {
    let url = new URL(window.location.href);
    buttonPagination.forEach(button => {
        button.addEventListener("click", () => {
            const page = button.getAttribute("button-pagination");

            url.searchParams.set("page", page);

            window.location.href = url.href
        })
    })
}

// End Pagination

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
            // Cập nhật giao diện khi trạng thái đã thay đổi
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

// Delete Button
const buttonDelete = document.querySelectorAll("[button-delete]");
if(buttonDelete) {
  buttonDelete.forEach(button => {
    button.addEventListener("click", () => {
      const isConfirm = confirm("Bạn có chắc muốn xóa sản phẩm này?");
      if(isConfirm) {
        const id = button.getAttribute("data-id");
        const link = `rooms/delete/${id}`;
        const options = {
          method : "DELETE"
        }

        fetch(link, options) 
          .then(res => res.json())
          .then(data => {
            if(data && data.code === 200) {
              // alert('Xóa sản phẩm thành công!');
              const row = button.closest('tr');
              if(row) {
                row.remove();
              } else {
                // alert('Xóa sản phẩm thất bại!');
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
// End Delete Button

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

  const removeButton =  document.querySelectorAll(".remove-image");
  removeButton.forEach(button => {
    button.addEventListener("click", (e) => {
      const imageUrl = e.target.getAttribute("data-image-url");
      console.log(imageUrl);
      console.log(files);
      
      e.target.parentElement.remove();
    })
  })

}



// End Upload Image


// Sort

const sort = document.querySelector("[sort]");

if(sort) {
  let url = new URL(window.location.href);

  const sortSelect = sort.querySelector("[sort-select]");
  const sortClear = sort.querySelector("[sort-clear]");

  sortSelect.addEventListener("change", (e) => {
    const value = e.target.value;

    const [sortKey, sortValue] = value.split("-");

    url.searchParams.set("sortKey", sortKey);
    url.searchParams.set("sortValue", sortValue);

    window.location.href = url.href;
  })

  sortClear.addEventListener("click", () => {
    url.searchParams.remove("sortKey");
    url.searchParams.remove("sortValue");

    window.location.href = url.href;
  })

  const sortKey = url.searchParams.get("sortKey");
  const sortValue = url.searchParams.get("sortValue");

  if(sortKey && sortValue) {
    const stringSort = `${sortKey}-${sortValue}`;
    const optionSelected = sort.querySelector(`option[value='${stringSort}']`);
    optionSelected.selected = true;
  }
}

// End Sort


