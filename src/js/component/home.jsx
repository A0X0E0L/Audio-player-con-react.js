import React, {useState, useEffect, useRef } from "react";





const Home = () => {

	const [playlist, setPlaylist] = useState([]);
	let [positionList, setPositionList] = useState(0);
	const [iconAudio, setIconAudio] = useState("fa fa-play");
	const [iconRepeat, setIconRepeat] = useState("text-secondary");
	let [songName, setSongName] = useState("");
	let [repetir, setRepetir] = useState(false);
	let songUrl = useRef();
	const progressBarRef = useRef();

		
	useEffect(() => {
		fetch("https://assets.breatheco.de/apis/sound/songs")
		.then((response) => {return response.json()
		})
		.then((data) => {
			return setPlaylist(data) 
		})
	}, []);


		
	function selectSong(url, index,name){
		
		songUrl.current.src = `https://assets.breatheco.de/apis/sound/${url}`;
		songUrl.current.play();
		setIconAudio("fa fa-pause");
	
		setPositionList(index);
		setSongName(name);
						
	}

		
	function ctrlAudio(){
		if (songUrl.current.paused) {
			songUrl.current.play();
			setIconAudio("fa fa-pause");
		} else {
			songUrl.current.pause();
			setIconAudio("fa fa-play");
		}
		
	}

		
	function repMusic() {
		if(repetir== false) {
			setRepetir(true);
			setIconRepeat("text-white");
		} else {
			setRepetir(false);
			setIconRepeat("text-secondary");
		}
		
	  } 

	  	
	function back(){
		if (positionList > 0) {
		setPositionList(positionList--);
		songUrl.current.src = `https://assets.breatheco.de/apis/sound/${playlist[positionList].url}`;
		songUrl.current.play();
		getName();
	} else {
		setPositionList(playlist.length--);
		songUrl.current.src = `https://assets.breatheco.de/apis/sound/${playlist[positionList].url}`;
		songUrl.current.play();
		getName();
	}
	}

		
	function sig(){
		if (positionList < (playlist.length - 1)) {
		setPositionList(positionList++);
		songUrl.current.src = `https://assets.breatheco.de/apis/sound/${playlist[positionList].url}`;
		songUrl.current.play();
		getName();
	} else {
		setPositionList(0-1);
		songUrl.current.src = `https://assets.breatheco.de/apis/sound/${playlist[positionList].url}`;
		songUrl.current.play();
		getName();
	
	}
	
	}

			
	function modificarVolumen(volumen){
		songUrl.current.volume = volumen / 100;
	}

		
	useEffect(() => {
		if (songUrl.current && progressBarRef.current) {
			progressBarRef.current.style.width = `${(songUrl.current.currentTime / songUrl.current.duration) * 100}%`;
		}
	}, [songUrl.current]);

		
	function getName() {
		let songList = playlist.filter((item,index) => index === positionList);
		let song = songList[0];
		setSongName(song.name)
	}

	function randomSong(){
		let number = Math.floor(Math.random() * playlist.length) + 1;
		setPositionList(number);
		songUrl.current.src = `https://assets.breatheco.de/apis/sound/${playlist[positionList].url}`;
		songUrl.current.play();
		setIconAudio("fa fa-pause");
		getName();
	}

	return (
		<>
		<div className="container w-75  ">
		<div className="lg bg-body-bs-secondary bs-primary-border-subtle  ">
		<div className="list-group bg-dark rounded-0 list  ">
			{playlist.map((song,index) => <button className="btn btn-light text-start rounded-0" onClick={() => selectSong(song.url,index,song.name)} type="button" key={index}>{index}  {song.name}</button>)}
		</div>
	
		<div className="d-flex justify-content-center bg-light border-top">
			<div className="mt-3 ">
				<h4 className="text-black text-center mb-3 fs-5 fw-black ">{songName}</h4>
				<div>
		<audio ref={songUrl} id="reproductor" loop={repetir} onTimeUpdate={() => {
						let currentTimePercent = (songUrl.current.currentTime / songUrl.current.duration) * 100;
						progressBarRef.current.style.width = currentTimePercent + "%";
				}}/>	
		<button type="button" onClick={randomSong}  className="btn btn-light mb-3"><i className="fa fa-random"></i></button> 
		<button type="button" onClick={back}  className="btn btn-dark mx-3 mb-3"><i className="fa fa-backward"></i></button> 
		<button type="button" onClick={ctrlAudio} className="btn btn-dark mx-3 mb-3"><i className={iconAudio}></i></button>
		<button type="button"  onClick={sig} className="btn btn-dark mx-3 mb-3"><i className="fa fa-forward"></i></button>
		<button type="button"   onClick={repMusic} className="btn btn-dark mb-3"><i className={"fa fa-redo "+ iconRepeat}></i></button>
		</div>

		</div>		

	</div>

	<div className="text-white d-flex justify-content-center  bg-light"> 

		<i className="fas fa-volume-down mx-3"></i>
		<div className="range">
 			 <input type="range" className="form-range" min="0" max="100" onChange={(e) => modificarVolumen(e.target.value)} id="rangeVolume" />
		</div>
		<i className="fas fa-volume-up mx-3"></i>
	
	</div>

	<div className="bg-dark"> 
		<div className="progress-bar" ref={progressBarRef}></div>
	</div>


		</div>
</div>



		
		</>
	);
};

export default Home;
