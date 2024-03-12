export interface RowData {
    name: string;
    department: string;
    jobTitle: string;
    totalLicenses: string;
    company: string;
    email: string;
}
  
export interface TableSortProps {
    data: RowData[];
}
  
export interface ThProps {
    children: React.ReactNode;
    reversed: boolean;
    sorted: boolean;
    onSort(): void;
}