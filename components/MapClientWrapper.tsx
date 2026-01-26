"use client";

import dynamic from "next/dynamic";

const CommunityMap = dynamic(() => import("./CommunityMap"), { ssr: false });

export default function MapClientWrapper() {
  return <CommunityMap />;
}
