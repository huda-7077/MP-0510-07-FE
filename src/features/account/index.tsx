import CardRewards from "./components/CardRewards";
import EditProfileForm from "./components/EditProfileForm";

const ProfileSettingsPage = () => {
  return (
    <main className="container w-full">
      <div>
        <div className="text-2xl font-bold md:text-3xl">Account Profile</div>
        <p className="text-sm text-muted-foreground">
          Edit your profile details
        </p>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          <EditProfileForm />
          <CardRewards />
        </div>
      </div>
    </main>
  );
};

export default ProfileSettingsPage;
