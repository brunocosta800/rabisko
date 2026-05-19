import { useEffect, useState } from 'react';
import { continueRender, delayRender, staticFile } from 'remotion';
import { colors } from '../tokens';

interface BrazilMapProps {
  width: number | string;
  height: number | string;
  strokeOpacity?: number;
}

export const BrazilMap: React.FC<BrazilMapProps> = ({
  width,
  height,
  strokeOpacity = 0.55,
}) => {
  const [svgContent, setSvgContent] = useState<string | null>(null);
  const [handle] = useState(() => delayRender('Loading Brazil SVG'));

  useEffect(() => {
    fetch(staticFile('assets/brazil.svg'))
      .then((res) => res.text())
      .then((text) => {
        setSvgContent(text);
        continueRender(handle);
      })
      .catch((err) => {
        console.error('Falha ao carregar brazil.svg', err);
        continueRender(handle);
      });
  }, [handle]);

  if (!svgContent) {
    return <div style={{ width, height }} />;
  }

  return (
    <div
      style={{
        width,
        height,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <style>{`
        .brazil-map-inline svg {
          width: 100%;
          height: 100%;
          max-width: 100%;
          max-height: 100%;
          background: transparent !important;
        }
        /* Esconde TODOS os grupos do SVG por padrão (Terreno, Destaque, Contorno).
           O SVG do CorelDRAW tem geometria auxiliar invisível + um <rect> de
           moldura que ficavam visíveis quando forçávamos stroke bege em
           qualquer .strN. */
        .brazil-map-inline svg > g {
          display: none;
        }
        /* Mostra só o grupo dos Estados (fronteiras reais do Brasil). */
        .brazil-map-inline svg #Estados {
          display: inline;
        }
        .brazil-map-inline #Estados [class*="str"],
        .brazil-map-inline #Estados .str0,
        .brazil-map-inline #Estados .str1,
        .brazil-map-inline #Estados .str2,
        .brazil-map-inline #Estados .str3 {
          stroke: ${colors.bege} !important;
          stroke-opacity: ${strokeOpacity} !important;
          fill: none !important;
        }
        .brazil-map-inline #Estados [class*="fil"] {
          fill: transparent !important;
        }
      `}</style>
      <div
        className="brazil-map-inline"
        // O SVG vem de arquivo confiável local (public/assets/brazil.svg).
        // Usar dangerouslySetInnerHTML permite aplicar transforms no container
        // e estilizar strokes via CSS conforme spec.
        dangerouslySetInnerHTML={{ __html: svgContent }}
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      />
    </div>
  );
};
