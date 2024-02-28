"use client"

import RIframe from "react-iframe"

export const CVCardPreview = ({ id }: any) => {
  return (
    <div className="relative mx-auto aspect-[9/16] origin-[left_top] scale-[0.75] [&>*]:pointer-events-none [&>*]:select-none">
      <RIframe
        url={`http://localhost:3000/rs/${id}/`}
        width="100%"
        height="100%"
        frameBorder={0}
      />
    </div>
  )
}
