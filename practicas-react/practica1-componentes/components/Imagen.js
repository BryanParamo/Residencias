export default function Imagen({ src, alt, ancho }) {
  return (
    <img src={src} alt={alt} style={{ width: ancho }} />
  );
}
