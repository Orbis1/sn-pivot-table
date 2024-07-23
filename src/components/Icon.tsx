import React from "react";

const Icon = (title: string): JSX.Element => <div>{title}</div>;

export const createV5ThemeOptions = () => {
  const palette = {};
  return { palette, components: { MuiTable: { styleOverrides: { root: {} } } } };
};

export const COLORS = {
  GREYSCALE_100: "#ffffff",
  GREYSCALE_95: "#ffff27",
  GREYSCALE_90: "#ffff28",
  GREYSCALE_85: "#ffff29",
  GREYSCALE_50: "#ffff30",
  GREYSCALE_70: "#ffff31",
  GREYSCALE_20: "#ffff32",
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const Locked = (props: React.SVGProps<SVGSVGElement>): JSX.Element => Icon("Locked");

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const MinusOutline = (props: React.SVGProps<SVGSVGElement>): JSX.Element => Icon("MinusOutline");

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const PlusOutline = (props: React.SVGProps<SVGSVGElement>): JSX.Element => Icon("PlusOutline");

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const MinusOutlineIcon = (props: React.SVGProps<SVGSVGElement>): JSX.Element => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 16 16"
    height="13"
    fill="currentColor"
    aria-hidden="true"
    role="img"
    opacity="1"
    color="#333333"
    data-testid="collapse-icon"
    {...props}
  >
    <path d="M8 15c-3.848 0-7-3.152-7-7s3.152-7 7-7 7 3.152 7 7-3.152 7-7 7m0 1c4.4 0 8-3.6 8-8s-3.6-8-8-8-8 3.6-8 8 3.6 8 8 8m4-7.5H4v-1h8z" />
  </svg>
);

export const PlusOutlineIcon = (props: React.SVGProps<SVGSVGElement>): JSX.Element => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 16 16"
    height="13"
    fill="currentColor"
    aria-hidden="true"
    role="img"
    opacity="1"
    color="#333333"
    data-testid="expand-icon"
    {...props}
  >
    <path d="M8 15c-3.848 0-7-3.152-7-7s3.152-7 7-7 7 3.152 7 7-3.152 7-7 7m0 1c4.4 0 8-3.6 8-8s-3.6-8-8-8-8 3.6-8 8 3.6 8 8 8m4-7.5H4v-1h8zM8.5 4v8h-1V4z" />
  </svg>
);
