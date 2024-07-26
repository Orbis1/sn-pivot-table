import type { Direction, ThemeOptions } from "@mui/material/styles";
import { createTheme } from "@mui/material/styles";
import { createV5ThemeOptions } from "../components/Icon";

export default function muiSetup(direction: Direction | undefined) {
  const sproutTheme: ThemeOptions = createV5ThemeOptions();
  if (sproutTheme?.components?.MuiTable?.styleOverrides) {
    sproutTheme.components.MuiTable.styleOverrides.root = {};
  }

  return createTheme({ ...sproutTheme, direction });
}
