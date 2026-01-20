document.addEventListener("DOMContentLoaded", function () {
    const searchInput = document.querySelector(".APMSearchInput");
    const tableBody = document.querySelector(".APMTableBody");
    const tableRows = tableBody.querySelectorAll(".APMTableRow");

    searchInput.addEventListener("input", function () {
        const searchValue = searchInput.value.toLowerCase().trim();

        tableRows.forEach(row => {
            const productName = row.children[0].innerText.toLowerCase();
            const skuId = row.children[1].innerText.toLowerCase();
            const category = row.children[2].innerText.toLowerCase();

            const isMatch =
                productName.includes(searchValue) ||
                skuId.includes(searchValue) ||
                category.includes(searchValue);

            if (isMatch) {
                row.style.display = "";
            } else {
                row.style.display = "none";
            }
        });
    });


    // action button 
    document.addEventListener("click", function (e) {
    const btn = e.target.closest(".APMActionButton");
    if (!btn) return;

    // redirect to overview page
    window.location.href = "../html/adminProductOverview.html";
    });

});
