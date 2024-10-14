document.addEventListener('DOMContentLoaded', () => {
  const checkinInput = document.querySelector("input[name='checkin']");
  const checkoutInput = document.querySelector("input[name='checkout']");
  const voucherInput = document.querySelector("input[name='voucher_code']");
  const applyVoucherButton = document.querySelector("#apply_voucher_btn")
  const totalPriceElement = document.querySelector("#total_price");

  function calculateTotalPrice() {
    const url = window.location.href;
    const parts = url.split("/");

    const checkinDate = new Date(checkinInput.value);
    const checkoutDate = new Date(checkoutInput.value);
    const id = parts[parts.length - 1];
    const voucherCode = voucherInput.value; 


    if(checkinDate && checkoutDate && checkoutDate > checkinDate) {
      const timeDifference  = checkoutDate - checkinDate;
      const totalDays = timeDifference / (1000 * 60 * 60 * 24);
      
      const link = `/rooms/calculate-price`;
      const options = {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          id: id,
          days: totalDays,
          voucherCode: voucherCode
        })
      }
      fetch(link, options)
        .then(res => res.json())
        .then(data => {
          if(data && data.code == 200) {
            totalPriceElement.innerText = `${data.totalPrice.toLocaleString()} VND`;
          } else {
            alert(data.message || 'Có lỗi xảy ra');
            totalPriceElement.innerText = `0 VND`;
          }
        })
        .catch(error => {
          console.error('Lỗi khi tính tổng số tiền:', error);
          totalPriceElement.innerText = `0 VND`;
        });
    } else {
      totalPriceElement.innerText = `0 VND`;
    }

    
    
  }

  checkinInput.addEventListener("change", calculateTotalPrice);
  checkoutInput.addEventListener("change", calculateTotalPrice);
  applyVoucherButton.addEventListener('click', calculateTotalPrice);
})
