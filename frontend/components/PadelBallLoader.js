"use client";

import { Box, Backdrop, useTheme } from "@mui/material";

export default function PadelBallLoader() {
  const theme = useTheme();

  return (
    <Backdrop
      open={true}
      sx={{
        zIndex: theme.zIndex.appBar + 1,
        backgroundColor: "rgba(255,255,255,0.7)",
      }}
    >
      <Box
        component="img"
        src="/padel-ball.png"
        alt="Padel Ball Loader"
        sx={{
          width: 164,
          height: 164,
          animation: "spin 1s linear infinite",
          "@keyframes spin": {
            to: { transform: "rotate(360deg)" },
          },
        }}
      />
    </Backdrop>
  );
}
