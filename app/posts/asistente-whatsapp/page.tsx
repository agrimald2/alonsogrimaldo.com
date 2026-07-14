import type { Metadata } from "next";
import Image from "next/image";
import { getPost } from "@/lib/posts";
import { JsonLd, blogPostJsonLd } from "@/lib/jsonld";
import { WhatsAppMock, MockCarousel, PushMock } from "./WhatsAppMock";

const post = getPost("asistente-whatsapp");

export const metadata: Metadata = {
  title: post.title,
  description: post.description,
  alternates: { canonical: `/posts/${post.slug}` },
  openGraph: {
    type: "article",
    publishedTime: post.date,
    authors: ["Alonso Grimaldo"],
    tags: post.tags,
    title: post.title,
    description: post.description,
    url: `https://alonsogrimaldo.com/posts/${post.slug}`,
  },
};

export default function AsistenteWhatsapp() {
  return (
    <main>
      <article>
        <JsonLd data={blogPostJsonLd(post)} />
        <div className="wrap">
          <div className="meta">
            {post.dateLabel} · {post.tags.join(" · ")} · {post.readingMin} min
          </div>
          <h1>Mi asistente ejecutivo es un chat de WhatsApp conmigo mismo</h1>
          <p className="lead">
            Ayer me mandé un audio a mí mismo preguntando qué tenía en la agenda,
            y me respondió mi asistente con mis reuniones reales, de mis dos
            calendarios. No es una app nueva ni un SaaS: es un proceso de Node
            corriendo en mi Mac mini, conectado a mi WhatsApp de siempre, que
            construí en un par de horas iterando. Este post es el por qué y el
            cómo, con los bugs incluidos.
          </p>

          <figure className="post-fig">
            <Image
              src="/img/post-wabot.jpg"
              alt="Ilustración en tinta: un pequeño robot mayordomo dentro de un teléfono vintage ordena una avalancha de burbujas de chat en bandejas"
              width={1536}
              height={1024}
              priority
            />
          </figure>

          <h2>El porqué: mi vida operativa ES WhatsApp</h2>
          <p>
            Cuando listé mis grupos para configurar el bot, eran <b>993</b>. No
            es un typo. Entre Latech, 021, clientes, proveedores, familia y cada
            plan que alguna vez existió, WhatsApp es donde ocurre todo: ahí me
            piden deploys, ahí me mandan facturas, ahí me proponen reuniones en
            audios de seis minutos que escucho a 2x caminando.
          </p>
          <p>
            El problema no es el volumen. El problema es que{" "}
            <b>lo importante viaja mezclado con lo trivial</b>, en el mismo
            canal, con la misma notificación. La factura del cliente y el meme
            del grupo de amigos suenan igual. Y las herramientas clásicas de
            productividad fallan todas por la misma razón: exigen que te mudes.
            Otro inbox, otra app, otro hábito que mantener.
          </p>
          <div className="quote">
            El mejor asistente no es una app nueva. Es el chat donde ya vivís,
            con superpoderes.
          </div>
          <p>
            WhatsApp tiene un rincón perfecto para esto: el <b>chat con vos
            mismo</b>. Ya lo usaba como bloc de notas. Ahora es mi centro de
            comando: le hablo (o le mando audios) y del otro lado responde un
            bot que ve todo lo que yo veo.
          </p>

          <WhatsAppMock
            title="Tú"
            subtitle="tu autochat, ahora con asistente"
            caption="El origen de todo: audios propios → transcripción + resumen."
            thread={[
              { from: "out", text: "🎙 Audio · 4:12", time: "09:14" },
              {
                from: "in",
                text: (
                  <>
                    📝 <b>Transcripción</b>
                    {"\n"}Llamé al proveedor, quedó en mandar la cotización el
                    jueves. Hay que confirmar el stock antes del viernes y
                    avisarle a Marco…
                    {"\n\n"}🧾 <b>Resumen</b>
                    {"\n"}• Proveedor manda cotización el jueves
                    {"\n"}• Confirmar stock antes del viernes
                    {"\n"}• Avisar a Marco
                  </>
                ),
                time: "09:15",
              },
            ]}
          />

          <h2>El cómo: un dispositivo vinculado con cerebro</h2>
          <p>
            La base es <b>Baileys</b>, una librería open source que habla el
            protocolo de WhatsApp Web. El bot se vincula como un dispositivo más
            (igual que WhatsApp en tu compu) y corre bajo <b>pm2</b> en mi{" "}
            <b>Mac mini</b>, que está siempre prendida y conectada: el asistente
            no depende de que yo abra la laptop. Encima de eso: <b>Whisper</b>{" "}
            para transcribir, <b>gpt-4o-mini</b> para clasificar y entender
            lenguaje natural, y las APIs de <b>Google Calendar y Gmail</b> para
            mis dos cuentas.
          </p>
          <p>
            El principio rector de todo el diseño es uno solo: <b>pipeline
            barato primero</b>. Cada mensaje pasa por capas de filtrado donde
            cada capa es más cara que la anterior, y la mayoría muere gratis en
            la primera:
          </p>
          <ul>
            <li>
              <b>Capa 0, alcance:</b> solo DMs y los 39 grupos de trabajo que
              elegí vigilar. Estados, canales y los otros 954 grupos no existen.
            </li>
            <li>
              <b>Capa 1, regex a costo $0:</b> stickers, reacciones,
              &quot;jaja&quot;, &quot;ok&quot;, emojis sueltos quedan
              descartados sin gastar un token. Acá muere ~70% de lo que entra.
            </li>
            <li>
              <b>Capa 2, LLM batcheado:</b> lo que sobrevive se acumula y cada
              5 minutos un solo call a gpt-4o-mini clasifica el lote entero.
            </li>
            <li>
              <b>Capa 3, acción:</b> urgente → push inmediato al teléfono;
              importante → digest cada hora; el resto → descartado.
            </li>
          </ul>

          <figure className="post-fig">
            <Image
              src="/img/wabot-pipeline.jpg"
              alt="Ilustración en tinta: cientos de burbujas de chat caen en un embudo con tamices; solo tres llegan abajo, sobre un cojín que sostiene un robot"
              width={1536}
              height={1024}
            />
          </figure>

          <p>El clasificador devuelve JSON estricto por cada mensaje:</p>
          <pre>
            <code>{`{
  "importante": true,
  "urgente": false,
  "categoria": "plata",          // trabajo | plata | fechas | pedido
  "resumen": "María envió la factura de julio y espera el pago",
  "propuestaHorario": null,       // detecta "¿te va mañana 15:00?"
  "todo": "Pagar la factura de julio a María"
}`}</code>
          </pre>
          <p>
            Ese único JSON alimenta todo: el digest horario agrupado por
            categoría, las alertas urgentes, los to-dos sugeridos y las
            propuestas de horario. Un call, cuatro features. El digest se ve
            así:
          </p>

          <WhatsAppMock
            title="Tú"
            subtitle="digest: lo importante de la última hora"
            caption="Cada hora, solo si hay algo. Lo que no llega acá no merecía tu atención."
            thread={[
              {
                from: "in",
                text: (
                  <>
                    📋 <b>Digest 14:00–15:00</b> (4)
                    {"\n\n"}💼 <b>Trabajo/clientes</b>
                    {"\n"}• Marco (Gerencia): necesita cerrar el contrato esta
                    semana
                    {"\n\n"}💰 <b>Plata/pagos</b>
                    {"\n"}• María: confirmó la transferencia de 1.500
                    {"\n\n"}📅 <b>Fechas</b>
                    {"\n"}• Grupo Dev: la reunión del martes pasa a las 16:00
                    {"\n\n"}✅ <b>To-dos sugeridos</b>
                    {"\n"}• Responderle a Marco sobre el contrato
                  </>
                ),
                time: "15:00",
              },
            ]}
          />

          <WhatsAppMock
            title="Tú"
            subtitle="urgencias: del chat al push en segundos"
            caption="Lo urgente salta el digest: aviso inmediato en el autochat."
            thread={[
              {
                from: "in",
                text: (
                  <>
                    🚨 <b>Urgente</b> — Diego (Ops Acme)
                    {"\n"}Se cayó el servidor de producción y los usuarios no
                    pueden entrar.
                    {"\n"}👉 Llamar a Diego ya
                  </>
                ),
                time: "16:47",
              },
            ]}
          />

          <p>
            Y como los mensajes que te mandás a vos mismo no suenan en el
            teléfono, lo urgente también llega como <b>push real</b> vía ntfy,
            con prioridad máxima y deep link al chat correcto:
          </p>

          <PushMock
            title="🚨 Urgente — Diego (Ops Acme)"
            body="Se cayó el servidor de producción. 👉 Llamar a Diego ya"
            caption="El push atraviesa el silencio de WhatsApp. Tap y estás en el chat de Diego."
          />

          <h2>El calendario se maneja hablando</h2>
          <p>
            La segunda mitad del bot es un asistente de agenda sobre mis dos
            cuentas de Google (la personal y la de 021). Acá también hay un gate
            barato: una regex decide si el texto <i>parece</i> de calendario, y
            solo entonces gpt-4o-mini lo convierte en una acción estructurada
            con fechas absolutas. &quot;El jueves 3pm&quot; se vuelve{" "}
            <code>2026-07-16T15:00</code> sin que yo piense en zonas horarias.
          </p>

          <MockCarousel caption="Agenda por lenguaje natural: crear con confirmación, propuestas ajenas resueltas, y consultas al instante">
            <WhatsAppMock
              compact
              title="Tú"
              subtitle="crear, siempre con confirmación"
              thread={[
                {
                  from: "out",
                  text: "agendame reunión con Marco el jueves 3pm con meet",
                  time: "11:02",
                },
                {
                  from: "in",
                  text: (
                    <>
                      📅 <b>Confirmar evento</b> 🏠 personal
                      {"\n"}Reunión con Marco
                      {"\n"}jue 16/07 15:00–16:00
                      {"\n"}📹 con Google Meet
                      {"\n\n"}Respondé <b>sí</b> para agendar.
                    </>
                  ),
                  time: "11:02",
                },
                { from: "out", text: "sí", time: "11:03" },
                {
                  from: "in",
                  text: "✅ Agendado en 🏠 personal.\n📹 meet.google.com/abc-defg-hij",
                  time: "11:03",
                },
              ]}
            />
            <WhatsAppMock
              compact
              title="Tú"
              subtitle="propuestas ajenas, resueltas"
              thread={[
                {
                  from: "in",
                  text: (
                    <>
                      📅 <b>Propuesta de horario</b> — Carla
                      {"\n"}&quot;¿Te va mañana 15:00 para revisar el
                      contrato?&quot;
                      {"\n"}mar 14/07 15:00
                      {"\n"}✅ Estás libre en ambos calendarios
                      {"\n\n"}Respondé <b>agendalo</b> para crearlo.
                    </>
                  ),
                  time: "18:21",
                },
                { from: "out", text: "agendalo", time: "18:24" },
                { from: "in", text: "✅ Agendado en 🏠 personal.", time: "18:24" },
              ]}
            />
            <WhatsAppMock
              compact
              title="Tú"
              subtitle="consultar, en texto o audio"
              thread={[
                { from: "out", text: "qué tengo mañana?", time: "21:40" },
                {
                  from: "in",
                  text: (
                    <>
                      🗓 <b>mar, 14/07</b>
                      {"\n"}• 10:30–11:00 🏢 Daily
                      {"\n"}• 11:00–13:00 🏢 Research & planning
                      {"\n"}• 15:00–16:00 🏠 Contrato con Carla
                    </>
                  ),
                  time: "21:40",
                },
              ]}
            />
          </MockCarousel>

          <h2>Memoria: promesas, gastos y lo que quedó dicho</h2>
          <p>
            Mi feature favorita es la que no pedí hasta el final: el{" "}
            <b>detector de promesas</b>. El bot lee lo que <i>yo</i> escribo en
            chats de trabajo, y cuando prometo algo (&quot;mañana te mando la
            cotización&quot;) lo convierte en to-do con recordatorio a la hora
            que corresponde. Nadie más te cubre esa espalda.
          </p>

          <figure className="post-fig">
            <Image
              src="/img/wabot-promesas.jpg"
              alt="Ilustración en tinta: burbujas de chat se escapan de un escritorio como globos y un pequeño robot las atrapa con una red y las anota en un libro"
              width={1024}
              height={1024}
            />
          </figure>

          <WhatsAppMock
            title="Tú"
            subtitle="briefing de las 7:00"
            caption="Todas las mañanas: agenda, recordatorios, to-dos. Y las promesas que hice ayer."
            thread={[
              {
                from: "in",
                text: (
                  <>
                    ☀️ <b>Briefing</b>
                    {"\n"}🗓 <b>lun 14/07</b>
                    {"\n"}• 10:30–11:00 🏢 Daily
                    {"\n"}• 15:00–16:00 🏠 Contrato con Carla
                    {"\n\n"}⏰ <b>Recordatorios de hoy</b>
                    {"\n"}• 09:00 Mandar la factura a María
                    {"\n\n"}✅ <b>To-dos pendientes</b> (3)
                    {"\n"}• 🤝 Mandar la cotización a Carla
                  </>
                ),
                time: "07:00",
              },
              {
                from: "system",
                text: "🤝 detectado ayer en tu chat con Carla: “mañana te mando la cotización”",
              },
            ]}
          />

          <p>
            A eso se suman recordatorios por lenguaje natural, registro de
            gastos por moneda, y un historial de 14 días de los chats vigilados
            que puedo interrogar como si fuera una persona que estuvo en todas
            mis conversaciones:
          </p>

          <MockCarousel caption="La memoria del bot: recordatorios, gastos, búsqueda histórica y resúmenes por chat">
            <WhatsAppMock
              compact
              title="Tú"
              subtitle="recordatorios"
              thread={[
                {
                  from: "out",
                  text: "recordame mañana 9am mandar la factura a María",
                  time: "22:10",
                },
                {
                  from: "in",
                  text: "⏰ Te aviso el mar, 14/07 a las 09:00: mandar la factura a María",
                  time: "22:10",
                },
                {
                  from: "in",
                  text: "⏰ Recordatorio\nMandar la factura a María",
                  time: "09:00",
                },
              ]}
            />
            <WhatsAppMock
              compact
              title="Tú"
              subtitle="gastos por moneda"
              thread={[
                { from: "out", text: "gasté 120 en hosting", time: "13:05" },
                {
                  from: "in",
                  text: "💸 Registrado: 120 USD — hosting",
                  time: "13:05",
                },
                { from: "out", text: "cuánto gasté este mes?", time: "18:30" },
                {
                  from: "in",
                  text: (
                    <>
                      💸 <b>Gastos julio</b>
                      {"\n"}Total: <b>340 USD</b> + <b>180 PEN</b> (7)
                    </>
                  ),
                  time: "18:30",
                },
              ]}
            />
            <WhatsAppMock
              compact
              title="Tú"
              subtitle="búsqueda en 14 días de chats"
              thread={[
                {
                  from: "out",
                  text: "qué quedó con el contrato de Acme?",
                  time: "10:12",
                },
                {
                  from: "in",
                  text: "🔍 El contrato quedó en 3000 USD mensuales con kickoff el lunes 20. Lo dijo Salva en el grupo Gerencia el 13/07.",
                  time: "10:12",
                },
              ]}
            />
            <WhatsAppMock
              compact
              title="Tú"
              subtitle="documentos entrantes"
              thread={[
                {
                  from: "in",
                  text: (
                    <>
                      📄 <b>María</b> — factura-julio.pdf:
                      {"\n"}• Factura N° 0042 por 1.500 USD
                      {"\n"}• Vence el 20 de julio
                      {"\n"}• Cuenta BCP para transferencia
                    </>
                  ),
                  time: "12:33",
                },
                {
                  from: "system",
                  text: "El PDF llegó al chat de María; el bot lo resumió solo",
                },
              ]}
            />
          </MockCarousel>

          <h2>Hablarle, y que hable por vos</h2>
          <p>
            El canal funciona en las dos direcciones. Le puedo hablar por audio
            (los audios grabados por mí son comandos; los reenviados solo se
            transcriben), pedirle resúmenes de cualquier chat vigilado, y hasta
            dictarle respuestas que recién salen cuando yo las confirmo:
          </p>

          <MockCarousel caption="Voz como comando, resúmenes de chats, borradores con confirmación y audios ajenos transcriptos">
            <WhatsAppMock
              compact
              title="Tú"
              subtitle="la voz es un comando"
              thread={[
                { from: "out", text: "🎙 Audio · 0:06\n“qué tengo mañana?”", time: "08:12" },
                {
                  from: "in",
                  text: (
                    <>
                      🗓 <b>mar, 14/07</b>
                      {"\n"}• 10:30–11:00 🏢 Daily
                      {"\n"}• 15:00–16:00 🏠 Contrato con Carla
                    </>
                  ),
                  time: "08:12",
                },
              ]}
            />
            <WhatsAppMock
              compact
              title="Tú"
              subtitle="resúmenes de cualquier chat"
              thread={[
                { from: "out", text: "resumime Gerencia de hoy", time: "19:02" },
                {
                  from: "in",
                  text: (
                    <>
                      🧠 <b>Resumen Gerencia</b> (32 mensajes)
                      {"\n"}• Se cerró la propuesta en 3.000
                      {"\n"}• Kickoff el lunes 20
                      {"\n"}• Pendiente: contrato lo prepara Marco
                    </>
                  ),
                  time: "19:02",
                },
              ]}
            />
            <WhatsAppMock
              compact
              title="Tú"
              subtitle="borradores: vos apretás enviar"
              thread={[
                {
                  from: "out",
                  text: "respondele a Carla que mañana le mando la cotización",
                  time: "17:40",
                },
                {
                  from: "in",
                  text: (
                    <>
                      ✍️ <b>Borrador para Carla:</b>
                      {"\n\n"}&quot;Mañana te mando la cotización, quedate
                      tranqui.&quot;
                      {"\n\n"}Respondé <b>mandalo</b> para enviarlo.
                    </>
                  ),
                  time: "17:40",
                },
                { from: "out", text: "mandalo", time: "17:41" },
                { from: "in", text: "✅ Enviado a Carla.", time: "17:41" },
              ]}
            />
            <WhatsAppMock
              compact
              title="Tú"
              subtitle="los audios ajenos llegan leídos"
              thread={[
                {
                  from: "in",
                  text: (
                    <>
                      🎧 <b>Marco (Gerencia)</b>:
                      {"\n"}Confirmado lo del cliente, la reunión de kickoff
                      queda para el lunes a las 10. Avisale al equipo y…
                    </>
                  ),
                  time: "11:24",
                },
                {
                  from: "system",
                  text: "Audio de 3:40 en el grupo Gerencia, transcripto solo",
                },
              ]}
            />
          </MockCarousel>

          <h2>La capa que lo cambia todo: Claude Code y mi Brain</h2>
          <p>
            Acá es donde el bot deja de ser un filtro inteligente y se vuelve
            parte de algo más grande. En mi día a día ya trabajo con{" "}
            <b>workflows de agentes</b>: cotizaciones que se generan solas a
            partir de un PRD, e2e testing que encuentra la causa raíz y se
            auto-corrige, deploys que corren mientras duermo. Todo eso vive en{" "}
            <b>Claude Code</b>, y Claude ya está conectado al{" "}
            <b>Company Brain</b> de 021, el grafo de conocimiento del que
            escribí en{" "}
            <a href="/posts/company-brain">otro post</a>.
          </p>
          <p>
            El bot es la puerta de entrada por WhatsApp a esa maquinaria: para
            tareas que le quedan grandes a un clasificador, puede levantar
            Claude Code y delegarle el trabajo pesado. Y como Claude ya habla
            con el Brain, preguntarle algo de la empresa desde el teléfono es
            un mensaje de WhatsApp: el bot le pregunta a Claude, Claude le
            pregunta al Brain, y la respuesta vuelve al chat.
          </p>
          <div className="quote">
            WhatsApp es la interfaz. Claude Code es el motor. El Brain es la
            memoria. El bot solo conecta los cables.
          </div>

          <h2>Decisiones de diseño con opinión</h2>
          <ul>
            <li>
              <b>El bot jamás escribe a terceros por su cuenta.</b> La única
              función que envía mensajes a otras personas (borradores tipo
              &quot;respondele a Juan que…&quot;) requiere preview exacto y
              confirmación explícita, y expira a los 5 minutos. Todo lo demás
              ocurre en mi autochat.
            </li>
            <li>
              <b>Los audios reenviados nunca ejecutan comandos.</b> Un audio
              grabado por mí puede ser un comando de voz; uno reenviado solo se
              transcribe. Si no, cualquiera podría mandarme un audio diciendo
              &quot;borrá mi agenda&quot; y yo reenviármelo sin pensar.
            </li>
            <li>
              <b><code>markOnlineOnConnect: false</code>.</b> Si el dispositivo
              vinculado se reporta online, WhatsApp deja de mandar
              notificaciones push al teléfono. Un bot que te silencia el
              teléfono es peor que no tener bot.
            </li>
            <li>
              <b>Push por fuera de WhatsApp.</b> Los mensajes que te mandás a
              vos mismo no suenan. Para urgencias uso ntfy: push real, con
              prioridad, y el tap abre directamente el chat correcto vía deep
              link de wa.me.
            </li>
          </ul>

          <h2>War stories: los tres bugs que me gustaron</h2>
          <p>
            <b>1. El <code>\b</code> que no banca tildes.</b> Mis gates son
            regex, y JavaScript computa <code>\b</code> con <code>\w</code>{" "}
            ASCII: &quot;é&quot; no es word character. Resultado:
            &quot;gast<b>é</b> 120 en hosting&quot; no matcheaba{" "}
            <code>gast[eéao]\w*\b</code> y el bot me ignoraba en silencio. La
            regla que me llevo: en español, nunca cierres un gate con{" "}
            <code>\b</code> después de una posible tilde.
          </p>
          <p>
            <b>2. Dos instancias peleando por la sesión.</b> Lancé una instancia
            de prueba mientras la de producción corría bajo pm2. WhatsApp solo
            permite una conexión por dispositivo vinculado: las dos entraron en
            un loop de reconexión mutua, pateándose cada 3 segundos. Parecía un
            bug del bot; era un conflicto de sesión.
          </p>
          <p>
            <b>3. El recordatorio que viajó al 2023.</b> Le dije al clasificador
            de promesas qué día y hora era… pero no el año. Dedujo
            &quot;mañana&quot; en el año de su training data y me agendó un
            recordatorio tres años en el pasado. Los LLMs no asumen tu presente:
            decíselo completo.
          </p>

          <h2>Los números</h2>
          <ul>
            <li>
              <b>Costo:</b> menos de $5 al mes todo incluido. Whisper para
              audios, gpt-4o-mini batcheado para clasificación y lenguaje
              natural, visión para imágenes. Google Calendar, Gmail y ntfy son
              gratis.
            </li>
            <li>
              <b>Stack:</b> Node + Baileys + pm2 en una Mac mini siempre
              prendida. Sin servidores nuevos, sin base de datos: el estado es
              un JSON y el historial son archivos JSONL con retención de 14
              días.
            </li>
            <li>
              <b>Tiempo:</b> un par de horas iterando, usando el flujo de
              desarrollo con agentes que ya tengo armado. Cada feature se
              deployó y probó contra mis datos reales antes de la siguiente.
            </li>
          </ul>

          <h2>Lo que sigue</h2>
          <p>
            La próxima pieza es <b>ops</b>: que el bot haga ping a los servidores
            de mis clientes y me avise de una caída antes de que me la cuente el
            cliente, y que &quot;¿está caído el server de X?&quot; se responda
            con un status real por ssh.
          </p>
          <p>
            Pero más que un roadmap, esto tiene un modo de crecer: <b>mejora
            continua</b>. Cada vez que me encuentro haciendo algo a mano dos
            veces, es candidato a volverse una capability del bot. Así
            aparecieron las promesas, los gastos y la búsqueda histórica, y así
            van a aparecer las que siguen.
          </p>
          <p>
            La tesis ya está probada: no necesitaba otra app de productividad.
            Necesitaba que el canal donde ya vivo, el chat conmigo mismo,
            dejara de ser un bloc de notas y empezara a trabajar.
          </p>
        </div>
      </article>
    </main>
  );
}
