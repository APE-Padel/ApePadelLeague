"use client";

import { Box, Backdrop, useTheme } from "@mui/material";

export default function PadelBallLoader() {
  const theme = useTheme();

  return (
    <Backdrop open={true} sx={containerStyle(theme)}>
      <Box
        component="img"
        src="/padel-ball.png"
        alt="Padel Ball Loader"
        sx={loaderStyle}
      />
    </Backdrop>
  );
}

/* Styles */

const containerStyle = (theme) => ({
  zIndex: theme.zIndex.appBar + 1,
  backgroundColor: "transparent"
});

const loaderStyle = {
  width: 164,
  height: 164,
  animation: "spin 1s linear infinite",
  "@keyframes spin": {
    to: { transform: "rotate(360deg)" },
  }
}

