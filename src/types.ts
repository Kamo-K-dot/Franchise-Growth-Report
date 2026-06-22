export interface Lead {
  groupId: number;
  parentName: string;
  childName: string;
  age: string;
  school: string;
  area: string;
  newsletter: string;
  touches: string[];
}

export interface Metric {
  title: string;
  value: string | number;
  change?: string;
  isPositive?: boolean;
  subtitle: string;
  icon: string;
}

export interface FunnelStage {
  name: string;
  count: number;
  percentage: number;
  description: string;
}
