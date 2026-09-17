import styled from '@emotion/styled';
import { Gallery, Item } from 'react-photoswipe-gallery';
import 'photoswipe/dist/photoswipe.css';
import useScrollFadeIn from '../../hooks/useScrollFadeIn';

import img1 from '../../assets/images/1.jpeg';
import img2 from '../../assets/images/2.jpeg';
import img3 from '../../assets/images/3.jpeg';
import img4 from '../../assets/images/4.jpeg';
import img5 from '../../assets/images/5.jpeg';
import img6 from '../../assets/images/6.jpeg';
import img7 from '../../assets/images/7.jpeg';
import img8 from '../../assets/images/8.jpeg';
import img9 from '../../assets/images/9.jpeg';
import img10 from '../../assets/images/10.jpeg';
import img11 from '../../assets/images/11.jpeg';
import img12 from '../../assets/images/12.jpeg';
import img13 from '../../assets/images/13.jpeg';
import img14 from '../../assets/images/14.jpeg';

const images = [img1, img2, img3, img4, img5, img6, img7, img8, img9, img10, img11, img12, img13, img14];

const Container = styled.section`
  padding: 80px 0;
  background-color: var(--bg-color);
`;

const SectionTitle = styled.div`
  font-family: var(--font-en);
  font-size: 13px;
  letter-spacing: 4px;
  color: #999;
  font-weight: 600;
  margin: 0 0 30px 25px;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 2px;
  width: 100%;
`;

const ImageWrapper = styled.div`
  position: relative;
  width: 100%;
  aspect-ratio: 3 / 4;
  cursor: pointer;
  overflow: hidden;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
  
  &:hover {
    transform: scale(1.03);
  }
`;

const MoreOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.4);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: #fff;
  font-family: var(--font-en);
`;

const MoreCount = styled.div`
  font-size: 32px;
  font-weight: 300;
  margin-bottom: 5px;
`;

const MoreText = styled.div`
  font-size: 11px;
  letter-spacing: 3px;
`;

export default function WeddingGallery() {
  const fade = useScrollFadeIn<HTMLDivElement>();

  return (
    <Container {...fade}>
      <SectionTitle>GALLERY</SectionTitle>
      
      <Gallery>
        <Grid>
          {images.map((src, index) => {
            // 처음 5개는 그대로 보여줌
            // 6번째 사진에 +N MORE 오버레이 씌움
            // 7번째 이후는 화면에선 감춤 (display:none) 하지만 갤러리 클릭시엔 보임
            
            if (index > 5) {
              return (
                <Item
                  key={index}
                  original={src}
                  thumbnail={src}
                  width="960"
                  height="1440"
                >
                  {({ ref }) => (
                    /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
                    <Image ref={ref as any} src={src} style={{ display: 'none' }} />
                  )}
                </Item>
              );
            }

            return (
              <Item
                key={index}
                original={src}
                thumbnail={src}
                width="960"
                height="1440"
              >
                {({ ref, open }) => (
                  <ImageWrapper onClick={open}>
                    {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                    <Image ref={ref as any} src={src} alt={`Gallery image ${index + 1}`} />
                    {index === 5 && (
                      <MoreOverlay>
                        <MoreCount>+{images.length - 6}</MoreCount>
                        <MoreText>MORE</MoreText>
                      </MoreOverlay>
                    )}
                  </ImageWrapper>
                )}
              </Item>
            );
          })}
        </Grid>
      </Gallery>
    </Container>
  );
}
