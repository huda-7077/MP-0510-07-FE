// Base Review Interface
export interface Review {
    id: number;
    userId: number;
    eventId: number;
    rating: number;
    comment: string;
    createdAt: string;
    updatedAt: string;
    user: {
      fullname: string;
      profilePicture: string | null;
    };
    event: {
      title: string;
      thumbnail?: string; // Optional karena tidak semua response mengembalikan thumbnail
    };
  }
  
  // Request Types
  export interface CreateReviewRequest {
    eventId: number;
    rating: number;
    comment: string;
  }
  
  // Response Types
  export interface CreateReviewResponse {
    status: string;
    message: string;
    data: Review;
  }
  
  export interface ReviewSummary {
    totalReviews: number;
    averageRating: number;
  }
  
  export interface GetEventReviewsResponse {
    status: string;
    message: string;
    data: {
      reviews: Review[];
      summary: ReviewSummary;
    };
  }
  
  export interface GetUserReviewsResponse {
    status: string;
    message: string;
    data: Review[];
  }
  
  export interface GetReviewByIdResponse {
    status: string;
    message: string;
    data: Review;
  }