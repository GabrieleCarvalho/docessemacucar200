import { createFileRoute } from '@tanstack/react-router';
import { useEffect, useState } from 'react';
import { trackProductEvent } from '@/lib/meta-pixel';
import * as Dialog from '@radix-ui/react-dialog';
import { ArrowRight, BookOpen, Check, ChefHat, Download, Heart, Leaf, LockKeyhole, Plus, Smartphone, Sparkles, UtensilsCrossed } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { product, formatPrice } from '@/lib/product';
import hero from '@/assets/dessert_hero.webp';
import tablet from '@/assets/tablet-desserts.webp';
import cover from '@/assets/ebook_cover.webp';
import cake from '@/assets/dessert_cake.webp';
import mousse from '@/assets/dessert_mousse.webp';
import brigadeiro from '@/assets/dessert_brigadeiro.webp';

export const Route = createFileRoute('/')({
  head: () => ({ meta: [
    { title: '200 Receitas de Doces Sem Açúcar | E-book digital' },
    { name: 'description', content: `Descubra 200 receitas de doces sem açúcar para preparar em casa. E-book digital para celular ou impressão, por ${formatPrice(product.price)}, com acesso por e-mail após o pagamento.` },
    { property: 'og:title', content: '200 Receitas de Doces Sem Açúcar | E-book digital' },
    { property: 'og:description', content: 'Brigadeiros, bolos, mousses e muito mais para variar seu momento doce. Conheça a coleção digital de 200 receitas.' },
    { property: 'og:url', content: 'https://docessemacucar200.lovable.app/' },
    { property: 'og:type', content: 'website' }, { name: 'twitter:card', content: 'summary_large_image' },
  ], links: [{ rel: 'canonical', href: 'https://docessemacucar200.lovable.app/' }] }),
  component: SalesPage,
});

const questions = [
  ['O que eu vou receber?', 'Você recebe o produto digital 200 Sobremesas Zero Açúcar, com 200 receitas de doces e sobremesas para consultar no celular, tablet ou computador. Nenhum livro físico será enviado.'],
  ['Como recebo o meu e-book?', 'Após a confirmação do pagamento, o acesso é enviado por e-mail. Você poderá acessar o produto digital para consultar as receitas no celular, tablet ou computador.'],
  ['Como funciona o pagamento?', 'A compra é realizada no checkout da Cakto. Confira as formas de pagamento, eventuais taxas e o valor total antes de concluir. O preço do e-book é R$ 24,90; as condições exibidas no checkout são as aplicáveis à compra.'],
  ['Posso imprimir as receitas?', 'Sim. Você pode consultar as receitas do produto digital na tela ou imprimir suas favoritas para usar na cozinha.'],
  ['As receitas servem para quem faz low carb?', 'O e-book é voltado a quem busca sobremesas sem açúcar, inclusive no contexto low carb. Verifique os ingredientes e as porções de cada receita para saber se ela se encaixa no seu plano alimentar.'],
  ['Quem tem diabetes pode usar o e-book?', 'Receitas sem açúcar não são necessariamente livres de carboidratos. Quem tem diabetes deve avaliar ingredientes e porções com seu médico ou nutricionista. O e-book não substitui acompanhamento profissional.'],
  ['Preciso saber cozinhar?', 'Você pode escolher entre diferentes tipos de sobremesas e começar pelas preparações com as quais já tem familiaridade. Leia a receita completa antes de preparar.'],
];

function BookMockup({ phone = false, priority = false }: { phone?: boolean; priority?: boolean }) {
  return <div className={phone ? 'mockup-group' : ''}>
    <div className="book"><img src={cover} alt="Capa personalizada do e-book 200 Sobremesas Zero Açúcar" width={978} height={1400} loading={priority ? 'eager' : 'lazy'} /></div>
    {phone && <><div className="phone"><img src={cover} alt="Visualização do e-book no celular" width={978} height={1400} loading={priority ? 'eager' : 'lazy'} /><div className="phone-bottom">Seu e-book, sempre com você</div></div><div className="format-label"><strong>200</strong><span>receitas<br/>digitais</span></div></>}
  </div>;
}

function SalesPage() {
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const eventData = { content_name: product.name, content_ids: ['200-sobremesas-zero-acucar'], content_type: 'product', value: product.price, currency: product.currency };
  useEffect(() => {
    function viewProduct() { trackProductEvent('ViewContent', { content_name: product.name, content_ids: ['200-sobremesas-zero-acucar'], content_type: 'product', value: product.price, currency: product.currency }); }
    viewProduct();
    window.addEventListener('meta-pixel-ready', viewProduct);
    return () => window.removeEventListener('meta-pixel-ready', viewProduct);
  }, []);
  function buy(event: React.MouseEvent<HTMLAnchorElement>) {
    if (!product.checkoutUrl) { event.preventDefault(); setCheckoutOpen(true); return; }
    trackProductEvent('InitiateCheckout', { ...eventData, num_items: 1 });
  }
  function PurchaseButton({ compact = false, offer = false }: { compact?: boolean; offer?: boolean }) {
    return <Button variant={offer ? 'purchase' : 'sales'} asChild><a href={product.checkoutUrl || '#oferta'} onClick={buy}>{compact ? 'Acessar receitas' : 'Quero acessar as 200 receitas'}<ArrowRight aria-hidden="true"/></a></Button>;
  }
  return <>
    <header className="reference-header"><div className="wrap header"><a href="#inicio" className="brand"><span>200 DOCES <em>ZERO AÇÚCAR</em></span></a><PurchaseButton compact/></div></header>
    <main>
      <section className="hero" id="inicio"><div className="hero-inner wrap"><div className="hero-text"><h1>Sente Saudade<br/>de um <span>Doce de<br/>Verdade?</span></h1><p className="hero-copy">Redescubra o prazer de preparar sobremesas em casa. São <strong>200 receitas de doces sem açúcar</strong> para variar seus momentos à mesa e experimentar novos sabores.</p><PurchaseButton/><p className="hero-price">Produto digital · Pagamento único · {formatPrice(product.price)}</p></div><div className="hero-product"><img src={tablet} alt="Apresentação ilustrativa do produto digital em um tablet, ao lado de uma sobremesa de chocolate" width={1024} height={1024} fetchPriority="high"/><div className="floating-badge"><span>E-BOOK COMPLETO</span><strong>{formatPrice(product.price)}</strong></div><p className="digital-caption">Apresentação ilustrativa · Produto 100% digital</p></div></div></section>
      <section className="section wrap problem-section"><h2 className="section-title">QUER REDUZIR O AÇÚCAR,<br/><span>MAS FALTAM IDEIAS PARA OS DOCES?</span></h2><div className="problem-grid">{[[UtensilsCrossed,'Sempre a mesma receita','Falta variedade para o café da tarde e a sobremesa.'],[Heart,'Vontade de um doce','Você quer continuar aproveitando seus momentos à mesa.'],[ChefHat,'Poucas ideias na cozinha','Encontrar novas preparações nem sempre é fácil.'],[Leaf,'Novas escolhas','Você busca alternativas para reduzir o açúcar na rotina.']].map(([Icon,title,text])=>{const ItemIcon=Icon as typeof Leaf;return <article className="reference-card problem-item" key={String(title)}><ItemIcon aria-hidden="true"/><h3>{String(title)}</h3><p>{String(text)}</p></article>})}</div></section>
      <section className="solution section"><div className="wrap"><div className="secret-content"><h2>Chega de Mesmice! Descubra o E-book <span>200 Sobremesas Zero Açúcar</span></h2><p>Imagine escolher um bolo para o café, uma mousse para o fim de semana ou um brigadeiro para aquele momento especial. Uma coleção de ideias para preparar em casa e descobrir suas favoritas.</p><p>Reunimos <strong>200 receitas em um único material digital</strong>, para consultar no celular, tablet ou computador. Você também pode imprimir as receitas que quiser levar para a cozinha.</p></div><div className="dessert-gallery">{[[cake,'Bolo de chocolate com morangos'],[mousse,'Mousse de chocolate'],[brigadeiro,'Brigadeiros de chocolate'],[hero,'Variedade de sobremesas']].map(([image,alt])=><img key={alt} src={image} alt={alt} width={1536} height={1024} loading="lazy"/>)}</div><p className="recipe-note">Fotos ilustrativas das categorias do e-book, não das preparações entregues. O resultado varia conforme os ingredientes e o preparo.</p></div></section>
      <section className="section wrap"><h2 className="section-title">Mais Variedade Para o Seu<br/><span>Momento Doce</span></h2><div className="benefits-grid">{[['1','200 RECEITAS PARA EXPLORAR','Uma coleção de sobremesas para variar suas escolhas e encontrar novas favoritas.'],['2','PREPARE EM CASA','Escolha o que combina com a ocasião e aproveite o seu momento na cozinha.'],['3','SEU E-BOOK SEMPRE COM VOCÊ','Consulte o material no celular, tablet ou computador, onde preferir.'],['4','LEVE SUAS FAVORITAS PARA A COZINHA','Imprima as receitas que quiser e acompanhe o preparo no seu ritmo.']].map(([number,title,text])=><article className="reference-card numbered-benefit" key={number}><span className="benefit-number">{number}</span><div><h3>{title}</h3><p>{text}</p></div></article>)}</div></section>
      <section className="contents-band section" id="receitas"><div className="wrap"><h2 className="section-title">O QUE VOCÊ VAI ENCONTRAR</h2><div className="category-grid">{[[cake,'Bolos e tortas','Ideias para o café da tarde e ocasiões especiais.'],[brigadeiro,'Brigadeiros e docinhos','Novas maneiras de preparar seus doces favoritos.'],[mousse,'Mousses e gelados','Opções cremosas para variar a sobremesa.']].map(([image,title,text])=><article className="recipe-card" key={title}><img src={image} alt={title} width={1536} height={1024} loading="lazy"/><div><h3>{title}</h3><p>{text}</p></div></article>)}</div></div></section>
      <section className="section wrap transparent-product"><div className="product-cover"><BookMockup/></div><div><h2>Seu Próximo Momento Doce<br/><span>Começa Com Uma Nova Receita</span></h2><p className="body-copy">O 200 Sobremesas Zero Açúcar é um produto digital com 200 receitas de brigadeiros, mousses, bolos, tortas e gelados. Um material para quem quer descobrir novas possibilidades na cozinha.</p><ul className="check-list"><li><Check/> 200 receitas reunidas em um e-book digital</li><li><Check/> Leia no celular ou imprima suas favoritas</li><li><Check/> Acesso enviado por e-mail após o pagamento</li></ul><p className="recipe-note">Nenhum livro físico é enviado. Receitas sem açúcar podem conter carboidratos; avalie ingredientes e porções conforme suas necessidades.</p></div></section>
      <section className="offer-band section" id="oferta"><div className="wrap"><h2 className="section-title">Garanta Seu Acesso</h2><div className="pricing-box"><div className="offer-eyebrow"><BookOpen/> E-BOOK DIGITAL COMPLETO</div><h3>200 Sobremesas<br/>Zero Açúcar</h3><p className="price-label">Seu e-book por apenas</p><div className="price">{formatPrice(product.price)}</div><p className="one-payment">Pagamento único</p><ul className="check-list"><li><Check/> 200 receitas de sobremesas sem açúcar</li><li><Check/> Leia no celular, tablet ou computador</li><li><Check/> Imprima suas receitas favoritas</li><li><Check/> Acesso por e-mail após a confirmação</li></ul><PurchaseButton offer/><div className="offer-note"><LockKeyhole/> Compra realizada no checkout da Cakto</div><p className="checkout-disclosure">Confira as formas de pagamento, eventuais taxas e o valor total no checkout antes de concluir a compra.</p></div></div></section>
      <section className="section wrap" id="duvidas"><h2 className="section-title">Perguntas Frequentes</h2><div className="faq">{questions.map(([question,answer])=><details key={question}><summary>{question}<Plus/></summary><p>{answer}</p></details>)}</div></section>
      <section className="closing"><h2>200 Receitas. Uma Nova Favorita<br/><span>Esperando Por Você.</span></h2><p>Novas ideias para o café da tarde, a sobremesa de domingo e os seus momentos à mesa.</p><PurchaseButton/></section>
    </main>
    <footer className="footer"><div className="wrap"><div className="footer-top"><a href="#inicio" className="brand">200 DOCES ZERO AÇÚCAR</a><span>Produto 100% digital · Acesso por e-mail</span></div><p className="footer-links"><a href="/privacidade">Política de Privacidade</a></p><p className="disclaimer">Este material é um livro de receitas, não uma orientação médica ou nutricional. Receitas sem açúcar podem conter carboidratos. Se você tem diabetes ou segue uma dieta específica, avalie ingredientes e porções com um profissional de saúde. Não há promessa de emagrecimento. Imagens e mockups ilustrativos; não há envio de livro físico.</p></div></footer>
    <Dialog.Root open={checkoutOpen} onOpenChange={setCheckoutOpen}><Dialog.Portal><Dialog.Overlay className="modal-overlay"/><Dialog.Content className="modal-content"><Dialog.Title>As vendas ainda não estão abertas</Dialog.Title><Dialog.Description>O pagamento deste e-book ainda não está disponível nesta página. Volte em breve para conferir a liberação.</Dialog.Description><Dialog.Close asChild><Button variant="sales">Entendi</Button></Dialog.Close></Dialog.Content></Dialog.Portal></Dialog.Root>
  </>;
}
