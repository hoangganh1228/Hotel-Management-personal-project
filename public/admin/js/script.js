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

// Delete Button

const buttonDelete = document.querySelectorAll("[button-delete]");

if(buttonDelete.length > 0) {
  const formDelete = document.querySelector("#form-delete-item");
  const path =  formDelete.getAttribute("data-path");
  
  buttonDelete.forEach(button => {
    button.addEventListener("click", () => {
      const isConfirm = confirm("Bạn có chắc muốn xóa sản phẩm này?");
      
      if(isConfirm) {
        const id = button.getAttribute("data-id");
        console.log(id);

        const action = `${path}/${id}?_method=DELETE`;
        formDelete.action = action;

        formDelete.submit();
        
      }
    })
  })
}


// Delete Button


