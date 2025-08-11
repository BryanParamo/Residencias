export default function Parrafo({ texto, color, fuente, tamaño }) {
  return (
    <p style={{ color, fontFamily: fuente, fontSize: tamaño }}>
      {texto}
    </p>
  );
}
