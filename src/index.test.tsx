import { nextCallback } from "./index";

describe("nextCallback", () => {
  let year = 2000;
  let month = 1;
  let day = 1;
  let hours = 0;
  let minutes = 0;
  let seconds = 0;
  let milliseconds = 0;
  beforeEach(() => {
    year = 2000;
    month = 1;
    day = 1;
    hours = 0;
    minutes = 0;
    seconds = 0;
    milliseconds = 0;
  });

  const createDate = () =>
    new Date(year, month, day, hours, minutes, seconds, milliseconds);

  it("works with 'second'", () => {
    const interval = nextCallback(createDate(), "second");
    expect(interval).toEqual(1000);
  });

  it("waits only until next increment", () => {
    milliseconds = 300;
    const interval = nextCallback(createDate(), "second");
    expect(interval).toEqual(700);
  });

  it("passes through numbers", () => {
    const interval = nextCallback(createDate(), 123);
    expect(interval).toEqual(123);
  });

  it("defaults to 'second'", () => {
    milliseconds = 300;
    const interval = nextCallback(createDate());
    expect(interval).toEqual(700);
  });

  it("advances to the next day", () => {
    year = 2000;
    month = 1;
    day = 2;
    hours = 3;
    minutes = 4;
    seconds = 5;
    milliseconds = 6;
    const date = createDate();

    // for some reason, the day you put in is 0-based,
    // but the one you get out is 1-based
    const dayBefore = date.getDay();

    const interval = nextCallback(date, "day");
    const newDate = new Date(date.getTime() + interval);

    expect(newDate.getFullYear()).toEqual(2000);
    expect(newDate.getMonth()).toEqual(1);
    expect(newDate.getDay()).toEqual(dayBefore + 1);
    expect(newDate.getHours()).toEqual(0);
    expect(newDate.getMinutes()).toEqual(0);
    expect(newDate.getSeconds()).toEqual(0);
    expect(newDate.getMilliseconds()).toEqual(0);
  });
});
