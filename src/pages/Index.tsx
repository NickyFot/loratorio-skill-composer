import React, { useState } from "react";
import { FileText, ExternalLink, Github, ChevronLeft, ChevronRight } from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LabelList
} from "recharts";

// Image imports
import methodOverview from "@/assets/method-overview.png";
import recenter from "@/assets/recenter.png";
import qualitativeAnime from "@/assets/qualitative-anime.png";
import qualitativeRealistic from "@/assets/qualitative-realistic.png";
import qualitativeFlux1 from "@/assets/qualitative-flux1.png";
import qualitativeFlux2 from "@/assets/qualitative-flux2.png";

// Chart Data
const qualityData = [
  {
    metric: "Composition Quality",
    LoRAtorio: 7.55,
    Merge: 7.04,
    Compose: 6.72,
    Switch: 7.22,
    CMLoRA: 5.7,
  },
  {
    metric: "Image Quality",
    LoRAtorio: 9.19,
    Merge: 8.82,
    Compose: 8.99,
    Switch: 9.13,
    CMLoRA: 8.44,
  },
];

const winRateData = [
  { opponent: "Switch", Win: 48.72, Tie: 12.82, Lose: 38.46 },
  { opponent: "Composite", Win: 58.97, Tie: 15.38, Lose: 25.64 },
  { opponent: "Merge", Win: 56.41, Tie: 12.82, Lose: 30.77 },
  { opponent: "CMLoRA", Win: 76.92, Tie: 7.69, Lose: 15.38 },
];

const Index = () => {
  // Carousel State
  const [currentSlide, setCurrentSlide] = useState(0);

  const carouselSlides = [
    {
      src: qualitativeAnime,
      caption:
        "Images generated with N LoRA candidates across LoRAtorio and baseline methods using SD1.5 on the anime subset of ComposLoRA.",
    },
    {
      src: qualitativeRealistic,
      caption:
        "Images generated with N LoRA candidates across LoRAtorio and baseline methods using SD1.5 on the reality subset of ComposLoRA.",
    },
    {
      src: qualitativeFlux1,
      caption:
        "Images generated with N LoRA candidates across LoRAtorio and baseline methods using the Flux base model.",
    },
    {
      src: qualitativeFlux2,
      caption: "Additional qualitative comparison using the Flux base model.",
    },
  ];

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % carouselSlides.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + carouselSlides.length) % carouselSlides.length);

  return (
    <div className="min-h-screen bg-background text-foreground font-sans">
      {/* Hero */}
      <section className="pt-16 pb-8 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight leading-tight mb-6">
            LoRAtorio: An Intrinsic Approach to LoRA Skill Composition
          </h1>
          <div className="text-lg mb-1 space-x-1">
            <AuthorLink name="Niki Foteinopoulou" sup="1" />
            <AuthorLink name="Ignas Budvytis" sup="2" />
            <AuthorLink name="Stephan Liwicki" sup="1" />
          </div>
          <p className="text-sm text-muted-foreground mb-1">
            <sup>1</sup>Cambridge Research Laboratory, Toshiba Europe &nbsp; <sup>2</sup>Independent Researcher
          </p>
          <p className="text-sm text-muted-foreground mb-8">arXiv 2025</p>

          <div className="flex flex-wrap justify-center gap-3 mb-12">
            <LinkButton href="https://arxiv.org/abs/2508.11624" icon={<FileText className="w-4 h-4" />} label="Paper" />
            <LinkButton href="https://arxiv.org/abs/2508.11624" icon={<ExternalLink className="w-4 h-4" />} label="arXiv" />
            <LinkButton href="#" icon={<Github className="w-4 h-4" />} label="Code (coming soon)" />
          </div>
        </div>
      </section>

      {/* Abstract */}
      <section className="py-12 px-4 bg-secondary/30">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-6">Abstract</h2>
          <div className="text-foreground/85 leading-relaxed text-justify space-y-4">
            <p>
              Low-Rank Adaptation (LoRA) has become a widely adopted technique in text-to-image diffusion models,
              enabling the personalisation of visual concepts such as characters, styles, and objects. However, existing
              approaches struggle to effectively compose multiple LoRA adapters, particularly in open-ended settings
              where the number and nature of required skills are not known in advance.
            </p>
            <p>
              In this work, we present <strong>LoRAtorio</strong>, a novel train-free framework for multi-LoRA composition
              that leverages intrinsic model behaviour. Our method is motivated by two key observations:
              (1) LoRA adapters trained on narrow domains produce unconditioned denoised outputs that diverge from
              the base model, and (2) when conditioned out of distribution, LoRA outputs show behaviour closer to
              the base model than when conditioned in distribution.
            </p>
            <p>
              Our method operates in the latent space by dividing it into spatial patches and computing cosine similarity
              between each patch's predicted noise and that of the base model. These similarities are used to construct
              a spatially-aware weight matrix, which guides a weighted aggregation of LoRA outputs. To address domain
              drift, we further propose a modification to classifier-free guidance that incorporates the base model's
              unconditional score into the composition. We extend this formulation to a dynamic module selection setting,
              enabling inference-time selection of relevant LoRA adapters from a large pool.
            </p>
            <p>
              LoRAtorio achieves state-of-the-art performance, showing up to a <strong>1.3% improvement in CLIPScore</strong> and
              up to <strong>76.92% win rate</strong> in GPT-4V pairwise evaluations, and generalises effectively to multiple
              latent diffusion models, including Flux.
            </p>
          </div>
        </div>
      </section>

      <Divider />

      {/* Contributions */}
      <section className="py-12 px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-8">Contributions</h2>
          <div className="space-y-4">
            <ContributionCard
              number="1"
              description={<span>We introduce <strong>LoRAtorio</strong>, a train-free and intrinsically guided approach for multi-LoRA composition in diffusion models, leveraging spatially-aware similarity to the base model.</span>}
            />
            <ContributionCard
              number="2"
              description={<span>Furthermore, we propose <strong>re-centering the unconditioned score</strong> in classifier-free guidance to address domain drift caused by personalisation training.</span>}
            />
            <ContributionCard
              number="3"
              description={<span>We extend the task of multi-LoRA composition to a <strong>dynamic module selection setting</strong>, where all LoRA adapters are loaded into the base model and selected at inference time based on intrinsic similarity.</span>}
            />
          </div>
        </div>
      </section>

      <Divider />

      {/* Method Overview */}
      <section className="py-12 px-4 bg-secondary/30">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-6">Method Overview</h2>

          <div className="mb-10">
            <img src={methodOverview} alt="LoRAtorio method overview" className="w-full rounded-lg" />
            <p className="text-sm text-muted-foreground text-center mt-3 max-w-3xl mx-auto">
              Overview of LoRAtorio. <em>Skill Composition</em> (left): At each denoising timestep, the conditional
              score from each LoRA is partitioned into spatial patches, compared to the base model via cosine similarity,
              and weighted using SoftMin to produce spatially-aware aggregation weights.
              <em> Re-Centering</em> (right): The base model's unconditional score is incorporated to mitigate domain drift.
            </p>
          </div>

          <div className="max-w-4xl mx-auto space-y-10 text-foreground/85 leading-relaxed">
            {/* Point 1: Composition */}
            <div className="pl-4 border-l-2 border-primary/40">
              <h3 className="text-lg font-semibold mb-2">1. Spatially-aware Skill Composition</h3>
              <p>
                At each denoising step, the conditional score from each LoRA is partitioned into <em>P</em> spatial patches.
                Each patch is compared to its corresponding patch in the base model's predicted noise using cosine similarity.
                The resulting similarity matrix is passed through a SoftMin function to produce a weight matrix <strong>Ω</strong>,
                assigning higher weights to patches that diverge more from the base model.
              </p>
            </div>

            {/* Point 2: Re-Centering (with image next to it) */}
            <div className="pl-4 border-l-2 border-primary/40">
              <div className="grid md:grid-cols-5 gap-6 items-center">
                <div className="md:col-span-3">
                  <h3 className="text-lg font-semibold mb-2">2. Re-Centering Guidance</h3>
                  <p className="mb-4">
                    When multiple LoRAs are activated simultaneously, their unconditional outputs can conflict due to semantic
                    incompatibility between the LoRA-specific data distributions. This mismatch introduces a "drift" in the
                    implied guidance trajectory.
                  </p>
                  <p>
                    To mitigate this, we propose "re-centering" by incorporating a weighted combination of the base model's
                    unconditional score and the aggregated LoRA score (λ=0.5). This ensures the final output remains grounded
                    in general knowledge and is not over-emphasising implausible regions.
                  </p>
                </div>
                <div className="md:col-span-2">
                  <img src={recenter} alt="Re-centering guidance visualisation" className="w-full max-w-xs mx-auto rounded-lg shadow-sm bg-white" />
                  <p className="text-xs text-muted-foreground text-center mt-2 leading-tight">
                    Visualisation of the re-centering effect on the unconditional noise score direction.
                  </p>
                </div>
              </div>
            </div>

            {/* Point 3: Dynamic Selection */}
            <div className="pl-4 border-l-2 border-primary/40">
              <h3 className="text-lg font-semibold mb-2">3. Dynamic Module Selection</h3>
              <p>
                We extend to a dynamic setting where all available LoRA adapters are loaded concurrently. The most relevant ones
                are selected at each timestep using a top-<em>k</em> hard masking step based on the intrinsic similarity metric,
                avoiding the semantic collapse typical of standard weight-merging in open-vocabulary scenarios.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Divider />

      {/* Results */}
      <section className="py-12 px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-10">Results</h2>

          {/* GPT-4V Charts via Recharts */}
          <div className="mb-16">
            <h3 className="text-xl font-semibold mb-4 text-center">GPT-4V Evaluation</h3>
            <p className="text-foreground/85 mb-8 text-center max-w-3xl mx-auto">
              LoRAtorio outperforms all baselines in both composition quality and image quality, achieving up to <strong>76.92% win rate</strong> in pairwise comparisons on the ComposLoRA testbed.
            </p>
            <div className="grid md:grid-cols-2 gap-12">
              
              {/* Quality Scores Bar Chart */}
              <div className="flex flex-col items-center w-full">
                <div className="w-full h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={qualityData}
                      margin={{ top: 20, right: 0, left: 0, bottom: 20 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                      <XAxis dataKey="metric" tick={{ fill: 'currentColor' }} tickLine={false} axisLine={{ stroke: '#e5e7eb' }} />
                      <YAxis domain={[5, 10]} tick={{ fill: 'currentColor' }} tickLine={false} axisLine={false} />
                      <Tooltip
                        cursor={{ fill: 'rgba(0,0,0,0.05)' }}
                        contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)' }}
                      />
                      <Legend wrapperStyle={{ paddingTop: '20px' }} />
                      <Bar dataKey="LoRAtorio" fill="#b5e48c" radius={[4, 4, 0, 0]}>
                         <LabelList dataKey="LoRAtorio" position="top" fill="currentColor" fontSize={12} />
                      </Bar>
                      <Bar dataKey="Merge" fill="#a2d2ff" radius={[4, 4, 0, 0]}>
                         <LabelList dataKey="Merge" position="top" fill="currentColor" fontSize={12} />
                      </Bar>
                      <Bar dataKey="Compose" fill="#cdb4db" radius={[4, 4, 0, 0]}>
                         <LabelList dataKey="Compose" position="top" fill="currentColor" fontSize={12} />
                      </Bar>
                      <Bar dataKey="Switch" fill="#ffc8dd" radius={[4, 4, 0, 0]}>
                         <LabelList dataKey="Switch" position="top" fill="currentColor" fontSize={12} />
                      </Bar>
                      <Bar dataKey="CMLoRA" fill="#ffb703" radius={[4, 4, 0, 0]}>
                         <LabelList dataKey="CMLoRA" position="top" fill="currentColor" fontSize={12} />
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
                <p className="text-sm text-muted-foreground mt-2 text-center">Composition and Image Quality against previous SoTA.</p>
              </div>

              {/* Win Rates Stacked Bar Chart */}
              <div className="flex flex-col items-center w-full">
                <div className="w-full h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={winRateData}
                      margin={{ top: 20, right: 0, left: 0, bottom: 20 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                      <XAxis dataKey="opponent" tick={{ fill: 'currentColor' }} tickLine={false} axisLine={{ stroke: '#e5e7eb' }} />
                      <YAxis domain={[0, 100]} tick={{ fill: 'currentColor' }} tickLine={false} axisLine={false} tickFormatter={(tick) => `${tick}%`} />
                      <Tooltip
                        cursor={{ fill: 'rgba(0,0,0,0.05)' }}
                        formatter={(value) => `${value}%`}
                        contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)' }}
                      />
                      <Legend wrapperStyle={{ paddingTop: '20px' }} />
                      <Bar dataKey="Win" stackId="a" fill="#b5e48c" />
                      <Bar dataKey="Tie" stackId="a" fill="#ffb703" />
                      <Bar dataKey="Lose" stackId="a" fill="#ffc8dd" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
                <p className="text-sm text-muted-foreground mt-2 text-center">Overall pairwise win rates against previous works.</p>
              </div>

            </div>
          </div>

          <Divider />

          {/* CLIPScore Tables */}
          <div className="grid md:grid-cols-2 gap-8 mb-16 mt-16">
            {/* Left Col: Static & Dynamic */}
            <div>
              <h3 className="text-lg font-semibold mb-3">CLIPScore (SD 1.5)</h3>
              <div className="overflow-x-auto mb-6">
                <table className="w-full text-sm border border-border rounded-lg overflow-hidden">
                  <thead>
                    <tr className="bg-secondary/50">
                      <th className="text-left py-2 px-3 font-semibold">Static</th>
                      <th className="text-center py-2 px-3 font-semibold">N=2</th>
                      <th className="text-center py-2 px-3 font-semibold">Avg.</th>
                    </tr>
                  </thead>
                  <tbody>
                    <ResultRow method="Merge" values={["33.73", "33.41"]} />
                    <ResultRow method="Composite" values={["35.07", "34.14"]} />
                    <ResultRow method="Switch" values={["35.39", "34.61"]} />
                    <ResultRow method="LoRAtorio" values={["35.24", "36.36"]} bold best={[false, true]} />
                  </tbody>
                </table>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-sm border border-border rounded-lg overflow-hidden">
                  <thead>
                    <tr className="bg-secondary/50">
                      <th className="text-left py-2 px-3 font-semibold">Dynamic</th>
                      <th className="text-center py-2 px-3 font-semibold">N=2</th>
                      <th className="text-center py-2 px-3 font-semibold">Avg.</th>
                    </tr>
                  </thead>
                  <tbody>
                    <ResultRow method="Merge" values={["27.17", "27.15"]} />
                    <ResultRow method="LoRAtorio" values={["34.59", "35.92"]} bold best={[true, true]} />
                  </tbody>
                </table>
              </div>
            </div>

            {/* Right Col: Flux */}
            <div>
              <h3 className="text-lg font-semibold mb-3">CLIPScore (Flux)</h3>
              <div className="overflow-x-auto mb-6">
                <table className="w-full text-sm border border-border rounded-lg overflow-hidden">
                  <thead>
                    <tr className="bg-secondary/50">
                      <th className="text-left py-2 px-3 font-semibold">Static</th>
                      <th className="text-center py-2 px-3 font-semibold">N=2</th>
                      <th className="text-center py-2 px-3 font-semibold">Avg.</th>
                    </tr>
                  </thead>
                  <tbody>
                    <ResultRow method="Naive" values={["33.13", "35.94"]} />
                    <ResultRow method="Merge" values={["33.73", "35.32"]} />
                    <ResultRow method="LoRAtorio" values={["33.99", "36.79"]} bold best={[true, true]} />
                  </tbody>
                </table>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-sm border border-border rounded-lg overflow-hidden">
                  <thead>
                    <tr className="bg-secondary/50">
                      <th className="text-left py-2 px-3 font-semibold">Dynamic</th>
                      <th className="text-center py-2 px-3 font-semibold">N=2</th>
                      <th className="text-center py-2 px-3 font-semibold">Avg.</th>
                    </tr>
                  </thead>
                  <tbody>
                    <ResultRow method="Merge" values={["25.85", "28.61"]} />
                    <ResultRow method="LoRAtorio" values={["33.28", "36.45"]} bold best={[true, true]} />
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <Divider />

          {/* Qualitative Comparisons Carousel */}
          <div className="mb-12 mt-16">
            <h3 className="text-2xl font-bold mb-8 text-center">Qualitative Comparisons</h3>

            <div className="relative max-w-4xl mx-auto group">
              {/* Image Container */}
              <div className="overflow-hidden rounded-xl border border-border bg-white shadow-sm flex items-center justify-center min-h-[400px]">
                <img
                  src={carouselSlides[currentSlide].src}
                  alt={`Qualitative comparison slide ${currentSlide + 1}`}
                  className="w-full object-contain max-h-[800px] transition-opacity duration-300"
                />
              </div>

              {/* Navigation Arrows */}
              <button
                onClick={prevSlide}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-background/80 hover:bg-background p-2 rounded-full shadow-md text-foreground opacity-0 group-hover:opacity-100 transition-opacity"
                aria-label="Previous image"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={nextSlide}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-background/80 hover:bg-background p-2 rounded-full shadow-md text-foreground opacity-0 group-hover:opacity-100 transition-opacity"
                aria-label="Next image"
              >
                <ChevronRight className="w-6 h-6" />
              </button>

              {/* Caption */}
              <div className="mt-4 text-center px-8">
                <p className="text-sm text-foreground/90">
                  {carouselSlides[currentSlide].caption}
                </p>

                {/* Dots indicator */}
                <div className="flex justify-center gap-2 mt-4">
                  {carouselSlides.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentSlide(idx)}
                      className={`w-2.5 h-2.5 rounded-full transition-colors ${idx === currentSlide ? "bg-primary" : "bg-muted-foreground/30"
                        }`}
                      aria-label={`Go to slide ${idx + 1}`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Divider />

      {/* Citation */}
      <section className="py-12 px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-6">BibTeX</h2>
          <pre className="bg-secondary/50 rounded-lg p-5 text-sm overflow-x-auto font-mono text-foreground/80 border border-border">
            {`@misc{foteinopoulou2025loratoriointrinsicapproachlora,
  title={LoRAtorio: An intrinsic approach to LoRA Skill Composition},
  author={Niki Foteinopoulou and Ignas Budvytis and Stephan Liwicki},
  year={2025},
  eprint={2508.11624},
  archivePrefix={arXiv},
  primaryClass={cs.CV},
  url={https://arxiv.org/abs/2508.11624},
}`}
          </pre>
        </div>
      </section>

      <footer className="py-8 px-4 text-center text-sm text-muted-foreground border-t border-border">
        <p>
          This website template is borrowed from{" "}
          <a
            href="https://nerfies.github.io"
            className="text-primary hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Nerfies
          </a>
          .
        </p>
      </footer>
    </div>
  );
};

/* Helper components */

const AuthorLink = ({ name, sup }: { name: string; sup: string }) => (
  <span className="text-primary font-medium">
    {name}
    <sup>{sup}</sup>
  </span>
);

const ContributionCard = ({ number, description }: { number: string; description: React.ReactNode }) => (
  <div className="p-4 rounded-lg border border-border bg-secondary/30 flex items-start gap-4">
    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 text-primary font-bold flex items-center justify-center mt-0.5">
      {number}
    </div>
    <div className="text-foreground/90 leading-relaxed pt-1">
      {description}
    </div>
  </div>
);

const LinkButton = ({ href, icon, label }: { href: string; icon: React.ReactNode; label: string }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-foreground text-background text-sm font-semibold hover:opacity-85 transition-opacity shadow-sm"
  >
    {icon}
    {label}
  </a>
);

const Divider = () => (
  <div className="max-w-4xl mx-auto px-4">
    <hr className="border-border/60" />
  </div>
);

const ResultRow = ({
  method,
  values,
  bold,
  best,
  underline,
}: {
  method: string;
  values: string[];
  bold?: boolean;
  best?: boolean[];
  underline?: boolean;
}) => (
  <tr className={`border-t border-border ${bold ? "bg-primary/5" : ""}`}>
    <td
      className={`py-2 px-3 font-medium ${bold
          ? "font-bold text-primary"
          : underline
            ? "text-foreground underline"
            : "text-foreground"
        }`}
    >
      {method}
    </td>
    {values.map((v, i) => (
      <td
        key={i}
        className={`py-2 px-3 text-center ${bold && best?.[i]
            ? "font-bold text-primary"
            : bold
              ? "text-foreground"
              : underline
                ? "text-muted-foreground underline decoration-muted-foreground/40"
                : "text-muted-foreground"
          }`}
      >
        {v}
      </td>
    ))}
  </tr>
);

export default Index;
