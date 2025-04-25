import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors());

// Objeto com jogadores do Sport Club Recife (dados fictícios)
const players = [
  {
    id: 1,
    name: "Caíque França",
    position: "Goleiro",
    number: 22,
    age: 29,
    nationality: "Brasileiro",
    photo: "https://img.a.transfermarkt.technology/portrait/medium/408850-1580199430.jpg?lm=1" // (URL fictícia)
  },
  {
    id: 2,
    name: "Thiago Couto",
    position: "Goleiro",
    number: 21,
    age: 26,
    nationality: "Brasileiro",
    photo: "https://img.a.transfermarkt.technology/portrait/medium/546217-1674748988.jpg?lm=1" 
  },
  {
    id: 3,
    name: "Davi",
    position: "Goleiro",
    number: 41,
    age: 20,
    nationality: "Brasileiro",
    photo: "data:image/jpeg;base64,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" 
  },
  {
    id: 4,
    name: "Rafael Thyere",
    position: "Zagueiro",
    number: 15,
    age: 31,
    nationality: "Brasileiro",
    photo: "https://img.a.transfermarkt.technology/portrait/medium/292152-1652344094.jpg?lm=1"
  },
  {
    id: 5,
    name: "Chico",
    position: "Zagueiro",
    number: 15,
    age: 26,
    nationality: "Brasileiro",
    photo: "https://img.a.transfermarkt.technology/portrait/medium/612342-1743723890.jpg?lm=1"
  },
  {
    id: 6,
    name: "João Silva",
    position: "Zagueiro",
    number: 6,
    age: 26,
    nationality: "Português",
    photo: "https://img.a.transfermarkt.technology/portrait/medium/461903-1743724022.jpg?lm=1"
  },
  {
    id: 7,
    name: "Lucas Cunha",
    position: "Zagueiro",
    number: 3,
    age: 28,
    nationality: "Brasileiro",
    photo: "https://img.a.transfermarkt.technology/portrait/medium/355496-1717522906.jpg?lm=1"
  },
  {
    id: 8,
    name: "Antônio Carlos",
    position: "Zagueiro",
    number: 25,
    age: 32,
    nationality: "Brasileiro",
    photo: "https://img.a.transfermarkt.technology/portrait/medium/207446-1678694071.jpg?lm=1"
  },
  {
    id: 9,
    name: "Renzo",
    position: "Zagueiro",
    number: 13,
    age: 23,
    nationality: "Brasileiro",
    photo: "https://img.a.transfermarkt.technology/portrait/medium/866842-1660519396.jpg?lm=1"
  },
  {
    id: 10,
    name: "Igor Cariús",
    position: "Lateral Esquerdo",
    number: 16,
    age: 31,
    nationality: "Brasileiro",
    photo: "https://img.a.transfermarkt.technology/portrait/medium/520480-1682388473.jpg?lm=1"
  },
  {
    id: 11,
    name: "Dalbert",
    position: "Lateral Esquerdo",
    number: 29,
    age: 31,
    nationality: "Brasileiro",
    photo: "https://img.a.transfermarkt.technology/portrait/medium/312862-1595939125.jpg?lm=1"
  },
  {
    id: 12,
    name: "Hereda",
    position: "Lateral Direito",
    number: 32,
    age: 26,
    nationality: "Brasileiro",
    photo: "https://img.a.transfermarkt.technology/portrait/medium/634139-1743725132.jpg?lm=1"
  },
  {
    id: 13,
    name: "Matheus Alexandre",
    position: "Lateral Direito",
    number: 33,
    age: 26,
    nationality: "Brasileiro",
    photo: "https://img.a.transfermarkt.technology/portrait/medium/617687-1662692371.jpg?lm=1"
  },
  {
    id: 14,
    name: "Lionel Di Plácido",
    position: "Lateral Direito",
    number: 2,
    age: 31,
    nationality: "Argentino",
    photo: "https://img.a.transfermarkt.technology/portrait/medium/322843-1637935310.JPG?lm=1"
  },  {
    id: 15,
    name: "Adriel",
    position: "Volante",
    number: 54,
    age: 18,
    nationality: "Brasileiro",
    photo: "data:image/jpeg;base64,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"
  },
  {
    id: 16,
    name: "Zé Lucas",
    position: "Volante",
    number: 58,
    age: 17,
    nationality: "Brasileiro",
    photo: "https://img.a.transfermarkt.technology/portrait/medium/1365897-1738782895.jpg?lm=1"
  },
  {
    id: 17,
    name: "Christian Rivera",
    position: "Volante",
    number: 14,
    age: 29,
    nationality: "Colombiano",
    photo: "https://img.a.transfermarkt.technology/portrait/medium/426324-1633314171.jpg?lm=1"
  },
  {
    id: 18,
    name: "Du Queiroz",
    position: "Volante",
    number: 37,
    age: 25,
    nationality: "Brasileiro",
    photo: "https://img.a.transfermarkt.technology/portrait/medium/906774-1687631769.png?lm=1"
  },
  {
    id: 19,
    name: "Fabricio Domínguez",
    position: "Meia",
    number: 8,
    age: 26,
    nationality: "Uruguaio",
    photo: "https://img.a.transfermarkt.technology/portrait/medium/621793-1637935462.JPG?lm=1"
  },
  {
    id: 20,
    name: "Sérgio Oliveira",
    position: "Meia",
    number: 27,
    age: 32,
    nationality: "Uruguaio",
    photo: "https://img.a.transfermarkt.technology/portrait/medium/112465-1728417851.png?lm=1"
  },
  {
    id: 21,
    name: "Hyoran",
    position: "Meia",
    number: 19,
    age: 31,
    nationality: "Brasileiro",
    photo: "https://img.a.transfermarkt.technology/portrait/medium/338861-1543844791.jpg?lm=1"
  },
  {
    id: 22,
    name: "Christian Ortíz",
    position: "Meia",
    number: 59,
    age: 32,
    nationality: "Argentino",
    photo: "https://img.a.transfermarkt.technology/portrait/medium/126239-1646522984.jpg?lm=1"
  },
  {
    id: 23,
    name: "Lucas Lima",
    position: "Meia",
    number: 10,
    age: 34,
    nationality: "Brasileiro",
    photo: "https://img.a.transfermarkt.technology/portrait/medium/232847-1743725252.jpg?lm=1"
  },
  {
    id: 24,
    name: "Rodrigo Atencio",
    position: "Ponta Direita",
    number: 20,
    age: 22,
    nationality: "Argentino",
    photo: "https://img.a.transfermarkt.technology/portrait/medium/1013922-1708005853.JPG?lm=1"
  },
  {
    id: 25,
    name: "Lenny Lobato",
    position: "Ponta Direita",
    number: 77,
    age: 24,
    nationality: "Brasileiro",
    photo: "https://img.a.transfermarkt.technology/portrait/medium/865028-1720647946.jpg?lm=1"
  },
  {
    id: 26,
    name: "Chrystian Barletta",
    position: "Ponta Direita",
    number: 30,
    age: 23,
    nationality: "Brasileiro",
    photo: "https://img.a.transfermarkt.technology/portrait/medium/695232-1706875247.jpg?lm=1"
  },
  {
    id: 27,
    name: "Gustavo Maia",
    position: "Ponta Esquerda",
    number: 11,
    age: 24,
    nationality: "Brasileiro",
    photo: "https://img.a.transfermarkt.technology/portrait/medium/752560-1600756807.JPG?lm=1"
  },
  {
    id: 28,
    name: "Carlos Alberto",
    position: "Ponta Esquerda",
    number: 17,
    age: 34,
    nationality: "Brasileiro",
    photo: "https://img.a.transfermarkt.technology/portrait/medium/727747-1709884918.png?lm=1"
  },
  {
    id: 29,
    name: "Romarinho",
    position: "Ponta Esquerda",
    number: 91,
    age: 31,
    nationality: "Brasileiro",
    photo: "https://img.a.transfermarkt.technology/portrait/medium/267849-1606753188.jpg?lm=1"
  },
  {
    id: 30,
    name: "Gonçalo Paciência",
    position: "Centroavante",
    number: 7,
    age: 30,
    nationality: "Português",
    photo: "https://img.a.transfermarkt.technology/portrait/medium/181547-1533115440.jpg?lm=1"
  },
  {
    id: 31,
    name: "Pablo",
    position: "Centroavante",
    number: 92,
    age: 32,
    nationality: "Brasileiro",
    photo: "https://img.a.transfermarkt.technology/portrait/medium/148765-1543928792.jpg?lm=1"
  },
  {
    id: 32,
    name: "Zé Roberto",
    position: "Centroavante",
    number: 99,
    age: 31,
    nationality: "Brasileiro",
    photo: "https://img.a.transfermarkt.technology/portrait/medium/305428-1580407394.jpg?lm=1"
  },
  {
    id: 33,
    name: "Arthur Souza",
    position: "Centroavante",
    number: 38,
    age: 22,
    nationality: "Brasileiro",
    photo: "https://img.a.transfermarkt.technology/portrait/medium/1005640-1720056763.jpg?lm=1"
  },
  
  
];

// Rotas da API
app.get('/api/players', (req, res) => res.json(players));

app.get('/api/players/:id', (req, res) => {
  const player = players.find(p => p.id === parseInt(req.params.id));
  res.json(player || { error: "Jogador não encontrado" });
});

app.get('/api/players/search/:name', (req, res) => {
  const searchTerm = req.params.name.toLowerCase();
  const results = players.filter(p => 
    p.name.toLowerCase().includes(searchTerm)
  );
  res.json(results.length > 0 ? results : { message: "Nenhum jogador encontrado" });
});

const PORT = 3000;
app.listen(PORT, () => console.log(`Servidor rodando em http://localhost:${PORT}`));