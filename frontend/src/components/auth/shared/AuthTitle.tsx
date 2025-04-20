import { Typography } from "@mui/material";

const AuthTitle = ({
  title,
  mb,
  fontWeight,
  fontSize = "1rem",
}: {
  title: string;
  mb: number;
  fontWeight: number;
  fontSize?: string;
}) => {
  return (
    <Typography
      variant="h4"
      fontWeight={fontWeight}
      mb={mb}
      textAlign={"center"}
      fontSize={fontSize}
    >
      {title}
    </Typography>
  );
};

export default AuthTitle;
