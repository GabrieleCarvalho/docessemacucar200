import { createFileRoute } from '@tanstack/react-router';
import { ArrowLeft, LockKeyhole, Megaphone, Share2, ShieldCheck } from 'lucide-react';
import { useEffect, useState } from 'react';
import { setAdvertisingOptOut } from '@/lib/meta-pixel';
import { Button } from '@/components/ui/button';

export const Route = createFileRoute('/privacidade')({
  head: () => ({ meta: [
    { title: 'Política de Privacidade | 200 Sobremesas Zero Açúcar' },
    { name: 'description', content: 'Saiba quais dados a página coleta, como o pixel do Meta é usado para medir anúncios e como você pode controlar sua privacidade.' },
    { property: 'og:title', content: 'Política de Privacidade | 200 Sobremesas Zero Açúcar' },
    { property: 'og:description', content: 'Transparência sobre a medição de anúncios com o pixel do Meta nesta página.' },
    { property: 'og:url', content: 'https://docessemacucar200.lovable.app/privacidade' },
    { property: 'og:type', content: 'website' }, { name: 'twitter:card', content: 'summary_large_image' },
  ], links: [{ rel: 'canonical', href: 'https://docessemacucar200.lovable.app/privacidade' }] }),
  component: PrivacyPage,
});

function PrivacyPage() {
  const [denied, setDenied] = useState(false);
  useEffect(() => {
    function sync() { setDenied(localStorage.getItem('advertising_opt_out') === 'true'); }
    sync(); window.addEventListener('storage', sync);
    return () => window.removeEventListener('storage', sync);
  }, []);
  function toggleAdvertising() { setAdvertisingOptOut(!denied); setDenied(!denied); }

  return <main className="wrap privacy-page">
    <div className="privacy-inner">
      <Button variant="sales" asChild><a href="/"><ArrowLeft /> Voltar para a página</a></Button>
      <h1>Política de Privacidade</h1>
      <p className="body-copy">Esta página explica, de forma simples, o que acontece quando você visita o site do e-book 200 Sobremesas Zero Açúcar.</p>

      <section>
        <h2><Megaphone />Medição de anúncios (pixel do Meta)</h2>
        <p className="body-copy">Para divulgar o e-book, usamos o pixel do Meta (Meta Platforms, empresa responsável pelo Facebook e Instagram). Ele registra visitas, visualizações do produto e o clique que leva ao checkout — para medir o desempenho das campanhas de anúncios e melhorar a divulgação do produto.</p>
      </section>

      <section>
        <h2><ShieldCheck />Quais dados e para quem</h2>
        <p className="body-copy">As informações compartilhadas com o Meta são dados de navegação (como a página visitada e o navegador utilizado) e identificadores de anúncios do próprio Meta. Nenhum dado de pagamento é coletado aqui: o pagamento acontece no ambiente seguro do processador de pagamentos, e o acesso ao e-book é enviado por e-mail após a confirmação.</p>
      </section>

      <section>
        <h2><Share2 />Como você pode controlar</h2>
        <ul className="check-list">
          <li>Você pode ajustar as preferências de anúncios nas configurações da sua conta do Facebook/Instagram.</li>
          <li>Também é possível bloquear ou limpar cookies nas configurações do seu navegador.</li>
          <li>Sem aviso de cookies, o pixel permanece bloqueado na União Europeia, Espaço Econômico Europeu, Reino Unido e Suíça, e quando a região é desconhecida. Respeitamos também sinais de privacidade do navegador e sua escolha de desativação neste site.</li>
        </ul>
        <p className="body-copy">Você pode desativar a medição de anúncios neste navegador. A escolha fica salva no dispositivo e vale para as outras abas do site. Ela não impede a compra. Não enviamos nome, e-mail ou telefone para correspondência publicitária.</p>
        <Button variant="outline" onClick={toggleAdvertising}>{denied ? 'Reativar medição de anúncios' : 'Desativar medição de anúncios'}</Button>
        <p className="privacy-choice" role="status">{denied ? 'Medição desativada neste navegador.' : 'Medição permitida somente em regiões elegíveis, respeitando os sinais de privacidade do navegador.'}</p>
      </section>

      <section>
        <h2><LockKeyhole />Suas informações de compra</h2>
        <p className="body-copy">Não armazenamos seus dados de pagamento. Clicar no botão de compra não confirma uma venda: a confirmação e eventual medição da compra são responsabilidade do checkout da Cakto. Após a confirmação da compra, o acesso ao produto digital é enviado pelo e-mail informado no checkout.</p>
        <p className="body-copy">Dúvidas sobre este aviso podem ser enviadas pelos mesmos canais de contato usados na compra do e-book.</p>
      </section>
    </div>
  </main>;
}
