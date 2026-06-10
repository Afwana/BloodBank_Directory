export const roleRedirects = {
  donar: "/donar/organisations",
  organisation: "/",
  hospital: "/hospital/organisations",
  admin: "/admin",
};

export const donarMenu = [
  {
    name: "Organisation",
    path: "/donar/organisations",
    icon: "fa-sharp fa-solid fa-building-ngo",
  },
  {
    name: "Donation",
    path: "/donar/donations",
    icon: "fa-solid fa-hand-holding-medical",
  },
];

export const organisationMenu = [
  { name: "Inventory", path: "/", icon: "fa-solid fa-warehouse" },
  { name: "Donar", path: "/donar", icon: "fa-solid fa-hand-holding-medical" },
  { name: "Hospital", path: "/hospital", icon: "fa-solid fa-hospital" },
  { name: "Analytics", path: "/organisation/analytics", icon: "fa-solid fa-chart-line" },
];

export const hospitalMenu = [
  {
    name: "Organisation",
    path: "/hospital/organisations",
    icon: "fa-sharp fa-solid fa-building-ngo",
  },
  {
    name: "Consumer",
    path: "/hospital/consumer",
    icon: "fa-solid fa-droplet",
  },
];

export const adminMenu = [
  { name: "Donar List", path: "/admin/donars", icon: "fa-solid fa-hand-holding-medical" },
  { name: "Hospital List", path: "/admin/hospitals", icon: "fa-solid fa-hospital" },
  {
    name: "Organisation List",
    path: "/admin/organisations",
    icon: "fa-sharp fa-solid fa-building-ngo",
  },
];

export const menusByRole = {
  donar: donarMenu,
  organisation: organisationMenu,
  hospital: hospitalMenu,
  admin: adminMenu,
};
