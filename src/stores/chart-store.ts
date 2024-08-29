import { defineStore } from 'pinia';
import { ApiError } from 'src/shared/api-service';
import { apiService } from 'src/shared/api-service/ApiService';
import {
  AnalysisReportStatisticsOption,
  ChartCategoryOption,
  ChartColorOption,
  ChartView,
  ChartViewDataset,
  StatisticsResult,
  CHART_DATE_WEEK,
  findStatisticsCodes,
  chartDisplayLabels,
  findCategoryLabel,
  findStatisticsCategory,
  StatisticsSet,
} from 'src/shared/domain/chart';
import { Search } from 'src/shared/model';
import NotifyUtil from 'src/shared/resource/NotifyUtil';

const StatisticsCountSum = (
  socResult: StatisticsResult,
  newResult: StatisticsResult
) => {
  const codes = findStatisticsCodes();
  codes.forEach((key) => {
    socResult[key] = (socResult[key] as number) + (newResult[key] as number);
  });
};

const initialStatisticsResult: StatisticsResult = {
  start: '',
  end: '',
  grouped: '',
  total: 0,
  ir00: 0,
  ir10: 0,
  ir20: 0,
  ir23: 0,
  ir40: 0,
  ir52: 0,
  wt00: 0,
};

const defaultCharView: ChartView = {
  labels: [],
  datasets: [],
};

interface AppStoreState {
  loading: boolean;
  chartView: ChartView;
  statisticsOption: AnalysisReportStatisticsOption[];
  statisticsResult: StatisticsResult[];
  searchDateKind: string;
  statisticsOptionChanged: boolean;
}

export const useChartStore = defineStore('chart', {
  state: (): AppStoreState => ({
    loading: false,
    chartView: { ...defaultCharView },
    statisticsOption: [],
    statisticsResult: [],
    searchDateKind: CHART_DATE_WEEK,
    statisticsOptionChanged: false,
  }),
  getters: {
    getChartView(state) {
      const chartView: ChartView = {
        labels: [],
        datasets: [],
      };
      if (state.statisticsResult.length > 0) {
        const start = Number(state.statisticsResult[0].start);
        const end = Number(state.statisticsResult[0].end);
        const groups: string[] = [];
        for (let index = start; index <= end; index++) {
          groups.push(index.toString());
        }

        chartView.labels = chartDisplayLabels(state.searchDateKind);

        let addedcount = false;
        state.statisticsOption.forEach((option) => {
          const searchCodes = [];
          searchCodes.push(...option.searchCodes);
          if (!addedcount) {
            searchCodes.unshift('total');
            addedcount = true;
          }
          if (searchCodes.length > 0) {
            searchCodes.forEach((code) => {
              console.log('code', code);
              const dataset: ChartViewDataset = {
                label: '',
                backgroundColor: '',
                data: [],
              };
              if (code === 'total') {
                dataset.label = '전체';
                dataset.backgroundColor = '#324147';
              } else {
                const color = option.colors.find((item) => item.code === code);
                dataset.label = findCategoryLabel(code);
                dataset.backgroundColor = color ? color.color : 'black';
              }
              groups.forEach((value) => {
                const data = state.statisticsResult.find(
                  (item) => item.grouped === value
                );
                if (data) {
                  console.log('data', data);
                  dataset.data.push(data[code] as number);
                } else {
                  dataset.data.push(0);
                }
              });
              chartView.datasets.push(dataset);
            });
          }
        });
      }
      console.log('chartview', chartView);
      return chartView;
    },
    isLoading(state) {
      return state.loading;
    },
    getStatisticsOption(state) {
      return state.statisticsOption;
    },
    isStatisticsOptionChanged(state) {
      return state.statisticsOptionChanged;
    },
  },
  actions: {
    searchChart(searchStatistics: Search) {
      this.loadingChartView();
      apiService.get<StatisticsResult[]>(
        `/statistics/${searchStatistics.searchDateType}/${searchStatistics.searchToDate}`
      )(
        (respond) => {
          this.loadedChartView(respond, searchStatistics.searchDateType);
        },
        (apiError?: ApiError | undefined) => {
          this.errorChartView();
          NotifyUtil.error(apiError?.message || '차트 호출 오류');
        }
      );
    },
    loadedChartView(statisticsResult: StatisticsResult[], dateKind: string) {
      this.searchDateKind = dateKind;
      this.statisticsResult = [];
      if (statisticsResult.length > 0) {
        statisticsResult.forEach((value) => {
          const exists = this.statisticsResult.find(
            (item) => item.grouped == value.grouped
          );
          if (!exists) {
            const datas = statisticsResult.filter(
              (item) => item.grouped == value.grouped
            );
            const data: StatisticsResult = { ...initialStatisticsResult };
            datas.forEach((item) => {
              data.start = item.start;
              data.end = item.end;
              data.grouped = item.grouped;
              data.count = Number(data.count) + Number(item.count);
              StatisticsCountSum(data, item);
            });

            this.statisticsResult.push(data);
          }
        });
      }
      this.loading = false;
    },
    loadingChartView() {
      this.chartView.labels = [];
      this.chartView.datasets = [];
      this.loading = true;
    },
    errorChartView() {
      this.loading = false;
    },
    putStatisticsOption(statisticsOption: AnalysisReportStatisticsOption[]) {
      this.statisticsOption = statisticsOption;
    },
    changeSearchStatisticsOption(chartCategoryOption: ChartCategoryOption) {
      const categorys = findStatisticsCategory();
      categorys.forEach((category) => {
        const searchs = chartCategoryOption[category];
        const find = this.statisticsOption.find(
          (option) => option.category == category
        );
        if (find) {
          find.searchCodes = [];
          find.searchCodes.push(...searchs);
        }
      });
      this.statisticsOptionChanged = true;
    },
    changeColorStatisticsOption(chartColorOption: ChartColorOption) {
      const codes = findStatisticsCodes();
      codes.forEach((code) => {
        const color = chartColorOption[code];
        this.statisticsOption.forEach((option) => {
          const find = option.colors.find((item) => item.code == code);
          if (find) {
            find.color = color;
          }
        });
      });
      this.statisticsOptionChanged = true;
    },
    saveOption() {
      StatisticsSet.saveOptions(this.statisticsOption);
      this.statisticsOptionChanged = false;
    },
  },
});
