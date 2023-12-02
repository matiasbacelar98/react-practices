// It works but is harder to read and mantain
function UserView() {
  return (
    <div>
      {role === 'Admin' ? (
        <AdminView />
      ) : role === 'Guest' ? (
        <GuestView />
      ) : (
        <ContributorView />
      )}
    </div>
  );
}

// BETTER
const RolesViews = {
  GUEST: GuestView,
  ADMIN: AdminView,
  CONTRIBUTOR: ContributorView,
};

function UserView({ role }) {
  const CurrentView = RolesViews[role] ?? DefaultView;

  return (
    <div>
      <CurrentView />
    </div>
  );
}

// Views components
function DefaultView() {
  return <div>DefaultView</div>;
}

function AdminView() {
  return <div>AdminView</div>;
}

function GuestView() {
  return <div>GuestView</div>;
}

function ContributorView() {
  return <div>ContributorView</div>;
}
