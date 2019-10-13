import { useEffect, useState } from "react";

export type Interval = "second" | "minute" | "hour" | number | undefined | null;

const useDate = ({ interval }: { interval?: Interval } = {}) => {
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    let intervalId: NodeJS.Timeout | undefined;

    const bump = () => {
      intervalId = setTimeout(() => {
        setDate(new Date());
        bump();
      }, nextCallback(new Date(), interval));
    };

    bump();

    return () => intervalId && clearInterval(intervalId);
  });

  return date;
};

export default useDate;

export const nextCallback = (now: Date, interval: Interval) => {
  if (typeof interval === "number") {
    return interval;
  } else if (interval === "second") {
    return 1000 - now.getMilliseconds();
  } else if (interval === "minute") {
    return 60 * 1000 - now.getMilliseconds() - now.getSeconds() * 1000;
  } else if (interval === "hour") {
    return (
      60 * 60 * 1000 -
      now.getMilliseconds() -
      now.getSeconds() * 1000 -
      now.getMinutes() * 60 * 1000
    );
  } else {
    return 1000 - now.getMilliseconds();
  }
};
