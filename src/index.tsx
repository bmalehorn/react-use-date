import { useEffect, useState } from "react";

export type Interval =
  | "millisecond"
  | "second"
  | "minute"
  | "hour"
  | "day"
  | number
  | undefined
  | null;

export const nextCallback = (now: Date, interval?: Interval) => {
  if (typeof interval === "number") {
    return interval;
  } else if (interval === "millisecond") {
    return 1;
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

const useDate = ({ interval }: { interval?: Interval } = {}) => {
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    let intervalId: undefined | NodeJS.Timeout = undefined;

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
