"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useCreateReview } from "@/hooks/api/review/useCreateReview";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "react-toastify";

interface Review {
  id: number;
  userId: string;
  eventId: number;
  rating: number;
  comment: string;
}

const fetchReviews = async (axiosInstance: any, eventId: number): Promise<Review[]> => {
  const { data } = await axiosInstance.get(`/reviews?eventId=${eventId}`);
  return data;
};

const ReviewTabs = ({ eventId }: { eventId: number }) => {
  const [activeTab, setActiveTab] = useState<"all" | "add">("all");
  const  axiosInstance  = useCreateReview();
  const { data: reviews, isLoading } = useQuery({
    queryKey: ["reviews", eventId],
    queryFn: () => fetchReviews(axiosInstance, eventId),
  });
  const createReview = useCreateReview();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const payload = {
      userId: String(formData.get("userId")),
      eventId,
      rating: Number(formData.get("rating")),
      comment: String(formData.get("comment")),
    };

    createReview.mutate(payload, {
      onSuccess: () => {
        toast.success("Review added successfully!");
        e.currentTarget.reset();
      },
    });
  };

  return (
    <div className="p-4">
      {/* Tabs */}
      <div className="flex space-x-4 border-b pb-2">
        <Button
          className={`pb-2 ${activeTab === "all" ? "border-b-2 border-blue-500" : ""}`}
          onClick={() => setActiveTab("all")}
        >
          All Reviews
        </Button>
        <Button
          className={`pb-2 ${activeTab === "add" ? "border-b-2 border-blue-500" : ""}`}
          onClick={() => setActiveTab("add")}
        >
          Add Review
        </Button>
      </div>

      {/* Content */}
      {activeTab === "all" && (
        <div>
          {isLoading ? (
            <p>Loading reviews...</p>
          ) : reviews?.length ? (
            <ul className="space-y-4 mt-4">
              {reviews.map((review) => (
                <li key={review.id} className="p-4 border rounded-lg shadow">
                  <p className="font-semibold">Rating: {review.rating} / 5</p>
                  <p>{review.comment}</p>
                </li>
              ))}
            </ul>
          ) : (
            <p>No reviews yet. Be the first to review!</p>
          )}
        </div>
      )}

      {activeTab === "add" && (
        <form onSubmit={handleSubmit} className="mt-4 space-y-4">
          <div>
            <Label htmlFor="rating" className="block font-semibold">
              Rating
            </Label>
            <Input
              type="number"
              id="rating"
              name="rating"
              min="1"
              max="5"
              required
              className="w-full border p-2 rounded"
            />
          </div>
          <div>
            <Label htmlFor="comment" className="block font-semibold">
              Comment
            </Label>
            <Textarea
              id="comment"
              name="comment"
              rows={4}
              required
              className="w-full border p-2 rounded"
            ></Textarea>
          </div>
          {/* <Button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            disabled={createReview.status === "loading"}
          >
            {createReview.status === "loading" ? "Submitting..." : "Submit Review"}
          </Button> */}
        </form>
      )}
    </div>
  );
};

export default ReviewTabs;
