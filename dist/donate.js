(function () {
  const projectDetails = {
    education: { number: 'Project 01', title: 'Education', image: 'assets/education.jpg', alt: 'Children gathered during an education support activity', story: 'Help remove practical barriers so children can remain in class and continue towards their ambitions.', designation: 'Supporting access to school, learning materials and mentorship.' },
    water: { number: 'Project 02', title: 'Clean water', image: 'assets/water.jpg', alt: 'Community water infrastructure supported by Umoja', story: 'Help bring safer water closer to homes and schools, protecting wellbeing and returning valuable time to families.', designation: 'Supporting boreholes, wells, water systems and sanitation awareness.' },
    construction: { number: 'Project 03', title: 'Construction', image: 'assets/community.jpg', alt: 'Community members gathered during an Umoja activity', story: 'Help communities create safer facilities where people can learn, receive care, gather and grow.', designation: 'Supporting practical community facilities and safer shared spaces.' },
    food: { number: 'Project 04', title: 'Food support', image: 'assets/food.jpg', alt: 'Food packages prepared for distribution', story: 'Help place essential food into the hands of families facing hunger and uncertainty.', designation: 'Supporting monthly food parcels and seasonal distributions.' },
    emergency: { number: 'Project 05', title: 'Emergency relief', image: 'assets/impact.jpg', alt: 'Umoja representatives listening to community members', story: 'Help families meet urgent needs when crisis, displacement or sudden hardship changes everything.', designation: 'Supporting timely essentials and the first steps towards recovery.' },
    livelihoods: { number: 'Project 06', title: 'Livelihoods', image: 'assets/community.jpg', alt: 'Community partners participating in an Umoja programme', story: 'Help households pursue practical opportunities that can grow into greater independence and resilience.', designation: 'Supporting business empowerment and income-generating opportunities.' },
    cash: { number: 'Project 07', title: 'Cash relief', image: 'assets/impact.jpg', alt: 'A community conversation during an Umoja activity', story: 'Help a household respond to the urgent need it understands best.', designation: 'Supporting flexible assistance for verified household needs.' },
    seasonal: { number: 'Project 08', title: 'Iftar & Qurbani', image: 'assets/food.jpg', alt: 'Food provisions arranged for seasonal distribution', story: 'Help make meaningful seasons a time of nourishment, inclusion and shared dignity.', designation: 'Supporting Iftar meals, food packages and Qurbani distributions.' },
    general: { number: 'General fund', title: 'Where it is needed most', image: 'assets/hero.jpg', alt: 'Umoja Helping Hearts Uganda serving a local community', story: 'Give Umoja flexibility to respond where the need is most urgent.', designation: 'Supporting the organisation’s most urgent verified priorities.' }
  };

  const select = document.getElementById('donationProject');
  const fields = {
    image: document.getElementById('donationProjectImage'),
    number: document.getElementById('donationProjectNumber'),
    title: document.getElementById('donationProjectTitle'),
    story: document.getElementById('donationProjectStory'),
    designationTitle: document.getElementById('designationTitle'),
    designationText: document.getElementById('designationText')
  };

  function updateProject(key) {
    const project = projectDetails[key] || projectDetails.general;
    fields.image.src = project.image;
    fields.image.alt = project.alt;
    fields.number.textContent = project.number;
    fields.title.textContent = project.title;
    fields.story.textContent = project.story;
    fields.designationTitle.textContent = project.title;
    fields.designationText.textContent = project.designation;
    const url = new URL(window.location.href);
    url.searchParams.set('project', key);
    window.history.replaceState({}, '', url);
  }

  const requestedProject = new URLSearchParams(window.location.search).get('project');
  if (requestedProject && projectDetails[requestedProject]) select.value = requestedProject;
  updateProject(select.value);
  select.addEventListener('change', () => updateProject(select.value));
})();
