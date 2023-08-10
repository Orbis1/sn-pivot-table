import type { stardust } from "@nebula.js/stardust";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import NxDimCellType, { NxSelectionCellType } from "../../../../types/QIX";
import type { Cell, DataModel, LayoutService, ListItemData } from "../../../../types/types";
import { useSelectionsContext } from "../../../contexts/SelectionsProvider";
import type { SelectionModel } from "../../../hooks/use-selections-model";
import DimensionCell, { testId, testIdCollapseIcon, testIdExpandIcon } from "../DimensionCell";
import { lockedFromSelectionStyle, selectedStyle } from "../utils/get-dimension-cell-style";
// eslint-disable-next-line jest/no-mocks-import
import dataModelMock from "./__mocks__/data-model-mock";

jest.mock("../../../contexts/SelectionsProvider");
jest.mock("../../../contexts/StyleProvider");

describe("DimensionCell", () => {
  let constraints: stardust.Constraints;
  let dataModel: DataModel;
  let data: ListItemData;
  let cell: Cell;
  const style: React.CSSProperties = {
    position: "absolute",
    left: "25px",
    top: "35px",
    width: "100px",
    height: "150px",
  };
  const qText = "test value";

  let expandLeftSpy: jest.SpyInstance;
  let expandTopSpy: jest.SpyInstance;
  let collapseLeftSpy: jest.SpyInstance;
  let collapseTopSpy: jest.SpyInstance;
  let mockedSelectionContext: jest.MockedFunction<() => SelectionModel>;
  let selectSpy: jest.MockedFunction<() => () => Promise<void>>;
  let onClickHandlerSpy: jest.MockedFunction<() => Promise<void>>;
  let isSelectedSpy: jest.MockedFunction<() => boolean>;
  let isLockedSpy: jest.MockedFunction<() => boolean>;
  let mockedSelectionModel: SelectionModel;
  let layoutService: LayoutService;

  afterEach(() => {
    jest.resetAllMocks();
  });

  beforeEach(() => {
    selectSpy = jest.fn();
    onClickHandlerSpy = jest.fn();
    isSelectedSpy = jest.fn();
    isLockedSpy = jest.fn();
    selectSpy.mockReturnValue(onClickHandlerSpy);
    mockedSelectionModel = {
      select: selectSpy,
      isSelected: isSelectedSpy,
      isActive: false,
      isLocked: isLockedSpy,
    };
    mockedSelectionContext = useSelectionsContext as jest.MockedFunction<typeof useSelectionsContext>;
    mockedSelectionContext.mockReturnValue(mockedSelectionModel);

    constraints = {
      active: false,
      passive: false,
      select: false,
    };

    dataModel = dataModelMock();

    layoutService = {
      isDimensionLocked: jest.fn().mockReturnValue(false),
    } as unknown as LayoutService;

    expandLeftSpy = jest.spyOn(dataModel, "expandLeft");
    expandTopSpy = jest.spyOn(dataModel, "expandTop");
    collapseLeftSpy = jest.spyOn(dataModel, "collapseLeft");
    collapseTopSpy = jest.spyOn(dataModel, "collapseTop");

    data = {
      layoutService,
      dataModel,
      constraints,
      showLastRowBorderBottom: false,
    } as ListItemData;

    cell = {
      y: 0,
      ref: {
        qText,
        qCanExpand: false,
        qCanCollapse: false,
        qType: NxDimCellType.NX_DIM_CELL_NORMAL,
      },
    } as Cell;
  });

  test("should render", () => {
    render(
      <DimensionCell
        cell={cell}
        data={data}
        rowIndex={0}
        colIndex={1}
        style={style}
        isLeftColumn={false}
        isLastRow={false}
        isLastColumn={false}
      />
    );

    expect(screen.getByText(qText)).toBeInTheDocument();
    expect(screen.getByTestId(testId)).toHaveStyle(style as Record<string, unknown>);
  });

  test("should not render expand or collapse icon if cell is not expandable or collapseable", () => {
    cell.ref.qCanExpand = false;
    cell.ref.qCanCollapse = false;

    render(
      <DimensionCell
        cell={cell}
        data={data}
        rowIndex={0}
        colIndex={1}
        style={style}
        isLeftColumn={false}
        isLastRow={false}
        isLastColumn={false}
      />
    );

    expect(screen.queryByTestId(testIdExpandIcon)).toBeNull();
    expect(screen.queryByTestId(testIdCollapseIcon)).toBeNull();
  });

  describe("left column interactions", () => {
    describe("expand/collapse", () => {
      test("should be possible to expand left column", async () => {
        cell.ref.qCanExpand = true;

        render(
          <DimensionCell
            cell={cell}
            data={data}
            rowIndex={0}
            colIndex={1}
            style={style}
            isLeftColumn
            isLastRow={false}
            isLastColumn={false}
          />
        );

        expect(screen.queryByTestId(testIdExpandIcon)).toBeInTheDocument();
        await userEvent.click(screen.getByTestId(testIdExpandIcon));

        expect(expandLeftSpy).toHaveBeenCalledWith(0, 1);
      });

      test("should not be possible to expand left column when active constraint is true", async () => {
        cell.ref.qCanExpand = true;
        (data.constraints as stardust.Constraints).active = true;

        render(
          <DimensionCell
            cell={cell}
            data={data}
            rowIndex={0}
            colIndex={1}
            style={style}
            isLeftColumn
            isLastRow={false}
            isLastColumn={false}
          />
        );

        expect(screen.queryByTestId(testIdExpandIcon)).toBeInTheDocument();
        await userEvent.click(screen.getByTestId(testIdExpandIcon));

        expect(expandLeftSpy).toHaveBeenCalledTimes(0);
      });

      test("should not be possible to expand left column when selections is active", async () => {
        cell.ref.qCanExpand = true;
        mockedSelectionContext.mockReturnValue({
          select: () => () => Promise.resolve(),
          isSelected: () => false,
          isActive: true,
          isLocked: () => false,
        });

        render(
          <DimensionCell
            cell={cell}
            data={data}
            rowIndex={0}
            colIndex={1}
            style={style}
            isLeftColumn
            isLastRow={false}
            isLastColumn={false}
          />
        );

        expect(screen.queryByTestId(testIdExpandIcon)).toBeInTheDocument();
        await userEvent.click(screen.getByTestId(testIdExpandIcon));

        expect(expandLeftSpy).toHaveBeenCalledTimes(0);
      });

      test("should be possible to collapse left column", async () => {
        cell.ref.qCanCollapse = true;

        render(
          <DimensionCell
            cell={cell}
            data={data}
            rowIndex={0}
            colIndex={1}
            style={style}
            isLeftColumn
            isLastRow={false}
            isLastColumn={false}
          />
        );

        expect(screen.queryByTestId(testIdCollapseIcon)).toBeInTheDocument();
        await userEvent.click(screen.getByTestId(testIdCollapseIcon));

        expect(collapseLeftSpy).toHaveBeenCalledWith(0, 1);
      });

      test("should be not possible to collapse left column when active constraint is true", async () => {
        cell.ref.qCanCollapse = true;
        (data.constraints as stardust.Constraints).active = true;

        render(
          <DimensionCell
            cell={cell}
            data={data}
            rowIndex={0}
            colIndex={1}
            style={style}
            isLeftColumn
            isLastRow={false}
            isLastColumn={false}
          />
        );

        expect(screen.queryByTestId(testIdCollapseIcon)).toBeInTheDocument();
        await userEvent.click(screen.getByTestId(testIdCollapseIcon));

        expect(collapseLeftSpy).toHaveBeenCalledTimes(0);
      });

      test("should be not possible to collapse left column when selections is active", async () => {
        cell.ref.qCanCollapse = true;
        mockedSelectionContext.mockReturnValue({
          select: () => () => Promise.resolve(),
          isSelected: () => false,
          isActive: true,
          isLocked: () => false,
        });

        render(
          <DimensionCell
            cell={cell}
            data={data}
            rowIndex={0}
            colIndex={1}
            style={style}
            isLeftColumn
            isLastRow={false}
            isLastColumn={false}
          />
        );

        expect(screen.queryByTestId(testIdCollapseIcon)).toBeInTheDocument();
        await userEvent.click(screen.getByTestId(testIdCollapseIcon));

        expect(collapseLeftSpy).toHaveBeenCalledTimes(0);
      });
    });

    describe("selections", () => {
      test("should select cell", async () => {
        const rowIdx = 0;
        const colIdx = 1;
        cell.ref.qCanCollapse = true;
        render(
          <DimensionCell
            cell={cell}
            data={data}
            rowIndex={rowIdx}
            colIndex={colIdx}
            style={style}
            isLeftColumn
            isLastRow={false}
            isLastColumn={false}
          />
        );

        await userEvent.click(screen.getByText(qText));

        expect(selectSpy).toHaveBeenCalledWith(NxSelectionCellType.NX_CELL_LEFT, rowIdx, colIdx);
        expect(onClickHandlerSpy).toHaveBeenCalledTimes(1);
      });

      test("should style selected cell", () => {
        const rowIdx = 0;
        const colIdx = 1;
        cell.ref.qCanCollapse = true;
        isSelectedSpy.mockReturnValue(true);

        render(
          <DimensionCell
            cell={cell}
            data={data}
            rowIndex={rowIdx}
            colIndex={colIdx}
            style={style}
            isLeftColumn
            isLastRow={false}
            isLastColumn={false}
          />
        );

        expect(isSelectedSpy).toHaveBeenCalledWith(NxSelectionCellType.NX_CELL_LEFT, rowIdx, colIdx);
        expect(screen.getByTestId(testId)).toHaveStyle(selectedStyle as Record<string, string>);
      });

      test("should not be possible to select cell when constraints is active", async () => {
        const rowIdx = 0;
        const colIdx = 1;
        (data.constraints as stardust.Constraints).active = true;
        cell.ref.qCanCollapse = true;
        isSelectedSpy.mockReturnValue(true);

        render(
          <DimensionCell
            cell={cell}
            data={data}
            rowIndex={rowIdx}
            colIndex={colIdx}
            style={style}
            isLeftColumn
            isLastRow={false}
            isLastColumn={false}
          />
        );

        await userEvent.click(screen.getByText(qText));

        expect(selectSpy).toHaveBeenCalledTimes(0);
        expect(onClickHandlerSpy).toHaveBeenCalledTimes(0);
      });

      test("should not be possible to select cell when cell is locked due to selections in top column", async () => {
        const rowIdx = 0;
        const colIdx = 1;
        cell.ref.qCanCollapse = true;
        isLockedSpy.mockReturnValue(true);

        render(
          <DimensionCell
            cell={cell}
            data={data}
            rowIndex={rowIdx}
            colIndex={colIdx}
            style={style}
            isLeftColumn
            isLastRow={false}
            isLastColumn={false}
          />
        );

        await userEvent.click(screen.getByText(qText));

        expect(selectSpy).toHaveBeenCalledTimes(0);
        expect(onClickHandlerSpy).toHaveBeenCalledTimes(0);
        expect(screen.getByTestId(testId)).toHaveStyle(lockedFromSelectionStyle as Record<string, string>);
      });

      test("should not be possible to select cell when dimension is locked", async () => {
        const rowIdx = 0;
        const colIdx = 1;
        cell.isLockedByDimension = true;
        cell.ref.qCanCollapse = true;

        render(
          <DimensionCell
            cell={cell}
            data={data}
            rowIndex={rowIdx}
            colIndex={colIdx}
            style={style}
            isLeftColumn
            isLastRow={false}
            isLastColumn={false}
          />
        );

        await userEvent.click(screen.getByText(qText));

        expect(selectSpy).toHaveBeenCalledTimes(0);
        expect(onClickHandlerSpy).toHaveBeenCalledTimes(0);
        expect(screen.getByTestId(testId)).toHaveStyle(lockedFromSelectionStyle as Record<string, string>);
      });
    });
  });

  describe("top row interactions", () => {
    describe("expand/collapse", () => {
      test("should be possible to expand top row", async () => {
        cell.ref.qCanExpand = true;

        render(
          <DimensionCell
            cell={cell}
            data={data}
            rowIndex={0}
            colIndex={1}
            style={style}
            isLeftColumn={false}
            isLastRow={false}
            isLastColumn={false}
          />
        );

        expect(screen.queryByTestId(testIdExpandIcon)).toBeInTheDocument();
        await userEvent.click(screen.getByTestId(testIdExpandIcon));

        expect(expandTopSpy).toHaveBeenCalledWith(0, 1);
      });

      test("should not be possible to expand top row when active constraint is true", async () => {
        cell.ref.qCanExpand = true;
        (data.constraints as stardust.Constraints).active = true;

        render(
          <DimensionCell
            cell={cell}
            data={data}
            rowIndex={0}
            colIndex={1}
            style={style}
            isLeftColumn={false}
            isLastRow={false}
            isLastColumn={false}
          />
        );

        expect(screen.queryByTestId(testIdExpandIcon)).toBeInTheDocument();
        await userEvent.click(screen.getByTestId(testIdExpandIcon));

        expect(expandTopSpy).toHaveBeenCalledTimes(0);
      });

      test("should not be possible to expand top row when selections is active", async () => {
        cell.ref.qCanExpand = true;
        mockedSelectionContext.mockReturnValue({
          select: () => () => Promise.resolve(),
          isSelected: () => false,
          isActive: true,
          isLocked: () => false,
        });

        render(
          <DimensionCell
            cell={cell}
            data={data}
            rowIndex={0}
            colIndex={1}
            style={style}
            isLeftColumn={false}
            isLastRow={false}
            isLastColumn={false}
          />
        );

        expect(screen.queryByTestId(testIdExpandIcon)).toBeInTheDocument();
        await userEvent.click(screen.getByTestId(testIdExpandIcon));

        expect(expandTopSpy).toHaveBeenCalledTimes(0);
      });

      test("should be possible to collapse top row", async () => {
        cell.ref.qCanCollapse = true;

        render(
          <DimensionCell
            cell={cell}
            data={data}
            rowIndex={0}
            colIndex={1}
            style={style}
            isLeftColumn={false}
            isLastRow={false}
            isLastColumn={false}
          />
        );

        expect(screen.queryByTestId(testIdCollapseIcon)).toBeInTheDocument();
        await userEvent.click(screen.getByTestId(testIdCollapseIcon));

        expect(collapseTopSpy).toHaveBeenCalledWith(0, 1);
      });

      test("should be not possible to collapse top row when active constraint is true", async () => {
        cell.ref.qCanCollapse = true;
        (data.constraints as stardust.Constraints).active = true;

        render(
          <DimensionCell
            cell={cell}
            data={data}
            rowIndex={0}
            colIndex={1}
            style={style}
            isLeftColumn={false}
            isLastRow={false}
            isLastColumn={false}
          />
        );

        expect(screen.queryByTestId(testIdCollapseIcon)).toBeInTheDocument();
        await userEvent.click(screen.getByTestId(testIdCollapseIcon));

        expect(collapseTopSpy).toHaveBeenCalledTimes(0);
      });

      test("should be not possible to collapse top row when selections is active", async () => {
        cell.ref.qCanCollapse = true;
        mockedSelectionContext.mockReturnValue({
          select: () => () => Promise.resolve(),
          isSelected: () => false,
          isActive: true,
          isLocked: () => false,
        });

        render(
          <DimensionCell
            cell={cell}
            data={data}
            rowIndex={0}
            colIndex={1}
            style={style}
            isLeftColumn={false}
            isLastRow={false}
            isLastColumn={false}
          />
        );

        expect(screen.queryByTestId(testIdCollapseIcon)).toBeInTheDocument();
        await userEvent.click(screen.getByTestId(testIdCollapseIcon));

        expect(collapseTopSpy).toHaveBeenCalledTimes(0);
      });
    });

    describe("selections", () => {
      test("should select cell", async () => {
        const rowIdx = 0;
        const colIdx = 1;
        cell.ref.qCanCollapse = true;

        render(
          <DimensionCell
            cell={cell}
            data={data}
            rowIndex={rowIdx}
            colIndex={colIdx}
            style={style}
            isLeftColumn={false}
            isLastRow={false}
            isLastColumn={false}
          />
        );

        await userEvent.click(screen.getByText(qText));

        expect(selectSpy).toHaveBeenCalledWith(NxSelectionCellType.NX_CELL_TOP, rowIdx, colIdx);
        expect(onClickHandlerSpy).toHaveBeenCalledTimes(1);
      });

      test("should style selected cell", () => {
        const rowIdx = 0;
        const colIdx = 1;
        cell.ref.qCanCollapse = true;
        isSelectedSpy.mockReturnValue(true);

        render(
          <DimensionCell
            cell={cell}
            data={data}
            rowIndex={rowIdx}
            colIndex={colIdx}
            style={style}
            isLeftColumn={false}
            isLastRow={false}
            isLastColumn={false}
          />
        );

        expect(isSelectedSpy).toHaveBeenCalledWith(NxSelectionCellType.NX_CELL_TOP, rowIdx, colIdx);
        expect(screen.getByTestId(testId)).toHaveStyle(selectedStyle as Record<string, string>);
      });

      test("should not be possible to select cell when constraints is active", async () => {
        const rowIdx = 0;
        const colIdx = 1;
        (data.constraints as stardust.Constraints).active = true;
        cell.ref.qCanCollapse = true;
        isSelectedSpy.mockReturnValue(true);

        render(
          <DimensionCell
            cell={cell}
            data={data}
            rowIndex={rowIdx}
            colIndex={colIdx}
            style={style}
            isLeftColumn={false}
            isLastRow={false}
            isLastColumn={false}
          />
        );

        await userEvent.click(screen.getByText(qText));

        expect(selectSpy).toHaveBeenCalledTimes(0);
        expect(onClickHandlerSpy).toHaveBeenCalledTimes(0);
      });

      test("should not be possible to select cell when cell is locked due to selections in left column", async () => {
        const rowIdx = 0;
        const colIdx = 1;
        cell.ref.qCanCollapse = true;
        isLockedSpy.mockReturnValue(true);

        render(
          <DimensionCell
            cell={cell}
            data={data}
            rowIndex={rowIdx}
            colIndex={colIdx}
            style={style}
            isLeftColumn={false}
            isLastRow={false}
            isLastColumn={false}
          />
        );

        await userEvent.click(screen.getByText(qText));

        expect(selectSpy).toHaveBeenCalledTimes(0);
        expect(onClickHandlerSpy).toHaveBeenCalledTimes(0);
        expect(screen.getByTestId(testId)).toHaveStyle(lockedFromSelectionStyle as Record<string, string>);
      });

      test("should not be possible to select cell when dimension is locked", async () => {
        const rowIdx = 0;
        const colIdx = 1;
        cell.isLockedByDimension = true;
        cell.ref.qCanCollapse = true;

        render(
          <DimensionCell
            cell={cell}
            data={data}
            rowIndex={rowIdx}
            colIndex={colIdx}
            style={style}
            isLeftColumn={false}
            isLastRow={false}
            isLastColumn={false}
          />
        );

        await userEvent.click(screen.getByText(qText));

        expect(selectSpy).toHaveBeenCalledTimes(0);
        expect(onClickHandlerSpy).toHaveBeenCalledTimes(0);
        expect(screen.getByTestId(testId)).toHaveStyle(lockedFromSelectionStyle as Record<string, string>);
      });
    });
  });
});
