const express = require('express');
const fetch = require('node-fetch');
const path = require('path');
const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Rota para gerar o pagamento Pix
app.post('/pix-duckfy', async (req, res) => {
  try {
    const response = await fetch('https://app.duckfyoficial.com/api/v1/gateway/pix/receive', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-public-key': 'joao-vitormf2019_xs4wsmnekzzi08zp',
        'x-secret-key': 'rs797o21tzrz967vsvrkr454nx0uk91oe9u6juu2wu4hpbog0l86xlpgem3i6oh6'
      },
      body: JSON.stringify(req.body)
    });

    const data = await response.json();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao gerar pagamento', detail: err.message });
  }
});

// ✅ Nova rota para receber o callback da Duckfy
app.post('/api/callback', (req, res) => {
  console.log('📥 Callback recebido da Duckfy:', req.body);

  // Aqui você pode salvar ou processar o pagamento
  // Por enquanto, apenas registra no console e responde OK
  res.sendStatus(200);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
