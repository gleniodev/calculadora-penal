"use client";

import React, { useState, useMemo } from "react";
import { Copy, Trash2, Scale, FileText, Eye } from "lucide-react";

const CRIMES = {
  "II - CRIMES CONTRA A VIDA": [
    {
      id: "art3",
      label: "Art. 3 - Tentativa de Homicídio",
      pena: 15,
      multa: 0,
    },
    { id: "art6", label: "Art. 6 - Homicídio Culposo", pena: 25, multa: 0 },
    { id: "art7", label: "Art. 7 - Homicídio Doloso", pena: 30, multa: 0 },
    { id: "art8", label: "Art. 8 - Latrocínio", pena: 30, multa: 0 },
    { id: "art9", label: "Art. 9 - Lesão Corporal", pena: 15, multa: 0 },
  ],
  "III - CRIMES CONTRA DIREITOS FUNDAMENTAIS": [
    { id: "art10", label: "Art. 10 - Sequestro", pena: 20, multa: 0 },
    { id: "art11", label: "Art. 11 - Cárcere Privado", pena: 20, multa: 0 },
    { id: "art12", label: "Art. 12 - Crueldade Animal", pena: 15, multa: 0 },
    { id: "art13", label: "Art. 13 - Omissão de Socorro", pena: 20, multa: 0 },
  ],
  "IV - CRIMES CONTRA A HONRA": [
    { id: "art14", label: "Art. 14 - Difamação", pena: 15, multa: 0 },
    { id: "art15", label: "Art. 15 - Calúnia", pena: 15, multa: 0 },
    { id: "art16", label: "Art. 16 - Injúria", pena: 20, multa: 0 },
    { id: "art17", label: "Art. 17 - Ato Obsceno", pena: 15, multa: 0 },
    { id: "art18", label: "Art. 18 - Atentado ao Pudor", pena: 20, multa: 0 },
  ],
  "V - CRIMES CONTRA O PATRIMÔNIO": [
    { id: "art19", label: "Art. 19 - Roubo", pena: 20, multa: 0 },
    { id: "art20", label: "Art. 20 - Furto", pena: 15, multa: 0 },
    {
      id: "art21",
      label: "Art. 21 - Extorsão Mediante Sequestro",
      pena: 30,
      multa: 0,
    },
    { id: "art22", label: "Art. 22 - Estelionato", pena: 15, multa: 0 },
    { id: "art23", label: "Art. 23 - Dano ao Patrimônio", pena: 15, multa: 0 },
    {
      id: "art24",
      label: "Art. 24 - Invasão à Propriedade",
      pena: 30,
      multa: 0,
    },
    {
      id: "art25",
      label: "Art. 25 - Lavagem ou Ocultação de Bens",
      pena: 20,
      multa: 0,
    },
    { id: "art26", label: "Art. 26 - Receptação", pena: 20, multa: 0 },
    { id: "art27", label: "Art. 27 - Danos Morais", pena: 15, multa: 0 },
  ],
  "VI - CRIMES CONTRA A ADMINISTRAÇÃO PÚBLICA": [
    { id: "art28", label: "Art. 28 - Desacato", pena: 15, multa: 0 },
    { id: "art29", label: "Art. 29 - Desobediência", pena: 20, multa: 0 },
    {
      id: "art30",
      label: "Art. 30 - Resistência à Prisão",
      pena: 20,
      multa: 0,
    },
    {
      id: "art31",
      label: "Art. 31 - Fuga de Pessoa Presa",
      pena: 15,
      multa: 0,
    },
    { id: "art32", label: "Art. 32 - Corrupção Passiva", pena: 20, multa: 0 },
    { id: "art33", label: "Art. 33 - Corrupção Ativa", pena: 20, multa: 0 },
    { id: "art34", label: "Art. 34 - Prevaricação", pena: 20, multa: 0 },
    { id: "art35", label: "Art. 35 - Falsa Identidade", pena: 50, multa: 0 },
    {
      id: "art36",
      label: "Art. 36 - Falsa Comunicação de Crime",
      pena: 10,
      multa: 0,
    },
    {
      id: "art37",
      label: "Art. 37 - Usurpação de Função Pública",
      pena: 0,
      multa: 0,
    },
    {
      id: "art38",
      label: "Art. 38 - Abolição Violenta do Estado",
      pena: 30,
      multa: 0,
    },
    {
      id: "art40",
      label: "Art. 40 - Obstrução de Justiça",
      pena: 30,
      multa: 0,
    },
    { id: "art41", label: "Art. 41 - Falso Testemunho", pena: 20, multa: 0 },
  ],
  "VII - CRIMES CONTRA A ORDEM PÚBLICA": [
    {
      id: "art42",
      label: "Art. 42 - Posse Ilegal de Armas",
      pena: 15,
      multa: 0,
    },
    {
      id: "art43",
      label: "Art. 43 - Transitar com Armas em Processos",
      pena: 10,
      multa: 0,
    },
    {
      id: "art44",
      label: "Art. 44 - Posse Ilegal em Zonas Populares",
      pena: 15,
      multa: 0,
    },
    {
      id: "art45",
      label: "Art. 45 - Posse de Substâncias Ilegais",
      pena: 10,
      multa: 0,
    },
    {
      id: "art46",
      label: "Art. 46 - Associação Criminosa",
      pena: 20,
      multa: 0,
    },
    {
      id: "art47",
      label: "Art. 47 - Disparo de Arma de Fogo",
      pena: 15,
      multa: 0,
    },
    { id: "art48", label: "Art. 48 - Desordem Social", pena: 20, multa: 0 },
    {
      id: "art49",
      label: "Art. 49 - Excesso de Velocidade",
      pena: 5,
      multa: 0,
    },
  ],
};

export default function PenalCalculator() {
  const [nomeMilitar, setNomeMilitar] = useState("");
  const [nomePreso, setNomePreso] = useState("");
  const [rgPreso, setrgPreso] = useState("");
  const [idAdvogado, setIdAdvogado] = useState("");
  const [selectedCrimes, setSelectedCrimes] = useState({});
  const [itensApreendidos, setItensApreendidos] = useState("");
  const [dinheiroSujo, setDinheiroSujo] = useState("");
  const [atenuantes, setAtenuantes] = useState({
    reducao20: false,
    reducao10: false,
  });
  const [agravantes, setAgravantes] = useState({
    reincidente: false,
    mauComportamento: false,
  });
  const [outros, setOutros] = useState({
    mandadoBusca: false,
    porteArma: false,
    fianca: false,
    reanimado: false,
  });

  const handleCrimeToggle = (crimeId) => {
    setSelectedCrimes((prev) => ({
      ...prev,
      [crimeId]: !prev[crimeId],
    }));
  };

  const { totalPena, totalMulta, crimesComitidos } = useMemo(() => {
    let pena = 0;
    let multa = 0;
    const crimes = [];

    Object.entries(CRIMES).forEach(([_, crimesList]) => {
      crimesList.forEach((crime) => {
        if (selectedCrimes[crime.id]) {
          pena += crime.pena;
          multa += crime.multa;
          crimes.push(crime.label);
        }
      });
    });

    let penalFinal = pena;

    if (atenuantes.reducao20) penalFinal *= 0.8;
    if (atenuantes.reducao10) penalFinal *= 0.9;
    if (agravantes.reincidente) penalFinal *= 1.1;
    if (agravantes.mauComportamento) penalFinal *= 1.2;

    return {
      totalPena: Math.round(penalFinal),
      totalMulta: multa,
      crimesComitidos: crimes,
    };
  }, [selectedCrimes, atenuantes, agravantes]);

  const handleCopiar = () => {
    let texto = `📋 **RELATÓRIO DE PRISÃO - CAVALARIA ATLANTA**\n\n`;

    texto += `🪖 **MILITAR QUE PRENDEU:**\n`;
    texto += `Nome: ${nomeMilitar || "Não informado"}\n`;

    texto += `👤 **DADOS DO PRESO**\n`;
    texto += `Nome: ${nomePreso || "Não informado"}\n`;
    texto += `RG: ${rgPreso || "Não informado"}\n`;
    if (idAdvogado) texto += `Advogado ID: ${idAdvogado}\n`;
    texto += `\n`;

    texto += `⚖️ **CRIMES COMETIDOS**\n`;
    if (crimesComitidos.length > 0) {
      crimesComitidos.forEach((crime) => {
        texto += `• ${crime}\n`;
      });
    } else {
      texto += `• Nenhum crime selecionado\n`;
    }
    texto += `\n`;

    if (itensApreendidos) {
      texto += `📦 **ITENS APREENDIDOS**\n${itensApreendidos}\n\n`;
    }

    if (
      outros.mandadoBusca ||
      outros.porteArma ||
      outros.fianca ||
      outros.reanimado
    ) {
      texto += `📌 **OBSERVAÇÕES**\n`;
      if (outros.mandadoBusca) texto += `• Mandado de busca e apreensão\n`;
      if (outros.porteArma) texto += `🔫 Possui porte de arma\n`;
      if (outros.fianca) texto += `💵 Fiança disponível\n`;
      if (outros.reanimado) texto += `🔄 Reanimado (obrigatório)\n`;
      texto += `\n`;
    }

    if (atenuantes.reducao20 || atenuantes.reducao10) {
      texto += `✅ **ATENUANTES**\n`;
      if (atenuantes.reducao20)
        texto += `• Bom comportamento: Redução de 20%\n`;
      if (atenuantes.reducao10) texto += `• Réu primário: Redução de 10%\n`;
      texto += `\n`;
    }

    if (agravantes.reincidente || agravantes.mauComportamento) {
      texto += `❌ **AGRAVANTES**\n`;
      if (agravantes.reincidente)
        texto += `• Réu reincidente: Aumento de 10%\n`;
      if (agravantes.mauComportamento)
        texto += `• Mau comportamento: Aumento de 20%\n`;
      texto += `\n`;
    }

    texto += `═══════════════════\n`;
    texto += `⏱️ **PENA TOTAL:** ${totalPena} meses\n`;
    if (totalMulta > 0) texto += `💰 **MULTA:** R$ ${totalMulta.toFixed(2)}\n`;
    if (dinheiroSujo) texto += `💵 **DINHEIRO SUJO:** $ ${dinheiroSujo}\n`;
    texto += `═══════════════════`;

    navigator.clipboard.writeText(texto);
    alert("Relatório copiado para a área de transferência!");
  };

  const handleLimpar = () => {
    setNomeMilitar("");
    setNomePreso("");
    setrgPreso("");
    setIdAdvogado("");
    setSelectedCrimes({});
    setItensApreendidos("");
    setDinheiroSujo("");
    setAtenuantes({ reducao20: false, reducao10: false });
    setAgravantes({ reincidente: false, mauComportamento: false });
    setOutros({
      mandadoBusca: false,
      porteArma: false,
      fianca: false,
      reanimado: false,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-4 md:p-8">
      <div className="max-w-[1800px] mx-auto">
        {/* Header */}
        <div className="bg-gradient-to-r from-yellow-50 to-yellow-100 rounded-2xl p-6 shadow-xl border-b-4 border-yellow-600 mb-6">
          <div className="flex items-center justify-center gap-3">
            <Scale className="w-10 h-10 text-yellow-400" />
            <div className="flex items-center justify-center gap-3 text-center">
              <h1 className="text-3xl font-bold text-slate-800">
                Cavalaria Atlanta
              </h1>
              <h2 className="text-slate-500 text-lg mt-1">
                - Sistema Judicial (Código Penal 1899)
              </h2>
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Coluna Principal - Formulário */}
          <div className="flex-1 bg-slate-800 rounded-2xl shadow-2xl p-6 border border-slate-700">
            {/* Dados do Preso */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Nome do Militar
                </label>
                <input
                  type="text"
                  value={nomeMilitar}
                  onChange={(e) => setNomeMilitar(e.target.value)}
                  className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:ring-2  focus:border-transparent"
                  placeholder="Patente e nome (conforme discord)"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Nome do Preso
                </label>
                <input
                  type="text"
                  value={nomePreso}
                  onChange={(e) => setNomePreso(e.target.value)}
                  className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:ring-2  focus:border-transparent"
                  placeholder="Digite o nome do Preso"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  RG do Preso
                </label>
                <input
                  type="text"
                  value={rgPreso}
                  onChange={(e) => setrgPreso(e.target.value)}
                  className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:ring-2  focus:border-transparent"
                  placeholder="Digite o RG do Preso"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  ID do Advogado
                </label>
                <input
                  type="text"
                  value={idAdvogado}
                  onChange={(e) => setIdAdvogado(e.target.value)}
                  className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:ring-2  focus:border-transparent"
                  placeholder="ID (opcional)"
                />
              </div>
            </div>

            {/* Crimes */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              {Object.entries(CRIMES).map(([categoria, crimes]) => (
                <div
                  key={categoria}
                  className="bg-slate-700 rounded-lg p-4 border border-slate-600"
                >
                  <h3 className="text-sm font-bold text-yellow-100 mb-3 border-b border-slate-600 pb-2">
                    {categoria}
                  </h3>
                  <div className="space-y-2">
                    {crimes.map((crime) => (
                      <label
                        key={crime.id}
                        className="flex items-start gap-2 cursor-pointer hover:bg-slate-600 p-2 rounded transition-colors"
                      >
                        <div className="flex space-y-2 items-center">
                          <input
                            type="checkbox"
                            checked={selectedCrimes[crime.id] || false}
                            onChange={() => handleCrimeToggle(crime.id)}
                            className="mt-1 w-4 h-4 mr-2 text-red-600 bg-slate-600 border-slate-500 rounded "
                          />
                          <span className="text-xs text-slate-200 leading-tight">
                            {crime.label}
                          </span>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Modificadores */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-slate-700 rounded-lg p-4 border border-slate-600">
                <h3 className="text-sm font-bold text-green-400 mb-2">
                  ✅ Atenuantes
                </h3>
                <label className="flex items-center gap-2 cursor-pointer mb-2">
                  <input
                    type="checkbox"
                    checked={atenuantes.reducao20}
                    onChange={(e) =>
                      setAtenuantes({
                        ...atenuantes,
                        reducao20: e.target.checked,
                      })
                    }
                    className="w-4 h-4 text-green-600 bg-slate-600 border-slate-500 rounded"
                  />
                  <span className="text-sm text-slate-200">
                    Bom Comportamento (-20%)
                  </span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={atenuantes.reducao10}
                    onChange={(e) =>
                      setAtenuantes({
                        ...atenuantes,
                        reducao10: e.target.checked,
                      })
                    }
                    className="w-4 h-4 text-green-600 bg-slate-600 border-slate-500 rounded"
                  />
                  <span className="text-sm text-slate-200">
                    Réu Primário (-10%)
                  </span>
                </label>
              </div>

              <div className="bg-slate-700 rounded-lg p-4 border border-slate-600">
                <h3 className="text-sm font-bold text-red-600 mb-2">
                  ❌ Agravantes
                </h3>
                <label className="flex items-center gap-2 cursor-pointer mb-2">
                  <input
                    type="checkbox"
                    checked={agravantes.reincidente}
                    onChange={(e) =>
                      setAgravantes({
                        ...agravantes,
                        reincidente: e.target.checked,
                      })
                    }
                    className="w-4 h-4 text-orange-600 bg-slate-600 border-slate-500 rounded"
                  />
                  <span className="text-sm text-slate-200">
                    Réu Reincidente (+10%)
                  </span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={agravantes.mauComportamento}
                    onChange={(e) =>
                      setAgravantes({
                        ...agravantes,
                        mauComportamento: e.target.checked,
                      })
                    }
                    className="w-4 h-4 text-orange-600 bg-slate-600 border-slate-500 rounded"
                  />
                  <span className="text-sm text-slate-200">
                    Mau Comportamento (+20%)
                  </span>
                </label>
              </div>

              <div className="bg-slate-700 rounded-lg p-4 border border-slate-600">
                <h3 className="text-sm font-bold text-blue-400 mb-2">
                  📌 Outros
                </h3>
                <div className="space-y-2">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={outros.mandadoBusca}
                      onChange={(e) =>
                        setOutros({ ...outros, mandadoBusca: e.target.checked })
                      }
                      className="w-4 h-4 text-blue-600 bg-slate-600 border-slate-500 rounded"
                    />
                    <span className="text-xs text-slate-200">
                      🔍 Mandado de Busca
                    </span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={outros.porteArma}
                      onChange={(e) =>
                        setOutros({ ...outros, porteArma: e.target.checked })
                      }
                      className="w-4 h-4 text-blue-600 bg-slate-600 border-slate-500 rounded"
                    />
                    <span className="text-xs text-slate-200">
                      🔫 Porte de Arma
                    </span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={outros.fianca}
                      onChange={(e) =>
                        setOutros({ ...outros, fianca: e.target.checked })
                      }
                      className="w-4 h-4 text-blue-600 bg-slate-600 border-slate-500 rounded"
                    />
                    <span className="text-xs text-slate-200">💵 Fiança</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={outros.reanimado}
                      onChange={(e) =>
                        setOutros({ ...outros, reanimado: e.target.checked })
                      }
                      className="w-4 h-4 text-blue-600 bg-slate-600 border-slate-500 rounded"
                    />
                    <span className="text-xs text-slate-200">🔄 Reanimado</span>
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* Coluna Lateral - Pré-visualização */}
          <div className="lg:w-96 space-y-4">
            {/* Pré-visualização */}
            <div className="bg-slate-800 rounded-2xl shadow-2xl p-6 border border-slate-700 sticky top-4">
              <div className="flex items-center gap-2 mb-4 pb-3 border-b border-slate-700">
                <Eye className="w-5 h-5 text-red-400" />
                <h2 className="text-lg font-bold text-white">
                  Pré-visualização
                </h2>
              </div>

              <div className="bg-slate-900 rounded-lg p-4 mb-4 max-h-64 overflow-y-auto border border-slate-700">
                <h3 className="text-xs font-bold text-red-400 mb-2">
                  ⚖️ CRIMES SELECIONADOS
                </h3>
                {crimesComitidos.length > 0 ? (
                  <ul className="space-y-1">
                    {crimesComitidos.map((crime, index) => (
                      <li
                        key={index}
                        className="text-xs text-slate-300 flex items-start gap-2"
                      >
                        <span className="text-red-400 mt-1">•</span>
                        <span>{crime}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-xs text-slate-500 italic">
                    Nenhum crime selecionado
                  </p>
                )}
              </div>

              {/* Itens Apreendidos */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  📦 Itens Apreendidos
                </label>
                <textarea
                  value={itensApreendidos}
                  onChange={(e) => setItensApreendidos(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white text-sm focus:ring-2  h-24 resize-none"
                  placeholder="Liste os itens..."
                />
              </div>

              {/* Dinheiro Sujo */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  💵 Dinheiro Sujo
                </label>
                <input
                  type="text"
                  value={dinheiroSujo}
                  onChange={(e) => setDinheiroSujo(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white text-sm focus:ring-2 "
                  placeholder="R$ 0,00"
                />
              </div>

              {/* Painel de Pena Total */}
              <div className="bg-gradient-to-br from-red-900 to-red-800 rounded-xl p-5 border-2 border-red-600 shadow-lg mb-4">
                <div className="text-center mb-3">
                  <p className="text-slate-300 text-xs mb-1">PENA TOTAL</p>
                  <p className="text-4xl font-bold text-white">{totalPena}</p>
                  <p className="text-slate-200 text-sm">meses</p>
                </div>
                {totalMulta > 0 && (
                  <div className="text-center border-t border-red-700 pt-3">
                    <p className="text-slate-300 text-xs mb-1">MULTA</p>
                    <p className="text-2xl font-bold text-yellow-400">
                      R$ {totalMulta.toFixed(2)}
                    </p>
                  </div>
                )}
              </div>

              {/* Botões de Ação */}
              <div className="space-y-2">
                <button
                  onClick={handleCopiar}
                  className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-bold py-3 px-4 rounded-lg transition-all duration-200 flex items-center justify-center gap-2 shadow-lg"
                >
                  <Copy className="w-4 h-4" />
                  Copiar Relatório
                </button>
                <button
                  onClick={handleLimpar}
                  className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-bold py-3 px-4 rounded-lg transition-all duration-200 flex items-center justify-center gap-2 shadow-lg"
                >
                  <Trash2 className="w-4 h-4" />
                  Limpar Tudo
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-center w-full center mt-4">
        <p>Created by Winters Wyatt</p>
      </div>
    </div>
  );
}
