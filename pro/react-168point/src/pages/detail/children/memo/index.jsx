// import React from "react";
// const { memo, useState } = React;
// // const Counter = memo(props => {
// //   console.log("组件渲染");
// //   return <h1>{props.data}</h1>;
// // });
// const Counter = props => {
//   console.log("组件渲染");
//   return <h1>{props.data}</h1>;
// };
// export default function App() {
//   const [count, setCount] = useState(0);
//   const data = "京程一灯";
//   return (
//     <>
//       <span>{count}</span>
//       <input
//         type="button"
//         onClick={() => setCount(count + 1)}
//         value="修改count"
//       />
//       <Counter data={data} />
//     </>
//   );
// }


// import React from "react";
// const { memo, useMemo, useState } = React;
// const Counter = memo(props => {
//   console.log("组件渲染");
//   return <h1>{props.data}</h1>;
// });

// export default function App() {
//   const [count, setCount] = useState(0);
//   const double = useMemo(() => {
//     return count * 2;
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [count === 3]);
//   const data = "京程一灯";
//   return (
//     <>
//       <span>{double}</span>
//       <input
//         type="button"
//         onClick={() => setCount(count + 1)}
//         value="修改count"
//       />
//       <Counter data={data} />
//     </>
//   );
// }


import React from "react";
const { memo, useEffect, useCallback, useMemo, useState } = React;
const Counter = memo(props => {
  // useEffect(() => {
  //   console.log('子组件渲染副作用')
  // })
  console.log("子组件渲染");
  return <h1 onClick={props.onClick}>1</h1>;
});
// const onClick = () => {
//   console.log("Click");
// };
export default function App() {
  // console.log("父亲组件渲染");
  const [count, setCount] = useState(0);
//   const onClick = () => {
//     console.log("Click");
//   };
  // const data = "京程一灯";
  // useEffect(() => {
  //   console.log('父组件副作用')
  // })
  // const onClick = useMemo(() => {
  //   return () => {
  //     console.log("Click");
  //   };
  // }, []);
  const onClick = useCallback(() => {
    console.log("Click");
  }, []);
  return (
    <>
      <span>{count}</span>
      <input
        type="button"
        onClick={() => setCount(count + 1)}
        value="修改count"
      />
      <Counter onClick={onClick}/>
    </>
  );
}
