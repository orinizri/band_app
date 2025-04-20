import { Link, Typography } from "@mui/material";

const RoleToggle = ({
  isAdmin,
  setIsAdmin,
  isLogin,
}: {
  isAdmin: boolean;
  setIsAdmin: (x: boolean) => void;
  isLogin: boolean;
}): React.ReactElement => {
  return (
    <>
      <Typography textAlign="center" fontSize="1rem">
        {isAdmin ? "Are you a user? " : "Are you an admin? "}
        <Link href="#" onClick={() => setIsAdmin(isAdmin ? false : true)}>
          {isLogin ? "Log In" : "Create Account"}
        </Link>
      </Typography>
    </>
  );
};

export default RoleToggle;
