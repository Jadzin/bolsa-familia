
document.addEventListener("DOMContentLoaded", function () {
  const loadingDiv = document.createElement("div");
  loadingDiv.id = "loading-screen";
  loadingDiv.style.position = "fixed";
  loadingDiv.style.top = "0";
  loadingDiv.style.left = "0";
  loadingDiv.style.width = "100%";
  loadingDiv.style.height = "100%";
  loadingDiv.style.background = "#0057D9";
  loadingDiv.style.display = "flex";
  loadingDiv.style.flexDirection = "column";
  loadingDiv.style.alignItems = "center";
  loadingDiv.style.justifyContent = "center";
  loadingDiv.style.zIndex = "9999";
  loadingDiv.innerHTML = `
    <img src="logo-caixa.png" alt="Logo Caixa Tem" style="width: 120px; margin-bottom: 30px;">
    <div style="width: 120px; height: 120px; border: 10px solid rgba(255,255,255,0.3); border-top: 10px solid #fff; border-radius: 50%; animation: spin 1s linear infinite;"></div>
    <h2 style="color: #fff; font-weight: 600; margin-top: 40px;">Preparando seu pagamento</h2>
    <p style="color: #fff;">Estamos gerando seu QR Code Pix...</p>
  `;
  document.body.appendChild(loadingDiv);

  setTimeout(() => {
    loadingDiv.remove();
    document.querySelector('.container').style.display = 'block';
  }, 4000);
});

// Adiciona a animação via JS
const style = document.createElement("style");
style.innerHTML = `
@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
`;
document.head.appendChild(style);
