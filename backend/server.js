require('dotenv').config();
const fastify = require('fastify')({ logger: true })
const mongoose = require('mongoose')


// Conexão com MongoDB Atlas
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  fastify.log.info('Conectado ao MongoDB Atlas');
}).catch(err => {
  fastify.log.error("Erro ao conectar:", err);
});
  
// Registrar rotas
const petshopRoutes = require('./routes/petshopRoutes');
fastify.register(petshopRoutes, { prefix: '/api/petshop' });

const start = async () => {
  try {
    await fastify.listen({ port: process.env.PORT || 3000, host: '0.0.0.0' });
    fastify.log.info(`Servidor rodando na porta ${process.env.PORT || 3000}`);
    console.log('🚀 Servidor rodando na porta 3000')
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();