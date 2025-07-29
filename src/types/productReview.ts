export interface ProductReviewItem {
  id: string;
  authorName: string;
  content: string;
}

export interface ProductReview {
  totalCount: number;
  reviews: ProductReviewItem[];
}
