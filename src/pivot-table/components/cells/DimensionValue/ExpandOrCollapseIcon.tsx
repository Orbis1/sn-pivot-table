import React from "react";
import { MinusOutlineIcon, PlusOutlineIcon } from "../../../../components/Icon";
import type { Cell, DataModel, ExpandOrCollapser } from "../../../../types/types";
import { PLUS_MINUS_ICON_SIZE } from "../../../constants";
import { useBaseContext } from "../../../contexts/BaseProvider";
import { useSelectionsContext } from "../../../contexts/SelectionsProvider";
import { useStyleContext } from "../../../contexts/StyleProvider";
import { CELL_PADDING } from "../../shared-styles";
import { getColor } from "./utils/get-style";

type Props = {
  isLeftColumn: boolean;
  isCellSelected: boolean;
  cell: Cell;
  dataModel?: DataModel;
};

interface OnClickHandlerProps {
  cell: Cell;
  expandOrCollapse?: ExpandOrCollapser;
}

export const testIdExpandIcon = "expand-icon";
export const testIdCollapseIcon = "collapse-icon";

const HALF_ICON_HEIGHT = PLUS_MINUS_ICON_SIZE / 2;

const createOnClickHandler =
  ({ expandOrCollapse, cell }: OnClickHandlerProps) =>
  (e: React.SyntheticEvent) => {
    expandOrCollapse?.(cell.y, cell.x);
    e.stopPropagation();
  };

const ExpandOrCollapseIcon = ({ cell, dataModel, isLeftColumn, isCellSelected }: Props): JSX.Element | null => {
  const styleService = useStyleContext();
  const { interactions } = useBaseContext();
  const { isActive } = useSelectionsContext();

  if (!cell.ref.qCanExpand && !cell.ref.qCanCollapse) {
    return null;
  }

  const disableOnClickHandler = !interactions.active || isActive || !dataModel;
  const color = getColor({ cell, styleService, isCellSelected });
  const opacity = isActive ? 0.4 : 1.0;
  const halfCellHeight = styleService.contentRowHeight / 2;
  const Icon = cell.ref.qCanExpand ? PlusOutlineIcon : MinusOutlineIcon;
  let expandOrCollapse: ExpandOrCollapser | undefined;

  if (cell.ref.qCanExpand) {
    expandOrCollapse = isLeftColumn ? dataModel?.expandLeft : dataModel?.expandTop;
  } else {
    expandOrCollapse = isLeftColumn ? dataModel?.collapseLeft : dataModel?.collapseTop;
  }

  return (
    <Icon
      opacity={opacity}
      color={color}
      data-testid={cell.ref.qCanExpand ? testIdExpandIcon : testIdCollapseIcon}
      height={PLUS_MINUS_ICON_SIZE}
      style={{
        flexShrink: 0,
        cursor: disableOnClickHandler ? "default" : "pointer",
        padding: CELL_PADDING,
        // marginTop is need on left side to put the align the expand/collapse icon and the text
        marginTop: isLeftColumn ? halfCellHeight - HALF_ICON_HEIGHT - CELL_PADDING : undefined,
      }}
      onClick={disableOnClickHandler ? undefined : createOnClickHandler({ cell, expandOrCollapse })}
    />
  );
};

export default ExpandOrCollapseIcon;
