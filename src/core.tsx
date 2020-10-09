import * as React from "react";
import { flow, mapValues, omit } from "./helpers";

export const FulgurContext = React.createContext({});

// On récupère les data courantes
export function getData(context, props, fallback = (val) => [val]) {
  let data = context.data || [];
  if (props.data) {
    if (typeof props.data === "function") {
      data = props.data(data);
    } else {
      data = props.data;
    }
  }
  if (Array.isArray(data)) {
    return data;
  }
  return fallback(data);
}

export function getProps(props, datum, index) {
  return flow(
    omit(["children", "tag"]),
    mapValues((val) => {
      if (typeof val === "function") {
        return val(datum, index);
      }
      return val;
    })
  )(props);
}

export const Node = (props) => {
  const context = React.useContext(FulgurContext);
  const data = getData(context, props);
  return (
    <FulgurContext.Provider value={data}>
      {!!props.by && typeof props.by === "function"
        ? props.children(props.by(data))
        : props.children}
    </FulgurContext.Provider>
  );
};

export const Map = (props) => {
  const context = React.useContext(FulgurContext);
  const data = getData(context, props, Object.values);
  return (
    <>
      {data.map((data, i) => {
        return (
          <FulgurContext.Provider key={i} value={data}>
            {props.children}
          </FulgurContext.Provider>
        );
      })}
    </>
  );
};

export const El = (props) => {
  const context = React.useContext(FulgurContext);
  const data = getData(context, props, (d) => d);
  const { children } = props;
  return (
    <props.tag {...getProps(props, data, 0)}>
      {typeof children === "function" ? children(data, 0) : children}
    </props.tag>
  );
};

export const Els = (props) => {
  const context = React.useContext(FulgurContext);
  const data = getData(context, props);
  const { children } = props;
  return (
    <>
      {data.map((datum, index) => (
        <props.tag key={index} {...getProps(props, datum, index)}>
          {typeof children === "function" ? children(datum, index) : children}
        </props.tag>
      ))}
    </>
  );
};
