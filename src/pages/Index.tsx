import { FileText, ExternalLink, Github, Play, Download } from "lucide-react";
import methodOverview from "@/assets/method-overview.jpg";
import qualitativeRealistic from "@/assets/qualitative-realistic.jpg";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <section className="pt-16 pb-8 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground leading-tight mb-6">
            LoRAtorio: An Intrinsic Approach to LoRA Skill Composition
          </h1>
          <div className="text-lg text-muted-foreground mb-2">
            <span>Anonymous Authors</span>
          </div>
          <p className="text-sm text-muted-foreground mb-8">
            Preliminary work. Under review by ICML 2026
          </p>

          {/* Links */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            <LinkButton href="https://arxiv.org/abs/2412.05148" icon={<FileText className="w-4 h-4" />} label="Paper" />
            <LinkButton href="https://arxiv.org/abs/2412.05148" icon={<ExternalLink className="w-4 h-4" />} label="arXiv" />
            <LinkButton href="#" icon={<Github className="w-4 h-4" />} label="Code" />
            <LinkButton href="#" icon={<Play className="w-4 h-4" />} label="Demo" />
            <LinkButton href="#" icon={<Download className="w-4 h-4" />} label="Checkpoints" />
          </div>
        </div>
      </section>

      {/* Abstract */}
      <section className="py-12 px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-6 text-foreground">Abstract</h2>
          <div className="text-foreground/85 leading-relaxed text-justify space-y-4">
            <p>
              Low-Rank Adaptation (LoRA) is a staple for personalizing text-to-image diffusion models,
              yet composing multiple adapters remains a challenge, especially in open-ended settings.
              We present <strong>LoRAtorio</strong>, a novel train-free framework that leverages intrinsic
              model behavior to compose multiple LoRA skills.
            </p>
            <p>
              By analyzing latent space divergence, we construct spatially-aware weight matrices to guide
              the aggregation of LoRA outputs. Our method also introduces a <strong>re-centering</strong> modification
              to classifier-free guidance to address domain drift.
            </p>
            <p>
              LoRAtorio achieves state-of-the-art performance, showing a <strong>72.43% win rate</strong> in
              GPT-4V evaluations and effectively generalizing to multiple latent diffusion models,
              including Flux.
            </p>
          </div>
        </div>
      </section>

      <Divider />

      {/* Method Overview */}
      <section className="py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-6 text-foreground">Method Overview</h2>
          <div className="mb-8">
            <img
              src={methodOverview}
              alt="LoRAtorio method overview showing spatially-aware skill composition pipeline"
              className="w-full rounded-lg shadow-sm border border-border"
              width={1920}
              height={800}
            />
            <p className="text-sm text-muted-foreground text-center mt-3">
              Figure 1: Overview of the LoRAtorio framework. Multiple LoRA adapters are composed
              through spatially-aware weight maps derived from latent space divergence analysis.
            </p>
          </div>

          <div className="max-w-3xl mx-auto space-y-6 text-foreground/85 leading-relaxed">
            <p>
              <strong>LoRAtorio</strong> operates on two primary components:
            </p>
            <div className="space-y-4">
              <div className="pl-4 border-l-2 border-primary/40">
                <h3 className="font-semibold text-foreground mb-1">1. Spatially-aware Skill Composition</h3>
                <p>
                  At each denoising step, we divide the latent space into patches and compute the
                  cosine similarity between the LoRA-augmented model and the base model. Higher weights
                  are assigned to patches that diverge more, indicating higher LoRA confidence in that region.
                </p>
              </div>
              <div className="pl-4 border-l-2 border-primary/40">
                <h3 className="font-semibold text-foreground mb-1">2. Re-Centering Guidance</h3>
                <p>
                  To mitigate domain drift, we incorporate the base model's unconditional noise estimate
                  into the weighted average, ensuring the output remains grounded in general knowledge.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Divider />

      {/* Key Results */}
      <section className="py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-10 text-foreground">Key Results</h2>

          {/* Table */}
          <div className="max-w-2xl mx-auto mb-12">
            <h3 className="text-xl font-semibold mb-4 text-foreground">State-of-the-Art Performance</h3>
            <p className="text-foreground/85 mb-4">
              LoRAtorio outperforms existing methods like LoRA Switch, Composite, and Merge across
              both anime and realistic subsets.
            </p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border border-border rounded-lg overflow-hidden">
                <thead>
                  <tr className="bg-section">
                    <th className="text-left py-3 px-4 font-semibold text-foreground">Metric</th>
                    <th className="text-center py-3 px-4 font-semibold text-primary">LoRAtorio</th>
                    <th className="text-center py-3 px-4 font-semibold text-foreground">Switch</th>
                    <th className="text-center py-3 px-4 font-semibold text-foreground">Composite</th>
                    <th className="text-center py-3 px-4 font-semibold text-foreground">Merge</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-t border-border">
                    <td className="py-3 px-4 font-medium text-foreground">Composition Quality</td>
                    <td className="py-3 px-4 text-center font-bold text-primary">7.55</td>
                    <td className="py-3 px-4 text-center text-muted-foreground">7.22</td>
                    <td className="py-3 px-4 text-center text-muted-foreground">6.72</td>
                    <td className="py-3 px-4 text-center text-muted-foreground">7.04</td>
                  </tr>
                  <tr className="border-t border-border">
                    <td className="py-3 px-4 font-medium text-foreground">Image Quality</td>
                    <td className="py-3 px-4 text-center font-bold text-primary">9.19</td>
                    <td className="py-3 px-4 text-center text-muted-foreground">9.13</td>
                    <td className="py-3 px-4 text-center text-muted-foreground">8.99</td>
                    <td className="py-3 px-4 text-center text-muted-foreground">8.82</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-xs text-muted-foreground mt-2 text-center">
              Table 1: GPT-4V Average Scores across composition and image quality metrics.
            </p>
          </div>

          {/* Dynamic Module Selection */}
          <div className="max-w-3xl mx-auto mb-12">
            <h3 className="text-xl font-semibold mb-4 text-foreground">Dynamic Module Selection</h3>
            <p className="text-foreground/85">
              Our method enables "ad-hoc" selection of relevant LoRAs from a large pool at inference time,
              a scenario where standard weight merging often collapses into non-sensical outputs.
              LoRAtorio achieves a <strong>72.43% win rate</strong> against previous skill composition works
              in GPT-4V evaluations.
            </p>
          </div>

          {/* Qualitative */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold mb-4 text-foreground text-center">Qualitative Comparison</h3>
            <img
              src={qualitativeRealistic}
              alt="Qualitative comparison of LoRAtorio against baselines on realistic image generation"
              className="w-full rounded-lg shadow-sm border border-border"
              loading="lazy"
              width={1920}
              height={1024}
            />
            <p className="text-sm text-muted-foreground text-center mt-3">
              Figure 2: Qualitative results comparing LoRAtorio with baseline methods.
            </p>
          </div>
        </div>
      </section>

      <Divider />

      {/* Citation */}
      <section className="py-12 px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-6 text-foreground">BibTeX</h2>
          <pre className="bg-section rounded-lg p-5 text-sm overflow-x-auto font-mono text-foreground/80 border border-border">
{`@article{loratorio2026,
  title={LoRAtorio: An intrinsic approach to LoRA Skill Composition},
  author={Anonymous Authors},
  journal={Preliminary work. Under review by ICML 2026},
  year={2026}
}`}
          </pre>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 text-center text-sm text-muted-foreground border-t border-border">
        <p>
          This website template is borrowed from{" "}
          <a href="https://nerfies.github.io" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">
            Nerfies
          </a>.
        </p>
      </footer>
    </div>
  );
};

const LinkButton = ({ href, icon, label }: { href: string; icon: React.ReactNode; label: string }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-foreground text-background text-sm font-medium hover:opacity-80 transition-opacity"
  >
    {icon}
    {label}
  </a>
);

const Divider = () => (
  <div className="max-w-3xl mx-auto px-4">
    <hr className="border-border" />
  </div>
);

export default Index;
