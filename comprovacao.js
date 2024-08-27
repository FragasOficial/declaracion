// document.addEventListener('DOMContentLoaded', function () {
//     const temPaiSelect = document.getElementById('temPai');
//     const nomePaiInput = document.getElementById('nomePai');
//     const headerImg = document.getElementById('headerImg');
//     const anosSelect = document.getElementById('anos');
//     const anoCursadoSelect = document.getElementById('anoCursado');

//     // Ajustar a altura da imagem para 80% da largura
//     headerImg.style.height = (headerImg.width * 0.8) + 'px';

//     // Mostrar ou esconder o campo "Nome do Pai" baseado na seleção "Tem Pai?"
//     temPaiSelect.addEventListener('change', function () {
//         if (temPaiSelect.value === 'sim') {
//             nomePaiInput.style.display = 'block';
//             nomePaiInput.required = true;
//         } else {
//             nomePaiInput.style.display = 'none';
//             nomePaiInput.required = false;
//         }
//     });

//     // Inicializa a exibição do campo "Nome do Pai"
//     if (temPaiSelect.value === 'sim') {
//         nomePaiInput.style.display = 'block';
//     } else {
//         nomePaiInput.style.display = 'none';
//     }

//     // Evento de mudança para ajustar as opções de "Ano Cursado" com base no "Ano de Conclusão"
//     anosSelect.addEventListener('change', function () {
//         const selectedAno = parseInt(anosSelect.value);
        
//         // Limpar opções atuais
//         anoCursadoSelect.innerHTML = '';

//         if (selectedAno < 2007) {
//             // Adicionar séries em vez de anos
//             const series = [
//                 "1ª série", "2ª série", "3ª série", "4ª série", "5ª série",
//                 "6ª série", "7ª série", "8ª série"
//             ];

//             series.forEach(serie => {
//                 const option = document.createElement('option');
//                 option.value = serie;
//                 option.textContent = serie;
//                 anoCursadoSelect.appendChild(option);
//             });
//         } else {
//             // Adicionar anos
//             const anos = [
//                 "1º ano", "2º ano", "3º ano", "4º ano", "5º ano",
//                 "6º ano", "7º ano", "8º ano", "9º ano"
//             ];

//             anos.forEach(ano => {
//                 const option = document.createElement('option');
//                 option.value = ano;
//                 option.textContent = ano;
//                 anoCursadoSelect.appendChild(option);
//             });
//         }
//     });

//     // Lógica para confirmar os dados e gerar a declaração
//     document.getElementById('declaracaoForm').addEventListener('submit', function (event) {
//         event.preventDefault();  // Evitar o envio do formulário padrão

//         // Capturar os valores do formulário e transformar em maiúsculas
//         const nomeCompleto = document.getElementById('nomeCompleto').value.toUpperCase();
//         const dataNascimento = document.getElementById('dataNascimento').value;
//         const anoCursado = anoCursadoSelect.value;
//         const selectedAno = anosSelect.value;
//         const nomeMae = document.getElementById('nomeMae').value.toUpperCase();
//         const sexo = document.getElementById('sexo').value;
//         const temPai = temPaiSelect.value;
//         const nomePai = temPai === 'sim' ? nomePaiInput.value.toUpperCase() : '';
//         const dataAtual = new Date().toLocaleDateString('pt-BR');
//         const local = "Sítio Oiticica, Frecheirinha - CE";

//         // Corrigir a data de nascimento para evitar erro de fuso horário
//         const [ano, mes, dia] = dataNascimento.split('-');
//         const dataNascimentoCorrigida = new Date(ano, mes - 1, dia).toLocaleDateString('pt-BR');

//         // Determinar o tipo de ensino fundamental ou série
//         let ensinoFundamental = '';
//         if (selectedAno < 2007) {
//             if (["1ª série", "2ª série", "3ª série", "4ª série"].includes(anoCursado)) {
//                 ensinoFundamental = 'fundamental I';
//             } else if (["5ª série", "6ª série", "7ª série", "8ª série"].includes(anoCursado)) {
//                 ensinoFundamental = 'fundamental II';
//             }
//         } else {
//             if (["1º ano", "2º ano", "3º ano", "4º ano", "5º ano"].includes(anoCursado)) {
//                 ensinoFundamental = 'fundamental I';
//             } else if (["6º ano", "7º ano", "8º ano", "9º ano"].includes(anoCursado)) {
//                 ensinoFundamental = 'fundamental II';
//             }
//         }

//         // Exibir uma tela de confirmação dos dados
//         const confirmationMessage = `
//             Confirme os dados abaixo:
//             Nome Completo: ${nomeCompleto}
//             Data de Nascimento: ${dataNascimentoCorrigida}
//             Ano de Conclusão: ${selectedAno}
//             ${anoCursado.includes('ano') || anoCursado.includes('série') ? `Ano/Série Cursada: ${anoCursado}` : `Ano Cursado: ${anoCursado}`}
//             Ensino: ${ensinoFundamental}
//             Nome da Mãe: ${nomeMae}
//             ${temPai === 'sim' ? `Nome do Pai: ${nomePai}` : ''}
//             Sexo: ${sexo}
//             Data Atual: ${dataAtual}
//             Local: ${local}
//         `;
//         if (confirm(confirmationMessage)) {
//             // Se o usuário confirmar, gerar o PDF
//             generatePDF({
//                 nomeCompleto,
//                 dataNascimento: dataNascimentoCorrigida,
//                 anoCursado,
//                 nomeMae,
//                 sexo,
//                 temPai,
//                 nomePai,
//                 dataAtual,
//                 local,
//                 ensinoFundamental,
//                 selectedAno // Adicionando o ano de conclusão
//             });
//         } else {
//             // Caso contrário, permitir que o usuário corrija os dados
//             alert("Por favor, corrija os dados necessários.");
//         }
//     });

//     function generatePDF({ nomeCompleto, dataNascimento, anoCursado, nomeMae, sexo, temPai, nomePai, dataAtual, local, ensinoFundamental, selectedAno }) {
//         // Gerar o PDF usando jsPDF
//         const { jsPDF } = window.jspdf;
//         const doc = new jsPDF();

//         // Adiciona o cabeçalho com a imagem
//         doc.addImage('./img/header-declaration.png', 'PNG', 20, 10, 170, 60);

//         // Título
//         doc.setFontSize(18);
//         doc.text("DECLARAÇÃO", 105, 90, null, null, 'center');

//         // Corpo do PDF - Justificado e alinhado
//         doc.setFontSize(12);
//         const bodyText = `Declaro para os devidos fins de prova que ${nomeCompleto}, nascid${sexo === 'masculino' ? 'o' : 'a'} dia ${dataNascimento}, filh${sexo === 'masculino' ? 'o' : 'a'} de ${nomeMae}${temPai === 'sim' ? ` e ${nomePai}` : ''}, cursou ${selectedAno < 2007 ? 'a' : 'o'} ${anoCursado.includes('ano') || anoCursado.includes('série') ? `${anoCursado} do ensino ${ensinoFundamental}` : anoCursado} neste estabelecimento de ensino no ano ${selectedAno}.`;
//         const marginLeft = 20;
//         const marginRight = 20;
//         const pageWidth = doc.internal.pageSize.getWidth();
//         const textWidth = pageWidth - marginLeft - marginRight;

//         doc.text(bodyText, marginLeft, 105, { align: 'justify', maxWidth: textWidth });
//         doc.setFont(undefined, 'normal');  // Volta ao peso normal da fonte

//         // Desfecho
//         doc.text('O referido é verdade e dou fé.', 20, 125, { align: 'left', maxWidth: textWidth });

//         // Data e Local
//         doc.text(`${local}, ${dataAtual}`, 109, 150, { align: 'left', maxWidth: textWidth });

//         // Assinatura
//         doc.text("______________________________________________", 105, 205, null, null, 'center');
//         doc.text("Sílvia Regina Cunha Brandão Silva", 105, 210, null, null, 'center');
//         doc.text("Diretora", 105, 215, null, null, 'center');

//         // Gerar o PDF
//         doc.save('declaracao.pdf');
//     }
// });

document.addEventListener('DOMContentLoaded', function () {
    const temPaiSelect = document.getElementById('temPai');
    const nomePaiInput = document.getElementById('nomePai');
    const headerImg = document.getElementById('headerImg');
    const anosSelect = document.getElementById('anos');
    const anoCursadoSelect = document.getElementById('anoCursado');

    // Ajustar a altura da imagem para 80% da largura
    headerImg.style.height = (headerImg.width * 0.8) + 'px';

    // Mostrar ou esconder o campo "Nome do Pai" baseado na seleção "Tem Pai?"
    temPaiSelect.addEventListener('change', function () {
        if (temPaiSelect.value === 'sim') {
            nomePaiInput.style.display = 'block';
            nomePaiInput.required = true;
        } else {
            nomePaiInput.style.display = 'none';
            nomePaiInput.required = false;
        }
    });

    // Inicializa a exibição do campo "Nome do Pai"
    if (temPaiSelect.value === 'sim') {
        nomePaiInput.style.display = 'block';
    } else {
        nomePaiInput.style.display = 'none';
    }

    // Evento de mudança para ajustar as opções de "Ano Cursado" com base no "Ano de Conclusão"
    anosSelect.addEventListener('change', function () {
        const selectedAno = parseInt(anosSelect.value);
        
        // Limpar opções atuais
        anoCursadoSelect.innerHTML = '';

        if (selectedAno < 2007) {
            // Adicionar séries em vez de anos
            const series = [
                "1ª série", "2ª série", "3ª série", "4ª série", "5ª série",
                "6ª série", "7ª série", "8ª série"
            ];

            series.forEach(serie => {
                const option = document.createElement('option');
                option.value = serie;
                option.textContent = serie;
                anoCursadoSelect.appendChild(option);
            });
        } else {
            // Adicionar anos
            const anos = [
                "1º ano", "2º ano", "3º ano", "4º ano", "5º ano",
                "6º ano", "7º ano", "8º ano", "9º ano"
            ];

            anos.forEach(ano => {
                const option = document.createElement('option');
                option.value = ano;
                option.textContent = ano;
                anoCursadoSelect.appendChild(option);
            });
        }
    });

    // Lógica para confirmar os dados e gerar a declaração
    document.getElementById('declaracaoForm').addEventListener('submit', function (event) {
        event.preventDefault();  // Evitar o envio do formulário padrão

        // Capturar os valores do formulário e transformar em maiúsculas
        const nomeCompleto = document.getElementById('nomeCompleto').value.toUpperCase();
        const dataNascimento = document.getElementById('dataNascimento').value.toUpperCase(); // Captura manual
        const anoCursado = anoCursadoSelect.value;
        const selectedAno = anosSelect.value;
        const nomeMae = document.getElementById('nomeMae').value.toUpperCase();
        const sexo = document.getElementById('sexo').value;
        const temPai = temPaiSelect.value;
        const nomePai = temPai === 'sim' ? nomePaiInput.value.toUpperCase() : '';
        const dataAtual = new Date().toLocaleDateString('pt-BR');
        const local = "Sítio Oiticica, Frecheirinha - CE";

        // Não é mais necessário corrigir a data de nascimento
        const dataNascimentoCorrigida = dataNascimento;

        // Determinar o tipo de ensino fundamental ou série
        let ensinoFundamental = '';
        if (selectedAno < 2007) {
            if (["1ª série", "2ª série", "3ª série", "4ª série"].includes(anoCursado)) {
                ensinoFundamental = 'fundamental I';
            } else if (["5ª série", "6ª série", "7ª série", "8ª série"].includes(anoCursado)) {
                ensinoFundamental = 'fundamental II';
            }
        } else {
            if (["1º ano", "2º ano", "3º ano", "4º ano", "5º ano"].includes(anoCursado)) {
                ensinoFundamental = 'fundamental I';
            } else if (["6º ano", "7º ano", "8º ano", "9º ano"].includes(anoCursado)) {
                ensinoFundamental = 'fundamental II';
            }
        }

        // Exibir uma tela de confirmação dos dados
        const confirmationMessage = `
            Confirme os dados abaixo:
            Nome Completo: ${nomeCompleto}
            Data de Nascimento: ${dataNascimentoCorrigida}
            Ano de Conclusão: ${selectedAno}
            ${anoCursado.includes('ano') || anoCursado.includes('série') ? `Ano/Série Cursada: ${anoCursado}` : `Ano Cursado: ${anoCursado}`}
            Ensino: ${ensinoFundamental}
            Nome da Mãe: ${nomeMae}
            ${temPai === 'sim' ? `Nome do Pai: ${nomePai}` : ''}
            Sexo: ${sexo}
            Data Atual: ${dataAtual}
            Local: ${local}
        `;
        if (confirm(confirmationMessage)) {
            // Se o usuário confirmar, gerar o PDF
            generatePDF({
                nomeCompleto,
                dataNascimento: dataNascimentoCorrigida,
                anoCursado,
                nomeMae,
                sexo,
                temPai,
                nomePai,
                dataAtual,
                local,
                ensinoFundamental,
                selectedAno // Adicionando o ano de conclusão
            });
        } else {
            // Caso contrário, permitir que o usuário corrija os dados
            alert("Por favor, corrija os dados necessários.");
        }
    });

    function generatePDF({ nomeCompleto, dataNascimento, anoCursado, nomeMae, sexo, temPai, nomePai, dataAtual, local, ensinoFundamental, selectedAno }) {
        // Gerar o PDF usando jsPDF
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF();

        // Adiciona o cabeçalho com a imagem
        doc.addImage('./img/header-declaration.png', 'PNG', 20, 10, 170, 60);

        // Título
        doc.setFontSize(18);
        doc.text("DECLARAÇÃO", 105, 90, null, null, 'center');

        // Corpo do PDF - Justificado e alinhado
        doc.setFontSize(12);
        const bodyText = `Declaro para os devidos fins de prova que ${nomeCompleto}, nascid${sexo === 'masculino' ? 'o' : 'a'} dia ${dataNascimento}, filh${sexo === 'masculino' ? 'o' : 'a'} de ${nomeMae}${temPai === 'sim' ? ` e ${nomePai}` : ''}, cursou ${selectedAno < 2007 ? 'a' : 'o'} ${anoCursado.includes('ano') || anoCursado.includes('série') ? `${anoCursado} do ensino ${ensinoFundamental}` : anoCursado} neste estabelecimento de ensino no ano ${selectedAno}.`;
        const marginLeft = 20;
        const marginRight = 20;
        const pageWidth = doc.internal.pageSize.getWidth();
        const textWidth = pageWidth - marginLeft - marginRight;

        doc.text(bodyText, marginLeft, 105, { align: 'justify', maxWidth: textWidth });
        doc.setFont(undefined, 'normal');  // Volta ao peso normal da fonte

        // Desfecho
        doc.text('O referido é verdade e dou fé.', 20, 125, { align: 'left', maxWidth: textWidth });

        // Data e Local
        doc.text(`${local}, ${dataAtual}`, 109, 150, { align: 'left', maxWidth: textWidth });

        // Assinatura
        doc.text("______________________________________________", 105, 205, null, null, 'center');
        doc.text("Sílvia Regina Cunha Brandão Silva", 105, 210, null, null, 'center');
        doc.text("Diretora", 105, 215, null, null, 'center');

        // Gerar o PDF
        doc.save('declaracao.pdf');
    }
});

