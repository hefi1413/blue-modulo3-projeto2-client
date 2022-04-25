const baseUrl = 'http://localhost:3000/home';

async function findAllPaletas() {
  console.log('findAllPaletas');

  let url = `${baseUrl}/find`;

  findPaletas(url);
}

const findPaletaById = async () => {
  console.log('findPaletaById');

  const id = document.getElementById('idPaleta').value;
  let url = `${baseUrl}/find/${id}`;

  if (!id) {
    url = `${baseUrl}/find`;
  }
  findPaletas(url);
};

async function findPaletas(url) {
  console.log('findPaletas');

  const response = await fetch(url);
  const result = await response.json();
  const paletas = result.paletas;

  let html = '';
  paletas.forEach((paleta) => {
    html += `<div class="PaletaListaItem" id="${paleta._id}" data-id=${paleta}>
        <div>
            <div class="PaletaListaItem__sabor">${paleta.sabor}</div>
            <div class="PaletaListaItem__preco">R$ ${paleta.preco}</div>
            <div class="PaletaListaItem__descricao">${paleta.descricao}</div>
            <div class="PaletaListaItem__opcoes">
              <button class="PaletaListaItem__botoes" onclick='abrirModalEditar("${
                paleta._id
              }")'>Editar</button>
              <button class="PaletaListaItem__botoes" onclick='abrirModalDeletar("${
                paleta._id
              }")'>Excluir</button>
            </div>
        </div>
      <img class="PaletaListaItem__foto" src=/images/${
        paleta.foto
      } alt=${`Paleta de ${paleta.sabor} data-id=${paleta.foto}`} 
      /> </div>`;
  });

  // atribui recordset à lista
  let list = document.getElementById('paletaList');
  list.innerHTML = html;
}

function abrirModalCadastrar() {
  console.log('abrirModalCadastrar');

  // limpa campos antes de abrir
  document.querySelector(`#sabor1`).value = '';
  document.querySelector(`#preco1`).value = '';
  document.querySelector(`#descricao1`).value = '';
  document.querySelector(`#foto1`).value = '';

  document.querySelector('#overlay-cadastrar').style.display = 'flex';
}

function fecharModalCadastrar() {
  console.log('fecharModalCadastrar');

  document.querySelector('#overlay-cadastrar').style.display = 'none';
}

function abrirModalEditar(id) {
  console.log('abrirModalEditar');

  const paletaListaItem = document.getElementById(id);

  let paleta = {};
  paleta.sabor = paletaListaItem.getElementsByClassName('PaletaListaItem__sabor')[0].innerHTML;
  paleta.preco = paletaListaItem.getElementsByClassName('PaletaListaItem__preco')[0].innerHTML;
  paleta.preco = paleta.preco.substr(3, paleta.preco.length);
  paleta.descricao = paletaListaItem.getElementsByClassName(
    'PaletaListaItem__descricao',
  )[0].innerHTML;
  paleta.foto = paletaListaItem
    .getElementsByClassName('PaletaListaItem__foto')[0]
    .getAttribute('data-id');

  // preenche campos antes de abrir
  document.querySelector(`#id2`).value = id;
  document.querySelector(`#sabor2`).value = paleta.sabor;
  document.querySelector(`#preco2`).value = paleta.preco;
  document.querySelector(`#descricao2`).value = paleta.descricao;
  document.querySelector(`#foto2`).value = paleta.foto;
  //
  document.querySelector('#overlay-editar').style.display = 'flex';
}

function fecharModalEditar() {
  console.log('fecharModalEditar');
  //
  document.querySelector('#overlay-editar').style.display = 'none';
}

function abrirModalDeletar(id) {
  console.log('abrirModalDeletar');

  document.querySelector(`#id3`).value = id;

  document.querySelector('#overlay-delete').style.display = 'flex';
}

function fecharModalDeletar() {
  document.querySelector('#overlay-delete').style.display = 'none';
}

// FUNCTIONS
// -----------------------------------//
//
async function createPaleta() {
  console.log('createPaleta');

  const sabor = document.querySelector('#sabor1').value;
  const preco = document.querySelector('#preco1').value;
  const descricao = document.querySelector('#descricao1').value;
  const foto = document.querySelector('#foto1').value;

  const paleta = {
    sabor,
    preco,
    descricao,
    foto,
  };

  if (!sabor || !preco || !descricao || !foto) {
    alert('É necessário informar todos campos !');
    return;
  }

  const response = await fetch(baseUrl + '/create', {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
    },
    mode: 'cors',
    body: JSON.stringify(paleta),
  });

  // fecha tela de cadastro
  fecharModalCadastrar();
  // exibe paletas
  findAllPaletas();
}

async function updatePaleta() {
  console.log('updatePaleta');

  const _id = document.querySelector('#id2').value;
  const sabor = document.querySelector('#sabor2').value;
  const preco = document.querySelector('#preco2').value;
  const descricao = document.querySelector('#descricao2').value;
  const foto = document.querySelector('#foto2').value;

  if (!sabor || !preco || !descricao || !foto) {
    alert('É necessário informar todos campos !');
    return;
  }

  const paleta = {
    sabor,
    preco,
    descricao,
    foto,
  };

  const response = await fetch(baseUrl + `/update/${_id}`, {
    method: 'put',
    headers: {
      'Content-Type': 'application/json',
    },
    mode: 'cors',
    body: JSON.stringify(paleta),
  });

  // fecha tela de edição
  fecharModalEditar();
  // exibe paletas
  findAllPaletas();
}

async function deletePaleta() {
  const _id = document.querySelector('#id3').value;

  const response = await fetch(`${baseUrl}/delete/${_id}`, {
    method: 'delete',
    headers: {
      'Content-Type': 'application/json',
    },
    mode: 'cors',
  });
  //  const result = await response.json();

  // fecha tela de deleção
  fecharModalDeletar();
  // exibe paletas
  findAllPaletas();
}

findAllPaletas();
