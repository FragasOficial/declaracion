
document.addEventListener('DOMContentLoaded', function () {
    const temPaiSelect = document.getElementById('temPai');
    const nomePaiInput = document.getElementById('nomePai');

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

    // Lógica para gerar a declaração com base nos dados inseridos
    document.getElementById('declaracaoForm').addEventListener('submit', function (event) {
        event.preventDefault();  // Evitar o envio do formulário padrão

        const nomeCompleto = document.getElementById('nomeCompleto').value;
        const dataNascimento = document.getElementById('dataNascimento').value;
        const anoCursado = document.getElementById('anoCursado').value;
        const dataAtual = document.getElementById('dataAtual').value;
        const local = document.getElementById('local').value;
        const sexo = document.getElementById('sexo').value;
        const temPai = temPaiSelect.value;
        let nomePai = '';

        if (temPai === 'sim') {
            nomePai = nomePaiInput.value;
        }

        // Gerar o PDF usando jsPDF
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF();

        // Título
        doc.setFontSize(18);
        doc.text("DECLARAÇÃO", 105, 20, null, null, 'center');

        // Corpo do PDF
        doc.setFontSize(12);
        doc.text(`Declaro para os devidos fins de prova, que ${nomeCompleto},`, 20, 40);
        doc.text(`nascid${sexo === 'masculino' ? 'o' : 'a'} dia ${new Date(dataNascimento).toLocaleDateString('pt-BR')}, alun${sexo === 'masculino' ? 'o' : 'a'}`, 20, 50);
        doc.text(`do ${anoCursado} do ensino fundamental II,`, 20, 60);
        if (temPai === 'sim') {
            doc.text(`filh${sexo === 'masculino' ? 'o' : 'a'} de ${nomePai},`, 20, 70);
        }
        doc.text(`solicitou transferência na presente data.`, 20, 80);

        // Desfecho
        doc.text(`O referido é verdade, e dou fé.`, 20, 100);
        doc.text(`${local}, ${new Date(dataAtual).toLocaleDateString('pt-BR')}`, 20, 110);

        // Assinatura
        doc.text("______________________________________________", 20, 140);
        doc.text("Sílvia Regina Cunha Brandão Silva", 20, 150);
        doc.text("Diretora", 20, 160);

        // Gerar o PDF
        doc.save('declaracao.pdf');
    });
});
