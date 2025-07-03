'use client';
import { Carousel } from 'react-responsive-carousel';

export default function CarruselEjemplo() {
  const arrowStyle = {
    position: 'absolute',
    top: '50%',
    zIndex: 2,
    background: 'transparent',
    border: 'none',
    fontSize: '2rem',
    cursor: 'pointer',
    color: 'green',
    transform: 'translateY(-50%)',
  };

  return (
    <Carousel
      showThumbs={false}
      showStatus={false}
      infiniteLoop
      autoPlay
      interval={3000}
      dynamicHeight={false}
      renderArrowPrev={(onClickHandler, hasPrev, label) =>
        hasPrev && (
          <button
            onClick={onClickHandler}
            title={label}
            style={{ ...arrowStyle, left: 15 }}
            aria-label="Previous Slide"
          >
            ◀
          </button>
        )
      }
      renderArrowNext={(onClickHandler, hasNext, label) =>
        hasNext && (
          <button
            onClick={onClickHandler}
            title={label}
            style={{ ...arrowStyle, right: 15 }}
            aria-label="Next Slide"
          >
            ▶
          </button>
        )
      }
    >
      {[1, 2, 3, 4].map((num) => (
        <div key={num}>
          <img
            src={`/img${num}.png`}
            alt={`Imagen ${num}`}
            style={{ maxWidth: '400px', margin: '0 auto', borderRadius: '8px' }}
          />
          <p className="legend">Imagen {num}</p>
        </div>
      ))}
    </Carousel>
  );
}
