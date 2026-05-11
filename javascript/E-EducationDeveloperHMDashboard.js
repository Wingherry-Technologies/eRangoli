// Select all list items
const dashboardItems = document.querySelectorAll(".list li");

// Add click event on each item
dashboardItems.forEach((item, index) => {
  item.addEventListener("click", () => {
    switch (index) {
      case 0:
        window.location.href = "E-EducationDeveloperHeroSection.html";
        break;

      case 1:
        window.location.href = "E-EducationDeveloperPhotoGallery.html";
        break;

      case 2:
        window.location.href = "E-EducationDeveloperShortWorkshop.html";
        break;

      case 3:
        window.location.href = "E-EducationDeveloperOurSchoolPartners.html";
        break;

      case 4:
        window.location.href = "E-EducationDeveloperWorkshopCourses.html";
        break;

      case 5:
        window.location.href = "E-EducationDeveloperOurSponsors.html";
        break;

      case 6:
        window.location.href = "E-EducationDeveloperUpcomingWorkshops.html";
        break;

      default:
        break;
    }
  });
});
