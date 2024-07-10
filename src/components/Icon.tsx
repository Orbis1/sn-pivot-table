import React from "react";

const Icon = (title: string): JSX.Element => <div>{title}</div>;

export const createV5ThemeOptions = () => {
  const palette = {};
  return { palette, components: { MuiTable: { styleOverrides: { root: {} } } } };
};
export const COLORS = {
  GREYSCALE_100: "100",
  GREYSCALE_95: "95",
  GREYSCALE_90: "90",
  GREYSCALE_85: "85",
  GREYSCALE_70: "70",
  GREYSCALE_50: "50",
  GREYSCALE_20: "20",
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const Locked = (_props: React.SVGProps<SVGSVGElement>): JSX.Element => Icon("Locked");

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const MinusOutline = (_props: React.SVGProps<SVGSVGElement>): JSX.Element => Icon("MinusOutline");

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const PlusOutline = (_props: React.SVGProps<SVGSVGElement>): JSX.Element => Icon("PlusOutline");

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const MinusOutlineIcon = (_props: React.SVGProps<SVGSVGElement>): JSX.Element => Icon("MinusOutlineIcon");

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const PlusOutlineIcon = (_props: React.SVGProps<SVGSVGElement>): JSX.Element => Icon("PlusOutlineIcon");
