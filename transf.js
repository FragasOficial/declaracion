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

        // Capturar os valores do formulário
        const nomeCompleto = document.getElementById('nomeCompleto').value;
        const dataNascimento = document.getElementById('dataNascimento').value;
        const anoCursado = document.getElementById('anoCursado').value;
        const nomeMae = document.getElementById('nomeMae').value;
        const sexo = document.getElementById('sexo').value;
        const temPai = temPaiSelect.value;
        const nomePai = temPai === 'sim' ? nomePaiInput.value : '';
        const dataAtual = new Date().toLocaleDateString('pt-BR');
        const local = "Sítio Oiticica, Frecheirinha - CE";

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
            Data de Nascimento: ${new Date(dataNascimento).toLocaleDateString('pt-BR')}
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
                dataNascimento,
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
        const bodyText = `Declaro para os devidos fins de prova, que ${nomeCompleto}, nascid${sexo === 'masculino' ? 'o' : 'a'} em ${new Date(dataNascimento).toLocaleDateString('pt-BR')}, alun${sexo === 'masculino' ? 'o' : 'a'} do ${anoCursado} do ${ensinoFundamental}, filh${sexo === 'masculino' ? 'o' : 'a'} de ${nomeMae}${temPai === 'sim' ? ` e ${nomePai}` : ''}, solicitou transferência na presente data. O referido é verdade, e dou fé.`;
        const marginLeft = 20;
        const marginRight = 20;
        const pageWidth = doc.internal.pageSize.getWidth();
        const textWidth = pageWidth - marginLeft - marginRight;

        doc.text(bodyText, marginLeft, 105, { align: 'justify', maxWidth: textWidth });

        // Data e Local
        doc.text(`${local}, ${dataAtual}`, 109, 140, { align: 'left', maxWidth: textWidth });

        // Assinatura
        doc.text("______________________________________________", 105, 190, null, null, 'center');
        doc.text("Sílvia Regina Cunha Brandão Silva", 105, 195, null, null, 'center');
        doc.text("Diretora", 105, 200, null, null, 'center');

        // Gerar o PDF
        doc.save('declaracao.pdf');
    }
});
