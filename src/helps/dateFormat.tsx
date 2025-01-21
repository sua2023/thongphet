// Date string format == Sep 1, 2024


export const FormatTime = (timeString:string) => {
  let [hours, minutes] = timeString.split(':').map(Number);
  const ampm = hours > 12 ? 'PM' : 'AM';
  hours = hours % 12 || 12; 
  return `${hours}:${minutes < 10 ? '0' + minutes : minutes} ${ampm}`;

};

// export const FormatTime=(time:any)=> {
//   const date = new Date(time);
//   let hours = date.getHours();
//   const minutes = date.getMinutes();
//   const ampm = hours >= 12 ? 'PM' : 'AM';
//   hours = hours % 12;
//   hours = hours ? hours : 12; // the hour '0' should be '12'
//   const minutesStr = minutes < 10 ? '0' + minutes : minutes;
//   return `${hours}:${minutesStr} ${ampm}`;
// }
export const DateFormat = (date: Date | undefined) => {
  if (!date) {
    return;
  }
  const newDate = new Date(date);
  if (isNaN(newDate.getTime())) {
    return null;
  }

  const formattedDate = newDate.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return formattedDate;
};

export const formatDateToYYYYMMDD = (date: Date | undefined | null|string) => {
  if (!date) return "";
  const d = new Date(date);
  if (isNaN(d.getTime())) return "";
  return d.toISOString().split("T")[0];
};

// date formate Format as MM/DD/YYYY
export const FormatDateString = (date: Date | undefined | null) => {
  if (!date) return "";
  const d = new Date(date);
  if (isNaN(d.getTime())) return "";

  const month = String(d.getMonth() + 1).padStart(2, '0'); // Months are 0-based
  const day = String(d.getDate()).padStart(2, '0');
  const year = d.getFullYear();

  return `${month}/${day}/${year}`; 
};