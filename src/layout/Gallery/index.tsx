import { Gallery, Item } from "react-photoswipe-gallery";
import "photoswipe/dist/photoswipe.css";
import styled from "@emotion/styled";
import { images } from "./Images";
import useScrollFadeIn from "../../hooks/useScrollFadeIn";

const Container = styled.section`
  padding: 100px 0;
  background-color: #fff;
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 40px;
`;

const SubTitle = styled.div`
  font-family: var(--font-en);
  font-size: 14px;
  letter-spacing: 3px;
  color: var(--point-color);
  margin-bottom: 10px;
  text-transform: uppercase;
`;

const Title = styled.h2`
  font-size: 22px;
  color: #333;
  letter-spacing: 2px;
`;

const GalleryContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 4px;
  padding: 0 10px;
`;

const Thumbnail = styled.img`
  width: 100%;
  aspect-ratio: 1;
  object-fit: cover;
  cursor: pointer;
  transition: opacity 0.3s ease;
  &:hover {
    opacity: 0.9;
  }
`;

export default function WeddingGallery() {
  const fadeHeader = useScrollFadeIn<HTMLDivElement>();
  const fadeGrid = useScrollFadeIn<HTMLDivElement>();

  return (
    <Container>
      <Header {...fadeHeader}>
        <SubTitle>Gallery</SubTitle>
        <Title>우리의 순간들</Title>
      </Header>
      
      <div {...fadeGrid}>
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
      </div>
    </Container>
  );
}
