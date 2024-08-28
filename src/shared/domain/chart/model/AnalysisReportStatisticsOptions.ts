export interface AnalysisReportStatisticsOption {
  category: string;
  searchCodes: string[];
  displayCodes: string[];
  colors: {
    code: string;
    color: string;
  }[];
}
