import React, { useState } from 'react';
import { 
  Search, 
  ChevronDown, 
  ChevronRight, 
  HelpCircle, 
  Book, 
  Video, 
  MessageCircle,
  Mail,
  Phone,
  ExternalLink
} from 'lucide-react';

const Help: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedFaq, setExpandedFaq] = useState<string | null>(null);

  const faqCategories = [
    {
      title: 'Primeiros Passos',
      icon: <Book className="h-5 w-5" />,
      questions: [
        {
          id: 'setup-1',
          question: 'Como configurar meu primeiro sistema Germinah?',
          answer: 'Para configurar seu sistema, você precisará de: garrafas PET, sensor de umidade, Arduino, bomba de água e mangueiras. Siga o guia de montagem disponível na seção "Como Funciona" do site principal.'
        },
        {
          id: 'setup-2',
          question: 'Quais materiais preciso para montar o sistema?',
          answer: 'Lista completa: 4-6 garrafas PET de 2L, 1 Arduino Uno, 1 sensor de umidade do solo, 1 bomba de água 12V, mangueiras, conectores, protoboard e cabos jumper. Custo total entre R$ 80-150.'
        },
        {
          id: 'setup-3',
          question: 'Como conectar o sistema à internet?',
          answer: 'Use um módulo ESP32 ou ESP8266 para conectividade Wi-Fi. Configure as credenciais da rede no código Arduino e sincronize com o aplicativo através do menu de configurações.'
        }
      ]
    },
    {
      title: 'Irrigação e Sensores',
      icon: <HelpCircle className="h-5 w-5" />,
      questions: [
        {
          id: 'irrigation-1',
          question: 'Por que meu sistema não está irrigando automaticamente?',
          answer: 'Verifique: 1) Se a irrigação automática está ativada nas configurações, 2) Se o sensor de umidade está funcionando corretamente, 3) Se há água no reservatório, 4) Se a bomba está conectada adequadamente.'
        },
        {
          id: 'irrigation-2',
          question: 'Como calibrar o sensor de umidade?',
          answer: 'Coloque o sensor em solo completamente seco (0%) e depois em água (100%). Ajuste os valores no código Arduino conforme essas leituras para obter medições precisas.'
        },
        {
          id: 'irrigation-3',
          question: 'Qual a frequência ideal de irrigação?',
          answer: 'Depende da planta e clima. Geralmente, verificações a cada 30 minutos são suficientes. Configure umidade mínima entre 40-50% para a maioria das plantas.'
        }
      ]
    },
    {
      title: 'Aplicativo e Monitoramento',
      icon: <Video className="h-5 w-5" />,
      questions: [
        {
          id: 'app-1',
          question: 'Como sincronizar dados entre o sistema e o app?',
          answer: 'Certifique-se de que o Arduino está conectado à internet. Os dados são enviados automaticamente a cada leitura do sensor. Verifique a conexão Wi-Fi se os dados não estiverem atualizando.'
        },
        {
          id: 'app-2',
          question: 'Por que não recebo notificações?',
          answer: 'Verifique se as notificações estão habilitadas nas configurações do app e do navegador. Para notificações por email, confirme se o endereço está correto em sua conta.'
        },
        {
          id: 'app-3',
          question: 'Como interpretar os gráficos de umidade?',
          answer: 'O gráfico mostra a variação da umidade ao longo do tempo. Picos indicam irrigações, vales mostram quando a planta absorveu água. Uma linha estável indica boa calibração.'
        }
      ]
    },
    {
      title: 'Problemas Técnicos',
      icon: <MessageCircle className="h-5 w-5" />,
      questions: [
        {
          id: 'tech-1',
          question: 'O sistema não liga ou não responde',
          answer: 'Verifique: 1) Alimentação elétrica, 2) Conexões dos cabos, 3) Se o código foi carregado corretamente no Arduino, 4) Se não há curto-circuito nos componentes.'
        },
        {
          id: 'tech-2',
          question: 'Leituras de umidade inconsistentes',
          answer: 'Pode ser devido a: sensor mal posicionado, solo muito compactado, interferência elétrica ou sensor danificado. Teste o sensor em diferentes condições para verificar.'
        },
        {
          id: 'tech-3',
          question: 'Bomba de água não funciona',
          answer: 'Verifique: 1) Alimentação da bomba (12V), 2) Conexão com o relé, 3) Se não há obstrução nas mangueiras, 4) Se a bomba não está danificada.'
        }
      ]
    }
  ];

  const tutorials = [
    {
      title: 'Montagem Completa do Sistema',
      description: 'Guia passo a passo para montar seu primeiro sistema Germinah',
      duration: '15 min',
      type: 'video',
      link: '#'
    },
    {
      title: 'Configuração do Arduino',
      description: 'Como programar e configurar o microcontrolador',
      duration: '8 min',
      type: 'video',
      link: '#'
    },
    {
      title: 'Calibração de Sensores',
      description: 'Aprenda a calibrar sensores para leituras precisas',
      duration: '5 min',
      type: 'tutorial',
      link: '#'
    },
    {
      title: 'Manutenção Preventiva',
      description: 'Dicas para manter seu sistema funcionando perfeitamente',
      duration: '10 min',
      type: 'tutorial',
      link: '#'
    }
  ];

  const filteredFaqs = faqCategories.map(category => ({
    ...category,
    questions: category.questions.filter(
      q => q.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
           q.answer.toLowerCase().includes(searchTerm.toLowerCase())
    )
  })).filter(category => category.questions.length > 0);

  const toggleFaq = (id: string) => {
    setExpandedFaq(expandedFaq === id ? null : id);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Central de Ajuda</h1>
        <p className="text-gray-600">Encontre respostas para suas dúvidas sobre o sistema Germinah</p>
      </div>

      {/* Search */}
      <div className="relative max-w-2xl mx-auto">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
        <input
          type="text"
          placeholder="Buscar por dúvidas, problemas ou tutoriais..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
        />
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 border border-green-200">
          <div className="flex items-center mb-4">
            <div className="bg-green-100 p-3 rounded-lg mr-4">
              <Book className="h-6 w-6 text-green-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900">Guia de Início</h3>
          </div>
          <p className="text-gray-600 text-sm mb-4">
            Aprenda a configurar e usar seu sistema Germinah do zero
          </p>
          <button className="text-green-600 font-medium text-sm hover:text-green-700 flex items-center">
            Começar agora
            <ExternalLink className="h-4 w-4 ml-1" />
          </button>
        </div>

        <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-6 border border-blue-200">
          <div className="flex items-center mb-4">
            <div className="bg-blue-100 p-3 rounded-lg mr-4">
              <Video className="h-6 w-6 text-blue-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900">Tutoriais em Vídeo</h3>
          </div>
          <p className="text-gray-600 text-sm mb-4">
            Assista tutoriais práticos sobre montagem e manutenção
          </p>
          <button className="text-blue-600 font-medium text-sm hover:text-blue-700 flex items-center">
            Ver vídeos
            <ExternalLink className="h-4 w-4 ml-1" />
          </button>
        </div>

        <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6 border border-purple-200">
          <div className="flex items-center mb-4">
            <div className="bg-purple-100 p-3 rounded-lg mr-4">
              <MessageCircle className="h-6 w-6 text-purple-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900">Suporte Direto</h3>
          </div>
          <p className="text-gray-600 text-sm mb-4">
            Entre em contato com nossa equipe de suporte
          </p>
          <button className="text-purple-600 font-medium text-sm hover:text-purple-700 flex items-center">
            Falar conosco
            <ExternalLink className="h-4 w-4 ml-1" />
          </button>
        </div>
      </div>

      {/* Tutorials Section */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Tutoriais Recomendados</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {tutorials.map((tutorial, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-all duration-300">
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 mb-1">{tutorial.title}</h3>
                  <p className="text-gray-600 text-sm">{tutorial.description}</p>
                </div>
                <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                  tutorial.type === 'video' 
                    ? 'bg-red-100 text-red-700' 
                    : 'bg-blue-100 text-blue-700'
                }`}>
                  {tutorial.type === 'video' ? 'Vídeo' : 'Tutorial'}
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-500 text-sm">{tutorial.duration}</span>
                <button className="text-green-600 font-medium text-sm hover:text-green-700 flex items-center">
                  Assistir
                  <ExternalLink className="h-4 w-4 ml-1" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* FAQ Section */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Perguntas Frequentes</h2>
        
        {filteredFaqs.length === 0 ? (
          <div className="text-center py-8">
            <HelpCircle className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Nenhuma pergunta encontrada</h3>
            <p className="text-gray-600">Tente usar termos diferentes na busca</p>
          </div>
        ) : (
          <div className="space-y-6">
            {filteredFaqs.map((category) => (
              <div key={category.title}>
                <div className="flex items-center mb-4">
                  <div className="bg-gray-100 p-2 rounded-lg mr-3">
                    {category.icon}
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900">{category.title}</h3>
                </div>
                
                <div className="space-y-3">
                  {category.questions.map((faq) => (
                    <div key={faq.id} className="border border-gray-200 rounded-lg">
                      <button
                        onClick={() => toggleFaq(faq.id)}
                        className="w-full px-4 py-3 text-left flex items-center justify-between hover:bg-gray-50 transition-colors duration-200"
                      >
                        <span className="font-medium text-gray-900">{faq.question}</span>
                        {expandedFaq === faq.id ? (
                          <ChevronDown className="h-5 w-5 text-gray-500" />
                        ) : (
                          <ChevronRight className="h-5 w-5 text-gray-500" />
                        )}
                      </button>
                      
                      {expandedFaq === faq.id && (
                        <div className="px-4 pb-4">
                          <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Contact Support */}
      <div className="bg-gradient-to-r from-green-600 to-emerald-600 rounded-xl p-6 text-white">
        <div className="text-center">
          <h2 className="text-xl font-bold mb-2">Ainda precisa de ajuda?</h2>
          <p className="text-green-100 mb-6">
            Nossa equipe está pronta para ajudar você com qualquer dúvida
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-md mx-auto">
            <a
              href="mailto:suporte@germinah.com.br"
              className="bg-white/20 backdrop-blur-sm rounded-lg p-4 hover:bg-white/30 transition-all duration-300 flex items-center justify-center"
            >
              <Mail className="h-5 w-5 mr-2" />
              Email
            </a>
            <a
              href="tel:+5511999999999"
              className="bg-white/20 backdrop-blur-sm rounded-lg p-4 hover:bg-white/30 transition-all duration-300 flex items-center justify-center"
            >
              <Phone className="h-5 w-5 mr-2" />
              Telefone
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Help;