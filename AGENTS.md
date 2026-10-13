<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

- Keep the sales page at the index route and commercial configuration in src/lib/product.ts so the offer and checkout destination have one source of truth.
- Keep sales-page visual styles in src/styles.css and use the shared Button component for actions so the page remains design-token compliant.
- Never simulate payment success or ebook delivery without a configured checkout and actual delivery integration.
- Meta Pixel is installed once in the root route via src/lib/meta-pixel.ts (no consent banner chosen). The pixel must stay blocked in consent regions (EU/EEA, UK, Switzerland) and whenever the region is unknown — do not load it unconditionally.
