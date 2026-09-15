import { Gallery, Item } from "react-photoswipe-gallery";
import "photoswipe/dist/photoswipe.css";
import styled from "@emotion/styled";
import { images } from "./Images";

const GalleryContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 4px;
  padding: 20px;
`;

const Thumbnail = styled.img`
  width: 100%;
  aspect-ratio: 1;
  object-fit: cover;
  cursor: pointer;
`;

export default function WeddingGallery() {
  return (
    <Gallery>
      <GalleryContainer>
        {images.map((img, index) => (
          <Item
            key={index}
            original={img.src}
            thumbnail={img.src}
            width={img.width}
            height={img.height}
          >
            {({ ref, open }) => (
              <Thumbnail
                ref={ref as React.Ref<HTMLImageElement>}
                onClick={open}
                src={img.src}
                alt={img.alt}
                style={{ display: index < 9 ? "block" : "none" }}
              />
            )}
          </Item>
        ))}
      </GalleryContainer>
    </Gallery>
  );
}
