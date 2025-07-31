export interface ProductDetail {
  description: string;
  announcements: {
    name: string;
    value: string;
    displayOrder: number;
  }[];
}
