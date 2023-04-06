import { Skeleton, Stack } from '@mui/material';
import React from 'react';

function Loading({ width, height }) {
  return (
    <div>
      <Stack spacing={1} padding={1}>
        <Skeleton variant="rounded" width={width} height={height} />
        <Skeleton variant="rounded" width={width} height={height} />
        <Skeleton variant="rounded" width={width} height={height} />
        <Skeleton variant="rounded" width={width} height={height} />
        <Skeleton variant="rounded" width={width} height={height} />
        <Skeleton variant="rounded" width={width} height={height} />
        <Skeleton variant="rounded" width={width} height={height} />
      </Stack>

    </div>
  );
}

export default Loading;
