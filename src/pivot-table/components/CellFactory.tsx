import React from 'react';
import { Cell, ItemData, TYPE } from '../../types/types';
import DimensionCell from './DimensionCell';
import DimensionTitleCell from './DimensionTitleCell';
import EmptyHeaderCell from './EmptyHeaderCell';
import EmptyCell from './EmptyCell';
// import useDebug from '../../hooks/use-debug';

interface GridCallbackProps {
  columnIndex: number;
  rowIndex: number;
  style: React.CSSProperties;
  data: ItemData;
}

const CellFactory = ({ columnIndex, rowIndex, style, data }: GridCallbackProps): JSX.Element | null => {
  const { matrix, isLeftColumn = false, isHeader = false } = data;
  const cell = matrix[columnIndex][rowIndex] as Cell;
  // useDebug('CellFactory', { columnIndex, rowIndex, style, data, cell }, { columnIndex, rowIndex, value: cell.value });

  if (cell.type === TYPE.DIMENSION) {
    return <DimensionCell
      cell={cell}
      data={data}
      rowIndex={rowIndex}
      colIndex={columnIndex}
      style={style}
      isLeftColumn={isLeftColumn}
    />;
  }

  if (cell.type === TYPE.LABEL) {
    return <DimensionTitleCell cell={cell} style={style} />
  }

  if (cell.type === TYPE.EMPTY && isHeader) {
    return <EmptyHeaderCell style={style} />
  }

  return <EmptyCell style={style} />
}

export default CellFactory;
