export interface DashboardData {
  totalUsers: number;
  activeUsers: number;
  revenue: number;
  recentActivities: Activity[];
}

export interface Activity {
  id: number;
  user: string;
  action: string;
  timestamp: Date;
}

export interface SalesData {
  month: string;
  sales: number;
}
