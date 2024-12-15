import ResetPasswordPage from "@/features/reset-password";

const ResetPassword = ({ params }: { params: { token: string } }) => {
  return <ResetPasswordPage token={params.token} />;
};

export default ResetPassword;
