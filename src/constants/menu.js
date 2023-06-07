import {
  Home,
  LogIn,
  Calendar,
  Package,
  Droplet,
  User,
  Users,
} from "react-feather";

// ADMIN_MENUITEMS;

//* ---------------------------- Admin Menu Items ---------------------------- */

export const ADMIN_MENUITEMS = [
  {
    path: "/dashboard",
    title: "Dashboard",
    icon: Home,
    type: "link",
    badgeType: "primary",
    active: true,
  },

  {
    path: "/bookings-list",
    title: "Bookings",
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
    title: "Agents",
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
];
