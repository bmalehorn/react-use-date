# react-use-date

```tsx
const Clock = () => {
  const date = useDate();

  return <div>The current time is: {date.toISOString().slice(11, 19)}</div>;
};
```
