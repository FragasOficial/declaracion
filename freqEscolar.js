document.addEventListener('DOMContentLoaded', function () {
    const temPaiSelect = document.getElementById('temPai');
    const nomePaiInput = document.getElementById('nomePai');
    const headerImg = document.getElementById('headerImg');

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

    // Lógica para confirmar os dados e gerar a declaração
    document.getElementById('declaracaoForm').addEventListener('submit', function (event) {
        event.preventDefault();  // Evitar o envio do formulário padrão

        // Capturar os valores do formulário e transformar em maiúsculas
        const nomeCompleto = document.getElementById('nomeCompleto').value.toUpperCase();
        const dataNascimento = document.getElementById('dataNascimento').value;
        const anoCursado = document.getElementById('anoCursado').value;
        const nomeMae = document.getElementById('nomeMae').value.toUpperCase();
        const sexo = document.getElementById('sexo').value;
        const temPai = temPaiSelect.value;
        const nomePai = temPai === 'sim' ? nomePaiInput.value.toUpperCase() : '';
        const dataAtual = new Date().toLocaleDateString('pt-BR');
        const local = "Sítio Oiticica, Frecheirinha - CE";

        // Corrigir a data de nascimento para evitar erro de fuso horário
        const [ano, mes, dia] = dataNascimento.split('-');
        const dataNascimentoCorrigida = new Date(ano, mes - 1, dia).toLocaleDateString('pt-BR');

        // Determinar o tipo de ensino fundamental
        let ensinoFundamental = '';
        if (["1º ano", "2º ano", "3º ano", "4º ano", "5º ano"].includes(anoCursado)) {
            ensinoFundamental = 'fundamental I';
        } else if (["6º ano", "7º ano", "8º ano", "9º ano"].includes(anoCursado)) {
            ensinoFundamental = 'fundamental II';
        }

        // Exibir uma tela de confirmação dos dados
        const confirmationMessage = `
            Confirme os dados abaixo:
            Nome Completo: ${nomeCompleto}
            Data de Nascimento: ${dataNascimentoCorrigida}
            Ano Cursado: ${anoCursado}
            Ensino Fundamental: ${ensinoFundamental}
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
                ensinoFundamental
            });
        } else {
            // Caso contrário, permitir que o usuário corrija os dados
            alert("Por favor, corrija os dados necessários.");
        }
    });

    function generatePDF({ nomeCompleto, dataNascimento, anoCursado, nomeMae, sexo, temPai, nomePai, dataAtual, local, ensinoFundamental }) {
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
        const bodyText = `Declaro para os devidos fins de prova que ${nomeCompleto}, nascid${sexo === 'masculino' ? 'o' : 'a'} dia ${dataNascimento}, filh${sexo === 'masculino' ? 'o' : 'a'} de ${nomeMae}${temPai === 'sim' ? ` e ${nomePai}` : ''}, alun${sexo === 'masculino' ? 'o' : 'a'} do ${anoCursado} do ensino ${ensinoFundamental}, está frequentando regularmente esta unidade de ensino até a presente data deste ano letivo.`;
        const marginLeft = 20;
        const marginRight = 20;
        const pageWidth = doc.internal.pageSize.getWidth();
        const textWidth = pageWidth - marginLeft - marginRight;

        doc.text(bodyText, marginLeft, 105, { align: 'justify', maxWidth: textWidth });
        doc.setFont(undefined, 'normal');  // Volta ao peso normal da fonte

        //desfecho
        doc.text('O referido é verdade e dou fé.', 20, 125, { align: 'left', maxWidth: textWidth })

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


