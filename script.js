document.addEventListener('DOMContentLoaded', () => {
    const temPaiSelect = document.getElementById('temPai');
    const paiContainer = document.getElementById('paiContainer');
    const assinadoPorSelect = document.getElementById('assinadoPor');
    const coordenadoraContainer = document.getElementById('coordenadoraContainer');
    
    temPaiSelect.addEventListener('change', () => {
        if (temPaiSelect.value === 'não') {
            paiContainer.style.display = 'none';
        } else {
            paiContainer.style.display = 'block';
        }
    });
    
    assinadoPorSelect.addEventListener('change', () => {
        if (assinadoPorSelect.value === 'coordenadora') {
            coordenadoraContainer.style.display = 'block';
        } else {
            coordenadoraContainer.style.display = 'none';
        }
    });
});

function gerarDeclaracao() {
    const sexo = document.getElementById('sexo').value;
    const nome = document.getElementById('nome').value;
    const dataNascimento = document.getElementById('dataNascimento').value;
    const idade = document.getElementById('idade').value;
    const serie = document.getElementById('serie').value;
    const temPai = document.getElementById('temPai').value;
    const nomePai = temPai === 'sim' ? document.getElementById('nomePai').value : '';
    const nomeMae = document.getElementById('nomeMae').value;
    const dataAtual = document.getElementById('dataAtual').value;
    const localEmissao = document.getElementById('localEmissao').value;
    const assinadoPor = document.getElementById('assinadoPor').value;

    let curso = ['1º', '2º', '3º', '4º', '5º'].includes(serie) ? 'ensino fundamental I' : 'ensino fundamental II';

    let declaracao = `Declaro para os devidos fins de prova, que ${nome}, nascid${sexo} dia ${new Date(dataNascimento).toLocaleDateString('pt-BR')}, alun${sexo} do ${serie}º ano do ${curso}, `;
    if (temPai === 'sim') {
        declaracao += `filh${sexo} de ${nomePai} e `;
    }
    declaracao += `${nomeMae}, solicitou transferência na presente data. O referido é verdade, e dou fé. ${localEmissao}, ${new Date(dataAtual).toLocaleDateString('pt-BR')}`;

    if (assinadoPor === 'diretora') {
        declaracao += `
        __________________________________________________________
        Sílvia Regina Cunha Brandão Silva
        Diretora`;
    } else {
        declaracao += `
        __________________________________________________________
        Maria Vilani Silva
        Coordenadora Pedagógica`;
    }

    document.getElementById('declarationOutput').innerText = declaracao;
}

async function gerarPDF() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF('p', 'mm', 'a4');
    
    const headerImg = document.getElementById('headerImg');
    const headerImgData = await toDataURL(headerImg.src);

    const declarationText = document.getElementById('declarationOutput').innerText;
    const declarationLines = doc.splitTextToSize(declarationText, 180);

    doc.addImage(headerImgData, 'PNG', 15, 10, 180, 20);
    doc.setFontSize(14);
    doc.text('DECLARAÇÃO', 105, 40, null, null, 'center');
    doc.setFontSize(12);
    doc.text(declarationLines, 15, 50, { maxWidth: 180, lineHeightFactor: 1.5 });

    doc.save('declaracao.pdf');
}

function toDataURL(url) {
    return new Promise((resolve, reject) => {
        let xhr = new XMLHttpRequest();
        xhr.onload = function() {
            let reader = new FileReader();
            reader.onloadend = function() {
                resolve(reader.result);
            }
            reader.readAsDataURL(xhr.response);
        };
        xhr.open('GET', url);
        xhr.responseType = 'blob';
        xhr.send();
    });
}
