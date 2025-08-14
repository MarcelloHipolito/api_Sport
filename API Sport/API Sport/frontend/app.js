document.addEventListener('DOMContentLoaded', () => {
  const searchInput = document.getElementById('search-input');
  const searchBtn = document.getElementById('search-btn');
  const positionFilter = document.getElementById('position-filter');
  const playersList = document.getElementById('players-list');

  // Carrega todos os jogadores início
  fetchPlayers();

  // Busca ao digitar
  searchInput.addEventListener('input', (e) => {
      const searchTerm = e.target.value.trim();
      if (searchTerm.length > 0) {
          searchPlayers(searchTerm);
      } else {
          fetchPlayers();
      }
  });

  // Busca ao clicar no botão
  searchBtn.addEventListener('click', () => {
      const searchTerm = searchInput.value.trim();
      searchPlayers(searchTerm);
  });

  // Filtro por posição
  positionFilter.addEventListener('change', () => {
      const position = positionFilter.value;
      filterPlayers(position);
  });

  // Busca todos os jogadores
  async function fetchPlayers() {
      try {
          const response = await fetch('http://localhost:3000/api/players');
          const players = await response.json();
          renderPlayers(players);
      } catch (error) {
          console.error('Erro ao buscar jogadores:', error);
          showError('Erro ao carregar jogadores. Tente novamente mais tarde.');
      }
  }

  // Busca jogadores por nome
  async function searchPlayers(name) {
      try {
          const response = await fetch(`http://localhost:3000/api/players/search/${name}`);
          const results = await response.json();
          
          if (Array.isArray(results)) {
              renderPlayers(results);
          } else {
              showMessage('Nenhum jogador encontrado');
          }
      } catch (error) {
          console.error('Erro na pesquisa:', error);
          showError('Erro na pesquisa. Tente novamente.');
      }
  }

  // Filtra jogadores por posição 
  function filterPlayers(position) {
      if (!position) {
          fetchPlayers();
          return;
      }

      fetch('http://localhost:3000/api/players')
          .then(response => response.json())
          .then(players => {
              const filtered = players.filter(player => 
                  player.position.toLowerCase().includes(position.toLowerCase())
              );
              renderPlayers(filtered);
          })
          .catch(error => {
              console.error('Erro ao filtrar:', error);
              showError('Erro ao filtrar jogadores');
          });
  }

  // Renderiza a lista de jogadores
  function renderPlayers(players) {
      if (!players || players.length === 0) {
          showMessage('Nenhum jogador encontrado');
          return;
      }

      playersList.innerHTML = players.map(player => `
          <li class="player-card">
              <div class="player-header">
                  <img src="${player.photo || 'https://via.placeholder.com/80?text=SPORT'}" 
                       alt="${player.name}" 
                       class="player-photo">
                  <div class="player-info">
                      <h2>
                          <span class="player-number">${player.number}</span>
                          ${player.name}
                      </h2>
                      <p class="player-position">${player.position} • ${player.nationality}</p>
                  </div>
              </div>
              <div class="player-details">
                  <p><span class="label">Idade:</span> ${player.age} anos</p>
                  
              </div>
          </li>
      `).join('');
  }

  function showMessage(msg) {
      playersList.innerHTML = `<li class="not-found">${msg}</li>`;
  }

  function showError(msg) {
      playersList.innerHTML = `<li class="error">${msg}</li>`;
  }

});
