import React, {useState, useEffect} from "react";
import api from './services/api';

import "./styles.css";

function App() {

  const [repositories, setRepositories] = useState([]);

  useEffect(()=>{
    api.get('repositories').then(response =>{
      setRepositories(response.data);
    });
  }, []);

  async function handleAddRepository() {
    const directory = Date.now();

    const response = await api.post('repositories',{
      "title": `Repositorie-${directory}`,
      "url": `https://www.repos-gostack.com.br/${directory}`,
      "techs" :["NodeJs","React","React Native"],
      "likes": 0
    });

    setRepositories([...repositories, response.data]);
  }

  async function handleRemoveRepository(id) {
  
    await api.delete(`repositories/${id}`);
  
    setRepositories(repositories.filter(repository => repository.id !== id));
  }

  return (
    <div>
      <ul data-testid="repository-list">
          {
            repositories.map(x => 
              <li key={x.id}>
                {x.title}

                <button onClick={() => handleRemoveRepository(x.id)}>Remover</button>
              </li>
            )
          }
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
