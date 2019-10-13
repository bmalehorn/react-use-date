# react-use-date

![minzipped size](https://img.shields.io/bundlephobia/minzip/react-use-date) ![license](https://img.shields.io/npm/l/react-use-date)

Basic usage:

```tsx
const Clock = () => {
  const date = useDate();

  return <div>The current time is: {date.toISOString()}</div>;
};
```

[Try the live demo](https://bmalehorn.com/react-use-date/) for an in-depth explanation.
