import React, {useState, useEffect, useRef} from "react";

//create your first component
const Home = () => {
	const audioElement = useRef(null); //la const almacena una referencia que no tiene valor inicial
	const [song, setSongs] =useState([]);

function getSongs() { // funcion para recolectar y solicitar del servidor las canciones

	fetch("https://assets.breatheco.de/apis/sound/songs")
	.then(response => response.json()) // a la respuesta del servidor la convertimos en response.json
	.then(data => {
	(setSongs(data)) 
		console.log(data); // data es el resultado de response.json
	})

}






useEffect(() =>{ //al renderizar nos muestra un efecto
	getSongs() 

}, [])

// Aquí hay un string, para agregarle otro(en este caso el "url" hay que ponerl el +)

const playSong = (url) => { // funcion para reproducir canciones    
	audioElement.current.src = "https://assets.breatheco.de/apis/sound/" + url
	console.log(audioElement.current.src);
	console.log(url);

	
};
	 
	return (
		<>
		<h1>Usando UseEffect</h1>
		<h2>Contador:</h2>
{/* dibujamos la lista de canciones */}
		<ul>
			{song.map((oneSong, index)=><li onClick={ ()=>  playSong(oneSong.url)} key={oneSong.name}>{oneSong.name}</li>)}
		</ul>
		<div>

		<audio controls src="https://assets.breatheco.de/apis/sound/files/mario/songs/castle.mp3" ref={audioElement}>
  <source type="audio/ogg"/>
  {/* <source src="horse.mp3" type="audio/mpeg"> */}
  Your browser does not support the audio element.
</audio>
</div>
		</>
	);



};

export default Home;

