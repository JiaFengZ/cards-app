export function sringToDate(str) {
  const date = str.split('-').map((item) => parseInt(item, 10));
  let today = new Date();
  today.setFullYear(date[0]);
  today.setMonth(date[1] - 1);
  today.setDate(date[2]);
  today.setHours(8, 0);  
  return today;
}

export function timeToString (date = Date.now()) {
  return date.getFullYear() + '-' + 
	  ((date.getMonth() + 1) < 10 ? ('0' + (date.getMonth() + 1)) : (date.getMonth() + 1)) + '-' + 
	  	(date.getDate() < 10 ? ('0' + date.getDate()) : date.getDate()); 
}