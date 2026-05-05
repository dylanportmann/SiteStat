import type { ReactNode } from "react";
import type { TheorySchema } from "./types";

function label(schema: TheorySchema, index: number, fallback: string): string {
  return schema.labels[index] ?? fallback;
}

function SvgFrame({
  schema,
  children
}: {
  schema: TheorySchema;
  children: ReactNode;
}) {
  const titleId = `${schema.id}-title`;
  const descId = `${schema.id}-desc`;

  return (
    <svg
      className="theory-schema__svg"
      viewBox="0 0 640 260"
      role="img"
      aria-labelledby={`${titleId} ${descId}`}
    >
      <title id={titleId}>{schema.title}</title>
      <desc id={descId}>{schema.description}</desc>
      <defs>
        <marker
          id={`${schema.id}-arrow`}
          markerWidth="9"
          markerHeight="9"
          refX="7"
          refY="4.5"
          orient="auto"
          markerUnits="strokeWidth"
        >
          <path d="M0,0 L8,4.5 L0,9 Z" className="schema-arrow-head" />
        </marker>
      </defs>
      {children}
    </svg>
  );
}

function Arrow({
  schema,
  x1,
  y1,
  x2,
  y2,
  muted = false
}: {
  schema: TheorySchema;
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  muted?: boolean;
}) {
  return (
    <line
      className={muted ? "schema-line-muted" : "schema-line"}
      x1={x1}
      y1={y1}
      x2={x2}
      y2={y2}
      markerEnd={`url(#${schema.id}-arrow)`}
    />
  );
}

function Box({
  x,
  y,
  width,
  height,
  children,
  className = "schema-box"
}: {
  x: number;
  y: number;
  width: number;
  height: number;
  children: ReactNode;
  className?: string;
}) {
  return (
    <g>
      <rect className={className} x={x} y={y} width={width} height={height} rx="10" />
      <text className="schema-text" x={x + width / 2} y={y + height / 2 + 5} textAnchor="middle">
        {children}
      </text>
    </g>
  );
}

function SmallText({
  x,
  y,
  children,
  anchor = "middle"
}: {
  x: number;
  y: number;
  children: ReactNode;
  anchor?: "start" | "middle" | "end";
}) {
  return (
    <text className="schema-small" x={x} y={y} textAnchor={anchor}>
      {children}
    </text>
  );
}

function Curve({
  d,
  className = "schema-curve"
}: {
  d: string;
  className?: string;
}) {
  return <path className={className} d={d} />;
}

function assertNever(value: never): never {
  throw new Error(`Schema non supporte: ${value}`);
}

function renderGraphic(schema: TheorySchema) {
  switch (schema.variant) {
    case "population-flow":
      return (
        <SvgFrame schema={schema}>
          <Box x={36} y={86} width={126} height={58} className="schema-box schema-fill-soft">
            {label(schema, 0, "Population")}
          </Box>
          <Box x={202} y={86} width={126} height={58}>
            {label(schema, 1, "Echantillon")}
          </Box>
          <Box x={368} y={86} width={126} height={58}>
            {label(schema, 2, "Statistique")}
          </Box>
          <Box x={204} y={184} width={286} height={44} className="schema-box schema-fill-alt">
            {label(schema, 3, "Inference")}
          </Box>
          <Box x={514} y={28} width={96} height={48} className="schema-box schema-fill-warn">
            {label(schema, 4, "Parametre")}
          </Box>
          <Arrow schema={schema} x1={162} y1={115} x2={198} y2={115} />
          <Arrow schema={schema} x1={328} y1={115} x2={364} y2={115} />
          <Arrow schema={schema} x1={410} y1={148} x2={410} y2={180} />
          <Arrow schema={schema} x1={490} y1={204} x2={548} y2={82} />
          <SmallText x={180} y={102}>selection</SmallText>
          <SmallText x={344} y={102}>calcul</SmallText>
        </SvgFrame>
      );

    case "variable-tree":
      return (
        <SvgFrame schema={schema}>
          <Box x={247} y={26} width={146} height={44} className="schema-box schema-fill-soft">
            {label(schema, 0, "Variable")}
          </Box>
          <Box x={88} y={106} width={158} height={46}>
            {label(schema, 1, "Qualitative")}
          </Box>
          <Box x={394} y={106} width={158} height={46}>
            {label(schema, 2, "Quantitative")}
          </Box>
          <Arrow schema={schema} x1={300} y1={72} x2={190} y2={103} />
          <Arrow schema={schema} x1={340} y1={72} x2={450} y2={103} />
          {[label(schema, 3, "Nominale"), label(schema, 4, "Ordinale")].map((item, index) => (
            <Box key={item} x={54 + index * 146} y={188} width={124} height={42} className="schema-box schema-fill-alt">
              {item}
            </Box>
          ))}
          {[label(schema, 5, "Discrete"), label(schema, 6, "Continue")].map((item, index) => (
            <Box key={item} x={360 + index * 146} y={188} width={124} height={42} className="schema-box schema-fill-alt">
              {item}
            </Box>
          ))}
          <Arrow schema={schema} x1={138} y1={154} x2={114} y2={184} />
          <Arrow schema={schema} x1={196} y1={154} x2={242} y2={184} />
          <Arrow schema={schema} x1={444} y1={154} x2={420} y2={184} />
          <Arrow schema={schema} x1={502} y1={154} x2={548} y2={184} />
        </SvgFrame>
      );

    case "randomization-plan":
      return (
        <SvgFrame schema={schema}>
          <Box x={48} y={42} width={132} height={50} className="schema-box schema-fill-soft">
            {label(schema, 0, "Population")}
          </Box>
          <Box x={254} y={42} width={132} height={50}>
            {label(schema, 1, "Echantillon")}
          </Box>
          <Box x={444} y={28} width={124} height={44}>
            {label(schema, 2, "Groupe A")}
          </Box>
          <Box x={444} y={90} width={124} height={44}>
            {label(schema, 3, "Groupe B")}
          </Box>
          <Box x={120} y={184} width={152} height={42} className="schema-box schema-fill-alt">
            {label(schema, 4, "Generaliser")}
          </Box>
          <Box x={386} y={184} width={152} height={42} className="schema-box schema-fill-warn">
            {label(schema, 5, "Causalite")}
          </Box>
          <Arrow schema={schema} x1={180} y1={67} x2={250} y2={67} />
          <Arrow schema={schema} x1={386} y1={58} x2={440} y2={50} />
          <Arrow schema={schema} x1={386} y1={76} x2={440} y2={112} />
          <Arrow schema={schema} x1={180} y1={92} x2={178} y2={180} />
          <Arrow schema={schema} x1={506} y1={136} x2={490} y2={180} />
          <SmallText x={216} y={54}>selection aleatoire</SmallText>
          <SmallText x={434} y={150}>assignation aleatoire</SmallText>
        </SvgFrame>
      );

    case "center-skew":
      return (
        <SvgFrame schema={schema}>
          <line className="schema-axis" x1="62" y1="210" x2="586" y2="210" />
          <Curve d="M80 207 C120 205, 150 182, 184 128 C220 66, 278 64, 318 126 C360 192, 452 210, 576 208" />
          <line className="schema-marker" x1="292" y1="82" x2="292" y2="210" />
          <line className="schema-marker schema-marker-alt" x1="360" y1="120" x2="360" y2="210" />
          <SmallText x={292} y={232}>{label(schema, 0, "Mediane")}</SmallText>
          <SmallText x={360} y={232}>{label(schema, 1, "Moyenne")}</SmallText>
          <SmallText x={492} y={152}>{label(schema, 2, "Queue droite")}</SmallText>
          <SmallText x={504} y={182}>{label(schema, 3, "Valeurs extremes")}</SmallText>
        </SvgFrame>
      );

    case "boxplot-iqr":
      return (
        <SvgFrame schema={schema}>
          <line className="schema-axis" x1="70" y1="178" x2="570" y2="178" />
          <line className="schema-line" x1="104" y1="138" x2="202" y2="138" />
          <rect className="schema-boxplot-box" x="202" y="104" width="248" height="68" rx="4" />
          <line className="schema-line" x1="450" y1="138" x2="534" y2="138" />
          <line className="schema-marker" x1="104" y1="112" x2="104" y2="164" />
          <line className="schema-marker" x1="202" y1="96" x2="202" y2="180" />
          <line className="schema-marker schema-marker-alt" x1="318" y1="96" x2="318" y2="180" />
          <line className="schema-marker" x1="450" y1="96" x2="450" y2="180" />
          <line className="schema-marker" x1="534" y1="112" x2="534" y2="164" />
          <line className="schema-bracket" x1="202" y1="70" x2="450" y2="70" />
          <line className="schema-bracket" x1="202" y1="70" x2="202" y2="88" />
          <line className="schema-bracket" x1="450" y1="70" x2="450" y2="88" />
          <SmallText x={104} y={210}>{label(schema, 0, "Min")}</SmallText>
          <SmallText x={202} y={210}>{label(schema, 1, "Q1")}</SmallText>
          <SmallText x={318} y={210}>{label(schema, 2, "Mediane")}</SmallText>
          <SmallText x={450} y={210}>{label(schema, 3, "Q3")}</SmallText>
          <SmallText x={534} y={210}>{label(schema, 4, "Max")}</SmallText>
          <SmallText x={326} y={58}>{label(schema, 5, "IQR")}</SmallText>
        </SvgFrame>
      );

    case "graph-choices":
      return (
        <SvgFrame schema={schema}>
          <Box x={46} y={38} width={150} height={46} className="schema-box schema-fill-soft">
            {label(schema, 0, "Histogramme")}
          </Box>
          <Box x={246} y={38} width={150} height={46} className="schema-box schema-fill-soft">
            {label(schema, 1, "Boxplot")}
          </Box>
          <Box x={446} y={38} width={150} height={46} className="schema-box schema-fill-soft">
            {label(schema, 2, "QQ-plot")}
          </Box>
          <Box x={46} y={166} width={150} height={46}>
            {label(schema, 3, "Forme")}
          </Box>
          <Box x={246} y={166} width={150} height={46}>
            {label(schema, 4, "Groupes")}
          </Box>
          <Box x={446} y={166} width={150} height={46}>
            {label(schema, 5, "Normalite")}
          </Box>
          <Arrow schema={schema} x1={121} y1={86} x2={121} y2={162} />
          <Arrow schema={schema} x1={321} y1={86} x2={321} y2={162} />
          <Arrow schema={schema} x1={521} y1={86} x2={521} y2={162} />
          {[72, 94, 116, 138, 160].map((x, index) => (
            <rect key={x} className="schema-bar" x={x} y={136 - index * 9} width="16" height={index * 9 + 18} />
          ))}
          <rect className="schema-boxplot-mini" x="286" y="112" width="72" height="30" />
          <line className="schema-line-muted" x1="262" y1="127" x2="286" y2="127" />
          <line className="schema-line-muted" x1="358" y1="127" x2="382" y2="127" />
          <line className="schema-line-muted" x1="478" y1="144" x2="564" y2="104" />
          {[492, 512, 532, 552].map((x, index) => (
            <circle key={x} className="schema-dot" cx={x} cy={137 - index * 10} r="4" />
          ))}
        </SvgFrame>
      );

    case "probability-events":
      return (
        <SvgFrame schema={schema}>
          <rect className="schema-universe" x="70" y="42" width="500" height="172" rx="14" />
          <ellipse className="schema-area" cx="270" cy="128" rx="122" ry="72" />
          <ellipse className="schema-area-alt" cx="372" cy="128" rx="122" ry="72" />
          <SmallText x={105} y={72} anchor="start">{label(schema, 0, "Univers")}</SmallText>
          <SmallText x={226} y={128}>{label(schema, 1, "A")}</SmallText>
          <SmallText x={506} y={190}>{label(schema, 2, "non A")}</SmallText>
          <SmallText x={416} y={128}>{label(schema, 3, "B")}</SmallText>
          <Box x={282} y={106} width={78} height={38} className="schema-box schema-fill-warn">
            {label(schema, 4, "A et B")}
          </Box>
          <SmallText x={320} y={238}>{label(schema, 5, "P(A | B)")}</SmallText>
        </SvgFrame>
      );

    case "normal-z":
      return (
        <SvgFrame schema={schema}>
          <line className="schema-axis" x1="70" y1="204" x2="570" y2="204" />
          <Curve d="M84 204 C150 204, 178 174, 224 108 C264 50, 376 50, 416 108 C462 174, 490 204, 556 204" />
          <line className="schema-marker schema-marker-alt" x1="320" y1="62" x2="320" y2="204" />
          <line className="schema-marker" x1="226" y1="112" x2="226" y2="204" />
          <line className="schema-marker" x1="414" y1="112" x2="414" y2="204" />
          <line className="schema-marker schema-marker-danger" x1="476" y1="160" x2="476" y2="204" />
          <SmallText x={320} y={226}>{label(schema, 0, "mu")}</SmallText>
          <SmallText x={226} y={226}>{label(schema, 1, "-1 sigma")}</SmallText>
          <SmallText x={414} y={226}>{label(schema, 2, "+1 sigma")}</SmallText>
          <SmallText x={476} y={150}>{label(schema, 3, "x")}</SmallText>
          <Box x={226} y={24} width={188} height={38} className="schema-box schema-fill-alt">
            {label(schema, 4, "z = (x - mu) / sigma")}
          </Box>
        </SvgFrame>
      );

    case "t-vs-normal":
      return (
        <SvgFrame schema={schema}>
          <line className="schema-axis" x1="70" y1="204" x2="570" y2="204" />
          <Curve d="M88 204 C160 202, 204 170, 254 112 C288 72, 352 72, 386 112 C436 170, 480 202, 552 204" />
          <Curve
            d="M76 204 C128 200, 182 188, 248 126 C282 94, 358 94, 392 126 C458 188, 512 200, 564 204"
            className="schema-curve schema-curve-alt"
          />
          <SmallText x={455} y={92}>{label(schema, 0, "Normale")}</SmallText>
          <SmallText x={142} y={174}>{label(schema, 1, "Loi t")}</SmallText>
          <SmallText x={118} y={218}>{label(schema, 2, "Queues plus epaisses")}</SmallText>
          <Box x={238} y={24} width={164} height={38} className="schema-box schema-fill-alt">
            {label(schema, 3, "ddl")}
          </Box>
        </SvgFrame>
      );

    case "scientific-cycle": {
      const items = [
        [320, 38, label(schema, 0, "Observation")],
        [500, 106, label(schema, 1, "Hypothese")],
        [430, 204, label(schema, 2, "Prediction")],
        [210, 204, label(schema, 3, "Test")],
        [140, 106, label(schema, 4, "Revision")]
      ] as const;
      return (
        <SvgFrame schema={schema}>
          {items.map(([x, y, text], index) => (
            <Box key={text} x={x - 66} y={y - 22} width={132} height={44} className={index === 0 ? "schema-box schema-fill-soft" : "schema-box"}>
              {text}
            </Box>
          ))}
          <Arrow schema={schema} x1={383} y1={56} x2={448} y2={92} />
          <Arrow schema={schema} x1={496} y1={130} x2={456} y2={184} />
          <Arrow schema={schema} x1={364} y1={204} x2={278} y2={204} />
          <Arrow schema={schema} x1={184} y1={184} x2={142} y2={130} />
          <Arrow schema={schema} x1={192} y1={92} x2={256} y2={56} />
        </SvgFrame>
      );
    }

    case "sampling-distribution":
      return (
        <SvgFrame schema={schema}>
          <Box x={40} y={38} width={162} height={44} className="schema-box schema-fill-soft">
            {label(schema, 0, "Echantillons repetes")}
          </Box>
          <Box x={248} y={38} width={132} height={44}>
            {label(schema, 1, "Statistiques")}
          </Box>
          <Box x={430} y={38} width={162} height={44}>
            {label(schema, 2, "Distribution")}
          </Box>
          <Arrow schema={schema} x1={204} y1={60} x2={244} y2={60} />
          <Arrow schema={schema} x1={382} y1={60} x2={426} y2={60} />
          {[86, 118, 150].map((y, index) => (
            <g key={y}>
              <circle className="schema-dot" cx={84 + index * 26} cy={y} r="6" />
              <circle className="schema-dot" cx={118 + index * 26} cy={y + 10} r="6" />
              <circle className="schema-dot" cx={152 + index * 26} cy={y - 2} r="6" />
            </g>
          ))}
          {[276, 308, 340].map((x, index) => (
            <line key={x} className="schema-marker" x1={x} y1={116 + index * 18} x2={x} y2={186} />
          ))}
          <Curve d="M436 204 C468 204, 482 170, 506 126 C526 92, 566 92, 586 126" />
          <line className="schema-bracket" x1="492" y1="222" x2="558" y2="222" />
          <SmallText x={526} y={242}>{label(schema, 3, "Erreur standard")}</SmallText>
          <SmallText x={310} y={216}>{label(schema, 4, "xbar")}</SmallText>
        </SvgFrame>
      );

    case "hypothesis-pvalue":
      return (
        <SvgFrame schema={schema}>
          <line className="schema-axis" x1="70" y1="204" x2="570" y2="204" />
          <path className="schema-tail-area" d="M460 204 C486 184, 510 190, 560 204 Z" />
          <path className="schema-pvalue-area" d="M404 204 C438 152, 486 180, 560 204 Z" />
          <Curve d="M84 204 C150 204, 178 174, 224 108 C264 50, 376 50, 416 108 C462 174, 490 204, 556 204" />
          <line className="schema-marker schema-marker-danger" x1="404" y1="118" x2="404" y2="204" />
          <SmallText x={320} y={46}>{label(schema, 0, "Distribution sous H0")}</SmallText>
          <SmallText x={404} y={108}>{label(schema, 1, "Statistique observee")}</SmallText>
          <SmallText x={484} y={160}>{label(schema, 2, "p-value")}</SmallText>
          <SmallText x={512} y={224}>{label(schema, 3, "alpha")}</SmallText>
          <SmallText x={512} y={242}>{label(schema, 4, "Zone critique")}</SmallText>
        </SvgFrame>
      );

    case "t-test-choice":
      return (
        <SvgFrame schema={schema}>
          <Box x={220} y={24} width={200} height={44} className="schema-box schema-fill-soft">
            test t
          </Box>
          <Box x={42} y={116} width={154} height={46}>
            {label(schema, 0, "Une moyenne")}
          </Box>
          <Box x={242} y={116} width={154} height={46}>
            {label(schema, 1, "Deux mesures liees")}
          </Box>
          <Box x={442} y={116} width={154} height={46}>
            {label(schema, 2, "Deux groupes")}
          </Box>
          <Box x={42} y={198} width={154} height={38} className="schema-box schema-fill-alt">
            {label(schema, 3, "1 echantillon")}
          </Box>
          <Box x={242} y={198} width={154} height={38} className="schema-box schema-fill-alt">
            {label(schema, 4, "Apparie")}
          </Box>
          <Box x={442} y={198} width={154} height={38} className="schema-box schema-fill-alt">
            {label(schema, 5, "Independant")}
          </Box>
          <Arrow schema={schema} x1={266} y1={70} x2={146} y2={112} />
          <Arrow schema={schema} x1={320} y1={70} x2={320} y2={112} />
          <Arrow schema={schema} x1={374} y1={70} x2={494} y2={112} />
          <Arrow schema={schema} x1={119} y1={164} x2={119} y2={194} />
          <Arrow schema={schema} x1={319} y1={164} x2={319} y2={194} />
          <Arrow schema={schema} x1={519} y1={164} x2={519} y2={194} />
        </SvgFrame>
      );

    case "error-matrix":
      return (
        <SvgFrame schema={schema}>
          <line className="schema-axis" x1="184" y1="70" x2="556" y2="70" />
          <line className="schema-axis" x1="184" y1="70" x2="184" y2="220" />
          <rect className="schema-cell schema-fill-danger" x="184" y="70" width="186" height="74" rx="4" />
          <rect className="schema-cell schema-fill-ok" x="370" y="70" width="186" height="74" rx="4" />
          <rect className="schema-cell schema-fill-ok" x="184" y="144" width="186" height="74" rx="4" />
          <rect className="schema-cell schema-fill-warn" x="370" y="144" width="186" height="74" rx="4" />
          <SmallText x={277} y={52}>{label(schema, 0, "H0 vraie")}</SmallText>
          <SmallText x={463} y={52}>{label(schema, 1, "H1 vraie")}</SmallText>
          <SmallText x={162} y={112} anchor="end">{label(schema, 2, "Rejeter H0")}</SmallText>
          <SmallText x={162} y={186} anchor="end">{label(schema, 3, "Ne pas rejeter H0")}</SmallText>
          <SmallText x={277} y={112}>{label(schema, 4, "Type I")}</SmallText>
          <SmallText x={463} y={186}>{label(schema, 5, "Type II")}</SmallText>
          <SmallText x={463} y={112}>{label(schema, 6, "Puissance")}</SmallText>
        </SvgFrame>
      );

    case "alternative-tails":
      return (
        <SvgFrame schema={schema}>
          {[48, 228, 408].map((x, index) => (
            <g key={x}>
              <line className="schema-axis" x1={x} y1="184" x2={x + 160} y2="184" />
              <Curve d={`M${x + 8} 184 C${x + 38} 184, ${x + 46} 156, ${x + 78} 120 C${x + 104} 90, ${x + 128} 156, ${x + 152} 184`} />
              <SmallText x={x + 80} y={220}>{label(schema, index, ["two.sided", "greater", "less"][index])}</SmallText>
            </g>
          ))}
          <path className="schema-tail-area" d="M54 184 C72 172, 82 176, 94 184 Z" />
          <path className="schema-tail-area" d="M162 184 C174 176, 184 172, 202 184 Z" />
          <path className="schema-tail-area" d="M340 184 C354 176, 370 170, 382 184 Z" />
          <path className="schema-tail-area" d="M414 184 C428 170, 444 176, 456 184 Z" />
          <SmallText x={128} y={82}>{label(schema, 3, "alpha / 2")}</SmallText>
          <SmallText x={346} y={82}>{label(schema, 4, "alpha")}</SmallText>
          <SmallText x={440} y={82}>{label(schema, 4, "alpha")}</SmallText>
        </SvgFrame>
      );

    default:
      return assertNever(schema.variant);
  }
}

export default function TheorySchemaView({ schema }: { schema: TheorySchema }) {
  return (
    <figure className="theory-schema">
      <div className="theory-schema__figure">{renderGraphic(schema)}</div>
      <figcaption className="theory-schema__caption">
        <strong>{schema.title}</strong>
        <span>{schema.description}</span>
      </figcaption>
    </figure>
  );
}
