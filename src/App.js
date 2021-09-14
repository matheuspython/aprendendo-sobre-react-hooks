import { useState, useEffect } from 'react'

function App() {
  const [repositories, setRepositories ] = useState([])

  useEffect(async () => {
    const response = await fetch('https://api.github.com/users/matheuspython/repos')
    const data = await response.json()

    setRepositories(data)
    console.log(data)
  }, [])

  useEffect(()=> {
   const favorites = repositories.filter(repo => repo.favorite)
   document.title = `${favorites.length} repositorios favoritados`
  },[repositories])//sempre que o repositories mudar vai executar esse hook

  function handleFavorite(id) {
    const newRepositories = repositories.map(repo =>{
      return repo.id === id ? {...repo, favorite: !repo.favorite} : repo
    })

    setRepositories(newRepositories)

  }
 
  return (
    <>
      <ul>
        {
          repositories.map(repo => (
            <li key={repo.id}>
               {repo.name} 
               {repo.favorite && <span>(favorito)</span>}
               <button onClick={() => handleFavorite(repo.id)}>favoritar</button>
            </li>
      ))}
      </ul>
    </>

  );
}

export default App;
