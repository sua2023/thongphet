"use client";

import AppointmentChart from "./chart/appointmentchar";

function Dashboard() {
  const cards = [
    {
      title: "Today's Booking",
      value: "200",
      percent: "50%",
      desc: "Than last week",
    },
    {
      title: "Total users",
      value: "200",
      percent: "50%",
      desc: "Than last week",
    },
    {
      title: "Total doctors",
      value: "200",
      percent: "50%",
      desc: "Than last week",
    },
  ];
  const cardGrid = [
    {
      title: "Total income",
      value: "$200",
      percent: "50%",
      desc: "Than Yesterday",
      title1: "Total Refound",
      value1: "$200",
      percent1: "50%",
      desc1: "Than last week",
    },
  ];
  return (
    <>
      <div className="mt-4 mx-2">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {cards.map((item) => (
            <div
              key={item.title}
              className="md:px-4 p-2 bg-white border border-gray300 rounded-lg shadow"
            >
              <p className="font-sm text-gray700">{item.title}</p>
              <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray700">
                {item.value}
              </h5>
              <div className="w-full border-t-2 border-gray100">
                <div className="flex gap-2 pt-2">
                  <p className="pr-2 text-sm">{item.percent}</p>
                  <p className="pl-2 text-sm">{item.desc}</p>
                </div>
              </div>
            </div>
          ))}
          {cardGrid.map((item) => (
            <div
              key={item.title}
              className="md:px-4 p-2 md:flex inline-block justify-between md:divide-x-2 divide-gray300  bg-white border border-gray300 rounded-lg shadow"
            >
              <div className="flex-1 md:pr-4">
                <p className="font-sm text-gray700">{item.title}</p>
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray700">
                  {item.value}
                </h5>
                <div className="w-full border-t-2 border-gray100">
                  <div className="flex pt-2">
                    <p className="pr-2 text-sm text-green">{item.percent}</p>
                    <p className="pl-2 text-sm">{item.desc}</p>
                  </div>
                </div>
              </div>
              <div className="flex-1 md:pl-4 md:border-t-0 border-t-2 border-gray100 md:mt-0 mt-2">
                <p className="font-sm text-gray700">{item.title1}</p>
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray700">
                  {item.value1}
                </h5>
                <div className="w-full border-t-2 border-gray100">
                  <div className="flex pt-2">
                    <p className="pr-2 text-sm">{item.value1}</p>
                    <p className="pl-2 text-sm">{item.desc1}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div>
          {/* <AppointmentChart /> */}
        </div>
      </div>
    </>
  );
}

export default Dashboard;
