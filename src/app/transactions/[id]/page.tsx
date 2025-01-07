import TransactionDetailPage from "@/features/transaction/TransactionDetailPage";

const TransactionDetail = ({ params }: { params: { id: string } }) => {
  return <TransactionDetailPage transactionId={Number(params.id)} />;
};

export default TransactionDetail;
