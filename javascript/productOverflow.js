        // Thumbnail switching functionality
        const productOverviewThumbnails = document.querySelectorAll('.productOverviewThumbnail');
        const productOverviewMainImg = document.getElementById('productOverviewMainImg');

        // Toggle Product Details & Return Policy sections
const detailSections = document.querySelectorAll('.productOverviewDetailsSection');

detailSections.forEach(section => {
  const toggleIcon = section.querySelector('.sectionToggleIcon');
  if (!toggleIcon) return;

  toggleIcon.addEventListener('click', () => {
    section.classList.toggle('expanded');
  });
});


        productOverviewThumbnails.forEach((thumb, index) => {
            thumb.addEventListener('click', function() {
                // Remove active class from all thumbnails
                productOverviewThumbnails.forEach(t => t.classList.remove('productOverviewActive'));
                
                // Add active class to clicked thumbnail
                this.classList.add('productOverviewActive');
                
                // Update main image
                const thumbImg = this.querySelector('img');
                productOverviewMainImg.src = thumbImg.src;
            });
        });

        // Color option selection
        const productOverviewColorOptions = document.querySelectorAll('.productOverviewColorOption');
        
        productOverviewColorOptions.forEach(option => {
            option.addEventListener('click', function() {
                // Remove active class from all options
                productOverviewColorOptions.forEach(opt => opt.classList.remove('productOverviewActive'));
                
                // Add active class to clicked option
                this.classList.add('productOverviewActive');
            });
        });

        // Character counter for personalization
        const productOverviewPersonalizationText = document.getElementById('productOverviewPersonalizationText');
        const productOverviewCharCount = document.getElementById('productOverviewCharCount');

        productOverviewPersonalizationText.addEventListener('input', function() {
            const currentLength = this.value.length;
            productOverviewCharCount.textContent = currentLength;
        });

        // Buy Now button
        document.querySelector('.productOverviewBuyNow').addEventListener('click', function() {
            alert('Proceeding to checkout...');
        });

        // Add to Cart button
        document.querySelector('.productOverviewAddToCart').addEventListener('click', function() {
            alert('Product added to cart!');
        });

        // Load more button
        document.querySelector('.productOverviewLoadMoreBtn').addEventListener('click', function() {
            alert('Loading more products...');
        });

        // View All reviews
        const productOverviewViewAllBtns = document.querySelectorAll('.productOverviewViewAll');
        productOverviewViewAllBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                alert('Showing all reviews...');
            });
        });

        // Share icon
        document.querySelectorAll('.productOverviewIcon')[0].addEventListener('click', function() {
            alert('Share this product');
        });

        // Wishlist icon
        document.querySelectorAll('.productOverviewIcon')[1].addEventListener('click', function() {
            this.textContent = this.textContent === '♡' ? '♥' : '♡';
            this.style.color = this.textContent === '♥' ? '#ff0000' : '#666';
        });


        /* Responsive DOM reordering: move Reviews to the end on tablet sizes
   Paste into productOverflow.js (at end) */

(function() {
  const mq = window.matchMedia('(min-width: 600px) and (max-width: 980px)');
  const reviews = document.querySelector('.productOverviewReviewsSection');
  if (!reviews) return;

  // store original place so we can restore
  const originalParent = reviews.parentNode;
  const originalNext = reviews.nextSibling; // null if last

  // target after which to append reviews on tablet
  const targetAfter = document.querySelector('.productOverviewInnerBottom') || document.querySelector('.productOverviewFeatures') || document.querySelector('.productOverviewContainer');

  function moveReviewsToEnd() {
    // only move if not already moved
    if (!reviews.classList.contains('moved-to-tablet')) {
      // append reviews after "inner bottom" (so features/similar remain above)
      if (targetAfter && targetAfter.parentNode) {
        // insert after targetAfter
        const parent = targetAfter.parentNode;
        parent.insertBefore(reviews, targetAfter.nextSibling);
        reviews.classList.add('moved-to-tablet');
      }
    }
  }

  function restoreReviews() {
    if (reviews.classList.contains('moved-to-tablet')) {
      // restore to the original location
      if (originalNext) originalParent.insertBefore(reviews, originalNext);
      else originalParent.appendChild(reviews);
      reviews.classList.remove('moved-to-tablet');
    }
  }

  function handleMqChange(e) {
    if (e.matches) {
      moveReviewsToEnd();
    } else {
      restoreReviews();
    }
  }

  // initial check
  handleMqChange(mq);

  // listen for changes
  if (mq.addEventListener) mq.addEventListener('change', handleMqChange);
  else mq.addListener(handleMqChange); // legacy
})();
