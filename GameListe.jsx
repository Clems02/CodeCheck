import useGame from '@/hook/useGame';
import React, { useEffect } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Divider } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const GameListe = () => {
    const navigate = useNavigate();
    const { games, getGames, isLoading, error, deleteGame } = useGame();

    useEffect(() => {
        getGames()
    }, [])

    const handleEditGame = (id) => {
        navigate('/admin/game/' + id)
    }

    const handleDeleteGame = (id) => {
        deleteGame(id)
    }

    const handleDisableGame = () => {
        console.log("disable")
    }

    if (isLoading) {
        return (
            <div>
                <button>Player appel</button>
                Chargement en cours. . .
            </div>
        )
    }

    if (error) {
        return (
            <div>Erreur: {error}</div>
        )
    }

    return (
        <>
            {games.map((game) => (
                <Card sx={{ maxWidth: 345, m: 1.5, border: '2px solid black' }} key={game.id}>
                    <CardContent>
                        <Typography variant="h5" align='center'>
                            {game.name}
                        </Typography>
                    </CardContent>
                    <Divider textAlign='center' />
                    <CardActions disableSpacing sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                        <Button variant="outlined" size="small" sx={{ width: '8rem' }} onClick={() => handleEditGame(game.id)}>Editer</Button>
                        <Button variant="outlined" size="small" sx={{ width: '8rem' }} onClick={() => handleDisableGame(game.id)}>Désactiver</Button>
                        <Button variant="outlined" size="small" sx={{ width: '8rem' }} onClick={() => handleDeleteGame(game.id)}>Supprimer</Button>
                    </CardActions>
                </Card>
            ))}
        </>
    );
};

export default GameListe;