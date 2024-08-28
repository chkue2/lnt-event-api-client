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
    category: 'DR',
    code: 'DR00',
    lable: '열람분석 의무자와 수신 담보제공자 정보 일치',
  },
  {
    category: 'DR',
    code: 'DR01',
    lable: '이름 불일치',
  },
  {
    category: 'DR',
    code: 'DR02',
    lable: '주민번호 불일치',
  },
  {
    category: 'DR',
    code: 'DR03',
    lable: '주소 불일치',
  },
  {
    category: 'DR',
    code: 'DR99',
    lable: '법무인 검색 처리 중 에러 발생',
  },
  {
    category: 'ES',
    code: 'ES00',
    lable: '부동산 특이사항 없음',
  },
  {
    category: 'ES',
    code: 'ES01',
    lable: '공동담보 이력 있음',
  },
  {
    category: 'ES',
    code: 'ES02',
    lable: '대지권 없음',
  },
  {
    category: 'ES',
    code: 'ES03',
    lable: '별도등기 있음',
  },
  {
    category: 'LR',
    code: 'LR00',
    lable: '소유지분을 제외한 소유권에 관한 등기 없음',
  },
  {
    category: 'LR',
    code: 'LR01',
    lable: '소유지분을 제외한 소유권에 관한 등기 있음',
  },
  {
    category: 'LR',
    code: 'LR02',
    lable: '열람 당시 사건 처리 중',
  },
  {
    category: 'LR',
    code: 'LR03',
    lable: '소유지분을 제외한 소유권에 관한 등기 있음(열람 당시 사건 처리 중)',
  },
  {
    category: 'DC',
    code: 'DC00',
    lable: '등기부상 소유자 1명',
  },
  {
    category: 'DC',
    code: 'DC01',
    lable: '등기부상 소유자 2명 이상',
  },
  {
    category: 'DC',
    code: 'DC02',
    lable: '등기부상 소유권 취득 2건 이상',
  },
  {
    category: 'DC',
    code: 'DC03',
    lable: '등기부상 소유자와 수신 담보제공자 수 불일치',
  },
  {
    category: 'DC',
    code: 'DC99',
    lable: '법무인 검색 처리 중 에러 발생',
  },
  {
    category: 'EC',
    code: 'EC00',
    lable: '의뢰 부동산 1건',
  },
  {
    category: 'EC',
    code: 'EC01',
    lable: '의뢰 부동산 2건 이상',
  },
  {
    category: 'DG',
    code: 'DG00',
    lable: '수신 담보제공와 초본상의 주소 일치',
  },
  {
    category: 'DG',
    code: 'DG01',
    lable: '주소 불일치',
  },
  {
    category: 'DG',
    code: 'DG02',
    lable: '전자정부 초본 발급 확인 안됨',
  },
  {
    category: 'DG',
    code: 'DG03',
    lable: '영문 주소(수신 담보제공와 초본상의 주소 일치)',
  },
  {
    category: 'DG',
    code: 'DG99',
    lable: '초본 검색 처리 중 에러 발생',
  },
  {
    category: 'RR',
    code: 'RR00',
    lable: '등기필정보 또는 수신파일 있음',
  },
  {
    category: 'RR',
    code: 'RR01',
    lable: '수신 파일 및 등기필정보 없음',
  },
  {
    category: 'RR',
    code: 'RR02',
    lable: '소유권 권리 등기필정보 수신  갯수가 다름',
  },
  {
    category: 'RR',
    code: 'RR03',
    lable: '소유권정보와 등기필정보 수신 내용이 다름',
  },
  {
    category: 'RR',
    code: 'RR99',
    lable: '법무인 검색 처리 중 에러 발생',
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
    lables: ['일', '월', '화', '수', '목', '금', '토'],
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
            searchCodes: [`${value.category}00`],
            displayCodes: [`${value.category}00`],
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
      DR: this.searchCodes('DR'),
      ES: this.searchCodes('ES'),
      LR: this.searchCodes('LR'),
      DC: this.searchCodes('DC'),
      EC: this.searchCodes('EC'),
      DG: this.searchCodes('DG'),
      RR: this.searchCodes('RR'),
    };
  }

  public buildDefChartDisplay(): ChartCategoryOption {
    return {
      DR: this.displayCodes('DR'),
      ES: this.displayCodes('ES'),
      LR: this.displayCodes('LR'),
      DC: this.displayCodes('DC'),
      EC: this.displayCodes('EC'),
      DG: this.displayCodes('DG'),
      RR: this.displayCodes('RR'),
    };
  }

  public buildDefChartColor(): ChartColorOption {
    const option: ChartColorOption = {
      DR00: this.searchColor('DR00'),
      DR01: this.searchColor('DR01'),
      DR02: this.searchColor('DR02'),
      DR03: this.searchColor('DR03'),
      DR99: this.searchColor('DR99'),
      ES00: this.searchColor('ES00'),
      ES01: this.searchColor('ES01'),
      ES02: this.searchColor('ES02'),
      ES03: this.searchColor('ES03'),
      LR00: this.searchColor('LR00'),
      LR01: this.searchColor('LR01'),
      LR02: this.searchColor('LR02'),
      LR03: this.searchColor('LR03'),
      DC00: this.searchColor('DC00'),
      DC01: this.searchColor('DC01'),
      DC02: this.searchColor('DC02'),
      DC03: this.searchColor('DC03'),
      DC99: this.searchColor('DC99'),
      EC00: this.searchColor('EC00'),
      EC01: this.searchColor('EC01'),
      DG00: this.searchColor('DG00'),
      DG01: this.searchColor('DG01'),
      DG02: this.searchColor('DG02'),
      DG03: this.searchColor('DG03'),
      DG99: this.searchColor('DG99'),
      RR00: this.searchColor('RR00'),
      RR01: this.searchColor('RR01'),
      RR02: this.searchColor('RR02'),
      RR03: this.searchColor('RR03'),
      RR99: this.searchColor('RR99'),
    };
    return option;
  }

  public static saveOptions(options: AnalysisReportStatisticsOption[]) {
    LocalStorage.set('statistics_set', options);
  }
}

export const statisticsSet = new StatisticsSet();
