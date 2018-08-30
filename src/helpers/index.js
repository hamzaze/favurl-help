export function customDate(date) {
  var formattedDate = new Date(date).toLocaleDateString('en-US', {  
      day : 'numeric',
      month : 'short',
      year : 'numeric'
  })
  return formattedDate;
}

export function customTime(date) {
  var time = new Date(date).toLocaleTimeString('en-US', {  
      hour : 'numeric',
      minute : 'numeric'
  })
  return time;
}

export function sortByDate(type) {
  switch(type) {
    case 'desc':
    default:
    return function(a, b) {
      // only for undefined 
      if (typeof (a.crdate) === 'undefined') return 0;
      if (typeof (b.crdate) === 'undefined') return 1;

      a = new Date(a.crdate).getTime();
      b = new Date(b.crdate).getTime();
      
      return b - a;
    }
    case 'asc':
      return function(a, b) {
        // only for undefined 
        if (typeof (a.crdate) === 'undefined') return 1;
        if (typeof (b.crdate) === 'undefined') return 0;

        a = new Date(a.crdate).getTime();
        b = new Date(b.crdate).getTime();
      
      return a-b;
      }
  }
  
}

export function sortByName(type) {
  switch(type) {
    case 'asc':
    default:
    return function(a, b) {
      // only for undefined 
      if (typeof (a.name) === 'undefined') return 1;
      if (typeof (b.name) === 'undefined') return 0;

      a = (a.name || '').toLowerCase();
      b = (b.name || '').toLowerCase(); 

      return (a > b) ? 1 : ((a < b) ? -1 : 0);
    }
    case 'desc':
    return function(a, b) {
      // only for undefined 
      if (typeof (a.name) === 'undefined') return 0;
      if (typeof (b.name) === 'undefined') return 1;

      a = (a.name || '').toLowerCase();
      b = (b.name || '').toLowerCase(); 

      return (a < b) ? 1 : ((a > b) ? -1 : 0);
    }
  }
  
}

export function urlExists(url, callback) {
  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function() {
    if (xhr.readyState === 4) {
      callback(xhr.status === 200);
    }
  };
  xhr.open('HEAD', url);
  xhr.send();
}