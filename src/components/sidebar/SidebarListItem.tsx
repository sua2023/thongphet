import { FaChartBar, FaRegUser } from "react-icons/fa";
import { RxDashboard } from "react-icons/rx";
import {
  UsersIcon,
  OrderIcon,
  ProductIcon,
  ShopIcon,
  DoctorIcon,
  SettingIcon,
  TimeTableIcon,
  CategoryIcon,
  ExpertiseIcon,
} from "../icons/icons";

export const menuItems = [
  {
    href: "/admin/dashboard",
    title: "Dashboard",
    isLinkChild: false,
    icon: <RxDashboard />,
  },
  {
    href: "/admin/patients",
    title: "Patients",
    isLinkChild: false,
    icon: <UsersIcon />,
  },
  {
    title: "Doctor",
    isLinkChild: false,
    href: "/admin/doctor",
    icon: <DoctorIcon size={18} />,
  },
  {
    href: "/admin/appointment",
    title: "Appointments",
    isLinkChild: false,
    icon: <ShopIcon />,
  },
  {
    href: "/admin/schedule",
    title: "Schedule",
    isLinkChild: false,
    icon: <TimeTableIcon size={16} />,
  },

  {
    title: "Transaction",
    isLinkChild: true,
    path: "transaction",
    icon: <ShopIcon />,
    children: [
      {
        href: "/admin/transaction/deposit",
        title: "Deposit",
      },
      {
        href: "/admin/transaction/withdraw",
        title: "Withdraw",
      },
      {
        href: "/admin/transaction/refund",
        title: "Refund",
      },
    ],
  },
  {
    title: "Category",
    href: "/admin/category",
    isLinkChild: false,
    icon: <CategoryIcon size={16} />,
  },
  {
    title: "Specialist",
    href: "/admin/specialist",
    isLinkChild: false,
    icon: <ExpertiseIcon size={16} />,
  },
  {
    title: "Staff",
    isLinkChild: true,
    path: "users",
    icon: <UsersIcon />,
    children: [
      {
        href: "/admin/users/staff",
        title: "All staff",
      },
      {
        href: "/admin/users/roles",
        title: "Roles",
      },
    ],
  },

  {
    title: "Settings",
    isLinkChild: true,
    path: "setting",
    icon: <SettingIcon />,
    children: [
      {
        href: "/admin/setting/general",
        title: "General",
      },
      {
        href: "/admin/setting/payments",
        title: "Payments",
      },
    ],
  },
];
