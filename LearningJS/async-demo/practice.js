
// getCustomer(1, (customer) => {
//     console.log('Customer: ', customer);
//     if (customer.isGold) {
//       getTopMovies((movies) => {
//         console.log('Top movies: ', movies);
//         sendEmail(customer.email, movies, () => {
//           console.log('Email sent...')
//         });
//       });
//     }
//   });


async function getResult(){

    try{

        const cust = await getCustomer(1)
        console.log(cust);
        if(cust.isGold){
            const movies = await getTopMovies();
            console.log('Top movies: ', movies);
            await sendEmail(cust.email, movies);
            console.log('Mail Sent...');
        }

    }
    catch (err){
        console.log(err.message);
    }

}

getResult();


  function getCustomer(id) {

    return new Promise((resolve, reject) =>{

        setTimeout(() => {
            resolve({ 
              id: id, 
              name: 'Mosh Hamedani', 
              isGold: true, 
              email: 'email' 
            });
          }, 4000);

    });
      
  }
  
  function getTopMovies() {

    return new Promise((resolve, reject) => {

        setTimeout(() => {
            resolve(['movie1', 'movie2']);
          }, 4000);

    });
    
  }
  
  function sendEmail(email, movies) {

    return new Promise((resolve, reject) =>{
        setTimeout(() => {
            resolve();
          }, 4000);
    });
    
  }