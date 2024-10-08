import { useOnPropsChange } from "orbis-nebula-table-utils/lib/hooks";
import { useCallback, useMemo, useState } from "react";
import type {
  Data,
  HeadersData,
  LayoutService,
  LeftDimensionData,
  MeasureData,
  PageInfo,
  TopDimensionData,
  VisibleDimensionInfo,
} from "../../types/types";
import createHeadersData from "../data/headers-data";
import { addPageToLeftDimensionData, createLeftDimensionData } from "../data/left-dimension-data";
import { addPageToMeasureData, createMeasureData } from "../data/measure-data";
import { addPageToTopDimensionData, createTopDimensionData } from "../data/top-dimension-data";
import useAttrExprInfoIndexes from "./use-attr-expr-info-indexes";

const useData = (
  qPivotDataPages: EngineAPI.INxPivotPage[],
  layoutService: LayoutService,
  pageInfo: PageInfo,
  visibleLeftDimensionInfo: VisibleDimensionInfo[],
  visibleTopDimensionInfo: VisibleDimensionInfo[],
): Data => {
  const [nextPages, setNextPages] = useState<EngineAPI.INxPivotPage[] | null>(null);

  const attrExprInfoIndexes = useAttrExprInfoIndexes(
    visibleLeftDimensionInfo,
    visibleTopDimensionInfo,
    layoutService.visibleMeasureInfo,
  );

  const headersData = useMemo<HeadersData>(
    () => createHeadersData(layoutService, visibleTopDimensionInfo, visibleLeftDimensionInfo),
    [layoutService, visibleTopDimensionInfo, visibleLeftDimensionInfo],
  );

  const deriveMeasureDataFromProps = useCallback(
    () =>
      qPivotDataPages.slice(1).reduce(
        (prevData, nextDataPage) =>
          addPageToMeasureData({
            prevData,
            dataPage: nextDataPage,
            pageInfo,
          }),
        createMeasureData(qPivotDataPages[0], pageInfo),
      ),
    [qPivotDataPages, pageInfo],
  );

  const deriveTopDimensionDataFromProps = useCallback(
    () =>
      qPivotDataPages.slice(1).reduce(
        (prevData, nextDataPage) =>
          addPageToTopDimensionData({
            prevData,
            nextDataPage,
            layoutService,
            visibleTopDimensionInfo,
            attrExprInfoIndexes: attrExprInfoIndexes.top,
            headerRows: headersData.size.y,
          }),
        createTopDimensionData(
          qPivotDataPages[0],
          layoutService,
          visibleTopDimensionInfo,
          attrExprInfoIndexes.top,
          headersData.size.y,
        ),
      ),
    [qPivotDataPages, layoutService, visibleTopDimensionInfo, attrExprInfoIndexes.top, headersData.size.y],
  );

  const deriveLeftDimensionDataFromProps = useCallback(
    () =>
      qPivotDataPages.slice(1).reduce(
        (prevData, nextDataPage) =>
          addPageToLeftDimensionData({
            prevData,
            nextDataPage,
            pageInfo,
            layoutService,
            visibleLeftDimensionInfo,
            attrExprInfoIndexes: attrExprInfoIndexes.left,
          }),
        createLeftDimensionData(
          qPivotDataPages[0],
          layoutService,
          pageInfo,
          visibleLeftDimensionInfo,
          attrExprInfoIndexes.left,
        ),
      ),
    [qPivotDataPages, layoutService, pageInfo, visibleLeftDimensionInfo, attrExprInfoIndexes],
  );

  const [measureData, setMeasureData] = useState<MeasureData>(() => deriveMeasureDataFromProps());
  const [topDimensionData, setTopDimensionData] = useState<TopDimensionData>(() => deriveTopDimensionDataFromProps());
  const [leftDimensionData, setLeftDimensionData] = useState<LeftDimensionData>(() =>
    deriveLeftDimensionDataFromProps(),
  );

  useOnPropsChange(() => {
    setMeasureData(deriveMeasureDataFromProps());
  }, [deriveMeasureDataFromProps]);

  useOnPropsChange(() => {
    setTopDimensionData(deriveTopDimensionDataFromProps());
  }, [deriveTopDimensionDataFromProps]);

  useOnPropsChange(() => {
    setLeftDimensionData(deriveLeftDimensionDataFromProps());
  }, [deriveLeftDimensionDataFromProps]);

  useOnPropsChange(() => {
    if (!nextPages) return;

    // TODO This is not ideal. The data functions should take an array of pages instead
    // of having to set state per page in a forEach loop.
    nextPages.forEach((nextPage) => {
      setMeasureData((prevData) =>
        addPageToMeasureData({
          prevData,
          dataPage: nextPage,
          pageInfo,
        }),
      );
      setTopDimensionData((prevData) =>
        addPageToTopDimensionData({
          prevData,
          nextDataPage: nextPage,
          layoutService,
          visibleTopDimensionInfo,
          attrExprInfoIndexes: attrExprInfoIndexes.top,
          headerRows: headersData.size.y,
        }),
      );
      setLeftDimensionData((prevData) =>
        addPageToLeftDimensionData({
          prevData,
          nextDataPage: nextPage,
          pageInfo,
          layoutService,
          visibleLeftDimensionInfo,
          attrExprInfoIndexes: attrExprInfoIndexes.left,
        }),
      );
    });

    // we dont need dependency of pageInfo
    // this causes a rerender to add unrelevant data into grids
    // the reson for why we dont need it as dependancy is because
    // when a page changes -> we fetch new data (in supernova level) and trigger a new render
    // that means the entire react tree will be recreated -> so pageInfo here will be the most updated one!
    // and adding it as a dependency will trigger this hook that would result in extra unrelevant data (basically previous batch/page)
    // being added in to grids
  }, [nextPages]);

  const nextPageHandler = useCallback((pages: EngineAPI.INxPivotPage[]) => {
    setNextPages(pages);
  }, []);

  return {
    headersData,
    measureData,
    topDimensionData,
    leftDimensionData,
    attrExprInfoIndexes,
    nextPageHandler,
  };
};

export default useData;
