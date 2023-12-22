import { useEffect, useRef, useState } from "react";
import { Accordion, Button, Card, Col, Container, Form, ProgressBar, Row } from "react-bootstrap";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import argomenti from "./argomenti";



function Play() {




  const [timeValue, setTimeValue] = useState(15);
  const [tempo, setTempo] = useState(15)


  const initialArray = ["A","B","C","D","E","F","G","H","I","L","M","N","O","P","Q","R","S","T","U","V","Z"];

  const [shuffledArray, setShuffledArray] = useState(initialArray);

  const [argomento, setArgomento] = useState('');



  


const cambiaTempo = (e) => {
  e.preventDefault();
  stopProgressBar();
  setTempo(timeValue)
}








  

  const avviaGioco2 = () => {

    handleShuffle();
    scegliArgomento();
    startProgressBar();
   
  };




 
  
/* PROGRESS BAR ------------------------------------------------------------------------------------------------------------------- */

const [progress, setProgress] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [intervalId, setIntervalId] = useState(null);



  const startProgressBar = () => {
    stopProgressBar()
    setIsRunning(true);
    

    
    const newIntervalId = setInterval(() => {

      setProgress((prevProgress) => {

        if (prevProgress < tempo) {
          return prevProgress + 1; // Aumenta di 10 ogni 10 secondi

        } else {
            setIsRunning(false); // Ferma la progress bar
            toast.error("Hai perso!", {
              position: toast.POSITION.BOTTOM_CENTER,
            })
            return tempo; // Riavvia la progress bar dopo aver raggiunto il 100%
          } 
      });
    }, 1000);
  
    setIntervalId(newIntervalId);
  };

  const correctAnswer = () => {
    setIsRunning(true);
    startProgressBar();
  }
  


  const stopProgressBar = () => {
    if (intervalId) {
      clearInterval(intervalId);
      setIntervalId(null);
    }

    setIsRunning(false);
    setProgress(0);
  };

 
  

  useEffect(() => {
    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [intervalId, isRunning]);





const shuffleArray = (array) => {
  let currentIndex = array.length;
  let temporaryValue, randomIndex;

  // Mentre ci sono elementi rimasti da mescolare...
  while (currentIndex !== 0) {
    // Scegli un elemento rimasto...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // E scambialo con l'elemento corrente.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
};


const handleShuffle = () => {
  const newArray = shuffleArray([...initialArray]);
  setShuffledArray(newArray);
};


const letteraCliccata = (lettera) => {

  if(isRunning){
    const newArray = shuffledArray.filter((value) => value !== lettera );
    setShuffledArray(newArray);
  } else {
    toast.error('Per iniziare avvia la partita.', {position: toast.POSITION.BOTTOM_CENTER})
  }

}


useEffect(() => {
  if(shuffledArray.length < 1){
    toast.success("Tutte le lettere sono terminate. Clicca su \"Avvia gioco\" per iniziare una nuova partita!", {
      position: toast.POSITION.BOTTOM_CENTER,
    })
    stopProgressBar()
  } else {
    if(shuffledArray.length < 21){
      correctAnswer()
    }
  }

}, [shuffledArray])



const scegliArgomento = () => {

  // Genera un indice casuale
  const randomIndex = Math.floor(Math.random() * argomenti.length);

  // Ottieni l'elemento corrispondente all'indice casuale
  const randomElement = argomenti[randomIndex];
  setArgomento(randomElement);
}



  return (
    <>
      <Container className="mb-3 mt-3">

      <Accordion defaultActiveKey="0">
        <Accordion.Item eventKey="0">
          <Accordion.Header>Gestisci impostazioni</Accordion.Header>
        <Accordion.Collapse eventKey="0">
          <Accordion.Body>
      <Form onSubmit={(e) => cambiaTempo(e)} className="mt-2">
      <Form.Group controlId="exampleNumber">
        <Form.Label>Durata turno</Form.Label>
        <Form.Control
          type="number"
          value={timeValue}
          onChange={(e) => setTimeValue(e.target.value)}
        />
      </Form.Group>
      <Button className="mt-3" type="submit">Cambia durata</Button>
    </Form>
    </Accordion.Body>
        </Accordion.Collapse>
        </Accordion.Item>
      </Accordion>

      <ToastContainer />
        <div className="d-grid gap-2">
        <Button className="mb-3 mt-5" variant="success" onClick={avviaGioco2} size="lg">Avvia partita</Button>
        </div>

        <div className="d-grip gap-2"><h2 className="text-center mb-4">{argomento}</h2></div>
        {shuffledArray ? 
        <Row className="justify-content-center">
        {shuffledArray.map((lettera, index) => (
          <Col key={index} className="mb-3" xs={6} sm={6} md={3}><Card onClick={()=> letteraCliccata(lettera)} className="front">{lettera}</Card></Col>
        ) 
          )}
        
        </Row>
        : <Col></Col>
        }
        
        <ProgressBar max={tempo} now={progress} label={`${progress}`} />
      <div style={{textAlign:'center'}}>
      <Button variant="danger" className="mt-3 mb-3 ms-1" onClick={stopProgressBar} disabled={!isRunning}>
        Pausa
      </Button>
        <div></div>

        
        </div>  
      </Container>

    </>
  );
}

export default Play;
