"use client"
import { SvgIcon, SvgIconProps} from '@mui/material';

export default function DeltaIcon(props: SvgIconProps) {
  return (
    <SvgIcon {...props} viewBox="0 0 24 24">
      <path d="M8,16a1,1,0,0,1-.89-1.45l4-8a1,1,0,0,1,1.78,0l4,8A1,1,0,0,1,16,16Zm1.62-2h3.76L11.5,10.24Z" fill="#2ca9bc" />
    </SvgIcon>
  );
}