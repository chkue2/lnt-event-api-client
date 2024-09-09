import { LocalStorage } from 'quasar';
import {
  AnalysisReportCategoyCode,
  AnalysisReportStatisticsOption,
  ChartCategoryOption,
  ChartColorOption,
  SelectOptions,
} from 'src/shared/domain/chart';

export const CHART_DATE_MONTH = 'month';
export const CHART_DATE_WEEK = 'week';
export const CHART_DATE_DAY = 'day';

export const dateTypeOptions: SelectOptions[] = [
  {
    label: '월',
    value: CHART_DATE_MONTH,
  },
  {
    label: '주',
    value: CHART_DATE_WEEK,
  },
  {
    label: '일',
    value: CHART_DATE_DAY,
  },
];

export const ANALYSIS_REPORT_CATEGOY_CODES: AnalysisReportCategoyCode[] = [
  {
    category: 'total',
    code: 'total',
    lable: '전체',
  },
  {
    category: 'ir',
    code: 'ir00',
    lable: '부동산등기신청서 작성',
  },
  {
    category: 'ir',
    code: 'ir10',
    lable: '부동산등기신청서 제출',
  },
  {
    category: 'ir',
    code: 'ir20',
    lable: '부동산사건처리현황 검색',
  },
  {
    category: 'ir',
    code: 'ir23',
    lable: '부동산등기필증 다운로드',
  },
  {
    category: 'ir',
    code: 'ir40',
    lable: '고유번호 조회',
  },
  {
    category: 'ir',
    code: 'ir52',
    lable: '등기필증유효성 조회',
  },
  {
    category: 'wt',
    code: 'wt00',
    lable: '등록세신고',
  },
];

export const findCategoryLabel = (code: string) => {
  const find = ANALYSIS_REPORT_CATEGOY_CODES.find(
    (value) => value.code == code
  );
  if (find) return find.lable;
  return '';
};

export const findCategoryCodes = (category: string) => {
  const list: string[] = [];
  ANALYSIS_REPORT_CATEGOY_CODES.forEach((value) => {
    if (value.category == category) list.push(value.code);
  });
  return list;
};

export const findStatisticsCategory = () => {
  const list: string[] = [];
  ANALYSIS_REPORT_CATEGOY_CODES.forEach((value) => {
    if (list.indexOf(value.category) == -1) list.push(value.category);
  });
  return list;
};

export const findStatisticsCodes = () => {
  const list: string[] = [];
  ANALYSIS_REPORT_CATEGOY_CODES.forEach((value) => {
    if (list.indexOf(value.code) == -1) list.push(value.code);
  });
  return list;
};

const CHART_DATE_DISPLAYS = [
  {
    dateKind: CHART_DATE_MONTH,
    lables: [
      '1월',
      '2월',
      '3월',
      '4월',
      '5월',
      '6월',
      '7월',
      '8월',
      '9월',
      '10월',
      '11월',
      '12월',
    ],
  },
  {
    dateKind: CHART_DATE_WEEK,
    lables: ['1주', '2주', '3주', '4주', '5주'],
  },
  {
    dateKind: CHART_DATE_DAY,
    lables: [
      '0',
      '1',
      '2',
      '3',
      '4',
      '5',
      '6',
      '7',
      '8',
      '9',
      '10',
      '11',
      '12',
      '13',
      '14',
      '15',
      '16',
      '17',
      '18',
      '19',
      '20',
      '21',
      '22',
      '23',
      '24',
    ],
  },
];

export const chartDisplayLabels = (dateType: string): string[] => {
  const chartDateDisplay = CHART_DATE_DISPLAYS.find(
    (value) => dateType == value.dateKind
  );
  return chartDateDisplay ? chartDateDisplay.lables : [];
};

export class StatisticsSet {
  private _options: AnalysisReportStatisticsOption[] = [];

  constructor() {
    const saveOptions = LocalStorage.getItem(
      'statistics_set'
    ) as AnalysisReportStatisticsOption[];
    if (saveOptions) {
      this._options = saveOptions;
    } else {
      ANALYSIS_REPORT_CATEGOY_CODES.forEach((value) => {
        const colors: {
          code: string;
          color: string;
        }[] = [];

        findCategoryCodes(value.category).forEach((code) => {
          colors.push({
            code,
            color: '#324147',
          });
        });
        const exists = this._options.find(
          (item) => item.category == value.category
        );

        if (!exists) {
          const option: AnalysisReportStatisticsOption = {
            category: value.category,
            searchCodes: findCategoryCodes(value.category),
            displayCodes: findCategoryCodes(value.category),
            colors,
          };
          this._options.push(option);
        }
      });
    }
  }

  get options() {
    return this._options;
  }

  public searchCodes(categroy: string): string[] {
    const find = this._options.find((value) => value.category == categroy);
    return find ? find.searchCodes : [];
  }

  public displayCodes(categroy: string): string[] {
    const find = this._options.find((value) => value.category == categroy);
    return find ? find.displayCodes : [];
  }

  public searchColor(code: string): string {
    let result:
      | {
          code: string;
          color: string;
        }
      | undefined;
    this._options.forEach((value) => {
      const find = value.colors.find((color) => color.code == code);
      if (find) result = find;
    });
    return result ? result.color : 'white';
  }

  public buildDefChartSearch(): ChartCategoryOption {
    return {
      IR: this.searchCodes('IR'),
      WT: this.searchCodes('WT'),
    };
  }

  public buildDefChartDisplay(): ChartCategoryOption {
    return {
      IR: this.displayCodes('IR'),
      WT: this.displayCodes('WT'),
    };
  }

  public buildDefChartColor(): ChartColorOption {
    const option: ChartColorOption = {
      total: this.searchColor('total'),
      ir00: this.searchColor('ir00'),
      ir20: this.searchColor('ir20'),
      ir23: this.searchColor('ir23'),
      ir40: this.searchColor('ir40'),
      ir52: this.searchColor('ir52'),
      wt00: this.searchColor('wt00'),
    };
    return option;
  }

  public static saveOptions(options: AnalysisReportStatisticsOption[]) {
    LocalStorage.set('statistics_set', options);
  }
}

export const statisticsSet = new StatisticsSet();
