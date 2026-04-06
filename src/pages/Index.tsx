import { FileText, ExternalLink, Github } from "lucide-react";
import methodOverview from "@/assets/method-overview.png";
import qualitativeAnime from "@/assets/qualitative-anime.png";
import qualitativeRealistic from "@/assets/qualitative-realistic.png";
import qualitativeFlux1 from "@/assets/qualitative-flux1.png";
import qualitativeFlux2 from "@/assets/qualitative-flux2.png";
import recenter from "@/assets/recenter.png";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <section className="pt-16 pb-8 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground leading-tight mb-6">
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
      <section className="py-12 px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-6 text-foreground">Abstract</h2>
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

      {/* Key Insights */}
      <section className="py-12 px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-8 text-foreground">Key Insights</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <InsightCard number="1" title="Domain Drift in Unconditional Outputs" description="LoRA adapters trained on narrow domains produce unconditional noise estimates that diverge from the base model's distribution, introducing bias into classifier-free guidance." />
            <InsightCard number="2" title="Out-of-Distribution Alignment" description="When conditioned outside their training distribution, LoRA outputs remain close to the base model — enabling similarity-based confidence estimation at the patch level." />
            <InsightCard number="3" title="Spatially-Aware Composition" description="By dividing the latent space into patches and using cosine similarity as a proxy for LoRA confidence, we construct spatially-aware weight matrices for fine-grained aggregation." />
            <InsightCard number="4" title="Dynamic Module Selection" description="All available LoRAs can be loaded simultaneously and the most relevant ones are selected ad-hoc at inference time — where standard merging collapses into non-sensical outputs." />
          </div>
        </div>
      </section>

      <Divider />

      {/* Method Overview */}
      <section className="py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-6 text-foreground">Method Overview</h2>
          <div className="mb-8">
            <img src={methodOverview} alt="LoRAtorio method overview" className="w-full" />
            <p className="text-sm text-muted-foreground text-center mt-3">
              <strong>Figure 3:</strong> Overview of LoRAtorio. <em>Skill Composition</em> (left): At each denoising timestep, the conditional
              score from each LoRA is partitioned into spatial patches, compared to the base model via cosine similarity,
              and weighted using SoftMin to produce spatially-aware aggregation weights Ω.
              <em> Re-Centering</em> (right): The base model's unconditional score is incorporated to mitigate domain drift in classifier-free guidance.
            </p>
          </div>

          <div className="mb-8">
            <img src={recenter} alt="Re-centering guidance visualisation" className="w-full max-w-2xl mx-auto" />
            <p className="text-sm text-muted-foreground text-center mt-3">
              <strong>Figure 4:</strong> Visualisation of re-centering guidance on the unconditional noise score. Re-centering ensures
              p(x|c) is not over-emphasising implausible regions of the collective data distribution after CFG.
            </p>
          </div>

          <div className="max-w-3xl mx-auto space-y-6 text-foreground/85 leading-relaxed">
            <div className="pl-4 border-l-2 border-primary/40">
              <h3 className="font-semibold text-foreground mb-1">Spatially-aware Skill Composition</h3>
              <p>
                At each denoising step, the conditional score from each LoRA is partitioned into <em>P</em> spatial patches.
                Each patch is compared to its corresponding patch in the base model's predicted noise using cosine similarity.
                The resulting similarity matrix is passed through a SoftMin function to produce a weight matrix <strong>Ω</strong>,
                assigning higher weights to patches that diverge more from the base model.
              </p>
            </div>
            <div className="pl-4 border-l-2 border-primary/40">
              <h3 className="font-semibold text-foreground mb-1">Re-Centering Guidance</h3>
              <p>
                When multiple LoRAs are activated, their unconditional outputs can conflict due to semantic incompatibility.
                We propose "re-centering" by incorporating a weighted combination of the base model's unconditional score
                and the aggregated LoRA score (λ=0.5), ensuring the output remains grounded in general knowledge.
              </p>
            </div>
            <div className="pl-4 border-l-2 border-primary/40">
              <h3 className="font-semibold text-foreground mb-1">Dynamic Module Selection</h3>
              <p>
                We extend to a dynamic setting where all available LoRA adapters are loaded and the most relevant ones
                are selected at each timestep using a top-<em>k</em> gating mechanism based on the similarity metric.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Divider />

      {/* Results */}
      <section className="py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-10 text-foreground">Results</h2>

          {/* CLIPScore - Static */}
          <div className="max-w-3xl mx-auto mb-12">
            <h3 className="text-xl font-semibold mb-4 text-foreground">CLIPScore — Static Modules (ComposLoRA)</h3>
            <p className="text-foreground/85 mb-4">
              LoRAtorio outperforms previous SoTA, peaking at N=4 where it exceeds previous best by over 1%.
            </p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border border-border rounded-lg overflow-hidden">
                <thead>
                  <tr className="bg-section">
                    <th className="text-left py-3 px-4 font-semibold text-foreground">Method</th>
                    <th className="text-center py-3 px-4 font-semibold text-foreground">N=2</th>
                    <th className="text-center py-3 px-4 font-semibold text-foreground">N=3</th>
                    <th className="text-center py-3 px-4 font-semibold text-foreground">N=4</th>
                    <th className="text-center py-3 px-4 font-semibold text-foreground">N=5</th>
                    <th className="text-center py-3 px-4 font-semibold text-foreground">Avg.</th>
                  </tr>
                </thead>
                <tbody>
                  <ResultRow method="Naive" values={["35.01", "34.93", "34.38", "33.81", "34.53"]} />
                  <ResultRow method="Merge" values={["33.73", "34.14", "33.40", "32.36", "33.41"]} />
                  <ResultRow method="Switch" values={["35.39", "35.11", "34.48", "33.48", "34.61"]} />
                  <ResultRow method="Composite" values={["35.07", "34.08", "34.80", "32.58", "34.14"]} />
                  <ResultRow method="LoraHub" values={["35.68", "35.13", "34.97", "33.49", "34.82"]} />
                  <ResultRow method="Switch-A" values={["35.45", "35.38", "34.88", "33.37", "34.77"]} />
                  <ResultRow method="CMLoRA" values={["35.42", "35.22", "35.21", "34.34", "35.05"]} />
                  <ResultRow method="MultLFG" values={["36.57", "36.13", "36.18", "35.92", "36.20"]} underline />
                  <ResultRow method="LoRAtorio" values={["35.24", "36.43", "37.14", "36.63", "36.36"]} bold best={[false, true, true, true, true]} />
                </tbody>
              </table>
            </div>
            <p className="text-xs text-muted-foreground mt-2 text-center">Table 1: CLIPScore on ComposLoRA. Bold = best, underline = second best.</p>
          </div>

          {/* CLIPScore - Dynamic */}
          <div className="max-w-3xl mx-auto mb-12">
            <h3 className="text-xl font-semibold mb-4 text-foreground">CLIPScore — Dynamic Module Selection (ComposLoRA)</h3>
            <p className="text-foreground/85 mb-4">
              In the dynamic setting where all LoRAs are loaded, Merge collapses into non-sensical outputs while LoRAtorio maintains strong performance.
            </p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border border-border rounded-lg overflow-hidden">
                <thead>
                  <tr className="bg-section">
                    <th className="text-left py-3 px-4 font-semibold text-foreground">Method</th>
                    <th className="text-center py-3 px-4 font-semibold text-foreground">N=2</th>
                    <th className="text-center py-3 px-4 font-semibold text-foreground">N=3</th>
                    <th className="text-center py-3 px-4 font-semibold text-foreground">N=4</th>
                    <th className="text-center py-3 px-4 font-semibold text-foreground">N=5</th>
                    <th className="text-center py-3 px-4 font-semibold text-foreground">Avg.</th>
                  </tr>
                </thead>
                <tbody>
                  <ResultRow method="Naive" values={["35.01", "34.93", "34.38", "33.81", "34.53"]} />
                  <ResultRow method="Merge" values={["27.17", "27.15", "27.02", "27.27", "27.15"]} />
                  <ResultRow method="LoRAtorio" values={["34.59", "35.56", "36.48", "37.03", "35.92"]} bold best={[false, true, true, true, true]} />
                </tbody>
              </table>
            </div>
            <p className="text-xs text-muted-foreground mt-2 text-center">Table 3: CLIPScore in dynamic module selection setting.</p>
          </div>

          {/* Flux CLIPScore */}
          <div className="max-w-3xl mx-auto mb-12">
            <h3 className="text-xl font-semibold mb-4 text-foreground">CLIPScore — Flux Architecture</h3>
            <p className="text-foreground/85 mb-4">
              LoRAtorio generalises to Rectified Flow architectures. On Flux 1.D, it significantly outperforms baselines
              in both static and dynamic settings, with consistent improvement as N increases.
            </p>

            <p className="text-sm font-medium text-foreground mb-2">Static Modules</p>
            <div className="overflow-x-auto mb-4">
              <table className="w-full text-sm border border-border rounded-lg overflow-hidden">
                <thead>
                  <tr className="bg-section">
                    <th className="text-left py-3 px-4 font-semibold text-foreground">Method</th>
                    <th className="text-center py-3 px-4 font-semibold text-foreground">N=2</th>
                    <th className="text-center py-3 px-4 font-semibold text-foreground">N=3</th>
                    <th className="text-center py-3 px-4 font-semibold text-foreground">N=4</th>
                    <th className="text-center py-3 px-4 font-semibold text-foreground">N=5</th>
                    <th className="text-center py-3 px-4 font-semibold text-foreground">Avg.</th>
                  </tr>
                </thead>
                <tbody>
                  <ResultRow method="Naive" values={["33.13", "35.00", "37.05", "38.57", "35.94"]} />
                  <ResultRow method="Merge" values={["33.73", "35.13", "35.83", "36.59", "35.32"]} />
                  <ResultRow method="LoRAtorio" values={["33.99", "36.03", "37.78", "39.37", "36.79"]} bold best={[true, true, true, true, true]} />
                </tbody>
              </table>
            </div>

            <p className="text-sm font-medium text-foreground mb-2">Dynamic Module Selection</p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border border-border rounded-lg overflow-hidden">
                <thead>
                  <tr className="bg-section">
                    <th className="text-left py-3 px-4 font-semibold text-foreground">Method</th>
                    <th className="text-center py-3 px-4 font-semibold text-foreground">N=2</th>
                    <th className="text-center py-3 px-4 font-semibold text-foreground">N=3</th>
                    <th className="text-center py-3 px-4 font-semibold text-foreground">N=4</th>
                    <th className="text-center py-3 px-4 font-semibold text-foreground">N=5</th>
                    <th className="text-center py-3 px-4 font-semibold text-foreground">Avg.</th>
                  </tr>
                </thead>
                <tbody>
                  <ResultRow method="Naive" values={["33.13", "35.00", "37.05", "38.57", "35.94"]} />
                  <ResultRow method="Merge" values={["25.85", "27.86", "29.73", "31.00", "28.61"]} />
                  <ResultRow method="LoRAtorio" values={["33.28", "35.75", "37.91", "38.86", "36.45"]} bold best={[false, true, true, true, true]} />
                </tbody>
              </table>
            </div>
            <p className="text-xs text-muted-foreground mt-2 text-center">Table 4: CLIPScore on Flux architecture.</p>
          </div>

          {/* GPT-4V Evaluation */}
          <div className="max-w-3xl mx-auto mb-12">
            <h3 className="text-xl font-semibold mb-4 text-foreground">GPT-4V Evaluation</h3>
            <p className="text-foreground/85 mb-4">
              LoRAtorio outperforms all baselines in both composition quality and image quality, achieving up to <strong>76.92% win rate</strong> in pairwise comparisons.
            </p>
            <div className="overflow-x-auto mb-4">
              <table className="w-full text-sm border border-border rounded-lg overflow-hidden">
                <thead>
                  <tr className="bg-section">
                    <th className="text-left py-3 px-4 font-semibold text-foreground">Metric</th>
                    <th className="text-center py-3 px-4 font-semibold text-primary">LoRAtorio</th>
                    <th className="text-center py-3 px-4 font-semibold text-foreground">Switch</th>
                    <th className="text-center py-3 px-4 font-semibold text-foreground">Composite</th>
                    <th className="text-center py-3 px-4 font-semibold text-foreground">Merge</th>
                    <th className="text-center py-3 px-4 font-semibold text-foreground">CMLoRA</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-t border-border">
                    <td className="py-3 px-4 font-medium text-foreground">Composition Quality</td>
                    <td className="py-3 px-4 text-center font-bold text-primary">7.55</td>
                    <td className="py-3 px-4 text-center text-muted-foreground">7.22</td>
                    <td className="py-3 px-4 text-center text-muted-foreground">6.72</td>
                    <td className="py-3 px-4 text-center text-muted-foreground">7.04</td>
                    <td className="py-3 px-4 text-center text-muted-foreground">5.70</td>
                  </tr>
                  <tr className="border-t border-border">
                    <td className="py-3 px-4 font-medium text-foreground">Image Quality</td>
                    <td className="py-3 px-4 text-center font-bold text-primary">9.19</td>
                    <td className="py-3 px-4 text-center text-muted-foreground">9.13</td>
                    <td className="py-3 px-4 text-center text-muted-foreground">8.99</td>
                    <td className="py-3 px-4 text-center text-muted-foreground">8.82</td>
                    <td className="py-3 px-4 text-center text-muted-foreground">8.44</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Win rates */}
            <p className="text-sm font-medium text-foreground mb-3">Pairwise Win Rates</p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border border-border rounded-lg overflow-hidden">
                <thead>
                  <tr className="bg-section">
                    <th className="text-left py-3 px-4 font-semibold text-foreground">vs.</th>
                    <th className="text-center py-3 px-4 font-semibold text-foreground">Win</th>
                    <th className="text-center py-3 px-4 font-semibold text-foreground">Tie</th>
                    <th className="text-center py-3 px-4 font-semibold text-foreground">Lose</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-t border-border">
                    <td className="py-3 px-4 font-medium text-foreground">vs. Switch</td>
                    <td className="py-3 px-4 text-center font-semibold text-primary">48.72%</td>
                    <td className="py-3 px-4 text-center text-muted-foreground">12.82%</td>
                    <td className="py-3 px-4 text-center text-muted-foreground">38.46%</td>
                  </tr>
                  <tr className="border-t border-border">
                    <td className="py-3 px-4 font-medium text-foreground">vs. Composite</td>
                    <td className="py-3 px-4 text-center font-semibold text-primary">58.97%</td>
                    <td className="py-3 px-4 text-center text-muted-foreground">15.38%</td>
                    <td className="py-3 px-4 text-center text-muted-foreground">25.64%</td>
                  </tr>
                  <tr className="border-t border-border">
                    <td className="py-3 px-4 font-medium text-foreground">vs. Merge</td>
                    <td className="py-3 px-4 text-center font-semibold text-primary">56.41%</td>
                    <td className="py-3 px-4 text-center text-muted-foreground">12.82%</td>
                    <td className="py-3 px-4 text-center text-muted-foreground">30.77%</td>
                  </tr>
                  <tr className="border-t border-border">
                    <td className="py-3 px-4 font-medium text-foreground">vs. CMLoRA</td>
                    <td className="py-3 px-4 text-center font-semibold text-primary">76.92%</td>
                    <td className="py-3 px-4 text-center text-muted-foreground">7.69%</td>
                    <td className="py-3 px-4 text-center text-muted-foreground">15.38%</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-xs text-muted-foreground mt-2 text-center">Figure 5: GPT-4V evaluation on ComposLoRA.</p>
          </div>

          {/* Human Evaluation */}
          <div className="max-w-3xl mx-auto mb-12">
            <h3 className="text-xl font-semibold mb-4 text-foreground">Human Evaluation</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border border-border rounded-lg overflow-hidden">
                <thead>
                  <tr className="bg-section">
                    <th className="text-left py-3 px-4 font-semibold text-foreground">Method</th>
                    <th className="text-center py-3 px-4 font-semibold text-foreground">Element Integration</th>
                    <th className="text-center py-3 px-4 font-semibold text-foreground">Spatial Consistency</th>
                    <th className="text-center py-3 px-4 font-semibold text-foreground">Semantic Accuracy</th>
                    <th className="text-center py-3 px-4 font-semibold text-foreground">Aesthetic Quality</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-t border-border bg-primary/5">
                    <td className="py-3 px-4 font-bold text-primary">LoRAtorio</td>
                    <td className="py-3 px-4 text-center font-bold text-primary">7.64</td>
                    <td className="py-3 px-4 text-center font-bold text-primary">7.58</td>
                    <td className="py-3 px-4 text-center font-bold text-primary">7.33</td>
                    <td className="py-3 px-4 text-center font-bold text-primary">6.83</td>
                  </tr>
                  <tr className="border-t border-border">
                    <td className="py-3 px-4 font-medium text-foreground">Switch</td>
                    <td className="py-3 px-4 text-center text-muted-foreground">7.57</td>
                    <td className="py-3 px-4 text-center text-muted-foreground">7.50</td>
                    <td className="py-3 px-4 text-center text-muted-foreground">6.88</td>
                    <td className="py-3 px-4 text-center text-muted-foreground">6.71</td>
                  </tr>
                  <tr className="border-t border-border">
                    <td className="py-3 px-4 font-medium text-foreground">Merge</td>
                    <td className="py-3 px-4 text-center text-muted-foreground">6.83</td>
                    <td className="py-3 px-4 text-center text-muted-foreground">6.71</td>
                    <td className="py-3 px-4 text-center text-muted-foreground">6.58</td>
                    <td className="py-3 px-4 text-center text-muted-foreground">6.08</td>
                  </tr>
                  <tr className="border-t border-border">
                    <td className="py-3 px-4 font-medium text-foreground">Composite</td>
                    <td className="py-3 px-4 text-center text-muted-foreground">6.46</td>
                    <td className="py-3 px-4 text-center text-muted-foreground">6.71</td>
                    <td className="py-3 px-4 text-center text-muted-foreground">6.71</td>
                    <td className="py-3 px-4 text-center text-muted-foreground">6.46</td>
                  </tr>
                  <tr className="border-t border-border">
                    <td className="py-3 px-4 font-medium text-foreground">CMLoRA</td>
                    <td className="py-3 px-4 text-center text-muted-foreground">5.63</td>
                    <td className="py-3 px-4 text-center text-muted-foreground">5.58</td>
                    <td className="py-3 px-4 text-center text-muted-foreground">6.08</td>
                    <td className="py-3 px-4 text-center text-muted-foreground">5.25</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-xs text-muted-foreground mt-2 text-center">Table 2: Human expert evaluation across four qualitative axes.</p>
          </div>

          {/* Qualitative Comparisons */}
          <div className="mb-12">
            <h3 className="text-xl font-semibold mb-6 text-foreground text-center">Qualitative Comparisons</h3>

            <div className="mb-8">
              <img src={qualitativeAnime} alt="Qualitative results on the anime subset of ComposLoRA" className="w-full rounded-lg shadow-sm border border-border" loading="lazy" />
              <p className="text-sm text-muted-foreground text-center mt-3">
                <strong>Figure 13:</strong> Images generated with N LoRA candidates across LoRAtorio and baseline methods using SD1.5 on the <em>anime</em> subset of ComposLoRA.
              </p>
            </div>

            <div className="mb-8">
              <img src={qualitativeRealistic} alt="Qualitative results on the reality subset of ComposLoRA" className="w-full rounded-lg shadow-sm border border-border" loading="lazy" />
              <p className="text-sm text-muted-foreground text-center mt-3">
                <strong>Figure 14:</strong> Images generated with N LoRA candidates across LoRAtorio and baseline methods using SD1.5 on the <em>reality</em> subset of ComposLoRA.
              </p>
            </div>

            <div className="mb-8">
              <img src={qualitativeFlux1} alt="Qualitative results on Flux model" className="w-full rounded-lg shadow-sm border border-border" loading="lazy" />
              <p className="text-sm text-muted-foreground text-center mt-3">
                <strong>Figure 15:</strong> Images generated with N LoRA candidates across LoRAtorio and baseline methods using <em>Flux</em> base model.
              </p>
            </div>

            <div className="mb-8">
              <img src={qualitativeFlux2} alt="Additional qualitative results on Flux model" className="w-full rounded-lg shadow-sm border border-border" loading="lazy" />
              <p className="text-sm text-muted-foreground text-center mt-3">
                <strong>Figure 16:</strong> Additional qualitative comparison using <em>Flux</em> base model.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Divider />

      {/* Citation */}
      <section className="py-12 px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-6 text-foreground">BibTeX</h2>
          <pre className="bg-section rounded-lg p-5 text-sm overflow-x-auto font-mono text-foreground/80 border border-border">
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
          <a href="https://nerfies.github.io" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">Nerfies</a>.
        </p>
      </footer>
    </div>
  );
};

/* Helper components */

const AuthorLink = ({ name, sup }: { name: string; sup: string }) => (
  <span className="text-primary">{name}<sup>{sup}</sup></span>
);

const InsightCard = ({ number, title, description }: { number: string; title: string; description: string }) => (
  <div className="p-5 rounded-lg border border-border bg-section">
    <div className="flex items-start gap-3">
      <span className="flex-shrink-0 w-7 h-7 rounded-full bg-primary text-primary-foreground text-sm font-bold flex items-center justify-center mt-0.5">{number}</span>
      <div>
        <h3 className="font-semibold text-foreground mb-1">{title}</h3>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
    </div>
  </div>
);

const LinkButton = ({ href, icon, label }: { href: string; icon: React.ReactNode; label: string }) => (
  <a href={href} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-foreground text-background text-sm font-medium hover:opacity-80 transition-opacity">
    {icon}{label}
  </a>
);

const Divider = () => (
  <div className="max-w-3xl mx-auto px-4"><hr className="border-border" /></div>
);

const ResultRow = ({ method, values, bold, best, underline }: { method: string; values: string[]; bold?: boolean; best?: boolean[]; underline?: boolean }) => (
  <tr className={`border-t border-border ${bold ? "bg-primary/5" : ""}`}>
    <td className={`py-3 px-4 font-medium ${bold ? "font-bold text-primary" : underline ? "text-foreground underline" : "text-foreground"}`}>{method}</td>
    {values.map((v, i) => (
      <td key={i} className={`py-3 px-4 text-center ${bold && best?.[i] ? "font-bold text-primary" : bold ? "text-foreground" : underline ? "text-muted-foreground underline decoration-muted-foreground/40" : "text-muted-foreground"}`}>{v}</td>
    ))}
  </tr>
);

export default Index;
