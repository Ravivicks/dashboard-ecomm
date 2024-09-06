import React, { useState } from "react";
import Image from "next/image";
import { Eye } from "lucide-react";
import { IPartnerBannerFile } from "@/types";

type ImagePreviewCellProps = {
  imageId: string;
  title: string;
};

const ImagePreviewCell: React.FC<ImagePreviewCellProps> = ({
  imageId,
  title,
}) => {
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [hovering, setHovering] = useState(false);

  const fullImageUrl = imageId
    ? `${process.env.NEXT_PUBLIC_APP_URL}api/images/${imageId}`
    : "";

  return (
    <div
      className="relative w-[100px] h-[100px] overflow-hidden rounded"
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
    >
      {/* Image */}
      <Image
        src={fullImageUrl}
        alt={title}
        className="object-fit"
        fill
        unoptimized
      />

      {/* Eye Icon */}
      {hovering && !isPreviewOpen && (
        <div
          className="absolute top-[30%] right-[30%] bg-black bg-opacity-50 p-1 rounded-full cursor-pointer"
          onClick={() => setIsPreviewOpen(true)}
        >
          <Eye className="h-6 w-6 text-white" />
        </div>
      )}

      {/* Image Preview Modal */}
      {isPreviewOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center"
          onClick={() => setIsPreviewOpen(false)}
        >
          <div className="relative">
            <Image
              src={fullImageUrl}
              alt={title}
              className="object-contain"
              width={600}
              height={400}
              unoptimized
            />
            <button
              className="absolute top-2 right-2 text-white bg-black rounded-full p-1"
              onClick={() => setIsPreviewOpen(false)}
            >
              X
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ImagePreviewCell;
