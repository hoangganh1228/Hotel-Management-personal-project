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
  console.log(inputCheckAll);
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
    // console.log(inputChecked);
    if(inputChecked.length > 0) {
      let ids = [];
      const inputIds = formChangeMulti.querySelector("input[name='ids']")

      inputChecked.forEach(input => {
          const id = input.value;
          ids.push(id)
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
              alert('Xóa sản phẩm thành công!');
              const row = button.closest('tr');
              if(row) {
                row.remove();
              } else {
                alert('Xóa sản phẩm thất bại!');
              }
            }
          })
          .catch(error => {
            console.error('Error:', error);
            alert('Có lỗi xảy ra khi xóa sản phẩm!');
          });
      }

    })
  })
}

// End Delete Button

