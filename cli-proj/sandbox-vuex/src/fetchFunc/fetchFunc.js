export const fetchFunc = ()=>{
	return new Promise( 
		(resolve)=>{
			setTimeout(()=>resolve("OK"),2000)
		}
	)
}