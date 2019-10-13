import { useEffect, useState } from "react";

export type Interval =
  | "second"
  | "minute"
  | "hour"
  | "day"
  | number
  | undefined
  | null;

const useDate = ({ interval }: { interval?: Interval } = {}) => {
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    let intervalId: NodeJS.Timeout | undefined;

    const updateTimeout = () => {
      intervalId = setTimeout(() => {
        setDate(new Date());
        updateTimeout();
      }, nextCallback(new Date(), interval));
    };

    updateTimeout();

    return () => intervalId && clearInterval(intervalId);
  });

  return date;
};

export default useDate;

export const nextCallback = (now: Date, interval?: Interval) => {
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
  } else if (interval === "day") {
    return (
      24 * 60 * 60 * 1000 -
      now.getMilliseconds() -
      now.getSeconds() * 1000 -
      now.getMinutes() * 60 * 1000 -
      now.getHours() * 60 * 60 * 1000
    );
  } else {
    return 1000 - now.getMilliseconds();
  }
};
