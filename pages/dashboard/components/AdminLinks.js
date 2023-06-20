const adminLinks = [
  {
    id: 1,
    url: "/admin/cohort-management",
    name: "Cohort management",
  },
  {
    id: 2,
    url: "/admin/cohorts/alpaca",
    name: "Cohort [Alpaca]",
  },
  {
    id: 3,
    url: "/admin/course-editing/intro-to-programming",
    name: "Course editing [Intro, React,Rails]",
  },
  {
    id: 4,
    url: "/admin/user-management",
    name: "User management",
  },
  {
    id: 5,
    url: "/admin/static-page-management",
    name: "Static page management",
  },
  {
    id: 6,
    url: "/admin/acceptanceform-reports",
    name: "Acceptance form reports",
  },
];

export function getAdminLinks() {
  return adminLinks;
}
