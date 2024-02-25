import { useState } from 'react';
import useAPI from './useAPI';

const useGame = () => {

    const Axios = useAPI();

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [games, setGames] = useState([]);
    const [game, setGame] = useState();

    const getGames = () => {
        setGame(null)
        setIsLoading(true)
        Axios.get('/game')
            .then(res => {
                setGames(res.data.data)
                console.log(res.data.data)
            })
            .catch(err => console.log(err))
            .finally(setIsLoading(false))
    }

    const getGame = (id) => {
        setGames(null)

        setIsLoading(true)
        Axios.get('/game/' + id)
            .then(res => {
                setGame(res.data.data)
            })
            .catch(err => console.log(err))
            .finally(setIsLoading(false))
    }

    const deleteGame = (id) => {
        Axios.delete('/game/' + id)
            .then(res => {
                setGames(games.filter(game => game.id != id))
                console.log("useGame: Game delete !")
            })
            .catch(err => {
                console.log("useGame: Erreur delete")
            })
    }

    const updateGame = (newGame) => {
        Axios.patch('/game/' + newGame.id, newGame)
            .then(res => {
                getGame(1)

                console.log(game)
                console.log("useGame: user update")
            })
            .catch(err => {
                console.log("useGame: Erreur")
                console.log(err)
            })
    }

    return {
        games,
        getGames,

        isLoading,
        error,

        game,
        setGame,
        getGame,
        deleteGame,
        updateGame
    }
};

export default useGame;