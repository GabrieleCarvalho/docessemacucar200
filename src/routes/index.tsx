import { createFileRoute } from '@tanstack/react-router';
import { useState } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { ArrowRight, BookOpen, Check, ChefHat, Download, Heart, Leaf, LockKeyhole, Plus, Smartphone, Sparkles, UtensilsCrossed } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { product, formatPrice } from '@/lib/product';
import hero from '@/assets/dessert_hero.jpg';
import cover from '@/assets/ebook_cover.jpg';
import cake from '@/assets/dessert_cake.jpg';
import mousse from '@/assets/dessert_mousse.jpg';
import brigadeiro from '@/assets/dessert_brigadeiro.jpg';

export const Route = createFileRoute('/')({
  head: () => ({ meta: [
    { title: '200 Sobremesas Zero Açúcar | Seu momento doce, reinventado' },
    { name: 'description', content: 'Descubra 200 receitas de sobremesas sem açúcar. Brigadeiros, mousses, bolos e muito mais em um e-book digital por R$ 24,90.' },
    { property: 'og:title', content: '200 Sobremesas Zero Açúcar | E-book de receitas' },
    { property: 'og:description', content: '200 maneiras de adoçar sua rotina. Conheça o e-book digital de receitas sem açúcar.' },
    { property: 'og:type', content: 'website' }, { name: 'twitter:card', content: 'summary_large_image' },
  ] }),
  component: SalesPage,
});

const questions = [
  ['O que eu vou receber?', 'Você recebe o produto digital 200 Sobremesas Zero Açúcar, com 200 receitas de doces e sobremesas para consultar no celular, tablet ou computador. Nenhum livro físico será enviado.'],
  ['Como recebo o meu e-book?', 'Após a confirmação do pagamento, o acesso é enviado por e-mail. Você poderá acessar o produto digital para consultar as receitas no celular, tablet ou computador.'],
  ['Posso imprimir as receitas?', 'Sim. Você pode consultar as receitas do produto digital na tela ou imprimir suas favoritas para usar na cozinha.'],
  ['As receitas servem para quem faz low carb?', 'O e-book é voltado a quem busca sobremesas sem açúcar, inclusive no contexto low carb. Verifique os ingredientes e as porções de cada receita para saber se ela se encaixa no seu plano alimentar.'],
  ['Quem tem diabetes pode usar o e-book?', 'Receitas sem açúcar não são necessariamente livres de carboidratos. Quem tem diabetes deve avaliar ingredientes e porções com seu médico ou nutricionista. O e-book não substitui acompanhamento profissional.'],
  ['Preciso saber cozinhar?', 'Você pode escolher entre diferentes tipos de sobremesas e começar pelas preparações com as quais já tem familiaridade. Leia a receita completa antes de preparar.'],
];

function BookMockup({ phone = false }: { phone?: boolean }) {
  return <div className={phone ? 'mockup-group' : ''}>
    <div className="book"><img src={cover} alt="Capa personalizada do e-book 200 Sobremesas Zero Açúcar" width={1024} height={1536} loading="lazy" /></div>
    {phone && <><div className="phone"><img src={cover} alt="Visualização do e-book no celular" width={1024} height={1536} loading="lazy" /><div className="phone-bottom">Seu e-book, sempre com você</div></div><div className="format-label"><strong>200</strong><span>receitas em formato digital</span></div></>}
  </div>;
}

function SalesPage() {
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  function buy() { if (product.checkoutUrl) window.location.assign(product.checkoutUrl); else setCheckoutOpen(true); }
  return <>
    <div className="top-strip"><Sparkles size={13} /> Seu momento doce, com novas possibilidades. Conheça o e-book!</div>
    <header className="header wrap"><a href="#inicio" className="brand"><ChefHat className="brand-icon" size={31}/><span>Doce sem açúcar<small>RECEITAS PARA A SUA ROTINA</small></span></a><nav className="nav" aria-label="Navegação principal"><a href="#receitas">As receitas</a><a href="#duvidas">Dúvidas</a><Button variant="sales" asChild><a href="#oferta">Quero meu plano zero açúcar <ArrowRight /></a></Button></nav></header>
    <main>
      <section className="hero" id="inicio"><img className="hero-photo" src={hero} alt="Bolo de chocolate com morangos, mousse e brigadeiros" width={1536} height={1024} fetchPriority="high"/><div className="hero-inner wrap"><div><div className="eyebrow"><Leaf size={14}/> MAIS SABOR. NOVAS ESCOLHAS.</div><h1>200 Sobremesas<br/><span>Zero Açúcar</span></h1><p className="hero-copy">A vontade de doce chegou? Descubra novas formas de saborear suas sobremesas favoritas, sem açúcar e sem abrir mão do prazer.</p><ul className="check-list"><li><Check/> Brigadeiros, mousses, bolos, tortas e muito mais</li><li><Check/> 200 receitas para variar o seu momento doce</li><li><Check/> E-book digital para ler no celular ou imprimir</li></ul><Button variant="sales" size="lg" asChild><a href="#oferta">Quero meu plano zero açúcar <ArrowRight/></a></Button><p className="hero-price">Seu e-book completo por <strong>{formatPrice(product.price)}</strong> · pagamento único</p><div className="hero-security"><span><LockKeyhole/>Produto 100% digital</span><span><Download/>Acesso após o pagamento</span></div></div><BookMockup phone/></div></section>
      <div className="features-strip"><div className="features-grid wrap">{[[BookOpen,'200 receitas','Variedade para sua rotina'],[Leaf,'Zero açúcar','Novas formas de adoçar'],[Smartphone,'Leia onde quiser','Celular, tablet ou computador'],[Download,'Produto digital','Receba por e-mail']].map(([Icon,title,text]) => {const FeatureIcon=Icon as typeof BookOpen;return <div className="mini-feature" key={String(title)}><FeatureIcon/><div><strong>{String(title)}</strong><span>{String(text)}</span></div></div>})}</div></div>
      <section className="section wrap" id="receitas"><div className="section-heading"><div className="eyebrow">UMA RECEITA PARA CADA VONTADE</div><h2>Seus doces favoritos.<br/><span>Uma nova maneira de preparar.</span></h2><p>Do chocolate que abraça à sobremesa refrescante de domingo.<br/>Um universo de possibilidades para sair do “sempre a mesma coisa”.</p></div><div className="recipe-grid">{[['cake','Bolos e tortas','Para o café da tarde, um aniversário ou um momento só seu.'],['mousse','Mousses e gelados','Cremosos e refrescantes para adoçar os dias.'],['brigadeiro','Brigadeiros e docinhos','Aquele carinho em forma de doce que faz parte da nossa vida.']].map(([style,title,description])=><article className="recipe-card" key={title}><img src={style === 'cake' ? cake : style === 'mousse' ? mousse : brigadeiro} className={`recipe-photo ${style}`} alt={title} width={1536} height={1024} loading="lazy"/><div className="recipe-content"><h3>{title}</h3><p>{description}</p></div></article>)}</div><p className="recipe-note">Imagens ilustrativas. O resultado varia conforme os ingredientes e o preparo.</p></section>
      <section className="benefit-band"><div className="section wrap benefit-layout"><img className="benefit-image" src={hero} alt="Sobremesas para inspirar seu próximo momento na cozinha" width={1536} height={1024} loading="lazy"/><div><div className="eyebrow">UM MOMENTO DOCE TAMBÉM É SEU</div><h2>Mais opções na cozinha.<br/><span>Mais prazer à mesa.</span></h2><p className="body-copy">Cuidar da alimentação não precisa significar esquecer tudo o que você gosta. Comece explorando outras formas de preparar seus doces.</p>{[[Heart,'Para quem busca novas escolhas','Uma coleção para quem quer reduzir o açúcar na rotina sem deixar as sobremesas de lado.'],[UtensilsCrossed,'Variedade de verdade','São 200 opções para experimentar e encontrar as suas favoritas.'],[Smartphone,'Sempre à mão','Consulte o e-book no celular ou imprima as receitas que quiser levar para a cozinha.']].map(([Icon,title,text])=>{const BenefitIcon=Icon as typeof Heart;return <div className="benefit-item" key={String(title)}><div className="icon-tile"><BenefitIcon/></div><div><h3>{String(title)}</h3><p>{String(text)}</p></div></div>})}</div></div></section>
      <section className="offer-band" id="oferta"><div className="section wrap"><div className="offer-layout"><div className="offer-visual"><BookMockup/><p>Uma coleção digital. Centenas de possibilidades.</p></div><div className="offer-content"><div className="eyebrow"><Sparkles size={14}/> SUA PRÓXIMA SOBREMESA COMEÇA AQUI</div><h2>Leve as <span>200 receitas</span><br/>para a sua cozinha.</h2><ul className="check-list"><li><Check/> E-book digital completo</li><li><Check/> 200 receitas de sobremesas sem açúcar</li><li><Check/> Leia no celular, tablet ou computador</li><li><Check/> Imprima suas receitas favoritas</li><li><Check/> Acesso enviado por e-mail após o pagamento</li></ul><div className="price-label">Tudo isso por apenas</div><div className="price">{formatPrice(product.price)}</div><p className="one-payment">Pagamento único · Produto 100% digital</p><Button variant="purchase" onClick={buy}>Quero meu plano zero açúcar <ArrowRight/></Button><div className="offer-note"><LockKeyhole/> Após a confirmação do pagamento, o acesso é enviado por e-mail.</div></div></div></div></section>
      <section className="section wrap" id="duvidas"><div className="section-heading"><div className="eyebrow">ANTES DE COMEÇAR</div><h2>Ficou com alguma <span>dúvida?</span></h2></div><div className="faq">{questions.map(([question,answer])=><details key={question}><summary>{question}<Plus/></summary><p>{answer}</p></details>)}</div></section>
      <section className="closing"><h2>O próximo momento doce pode ser diferente.</h2><Button variant="sales" asChild><a href="#oferta">Quero conhecer as 200 receitas <ArrowRight/></a></Button></section>
    </main>
    <footer className="footer"><div className="wrap"><div className="footer-top"><div className="brand"><ChefHat className="brand-icon" size={27}/><span>Doce sem açúcar<small>RECEITAS PARA A SUA ROTINA</small></span></div><span>200 Sobremesas Zero Açúcar · E-book digital</span></div><p className="disclaimer">Este material é um livro de receitas, não uma orientação médica ou nutricional. Receitas sem açúcar podem conter carboidratos. Se você tem diabetes ou segue uma dieta específica, avalie ingredientes e porções com um profissional de saúde. Não há promessa de emagrecimento. Imagens e mockups ilustrativos; não há envio de livro físico.</p></div></footer>
    <Dialog.Root open={checkoutOpen} onOpenChange={setCheckoutOpen}><Dialog.Portal><Dialog.Overlay className="modal-overlay"/><Dialog.Content className="modal-content"><Dialog.Title>As vendas ainda não estão abertas</Dialog.Title><Dialog.Description>O pagamento deste e-book ainda não está disponível nesta página. Volte em breve para conferir a liberação.</Dialog.Description><Dialog.Close asChild><Button variant="sales">Entendi</Button></Dialog.Close></Dialog.Content></Dialog.Portal></Dialog.Root>
  </>;
}
