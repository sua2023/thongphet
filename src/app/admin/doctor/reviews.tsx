"use client";

import { StarIcon } from "@/components/icons/icons";
import Image from "next/image";

export default function DoctorReviews() {
  const stars = [
    { rate: 5, percent: "75%", icon: <StarIcon color="#f5844c" size={20} /> },
    { rate: 4, percent: "35%", icon: <StarIcon color="#f5844c" size={20} /> },
    { rate: 3, percent: "15%", icon: <StarIcon color="#f5844c" size={20} /> },
    { rate: 2, percent: "5%", icon: <StarIcon color="#f5844c" size={20} /> },
    { rate: 1, percent: "0%", icon: <StarIcon color="#f5844c" size={20} /> },
  ];

  const reviews = [
    {
      rate: 4,
      title: "Johh Due",
      date: "February 12, 2024",
      image:
        "https://p16-sign-sg.tiktokcdn.com/aweme/720x720/tos-alisg-avt-0068/760f4e57dff0210a968ef84c945ee521.jpeg?lk3s=a5d48078&nonce=5485&refresh_token=9215a2cdd033dd1e051e3f0eadc4360e&x-expires=1724644800&x-signature=ZiODGwZ6gLbQhQKHcSXd%2BF%2FFHv0%3D&shp=a5d48078&shcp=81f88b70",
      desc: "Great medical office, wonderful and warm experience from start to finish. Appreciate Dr. taking time to go over the diagnosis clearly and treatment options. Was referred over by my general doctor and can see why. Highly recommended wonderful and warm experience from start to finish. Appreciate Dr. taking time to go over the diagnosis clearly and treatment options. Was referred over by my general doctor and can see why. Highly recommended..",
    },
    {
      rate: 5,
      title: "Johh Due",
      date: "February 12, 2024",
      image:
        "https://p16-sign-sg.tiktokcdn.com/aweme/100x100/tos-alisg-avt-0068/92e74cc76acd0b5d7e91438ddcc13b4f.jpeg?lk3s=30310797&nonce=31173&refresh_token=3bcf0b773bc7e0a8c86c1e63eec0aa9c&x-expires=1724569200&x-signature=EVfUgOXTlETiW86XDQj031CdwSs%3D&shp=30310797&shcp=-",
      desc: "Great medical office, wonderful and warm experience from start to finish. Appreciate Dr. taking time to go over the diagnosis clearly and treatment options. Was referred over by my general doctor and can see why. Highly recommended.",
    },
    {
      rate: 3,
      title: "Johh Due",
      date: "February 12, 2024",
      image:
        "https://p16-sign-sg.tiktokcdn.com/aweme/720x720/tos-alisg-avt-0068/760f4e57dff0210a968ef84c945ee521.jpeg?lk3s=a5d48078&nonce=5485&refresh_token=9215a2cdd033dd1e051e3f0eadc4360e&x-expires=1724644800&x-signature=ZiODGwZ6gLbQhQKHcSXd%2BF%2FFHv0%3D&shp=a5d48078&shcp=81f88b70",
      desc: "Great medical office Appreciate Dr. taking time to go over the diagnosis clearly and treatment options. Was referred over by my general doctor and can see why. Highly recommended.",
    },
  ];
  const totalReviews = { rate: 4, total: 4.5 };
  return (
    <>
      <div className="px-4">
        <p className="lg:text-lg text-base font-bold">
          Dr. Leroy Anderson Review
        </p>
        <div className="mt-5">
          <div className="lg:flex gap-5">
            <div className="min-w-[180px] max-h-[150px] p-4 mt-4 text-center bg-blackGray border border-gray-200 rounded-lg shadow">
              <p className="text-white text-lg font-bold mb-2">
                {totalReviews.total}
              </p>
              <div className="flex text-base mb-2 justify-center">
                {[...Array(5)].map((_, starIndex) => (
                  <StarIcon
                    key={starIndex}
                    size={18}
                    color={
                      starIndex < totalReviews.rate ? "#f5844c" : "#e5e7eb"
                    }
                  />
                ))}
              </div>
              <p className="text-white">Base on 5 Review</p>
            </div>
            <div className="w-full lg:p-4 p-0 mt-5 lg:mt-0">
              {stars.map((star, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between lg:mb-2 mb-1"
                >
                  <div className="w-full h-3 bg-[#f5844c]/25 rounded-md">
                    <div
                      className="h-3 bg-[#f5844c] rounded-l-md rounded-r-none"
                      style={{ width: star.percent }}
                    />
                  </div>
                  <div className="flex items-center ml-4 lg:min-w-[200px] min-w-[80px]">
                    {star.icon}
                    <p className="ml-2 lg:text-base text-sm">
                      {star.rate} Stars
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="mt-5 border-t-2 border-t-gray">
          {reviews.map((rew, index) => (
            <div
              key={index}
              className="mt-5 mb-5 lg:flex gap-2  border-b border-b-gray"
            >
              <div className="min-w-[100px] mt-2">
                <Image
                  src={rew.image}
                  width={70}
                  height={70}
                  className="rounded-lg"
                  alt=""
                />
              </div>
              <div className="lg:mt-0 mt-5 mb-5">
                <p className="flex mt-1 items-center">
                  {[...Array(5)].map((_, starIndex) => (
                    <StarIcon
                      key={starIndex}
                      size={18}
                      color={starIndex < rew.rate ? "#f5844c" : "#e5e7eb"}
                    />
                  ))}
                </p>
                <p className="lg:text-lg text-base font-bold mt-2">
                  {rew.title} - {rew.date}
                </p>
                <p className="mt-2 text-sm">{rew.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
