  // Navigation Bar Interaction
// HAMBURGER OPEN/CLOSE
const hamburger = document.querySelector(".hamburger-menu");
var mobileMenu = document.getElementById("mobile-menu");
var hamberMenuIcon = document.querySelector("#hamburger-menu>img");

hamburger?.addEventListener("click", () => {
  mobileMenu.classList.toggle("menu-open");
  // Toggle hamburger icon
  if (mobileMenu.classList.contains("menu-open")) {
    hamberMenuIcon.src = "../assets/master/X.svg";
    document.querySelector(".bottom-nav").style.display = "none";
    document.querySelector("body").style.overflow = "hidden";
    window.scrollTo(0, 0);
  } else {
    hamberMenuIcon.src = "../assets/master/List.svg";
    document.querySelector("body").style.overflow = "auto";
    document.querySelector(".bottom-nav").style.display = "flex";
  }
});



    // main function

        function previewImage(event, boxId) {

            const file = event.target.files[0];

            if (!file) return;

            const allowedTypes = [
                'image/jpeg',
                'image/png',
                'image/webp',
                'image/jpg'
            ];

            if (!allowedTypes.includes(file.type)) {

                alert('Only JPG, PNG and WEBP allowed');

                return;
            }

            if (file.size > 5 * 1024 * 1024) {

                alert('Image size should be below 5MB');

                return;
            }

            const box = document.getElementById(boxId);

            const reader = new FileReader();

            reader.onload = function (e) {

                box.classList.add('has-image');

                box.innerHTML = `

            <img src="${e.target.result}">

            <button class="delete-btn"
                    onclick="deleteImage('${boxId}')">
                ×
            </button>

            <input type="file"
                   accept="image/*"
                   style="display:none"
                   onchange="previewImage(event,'${boxId}')">

        `;

            }

            reader.readAsDataURL(file);

        }

        function deleteImage(boxId) {

            const box = document.getElementById(boxId);

            box.classList.remove('has-image');

            box.innerHTML = `

        <label>
            Upload Image

            <input type="file"
                   accept="image/*"
                   onchange="previewImage(event,'${boxId}')">

        </label>

        <button class="delete-btn"
                onclick="deleteImage('${boxId}')">
            ×
        </button>

    `;

        }

        function publishPage() {

            let valid = true;

            const fields =
                document.querySelectorAll('.required-field');

            fields.forEach(field => {

                field.classList.remove('input-error');

                if (field.value.trim() === '') {

                    field.classList.add('input-error');

                    valid = false;

                }

            });

            if (!valid) {

                alert('Please fill all required fields');

                return;

            }

            const uploadedImages =
                document.querySelectorAll('.has-image');

            if (uploadedImages.length === 0) {

                alert('Please upload at least one image');

                return;

            }

            alert('Story Created Successfully');

        }




document.querySelector(".sidebar-main-vendor > article > ul > li:nth-of-type(6)").classList.add("sidebar-active");
document.querySelector(".sidebar-main-vendor ul > ul:nth-of-type(4)").classList.add("active");
document.querySelector(".sidebar-main-vendor ul > ul:nth-of-type(4) > li:nth-child(2)",).classList.add("submenu-active-highlight");


document.querySelector("#account-menu .mobile-dropdown:nth-child(6) .dropdown-header").classList.add("dropdown-header-active");
document.querySelector("#account-menu .mobile-dropdown:nth-child(6)").classList.add("active-mobile-submenu");
document.querySelector("#account-menu .mobile-dropdown:nth-child(6) li:nth-child(2)").classList.add("submenu-active-page");