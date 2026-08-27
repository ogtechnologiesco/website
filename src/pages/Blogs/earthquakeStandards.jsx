import React from 'react';
import Header from '../../partials/Header';
import Footer from '../../partials/Footer';
import PageIllustration from '../../partials/PageIllustration';
import blogImage from '../../images/pereira-earthquake.jpg';

const fadeInKeyframes = `
  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

function EarthquakeStandards() {
  return (
    <>
      <style>{fadeInKeyframes}</style>
      <div className="flex flex-col min-h-screen overflow-hidden">
        <Header />

        <main className="grow">
          <div className="relative max-w-6xl mx-auto h-0 pointer-events-none" aria-hidden="true">
            <PageIllustration />
          </div>

          <section className="relative">
            <div className="max-w-6xl mx-auto px-4 sm:px-6">
              <div className="pt-32 pb-12 md:pt-40 md:pb-20">
                {/* Blog header */}
                <div className="max-w-3xl mx-auto text-center pb-12 md:pb-20">
                  <h1 className="h1">Terremoto de 7,4 en Colombia: la guía de estándares ISO para responder, evaluar y reconstruir</h1>
                  <div className="text-gray-400 text-center">14/08/2026</div>
                </div>

                {/* Blog content */}
                <div className="max-w-3xl mx-auto">
                  <img 
                    className="w-full rounded-xl mb-8 animate-fade-in opacity-0" 
                    src={blogImage} 
                    alt="Edificio colapsado en Pereira tras el terremoto de 2026" 
                    style={{ animation: 'fadeIn 1s ease-in forwards' }}
                  />
                  <p className="text-sm text-gray-500 mb-8 -mt-6">
                    Foto: <a href="https://commons.wikimedia.org/wiki/File:Pereira_after_the_earthquake_-_WCK.jpg" className="text-blue-600 hover:text-blue-800 underline" target="_blank" rel="noopener noreferrer">World Central Kitchen</a>, <a href="https://creativecommons.org/licenses/by/4.0/" className="text-blue-600 hover:text-blue-800 underline" target="_blank" rel="noopener noreferrer">CC BY 4.0</a>
                  </p>
                  
                  <article className="text-lg text-gray-100 text-justify">
                    <p className="mb-8">
                      El reciente terremoto de magnitud 7,4 que sacudió Colombia vuelve a poner sobre la mesa una pregunta esencial para autoridades, constructores, propietarios y empresas de tecnología: ¿qué marcos internacionales existen para evaluar daños, coordinar la respuesta y reconstruir con mayor resiliencia?
                    </p>

                    <p className="mb-8">
                      No existe un único "estándar ISO para terremotos". En su lugar, hay un conjunto de normas que cubren desde las acciones sísmicas de diseño hasta la gestión de emergencias y la continuidad del negocio. Para una plataforma SaaS de construcción orientada a la resiliencia sísmica, estas normas pueden operacionalizarse en módulos de evaluación de riesgos, inspección estructural, gestión de reforzamiento, respuesta ante emergencias y continuidad operativa.
                    </p>

                    <h3 className="h3 mb-4 text-gray-100">Normas sísmicas fundamentales</h3>
                    <p className="mb-8">
                      Estas son las normas ISO directamente relacionadas con el comportamiento sísmico de las estructuras:
                    </p>
                    <ul className="list-disc list-inside mb-8 text-gray-100">
                      <li className="mb-2"><strong>ISO 3010:2017</strong> — Acciones sísmicas sobre estructuras. Define parámetros de peligrosidad sísmica, acciones de diseño y flujos de trabajo de diseño estructural. Es un documento de referencia, no un código de construcción legalmente exigible.</li>
                      <li className="mb-2"><strong>ISO 23469:2005</strong> — Acciones sísmicas para obras geotécnicas. Relevante para cimentaciones, muros de contención, túneles, tuberías, presas, terraplenes y estructuras enterradas.</li>
                      <li className="mb-2"><strong>ISO 13822:2010</strong> — Evaluación de estructuras existentes. Útil para inventarios de edificaciones, evaluaciones de vulnerabilidad, registros de inspección y verificaciones de confiabilidad tras un sismo.</li>
                      <li className="mb-2"><strong>ISO 28841:2013</strong> — Evaluación sísmica simplificada y rehabilitación de edificios de concreto. Particularmente relevante para evaluaciones rápidas previas y posteriores al terremoto, cuando no es viable un análisis estructural avanzado completo.</li>
                      <li className="mb-2"><strong>ISO 16711:2015</strong> — Evaluación sísmica y reforzamiento de estructuras de concreto. Cubre la evaluación detallada, la planificación y el diseño de reforzamientos. Nota: el catálogo de ISO la marca actualmente como retirada, por lo que conviene verificar su estado antes de invocarla contractualmente.</li>
                      <li className="mb-2"><strong>ISO 23618:2022</strong> — Principios generales para estructuras con aislamiento sísmico. Relevante para el diseño, la gestión de construcción y el mantenimiento de edificios con sistemas de aislamiento de base.</li>
                      <li className="mb-2"><strong>ISO 22762-3:2018</strong> — Aisladores sísmicos elastoméricos para edificios. Especificaciones y métodos de ensayo; esta edición también figura como retirada en el catálogo de ISO.</li>
                    </ul>

                    <h3 className="h3 mb-4 text-gray-100">Normas de emergencia y resiliencia organizacional</h3>
                    <p className="mb-8">
                      La respuesta efectiva a un sismo de magnitud 7,4 no es solo un problema estructural: es un problema de coordinación, continuidad y gestión de riesgos. Estas normas complementan el marco técnico:
                    </p>
                    <ul className="list-disc list-inside mb-8 text-gray-100">
                      <li className="mb-2"><strong>ISO 22320:2018</strong> — Gestión de emergencias y gestión de incidentes: roles, responsabilidades, gestión de recursos, coordinación y dirección conjunta. Ideal para tableros de respuesta ante sismos y flujos de trabajo multiagencia.</li>
                      <li className="mb-2"><strong>ISO 22301:2019</strong> — Sistemas de gestión de continuidad del negocio. Apoya los planes de continuidad de contratistas, propietarios, servicios públicos e instalaciones críticas tras el terremoto. <strong>ISO 22313:2020</strong> ofrece la guía de implementación.</li>
                      <li className="mb-2"><strong>ISO 22327:2018</strong> — Directrices para sistemas comunitarios de alerta temprana de deslizamientos de tierra. Relevante cuando el sismo genera riesgo de derrumbes, algo especialmente crítico en la topografía andina colombiana.</li>
                      <li className="mb-2"><strong>ISO 31000:2018</strong> — Principios y directrices de gestión del riesgo. Proporciona el marco general alrededor de peligros sísmicos, activos, controles y riesgo residual.</li>
                      <li className="mb-2"><strong>ISO 31010:2019</strong> — Técnicas de evaluación de riesgos: análisis de peligros, análisis de escenarios, evaluación de vulnerabilidad y análisis de consecuencias.</li>
                      <li className="mb-2"><strong>ISO 45001:2018</strong> — Gestión de seguridad y salud ocupacional. Esencial para el acceso a zonas afectadas, trabajos de inspección, actividades de rescate y riesgos en sitios de construcción post-sismo.</li>
                      <li className="mb-2"><strong>ISO 7010 e ISO 16069</strong> — Señales de seguridad y sistemas de guiado de rutas de evacuación. Apoyan la señalización de evacuación, sin reemplazar la normativa local de incendios y construcción.</li>
                    </ul>

                    <h3 className="h3 mb-4 text-gray-100">Infraestructura especializada</h3>
                    <p className="mb-8">
                      Para ciertos tipos de infraestructura crítica existen normas específicas:
                    </p>
                    <ul className="list-disc list-inside mb-8 text-gray-100">
                      <li className="mb-2"><strong>ISO/IEC TS 22237-30:2022</strong> — Análisis de riesgo e impacto sísmico para centros de datos, con conceptos de mitigación dentro del diseño de la instalación y la construcción.</li>
                      <li className="mb-2"><strong>ISO 19901-2:2022</strong> — Procedimientos y criterios de diseño sísmico para estructuras offshore de petróleo y gas, incluyendo análisis probabilista de peligrosidad sísmica específico del sitio.</li>
                      <li className="mb-2"><strong>ISO 22888:2020</strong> — Planificación de operaciones ferroviarias durante eventos sísmicos: inspección, controles operacionales y reducción del tiempo de inactividad.</li>
                    </ul>

                    <h3 className="h3 mb-4 text-gray-100">De la norma al software: módulos SaaS mapeados a requisitos ISO</h3>
                    <p className="mb-8">
                      Una plataforma de construcción puede traducir estos estándares en funcionalidades concretas:
                    </p>
                    <ul className="list-disc list-inside mb-8 text-gray-100">
                      <li className="mb-2"><strong>Registro de activos sísmicos</strong> (ISO 13822, ISO 3010): antigüedad del edificio, sistema estructural, ubicación, condiciones del suelo, ocupación y base de diseño.</li>
                      <li className="mb-2"><strong>Evaluación de peligro y vulnerabilidad</strong> (ISO 3010, ISO 23469, ISO 31000, ISO 31010): zonificación sísmica, condiciones del terreno, indicadores de licuefacción o deslizamiento y puntuación de riesgo.</li>
                      <li className="mb-2"><strong>Flujos de inspección</strong> (ISO 13822, ISO 28841): listas de verificación móviles, fotografías, defectos georreferenciados, revisión por ingenieros y clasificación de severidad.</li>
                      <li className="mb-2"><strong>Gestión de reforzamiento</strong> (ISO 28841, ISO 16711, ISO 23618): opciones de retrofit, aprobaciones de diseño, estimaciones de costo, permisos, etapas de construcción y verificación.</li>
                      <li className="mb-2"><strong>Evaluación de seguridad post-sismo</strong> (ISO 13822, ISO 22320): formularios de inspección rápida, estado de acceso rojo/amarillo/verde, zonas de exclusión y escalamiento.</li>
                      <li className="mb-2"><strong>Coordinación de emergencias</strong> (ISO 22320): comando de incidentes, responsabilidades, recursos, comunicaciones y coordinación interagencial.</li>
                      <li className="mb-2"><strong>Continuidad del negocio</strong> (ISO 22301): prioridades de recuperación, instalaciones alternas, proveedores críticos, sistemas de respaldo y ejercicios de recuperación.</li>
                      <li className="mb-2"><strong>Auditoría y evidencia</strong> (ISO 9001, ISO 45001, ISO 14001): control de versiones, aprobaciones, acciones correctivas, registros de competencia y trazabilidad.</li>
                    </ul>

                    <h3 className="h3 mb-4 text-gray-100">Limitación importante: ISO no sustituye la normativa colombiana</h3>
                    <p className="mb-8">
                      Las normas ISO ofrecen principios y marcos internacionales, pero no reemplazan el reglamento de construcción legalmente aplicable. La propia ISO 3010 se describe como un documento fuente para que las autoridades competentes desarrollen sus reglamentos de diseño estructural.
                    </p>
                    <p className="mb-8">
                      En Colombia, cualquier implementación práctica debe verificarse contra:
                    </p>
                    <ul className="list-disc list-inside mb-8 text-gray-100">
                      <li className="mb-2"><strong>NSR-10</strong> — <a href="https://www.minvivienda.gov.co/normatividad/nsr-10" className="text-blue-600 hover:text-blue-800 underline" target="_blank" rel="noopener noreferrer">Reglamento Colombiano de Construcción Sismo Resistente</a>, adoptado mediante la Ley 400 de 1997 y el Decreto 926 de 2010, con sus actualizaciones posteriores.</li>
                      <li className="mb-2"><strong>Estudios de microzonificación sísmica</strong> — obligatorios en varias ciudades colombianas y fundamentales para definir las amenazas locales.</li>
                      <li className="mb-2"><strong>Lineamientos de la UNGRD</strong> — la <a href="https://portal.gestiondelriesgo.gov.co" className="text-blue-600 hover:text-blue-800 underline" target="_blank" rel="noopener noreferrer">Unidad Nacional para la Gestión del Riesgo de Desastres</a> coordina la respuesta y la recuperación a nivel nacional.</li>
                      <li className="mb-2"><strong>Requisitos de las autoridades locales</strong> — licencias de construcción, normas de inspección post-sismo y lineamientos de los colegios profesionales de ingeniería.</li>
                    </ul>

                    <h3 className="h3 mb-4 text-gray-100">Conclusión</h3>
                    <p className="mb-8">
                      Para un producto SaaS de construcción que opere en contextos como el colombiano, la línea base más sólida sería <strong>ISO 3010 + ISO 13822 + ISO 23469 + ISO 22320 + ISO 22301</strong>, complementada con la NSR-10 y la normativa nacional de gestión del riesgo. Añadir ISO 28841 o ISO 23618 cuando la plataforma soporte específicamente rehabilitación simplificada de concreto o aislamiento sísmico.
                    </p>
                    <p className="mb-8">
                      Los estándares no detienen los terremotos, pero sí determinan qué tan bien resistimos, respondemos y reconstruimos. En un país sísmico como Colombia, adoptarlos no es una opción: es una inversión en vidas y en resiliencia.
                    </p>

                    <h3 className="h3 mb-4 text-gray-100">Nuestro compromiso: plan Pro gratuito para las empresas afectadas</h3>
                    <p className="mb-8">
                      A partir de este momento, nuestro <a href="https://www.ogtechnologies.co/pricing" className="text-blue-600 hover:text-blue-800 underline" target="_blank" rel="noopener noreferrer">plan Pro</a> estará gratis y totalmente disponible para todas las empresas afectadas por el sismo. Creemos que, en una emergencia de esta magnitud, la tecnología debe estar al servicio de la respuesta y la recuperación, no detrás de una barrera de pago.
                    </p>
                    <p className="mb-8">
                      Una de las capacidades más críticas en este momento es el <strong>análisis con inteligencia artificial del riesgo de desplome de las estructuras afectadas</strong>. Tras un terremoto de magnitud 7,4, miles de edificaciones quedan en una zona gris: no colapsaron, pero tampoco es seguro ocuparlas. Las réplicas pueden convertir un daño moderado en un colapso mortal en cuestión de minutos.
                    </p>
                    <p className="mb-8">
                      El análisis con AI permite procesar a gran escala las fotografías, los registros de inspección y los datos estructurales del inventario de edificaciones, priorizando qué estructuras requieren evaluación urgente por un ingeniero, cuáles deben acordonarse de inmediato y cuáles pueden ocuparse con seguridad. Combinado con metodologías estandarizadas como la evaluación simplificada de ISO 28841 y los criterios de ISO 13822, este enfoque acelera decisiones que hoy se toman en días y que en contextos de emergencia se miden en vidas.
                    </p>
                    <p className="mb-8">
                      Si tu empresa, alcaldía u organización fue afectada por el terremoto y necesitas apoyo en la evaluación de estructuras, la coordinación de inspecciones o la gestión de la continuidad operativa, <a href="https://www.ogtechnologies.co/pricing" className="text-blue-600 hover:text-blue-800 underline" target="_blank" rel="noopener noreferrer">activa tu plan Pro sin costo</a> y nuestro equipo te acompañará en el proceso.
                    </p>

                    <h3 className="h3 mb-4 text-gray-100">Referencias</h3>
                    <ul className="list-none mb-8 text-gray-100">
                      <li className="mb-2">[1] ISO, "ISO 3010:2017 - Bases for design of structures — Seismic actions on structures," <a href="https://www.iso.org/standard/65570.html" className="text-blue-600 hover:text-blue-800 underline" target="_blank" rel="noopener noreferrer">https://www.iso.org/standard/65570.html</a></li>
                      <li className="mb-2">[2] ISO, "ISO 13822:2010 - Bases for design of structures — Assessment of existing structures," <a href="https://www.iso.org/standard/43285.html" className="text-blue-600 hover:text-blue-800 underline" target="_blank" rel="noopener noreferrer">https://www.iso.org/standard/43285.html</a></li>
                      <li className="mb-2">[3] ISO, "ISO 22320:2018 - Security and resilience — Emergency management," <a href="https://www.iso.org/standard/67851.html" className="text-blue-600 hover:text-blue-800 underline" target="_blank" rel="noopener noreferrer">https://www.iso.org/standard/67851.html</a></li>
                      <li className="mb-2">[4] ISO, "ISO 22301:2019 - Business continuity management systems," <a href="https://www.iso.org/standard/75106.html" className="text-blue-600 hover:text-blue-800 underline" target="_blank" rel="noopener noreferrer">https://www.iso.org/standard/75106.html</a></li>
                      <li className="mb-2">[5] ISO, "ISO 31000:2018 - Risk management — Guidelines," <a href="https://www.iso.org/standard/65694.html" className="text-blue-600 hover:text-blue-800 underline" target="_blank" rel="noopener noreferrer">https://www.iso.org/standard/65694.html</a></li>
                      <li className="mb-2">[6] Asociación Colombiana de Ingeniería Sísmica, "NSR-10 - Reglamento Colombiano de Construcción Sismo Resistente," <a href="https://www.minvivienda.gov.co/normatividad/nsr-10" className="text-blue-600 hover:text-blue-800 underline" target="_blank" rel="noopener noreferrer">https://www.minvivienda.gov.co/normatividad/nsr-10</a></li>
                      <li className="mb-2">[7] UNGRD, "Unidad Nacional para la Gestión del Riesgo de Desastres," <a href="https://portal.gestiondelriesgo.gov.co" className="text-blue-600 hover:text-blue-800 underline" target="_blank" rel="noopener noreferrer">https://portal.gestiondelriesgo.gov.co</a></li>
                    </ul>

                    <div className="mt-12 pt-8 border-t border-gray-700">
                      <p className="text-gray-400 mb-4">
                        <strong>Olvis Enrique Gil Ríos</strong> es el fundador de OG Technologies EU, consultora de TI especializada en estándares internacionales, tecnologías emergentes y soluciones digitales para la industria.
                      </p>
                      <p className="text-gray-500 text-sm">
                        #TerremotoColombia #ISO #ResilienciaSismica #NSR10 #Construccion #GestionDelRiesgo #ISO22301 #ISO22320
                      </p>
                    </div>
                  </article>
                </div>
              </div>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
}

export default EarthquakeStandards;
