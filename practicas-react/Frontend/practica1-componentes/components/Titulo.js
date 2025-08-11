export default function Titulo({ texto, color, fuente, tamaño }) {
  return (
    <h1 style={{ color, fontFamily: fuente, fontSize: tamaño }}>
      {texto}
    </h1>
  );
}
