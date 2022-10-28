import React from "react";
import { Test1 } from "renderer/pages/Test1";
import { Test2 } from "renderer/pages/Test2";
import { Home } from "renderer/pages/Home";

interface Route<T> {
  name: string,
  path: string,
  element: React.ReactNode,
  [key: string]: string | boolean | React.ReactNode | T
};

export type RoutesType = Array<Route<Array<Route<string>>>>;

export const routes: RoutesType = [
  {
    name: '首页',
    path: '/',
    basePath: '/',
    element: <Home />,
    exact: true,
    cache: true,
  },
  {
    name: '测试1',
    path: '/test1',
    basePath: '/test1',
    element: <Test1 />,
    exact: true,
    cache: false,
  //   children: [
  //     {
  //       name: '子页面',
  //       path: '/children',
  //       basePath: '/children',
  //       component: HomeChildren,
  //       isTab: false,
  //       exact: true,
  //       cache: false,
  //     },
  //   ],
  },
  {
    name: '测试2',
    path: '/test2',
    basePath: '/test2',
    element: <Test2 />,
    exact: true,
    cache: false,
  },
]
