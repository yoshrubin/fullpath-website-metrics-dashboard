export interface Metric {
  title: string;
  value: number;
}

export interface ChartData {
  title: string;
  data: any;
  options: any;
}

export interface TableData {
  timestamp: string;
  impressions: number;
  clicks: number;
  cost: number;
  conversions: number;
}
