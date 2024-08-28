export interface ChartViewDataset {
  label: string;
  backgroundColor: string;
  data: number[];
}

export interface ChartView {
  labels: string[];
  datasets: ChartViewDataset[];
}

export interface CharViewDatasetExtend extends ChartViewDataset {
  key: string;
}

export interface CharViewDefine {
  labels: string[];
  datasets: CharViewDatasetExtend[];
}
