import EditProfileForm from "./components/EditProfileForm";

const ProfileSettingsPage = () => {
  return (
    <main>
      <div className="text-2xl font-bold md:text-3xl">Account Profile</div>
      <p className="text-sm text-muted-foreground">Edit your profile details</p>
      <EditProfileForm />
    </main>
  );
};

export default ProfileSettingsPage;
