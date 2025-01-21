export const Doctoroptions: { value: string; label: string }[] = [
  { value: "active", label: "Active" },
  { value: "inactive", label: "Inactive" },
  { value: "deleted", label: "Deleted" },
  { value: "locked", label: "Locked" },
  { value: "blocked", label: "Blocked" },
];

export const DoctorFilterIsApprove: { value: string; label: string }[] = [
  { value: "all", label: "All" },
  { value: "pending", label: "Pending" },
  { value: "approved", label: "Approved" },
];

export const OptionsYears = () => {
  const currentYear = new Date().getFullYear();
  const optionYears = Array.from({ length: 101 }, (_, i) => {
    const year = currentYear + 1 - i;
    return { value: String(year), label: String(year) };
  });
  return optionYears;
};
