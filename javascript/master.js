// Navigation Bar Interaction
// HAMBURGER OPEN/CLOSE
const hamburger = document.querySelector(".hamburger-menu");
var mobileMenu = document.getElementById("mobile-menu");
var hamberMenuIcon=document.querySelector("#hamburger-menu>img");
const bar1 = document.querySelector(".mobile-search-bar-main");

hamburger?.addEventListener("click", () => {
  mobileMenu.classList.toggle("menu-open");
  // Toggle hamburger icon
  if (mobileMenu.classList.contains("menu-open")) {
    hamberMenuIcon.src = "../assets/master/X.svg";
    document.querySelector(".bottom-nav").style.display="none"
    document.querySelector("body").style.overflow="hidden"
    bar1.style.display="none"
    window.scrollTo(0, 0);
  }
  else {
    hamberMenuIcon.src = "../assets/master/List.svg";
    document.querySelector(".bottom-nav").style.display="flex"
    document.querySelector("body").style.overflow="auto"
     bar1.style.display="block"
  }
});

document.querySelectorAll(".nav-item>span, .dropdown>li>span, .submenu-dropdown-main>li , mobile-dropdown-sub>ul>li, .mobile-dropdown-sub>.extra-nav").forEach(item => {
    item.addEventListener("click", () => {
        window.location.href = "../html/productcatalog.html";
    });
});
// MOBILE DROPDOWN ACCORDION
// ===============================
// Level 1 Dropdown (Main Category)
// ===============================
const level1Dropdowns = document.querySelectorAll(".mobile-dropdown");

level1Dropdowns.forEach(item => {
    const header = item.querySelector(".dropdown-header");

    header.addEventListener("click", (e) => {
        e.stopPropagation();

        // Close other level 1 dropdowns
        level1Dropdowns.forEach(other => {
            if (other !== item) {
                other.classList.remove("open");
            }
        });

        item.classList.toggle("open");
    });
});


// ===============================
// Level 2 Dropdown (Inside Category)
// ===============================
const level2Dropdowns = document.querySelectorAll(".mobile-dropdown-sub");

level2Dropdowns.forEach(subItem => {
    const subHeader = subItem.querySelector("span");

    subHeader.addEventListener("click", (e) => {
        e.stopPropagation();

        // Close other level 2 menus inside the same main category only
        const parentSubmenu = subItem.closest(".mobile-submenu");
        const siblings = parentSubmenu.querySelectorAll(".mobile-dropdown-sub");

        siblings.forEach(other => {
            if (other !== subItem) {
                other.classList.remove("open-sub");
            }
        });

        subItem.classList.toggle("open-sub");
    });
});

var signup=true;
console.log(signup)

const userprofileIcon=document.getElementById("user-profile-icon");
const signupWrapper=document.getElementById("signup-wrapper");

const roundWishlist=document.getElementById("round-button-wishlist")
const roundCart=document.getElementById("round-button-cart")
const numberRounds=document.querySelectorAll(".number-of-round");
const logoutDesktop=document.querySelector(".logout-option-desktop")

// Mobile View
const welcomeName=document.getElementById("welcome-name");
const imageName=document.querySelector(".image-section .circle-image span")

const mobileMenus=document.querySelectorAll(".mobile-nav-menu")
const mobileDropdown=document.querySelectorAll(".mobile-dropdown1")
const mobileDropdown2=document.querySelectorAll(".mobile-dropdown2")

const bottomNav=document.querySelectorAll(".bottom-nav__item1")
const logoutButton=document.querySelector(".logout-button")

const bottomNumbers=document.querySelectorAll(".bottom-bar-numbers")
UpdateUI();

function UpdateUI(){
  if(signup){
  userprofileIcon.style.display="block"
  signupWrapper.style.display="none"
  roundWishlist.addEventListener("click",()=>{
    window.location.href="../html/mywishlist.html"
  })
  roundCart.addEventListener("click",()=>{
    window.location.href="../html/cart.html"
  })

  numberRounds.forEach(numberRound => {
    if(numberRound.innerText!=0){
      numberRound.style.display="block"
    }
  });

  logoutDesktop.addEventListener("click",()=>{
    signup=false;
    UpdateUI()
  })

  welcomeName.innerText="John David"
  imageName.innerText="JD"
  
  mobileMenus.forEach(accountMen => {
    accountMen.classList.remove("not-logged-in")
  });

  document.getElementById("mobile-my-wishlist").addEventListener("click",()=>{
    window.location.href="../html/mywishlist.html"
  })

  document.getElementById("mobile-my-cart").addEventListener("click",()=>{
    window.location.href="../html/cart.html"
  })

  document.getElementById("mobile-order").addEventListener("click",()=>{
    window.location.href="../html/mywishlist.html"
  })

  document.getElementById("mobile-my-profile").addEventListener("click",()=>{
    window.location.href="../html/mywishlist.html"
  })

  document.getElementById("mobile-referal").addEventListener("click",()=>{
    window.location.href="../html/mywishlist.html"
  })

  document.getElementById("mobile-faqs").addEventListener("click",()=>{
    window.location.href="../html/mywishlist.html"
  })

  document.getElementById("mobile-customer-care").addEventListener("click",()=>{
    window.location.href="../html/mywishlist.html"
  })

  document.getElementById("mobile-privacy-policy").addEventListener("click",()=>{
    window.location.href="../html/privacyPolicy.html"
  })

  document.getElementById("bottom-nav-wishlist").addEventListener("click",()=>{
    window.location.href="../html/mywishlist.html"
  })

  document.getElementById("bottom-nav-notification").addEventListener("click",()=>{
    window.location.href="../html/mywishlist.html"
  })

  document.getElementById("bottom-nav-cart").addEventListener("click",()=>{
    window.location.href="../html/cart.html.html"
  })

  logoutButton.style.display="flex";
  logoutButton.addEventListener("click",()=>{
    mobileMenu.classList.remove("menu-open");
    hamberMenuIcon.src = "../assets/master/List.svg";
    document.querySelector(".bottom-nav").style.display="flex";
    signup=false
    UpdateUI()

    
  })
  bottomNumbers.forEach(bottomNumber => {
    if(bottomNumber.innerText>0){
      bottomNumber.style.display="block"
    }
  });
  
}
else{
    userprofileIcon.style.display="none"
    signupWrapper.style.display="block"
    roundWishlist.addEventListener("click",()=>{
      window.location.href="../html/login.html"
    })
    roundCart.addEventListener("click",()=>{
      window.location.href="../html/login.html"
    })
    numberRounds.forEach(numberRound => {
      numberRound.style.display="none"
    });
    welcomeName.innerText="Sign Up"
    welcomeName.addEventListener("click",()=>{
      window.location.href="../html/whoareyou.html"
    })
    imageName.innerText="eR"

    mobileMenus.forEach(accountMen => {
      accountMen.classList.add("not-logged-in");

      mobileDropdown.forEach(mobileDrop =>{
        mobileDrop.addEventListener("click",()=>{
          window.location.href='../html/login.html'
        })
      })
      mobileDropdown2.forEach(mobileDrop2 =>{
        mobileDrop2.addEventListener("click",()=>{
          window.location.href='../html/whoareyou.html'
        })
      })
      bottomNav.forEach(bottomNa=>{
        bottomNa.addEventListener("click",()=>{
          window.location.href='../html/login.html'
        })
      })
    });
    logoutButton.style.display="none";

    bottomNumbers.forEach(bottomNumber => {
      bottomNumber.style.display="none"
  });
  }
}


function handleScrollForMobile() {
    const bar = document.querySelector(".mobile-search-bar-main");
    const contentbar = document.querySelector(".mobile-search-bar");
    const desktopERan = document.getElementById("desktop-erangoli-logo");
    const mobileERan = document.getElementById("mobile-erangoli-logo");
    const maginfyingMobile = document.getElementById("maginfying-mobile");
    const mobileSuggestion=document.getElementById("mobile-suggestions");
    const bannerContent=document.querySelector(".banner-main-content");

    // Only apply logic when screen width <= 595px
    if (window.innerWidth <= 595) {

        if (window.scrollY > 10) {
            bar.style.position = "fixed";
            bar.style.backgroundColor = 'transparent';
            bar.style.top = "-2px";
            bar.style.left = "40px";

            contentbar.style.border = "1px solid #D9D9D9";
            contentbar.style.backgroundColor = "transparent";
            contentbar.style.borderLeft = "0px";
            contentbar.style.borderRadius = "0px 30px 30px 0px";
            contentbar.style.zIndex = 999;
            contentbar.style.padding = "8px 10px";

            desktopERan.style.display = 'none';
            mobileERan.style.display = "inline-block";
            maginfyingMobile.style.display = "none";

            mobileSuggestion.style.top='80px';
            bannerContent.style.top='130px';  

        } else {
            bar.style.position = "relative";
            bar.style.backgroundColor = '#f7f7f7';
            bar.style.top = "75px";
            bar.style.left = "0px";

            contentbar.style.border = "none";
            contentbar.style.borderRadius = "30px";
            contentbar.style.backgroundColor = "white";

            desktopERan.style.display = 'flex';
            mobileERan.style.display = "none";
            maginfyingMobile.style.display = "block";

            mobileSuggestion.style.top='150px';
            bannerContent.style.top='230px';
        }

    } else {
        // Reset styles when screen is larger than 595px
        bar.style = "";
        contentbar.style = "";
        desktopERan.style.display = 'flex';
        mobileERan.style.display = 'none';
        maginfyingMobile.style.display = 'block';
    }
}

// Run on scroll
window.addEventListener("scroll", handleScrollForMobile);

// Run when screen resizes (mobile ↔ desktop)
window.addEventListener("resize", handleScrollForMobile);

// Run once on initial load
handleScrollForMobile();







function showSuggestions(inputElement) {

    let input = inputElement.value.toLowerCase();

    // Pick correct suggestion box (desktop or mobile)
    let suggestionsBox =
        inputElement.id === "desktop-search"
            ? document.getElementById("desktop-suggestions")
            : document.getElementById("mobile-suggestions");

    suggestionsBox.innerHTML = ""; // clear previous suggestions

    if (input.trim() === "") {
        suggestionsBox.style.display = "none";
        return;
    }

    let allItems = document.querySelectorAll("#account-menu li");
    let matches = [];

    allItems.forEach(li => {
        let text = li.innerText.trim();

        if (!text.includes("\n") && text.toLowerCase().includes(input)) {
            matches.push(text);
        }
    });

    if (matches.length > 0) {
        matches.forEach(item => {
            let li = document.createElement("li");
            li.textContent = item;

            li.addEventListener("click", () => {
                window.location.href = "newpage.html";
            });

            suggestionsBox.appendChild(li);
        });

        suggestionsBox.style.display = "block";
    } else {
        suggestionsBox.style.display = "none";
    }
}


// Close suggestions when clicking outside
document.addEventListener("click", function (event) {
    const desktopInput = document.getElementById("desktop-search");
    const mobileInput = document.getElementById("mobile-search");
    const desktopBox = document.getElementById("desktop-suggestions");
    const mobileBox = document.getElementById("mobile-suggestions");

    if (!desktopInput.contains(event.target) && !desktopBox.contains(event.target)) {
        desktopBox.style.display = "none";
    }

    if (!mobileInput.contains(event.target) && !mobileBox.contains(event.target)) {
        mobileBox.style.display = "none";
    }
});





// Carousel Functionality

let index = 0;
const slide = document.querySelector('.carousel-slide');
const images = document.querySelectorAll('.carousel-slide img');
const dots = document.querySelectorAll('.dot');

function showSlide(i) {
    if (i >= images.length) index = 0;
    if (i < 0) index = images.length - 1;

    slide.style.transform = `translateX(${-index * 100}%)`;

    dots.forEach(dot => dot.classList.remove('active'));
    dots[index].classList.add('active');
}

dots.forEach((dot, i) => {
    dot.onclick = () => {
        index = i;
        showSlide(index);
    };
});

// Auto slide every 3 seconds
setInterval(() => {
    index++;
    showSlide(index);
}, 3000);

// Initial render
showSlide(index);








// FEATURES SECTION INTERACTION
document.addEventListener('DOMContentLoaded', () => {
  const content = document.getElementById('marqueeContent');
  if (!content) return;

  // capture original children (live NodeList -> convert to array)
  const originalItems = Array.from(content.children);

  // if no items, nothing to do
  if (!originalItems.length) return;

  // Wait a tick for images to load/layout
  function setupMarquee() {
    // Measure width of original content
    const originalWidth = calculateOriginalWidth();

    // If originalWidth is zero (images not loaded yet), try again
    if (!originalWidth) {
      // try again shortly
      setTimeout(setupMarquee, 60);
      return;
    }

    // Duplicate original items directly into content to form [orig][orig]
    originalItems.forEach(item => {
      const clone = item.cloneNode(true);
      clone.setAttribute('aria-hidden', 'true'); // hide from screen readers
      content.appendChild(clone);
    });

    // Now set CSS variable --move to exactly originalWidth px
    content.style.setProperty('--move', `${originalWidth}px`);

    // Determine animation duration based on desired px/sec speed
    const root = getComputedStyle(document.documentElement);
    // fallback px/sec if CSS var not read
    const pxPerSec = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--speed-px-per-sec')) || 120;
    const durationSec = Math.max(6, (originalWidth / pxPerSec)); // min 6s to avoid too fast

    // Apply duration to the content animation
    content.style.animationDuration = `${durationSec}s`;

    // Ensure layout won't wrap or overlap
    // If track is still too short for seamless loop (rare for very few items), duplicate once more
    requestAnimationFrame(() => {
      const viewportWidth = content.parentElement.clientWidth;
      if (content.scrollWidth < viewportWidth * 2) {
        // duplicate again to lengthen the track
        originalItems.forEach(item => {
          const clone = item.cloneNode(true);
          clone.setAttribute('aria-hidden', 'true');
          content.appendChild(clone);
        });
        // recalc originalWidth still same, but animation duration can remain acceptable
      }
    });
  }

  function calculateOriginalWidth() {
    // original items are the first N children where N = originalItems.length
    let width = 0;
    for (let i = 0; i < originalItems.length; i++) {
      const el = originalItems[i];
      const rect = el.getBoundingClientRect();
      // get margin gap from computed gap (we'll rely on flex gap; approximate by computed style)
      width += rect.width;
    }
    // include gaps: computed gap from CSS
    const gap = parseFloat(getComputedStyle(content).gap) || 0;
    width += gap * Math.max(0, originalItems.length - 1);
    return Math.round(width);
  }

  // run setup after small delay to let images settle
  setTimeout(setupMarquee, 50);

  // Recompute on window resize (optional)
  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      // Reset clones -> keep first set only, then rerun setup
      // Remove all children after originalItems.length
      const children = Array.from(content.children);
      children.slice(originalItems.length).forEach(c => content.removeChild(c));
      // Rerun measure & duplicate
      setupMarquee();
    }, 120);
  });
});

