import { createFileRoute } from '@tanstack/react-router';
import { ArrowLeft, LockKeyhole, Megaphone, Share2, ShieldCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const Route = createFileRoute('/privacidade')({
  head: () => ({ meta: [
    { title: 'Política de Privacidade | 200 Sobremesas Zero Açúcar' },
    { name: 'description', content: 'Saiba quais dados a página coleta, como o pixel do Meta é usado para medir anúncios e como você pode controlar sua privacidade.' },
    { property: 'og:title', content: 'Política de Privacidade | 200 Sobremesas Zero Açúcar' },
    { property: 'og:description', content: 'Transparência sobre a medição de anúncios com o pixel do Meta nesta página.' },
    { property: 'og:type', content: 'website' }, { name: 'twitter:card', content: 'summary_large_image' },
  ] }),
  component: PrivacyPage,
});

function PrivacyPage() {
  return <main className="wrap" style={{ paddingTop: 56, paddingBottom: 80 }}>
    <div style={{ maxWidth: 720, margin: '0 auto' }}>
      <Button variant="sales" asChild><a href="/"><ArrowLeft /> Voltar para a página</a></Button>
      <h1 style={{ fontSize: 34, margin: '28px 0 10px' }}>Política de Privacidade</h1>
      <p className="body-copy">Esta página explica, de forma simples, o que acontece quando você visita o site do e-book 200 Sobremesas Zero Açúcar.</p>

      <section style={{ marginTop: 34 }}>
        <h2 style={{ fontSize: 22, marginBottom: 8 }}><Megaphone style={{ width: 18, verticalAlign: -3, marginRight: 6 }} />Medição de anúncios (pixel do Meta)</h2>
        <p className="body-copy">Para divulgar o e-book, usamos o pixel do Meta (Meta Platforms, empresa responsável pelo Facebook e Instagram). Ele registra visitas e interações com esta página — por exemplo, que a página foi aberta e qual botão de compra foi clicado — para medir o desempenho das campanhas de anúncios e melhorar a divulgação do produto.</p>
      </section>

      <section style={{ marginTop: 26 }}>
        <h2 style={{ fontSize: 22, marginBottom: 8 }}><ShieldCheck style={{ width: 18, verticalAlign: -3, marginRight: 6 }} />Quais dados e para quem</h2>
        <p className="body-copy">As informações compartilhadas com o Meta são dados de navegação (como a página visitada e o navegador utilizado) e identificadores de anúncios do próprio Meta. Nenhum dado de pagamento é coletado aqui: o pagamento acontece no ambiente seguro do processador de pagamentos, e o acesso ao e-book é enviado por e-mail após a confirmação.</p>
      </section>

      <section style={{ marginTop: 26 }}>
        <h2 style={{ fontSize: 22, marginBottom: 8 }}><Share2 style={{ width: 18, verticalAlign: -3, marginRight: 6 }} />Como você pode controlar</h2>
        <ul className="check-list">
          <li>Você pode ajustar as preferências de anúncios nas configurações da sua conta do Facebook/Instagram.</li>
          <li>Também é possível bloquear ou limpar cookies nas configurações do seu navegador.</li>
          <li>Em regiões onde a lei exige consentimento para esse tipo de medição, o pixel não é carregado sem a sua autorização.</li>
        </ul>
      </section>

      <section style={{ marginTop: 26 }}>
        <h2 style={{ fontSize: 22, marginBottom: 8 }}><LockKeyhole style={{ width: 18, verticalAlign: -3, marginRight: 6 }} />Suas informações de compra</h2>
        <p className="body-copy">Não armazenamos seus dados de pagamento. Após a confirmação da compra, o acesso ao produto digital é enviado pelo e-mail informado no checkout.</p>
        <p className="body-copy">Dúvidas sobre este aviso podem ser enviadas pelos mesmos canais de contato usados na compra do e-book.</p>
      </section>
    </div>
  </main>;
}
