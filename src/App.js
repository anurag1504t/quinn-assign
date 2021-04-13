import { useEffect, useState } from "react";
import { Card } from "reactstrap";

function App() {
	const [arr, setArr] = useState([]);
	const [minDate, setMinDate] = useState();
	const [maxDate, setMaxDate] = useState();
	const monthDays = ["SUN", "MON", "TUE", "WED", "THUR", "FRI", "SAT"];
	useEffect( () => {
		let today = new Date();
		let day = today.getDay();
		console.log(today);
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
		// console.log(minDate);
		// console.log(maxDate);

	}, []);

	useEffect(() => {
		window.addEventListener('scroll', handleScroll);
		return () => window.removeEventListener('scroll', handleScroll);
	}, [maxDate]);
	
	function handleScroll() {
		console.log(document.documentElement.scrollTop);
		if (window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight) return;
		console.log('Fetch more list items!');
		let tempArr = [];
		let today = new Date(maxDate);
		// console.log(today);
		for(var i = 0; i < 91;i++) {
			tempArr.push(today);
			today = ( d => new Date(d.setDate(d.getDate()+1)) )(today);			
		}
		tempArr = [...arr, ...tempArr];
		setArr(tempArr);
		// console.log(arr);
		setMaxDate(today);
	}

	useEffect(() => {
		window.addEventListener('scroll', handleScrollTop);
		return () => window.removeEventListener('scroll', handleScrollTop);
	}, [minDate]);
	
	function handleScrollTop() {
		if (window.innerHeight !== document.documentElement.offsetHeight) return;
		console.log('Top');
	}

	return (
		<div className="container">
			<div className="top-bar fixed calender-header">
				<div className="header">
					<span className="month-header">{new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'long'}).format(new Date())} </span>
				</div>
				<div className="day-tile">
					{
						monthDays?
							monthDays.map( (day, index) => {
								return (
									<div className="day-tile">
										<div className="day"><strong>{day}</strong> </div>
									</div>
								)
							})
							:<div></div>
					}
				</div>
			</div>
			<div className="tile">
				{	
					arr?
						arr.map((date, index)=>{
							return(
								<div className='calender-tile' key={index}>
									<Tile date={date} />							
								</div>
							)
						}):<div></div>
				}
			</div>
		</div>
	);
}

const Tile = ({date}) => {
	return (
		<Card>
			<div className='date-tile'>
				<div>{new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day:'2-digit'}).format(new Date(Date.parse(date)))}</div>
			</div>
		</Card>
	)
}

export default App;
