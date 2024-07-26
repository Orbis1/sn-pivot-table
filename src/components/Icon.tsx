import React from "react";

const Icon = (title: string): JSX.Element => <div>{title}</div>;

const HC = {
  GREYSCALE_0: "#000000",
  GREYSCALE_5: "#0E0E0E",
  GREYSCALE_10: "#1A1A1A",
  GREYSCALE_15: "#262626",
  GREYSCALE_20: "#333333",
  GREYSCALE_25: "#404040",
  GREYSCALE_30: "#4D4D4D",
  GREYSCALE_35: "#595959",
  GREYSCALE_40: "#666666",
  GREYSCALE_45: "#737373",
  GREYSCALE_50: "#808080",
  GREYSCALE_55: "#8C8C8C",
  GREYSCALE_60: "#999999",
  GREYSCALE_65: "#A6A6A6",
  GREYSCALE_70: "#B3B3B3",
  GREYSCALE_75: "#BFBFBF",
  GREYSCALE_80: "#CCCCCC",
  GREYSCALE_85: "#D9D9D9",
  GREYSCALE_90: "#E6E6E6",
  GREYSCALE_95: "#F2F2F2",
  GREYSCALE_98: "#FAFAFA",
  GREYSCALE_100: "#FFFFFF",
};

const BC = {
  WHITE: "#FFFFFF",
  GREY: "#999999",
  GREY_PALE: "#B2B2B2",
  GREEN: "#00873D",
  GREEN_PALE: "#0AAF54",
  GREEN_DARK: "#0D6932",
  BLUE: "#3F8AB3",
  BLUE_PALE: "#469DCD",
  BLUE_DARK: "#2F607B",
  RED: "#DC373F",
  RED_PALE: "#F05551",
  RED_DARK: "#97322F",
  ORANGE: "#EF960F",
  ORANGE_PALE: "#FFC629",
  ORANGE_DARK: "#A4681C",
  PURPLE: "#655dc6",
  PURPLE_PALE: "#8D8BCE",
  PURPLE_DARK: "#413885",
  ...HC,
  GREYSCALE_0_0: "rgba(0, 0, 0, 0)",
  GREYSCALE_0_03: "rgba(0, 0, 0, 0.03)",
  GREYSCALE_0_05: "rgba(0, 0, 0, 0.05)",
  GREYSCALE_0_06: "rgba(0, 0, 0, 0.06)",
  GREYSCALE_0_10: "rgba(0, 0, 0, 0.1)",
  GREYSCALE_0_15: "rgba(0, 0, 0, 0.15)",
  GREYSCALE_0_20: "rgba(0, 0, 0, 0.2)",
  GREYSCALE_0_25: "rgba(0, 0, 0, 0.25)",
  GREYSCALE_0_30: "rgba(0, 0, 0, 0.3)",
  GREYSCALE_0_42: "rgba(0, 0, 0, 0.42)",
  GREYSCALE_0_55: "rgba(0, 0, 0, 0.55)",
  GREYSCALE_0_60: "rgba(0, 0, 0, 0.6)",
  GREYSCALE_0_65: "rgba(0, 0, 0, 0.65)",
  GREYSCALE_100_05: "rgba(255, 255, 255, 0.05)",
  GREYSCALE_100_15: "rgba(255, 255, 255, 0.15)",
  GREYSCALE_100_25: "rgba(255, 255, 255, 0.25)",
  GREYSCALE_100_50: "rgba(255, 255, 255, 0.5)",
  GREYSCALE_100_60: "rgba(255, 255, 255, 0.6)",
  MISC_FOCUS_BORDER: "#177FE6",
  TEXT_PRIMARY: "#404040",
  TEXT_SECONDARY: "rgba(0, 0, 0, 0.55)",
};
const WC = 12;
const GC = 14;
const YC = 3;
/*
const VC = 16;
const UC = 24;
const KC = 300;
const XC = 400;
const QC = 600;
const JC = 700;
const ZC = {
  FONT_FAMILY: "'Source Sans Pro', 'HelveticaNeue', 'Helvetica Neue', Helvetica, Arial, sans-serif",
};
*/

const convertToRGB = (hex: string) => {
  if (hex.length !== 6) {
    throw new Error(`convertToRGB >>> Only six-digit hex colors are allowed: ${hex}`);
  }

  const aRgbHex = hex.match(/.{1,2}/g);
  if (aRgbHex === null) {
    throw new Error(`convertToRGB >>> RegEx returns null: ${hex}`);
  }
  const aRgb = [parseInt(aRgbHex[0], 16), parseInt(aRgbHex[1], 16), parseInt(aRgbHex[2], 16)];
  return aRgb;
};

const QR = (hex: string, alpha: number) => {
  const unhashed = hex.replace("#", "");
  const rgb = convertToRGB(unhashed);
  return `rgba(${rgb.join(",")},${alpha})`;
};

export const createV5ThemeOptions = () => {
  const palette = {};
  return {
    palette,
    components: {
      MuiTable: { styleOverrides: { root: {} } },
      MuiButtonBase: {
        defaultProps: {
          disableRipple: !0,
          disableTouchRipple: !0,
          focusVisibleClassName: "sprout-focus-visible",
        },
      },
      MuiInputBase: {
        styleOverrides: {
          root: {
            fieldset: {
              boxShadow: "none",
            },
          },
          input: {
            fontSize: GC,
            padding: "8px 12px",
            lineHeight: "16px",
            "&.MuiInputBase-inputAdornedStart": {
              paddingLeft: 0,
            },
            "&.MuiInputBase-inputAdornedEnd": {
              paddingRight: 0,
            },
          },
          sizeSmall: {
            height: "24px",
            input: {
              fontSize: WC,
              paddingLeft: "8px",
            },
          },
        },
      },
      MuiOutlinedInput: {
        defaultProps: {
          notched: !1,
        },
        styleOverrides: {
          root: {
            fontSize: GC,
            lineHeight: "16px",
            backgroundColor: BC.WHITE,
            borderRadius: YC,
            "&:not(.Mui-focused):not(.Mui-error):not(.Mui-disabled):hover .MuiOutlinedInput-notchedOutline": {
              border: `solid 1px ${BC.GREYSCALE_0_05}`,
              borderColor: BC.GREYSCALE_0_30,
            },
            "&.Mui-focused:not(.Mui-error) .MuiOutlinedInput-notchedOutline": {
              border: `solid 1px ${BC.MISC_FOCUS_BORDER}`,
              boxShadow: `0px 0px 0px 1px ${BC.MISC_FOCUS_BORDER}, inset 0 2px 0 0 ${BC.GREYSCALE_0_05}`,
            },
            "&.Mui-focused.Mui-error .MuiOutlinedInput-notchedOutline": {
              border: `solid 1px ${BC.RED}`,
              boxShadow: `0px 0px 0px 1px ${BC.RED}, inset 0 2px 0 0 ${BC.GREYSCALE_0_05}`,
            },
            "&.Mui-disabled": {
              backgroundColor: "transparent",
            },
            "&.Mui-disabled .MuiOutlinedInput-notchedOutline": {
              border: `solid 1px ${BC.GREYSCALE_0_10}`,
              borderColor: BC.GREYSCALE_0_10,
              backgroundColor: BC.GREYSCALE_0_05,
            },
          },
          adornedStart: {
            paddingLeft: 0,
          },
          adornedEnd: {
            paddingRight: 0,
          },
          input: {
            color: BC.TEXT_PRIMARY,
            padding: "6px 12px",
            "&.Mui-disabled": {
              opacity: 0.45,
            },
          },
          inputSizeSmall: {
            padding: "0px 12px",
          },
          notchedOutline: {
            borderColor: BC.GREYSCALE_0_15,
            borderRadius: YC,
            boxShadow: `inset 0 2px 0 0 ${BC.GREYSCALE_0_05}`,
          },
          multiline: {
            padding: "0",
          },
        },
      },
      MuiButton: {
        defaultProps: {
          color: "inherit" as "inherit", // eslint-disable-line
          disableRipple: !0,
          focusVisibleClassName: "sprout-focus-visible",
        },
        styleOverrides: {
          root: {
            height: "32px",
            lineHeight: "16px",
            minWidth: "24px",
            fontSize: 14,
            borderRadius: YC,
            "& > i:only-child, & > svg:only-child": {
              marginLeft: "-9px",
              marginRight: "-9px",
            },
          },
          text: {
            padding: "8px 16px",
            "&:active": {
              backgroundColor: BC.GREYSCALE_0_10,
            },
            "&.Mui-focusVisible": {
              boxShadow: `0 0 0 2px ${BC.MISC_FOCUS_BORDER}`,
            },
          },
          outlined: ({ ownerState: e }: { ownerState: { color?: string } }) => ({
            padding: "7px 16px",
            borderColor: BC.GREYSCALE_0_15,
            backgroundColor: BC.GREYSCALE_100_60,
            "&:active": {
              backgroundColor: BC.GREYSCALE_0_10,
            },
            "&.Mui-focusVisible": {
              borderColor: BC.MISC_FOCUS_BORDER,
              boxShadow: `0 0 0 1px ${BC.MISC_FOCUS_BORDER}`,
            },
            ...(e.color === "amethyst" && {
              borderColor: BC.PURPLE,
              "&.Mui-focusVisible": {
                borderColor: BC.PURPLE,
                boxShadow: `0 0 0 3px ${QR(BC.PURPLE_PALE, 0.5)}`,
              },
            }),
          }),
          outlinedPrimary: {
            borderColor: BC.GREEN,
            "&.Mui-focusVisible": {
              borderColor: BC.GREEN,
              boxShadow: `0 0 0 3px ${QR(BC.GREEN_PALE, 0.5)}`,
            },
          },
          outlinedSecondary: {
            borderColor: BC.BLUE,
            "&.Mui-focusVisible": {
              borderColor: BC.BLUE,
              boxShadow: `0 0 0 3px ${QR(BC.BLUE_PALE, 0.5)}`,
            },
          },
          outlinedWarning: {
            borderColor: BC.ORANGE,
            "&.Mui-focusVisible": {
              borderColor: BC.ORANGE,
              boxShadow: `0 0 0 3px ${QR(BC.ORANGE_PALE, 0.5)}`,
            },
          },
          outlinedError: {
            borderColor: BC.RED,
            "&.Mui-focusVisible": {
              borderColor: BC.RED,
              boxShadow: `0 0 0 3px ${QR(BC.RED_PALE, 0.5)}`,
            },
          },
          contained: ({ ownerState: e }: { ownerState: { color?: string } }) => ({
            color: BC.WHITE,
            padding: "8px 16px",
            boxShadow: "none",
            "&:hover": {
              boxShadow: "none",
            },
            "&:active": {
              boxShadow: "none",
            },
            ...(e.color === "amethyst" && {
              "&:hover": {
                backgroundColor: BC.PURPLE_PALE,
              },
              "&:active": {
                backgroundColor: BC.PURPLE_DARK,
              },
              "&.Mui-focusVisible": {
                borderColor: BC.PURPLE_PALE,
                boxShadow: `0 0 0 3px ${QR(BC.PURPLE_PALE, 0.5)}`,
              },
            }),
          }),
          containedPrimary: {
            "&:hover": {
              backgroundColor: BC.GREEN_PALE,
            },
            "&:active": {
              backgroundColor: BC.GREEN_DARK,
            },
            "&.Mui-focusVisible": {
              borderColor: BC.GREEN_PALE,
              boxShadow: `0 0 0 3px ${QR(BC.GREEN_PALE, 0.5)}`,
            },
          },
          containedSecondary: {
            "&:hover": {
              backgroundColor: BC.BLUE_PALE,
            },
            "&:active": {
              backgroundColor: BC.BLUE_DARK,
            },
            "&.Mui-focusVisible": {
              borderColor: BC.BLUE_PALE,
              boxShadow: `0 0 0 3px ${QR(BC.BLUE_PALE, 0.5)}`,
            },
          },
          containedWarning: {
            "&:hover": {
              backgroundColor: BC.ORANGE_PALE,
            },
            "&:active": {
              backgroundColor: BC.ORANGE_DARK,
            },
            "&.Mui-focusVisible": {
              borderColor: BC.ORANGE_PALE,
              boxShadow: `0 0 0 3px ${QR(BC.ORANGE_PALE, 0.5)}`,
            },
          },
          containedError: {
            "&:hover": {
              backgroundColor: BC.RED_PALE,
            },
            "&:active": {
              backgroundColor: BC.RED_DARK,
            },
            "&.Mui-focusVisible": {
              borderColor: BC.RED_PALE,
              boxShadow: `0 0 0 3px ${QR(BC.RED_PALE, 0.5)}`,
            },
          },
          sizeSmall: {
            fontSize: 12,
            height: "24px",
            "& > svg:only-child, & > i:only-child": {
              marginLeft: "-7px",
              marginRight: "-7px",
            },
          },
          sizeLarge: {
            fontSize: 16,
            height: "40px",
            lineHeight: "20px",
            "& > i:only-child, & > svg:only-child": {
              marginLeft: "-9px",
              marginRight: "-9px",
            },
          },
          textSizeSmall: {
            padding: "4px 11px",
          },
          textSizeLarge: {
            padding: "10px 19px",
          },
          outlinedSizeSmall: {
            padding: "3px 11px",
          },
          outlinedSizeLarge: {
            padding: "9px 19px",
          },
          containedSizeSmall: {
            padding: "4px 11px",
          },
          containedSizeLarge: {
            padding: "10px 19px",
          },
        },
        variants: [],
      },
    },
  };
};

// GREYSCALE_85 = border-top
export const COLORS = {
  GREYSCALE_100: "#ffffff",
  GREYSCALE_95: "#ffff27",
  GREYSCALE_90: "#ffff28",
  GREYSCALE_85: "#d9d9d9",
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
    height="12"
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
    height="12"
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
