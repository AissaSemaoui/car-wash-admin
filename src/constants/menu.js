import { Home, Calendar, Package, Droplet, User, Users } from "react-feather";

// ADMIN_MENUITEMS;

//* ---------------------------- Admin Menu Items ---------------------------- */

export const ADMIN_MENUITEMS = [
  {
    path: "/bookings-list",
    title: "Bookings",
    icon: Calendar,
    active: true,
    badgeType: "primary",
    type: "link",
  },

  {
    path: "/overview",
    title: "Overview",
    icon: Calendar,
    active: false,
    badgeType: "primary",
    type: "link",
  },

  {
    path: "/packages-list",
    title: "Wash Packages",
    icon: Package,
    active: false,
    badgeType: "primary",
    type: "link",
  },

  {
    path: "/extra-services",
    title: "Extra Services",
    icon: Droplet,
    type: "link",
    badgeType: "primary",
    active: false,
  },

  {
    path: "/agents-list",
    title: "Cars",
    icon: User,
    type: "link",
    badgeType: "primary",
    active: false,
  },

  {
    path: "/staff-list",
    title: "Workers",
    icon: Users,
    type: "link",
    badgeType: "primary",
    active: false,
  },

  {
    path: "/dashboard",
    title: "Report",
    icon: Home,
    type: "link",
    badgeType: "primary",
    active: false,
  },
];
