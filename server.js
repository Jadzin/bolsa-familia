const express = require('express');
const fetch = require('node-fetch');
const path = require('path');
const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// ✅ ROTA DE RECEBIMENTO DE CALLBACK
app.post('/api/callback', (req, res) => {
  const body = req.body;

  if (body.event === 'TRANSACTION_PAID' && body.transaction?.status === 'COMPLETED') {
    console.log('✅ Pagamento confirmado:', body.transaction.identifier);
    // Aqui você pode fazer algo: salvar no banco, acionar outra API etc.
  }

  res.status(200).json({ received: true });
});

// ✅ ENDPOINT DE GERAÇÃO PIX
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

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
