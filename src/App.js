import { useEffect, useState } from "react";

function App() {
	const [arr, setArr] = useState([]);
	const [minDate, setMinDate] = useState(new Date());
	const [maxDate, setMaxDate] = useState("");
	useEffect( () => {
		let today = new Date();
		let day = today.getDay();
		let tempArr = [];
		let tempToday = today;
		for(var i = 0; i < 90 +120 +120 + day - 7;i++) {
			tempArr.push(today);
			today = ( d => new Date(d.setDate(d.getDate()+1)) )(today);
		}
		setMaxDate(today);
		let tempArr2 = [];
		for(var j = 14 +91 - 1 + day; j>=0;j--) {
			tempToday = ( d => new Date(d.setDate(d.getDate()-1)) )(tempToday);
			tempArr2.push(tempToday);
		}
		setMinDate(tempToday);
		tempArr2.reverse()
		tempArr = tempArr2.concat(tempArr);
		tempArr[0] = ( d => new Date(d.setDate(d.getDate()-1)) )(tempArr[0]);
		setArr(tempArr);

	}, []);

	useEffect(() => {
		window.addEventListener('scroll', handleScroll);
		return () => window.removeEventListener('scroll', handleScroll);
	}, []);
	
	function handleScroll() {
		if (window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight) return;
		console.log('Fetch more list items!');
		let tempArr = [];
		let today = maxDate;
		console.log(today);
		for(var i = 0; i < 91;i++) {
			today = ( d => new Date(d.setDate(d.getDate()+1)) )(today);
			tempArr.push(today);
		}
		tempArr = [...arr, ...tempArr];
		setArr(tempArr);
		console.log(arr);
	}

	return (
		<div className="container">
			<div className="tile">
				{	
					arr?
						arr.map((date, index)=>{
							return(
								<div className='calender-tile' key={index}>
									<div className='date-tile'>
										<div>{new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day:'2-digit'}).format(new Date(Date.parse(date)))}</div>
									</div>
							
								</div>
							)
						}):<div></div>
				}
			</div>
		</div>
	);
}

export default App;
